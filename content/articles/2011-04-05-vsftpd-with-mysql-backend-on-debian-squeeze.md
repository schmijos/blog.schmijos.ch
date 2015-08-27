---
author: schmijos
created_at: 2011-04-05 12:27:11+00:00
kind: article
slug: vsftpd-with-mysql-backend-on-debian-squeeze
title: vsftpd with mysql backend on Debian Squeeze
categories:
- Server Administration
tags:
- debian
- ftp
- mysql
- pam
---

Hi there
Yesterday I had to set up an ftp server using a mysql database as a storage for the user credentials. The first barrier was to choose the optimal ftp server. Actually I didn't search long for comparizons between the different options. I just took the one, I empirically thought to be the best. vsftpd is said to be very secure and I had much less problems with it than with proftpd.
I installed it per aptitude. Because we will also need a mysql server and the pam module for mysql later, you can install it all at once:

```bash
apt-get install vsftpd mysql-server libpam-mysql
```

The mysql server will ask you for the mysql root password. vsftpd and the mysql server will be running after you have installed them.

In the next step, you will create a mysql user table. Start the mysql client per:```bashmysql -u root -p``` and type in the root password, you have set before.

The following queries must be executed now:
The first one creates the database and changes the workspace

```sql
CREATE DATABASE IF NOT EXISTS system;
USE system;
```

The second one creates a table for the credentials of ftp users.

```sql
CREATE TABLE ftpusers(
  id int(11) NOT NULL auto_increment,
  username varchar(64) NOT NULL,
  password varchar(64) NOT NULL,
  updated timestamp DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY(id)
);
```

Only the fields _username_ and _password_ are really necessary, but you should consider to create a field _id_ for a numeric unique id for every user. This id will always be the same for a single user and shall never be changed. This is good design. The field _updated_ is just useful to detect users, who don't change their passwords.

If you don't want to access your table with the root user, you should consider to create an other, less privileged user. I did it per SQL in the console:

```sql
GRANT SELECT ON system.ftpusers TO vsftpd@localhost IDENTIFIED BY 'verygoodpassword';
```

For testing purposes, we should create a temporary user:

```sql
INSERT INTO ftpusers(username, password) VALUES ('testuser', ENCRYPT('testpw'));
```

If you don't trust _ENCRYPT_ enough, you could use another algorithm (_AES_ENCRYPT_ is suggested by mysql as the most secure one). Anyways, you should keep your choice in mind for later.

For the next step, we have to configure our _vsftpd_ that he can authentificate against the mysql database via _pam_. You have to open your _/etc/vsftpd.conf_ and edit/create the following properties:

```plain
# our pam file: we'll create this later.
pam_service_name=vsftpd.virtual
# jail the ftp user for security reasons
chroot_local_user=YES
# map external users to a local one
guest_enable=YES
# every external user will be mapped to the local user ftp
guest_username=ftp
# define an alias for virtual users
user_sub_token=$USER
# this alias is now used for a individual home directory for every user
local_root=/var/www/$USER
# give all guests the rights of a local user (This makes sense, because a guest is already mapped to a local user.)
virtual_use_local_privs=YES
```

<!-- more -->

By the way: It's a good idea to specify the nopriv user. Do it by creating a new system user with no privileges: 

```bash
adduser --system --no-create-home ftpsecure
```

Then you have to set the config property _nopriv_user_ to _ftpsecure_.

Here is my whole vsftp config as it is running now:

```plain
listen=YES
anonymous_enable=NO
local_enable=YES
write_enable=YES
file_open_mode=0770
local_umask=0007
chmod_enable=YES
dirmessage_enable=YES
use_localtime=YES
xferlog_enable=YES
connect_from_port_20=YES
chown_uploads=YES
chown_username=www-data
nopriv_user=ftpsecure
ftpd_banner=Willkommen bei Bla Blub.
secure_chroot_dir=/var/run/vsftpd/empty
rsa_cert_file=/etc/ssl/private/vsftpd.pem
tcp_wrappers=YES
hide_ids=YES

pam_service_name=vsftpd.virtual
chroot_local_user=YES
guest_enable=YES
guest_username=ftp
user_sub_token=$USER
local_root=/var/www/$USER
virtual_use_local_privs=YES
```

As I wrote before, the _pam_service_name_ still points to nowhere. Therefore, we're going to create a file _/etc/pam.d/vsftpd.virtual_ and fill it with the following three lines:

```plain
#%PAM-1.0
auth	required	pam_mysql.so user=vsftpd passwd=verygoodpassword host=localhost db=system table=ftpusers usercolumn=username passwdcolumn=password crypt=1
account	required	pam_mysql.so user=vsftpd passwd=verygoodpassword host=localhost db=system table=ftpusers usercolumn=username passwdcolumn=password crypt=1
```

This means, that we verify against the existence and the authorization of a user in the database named _system_. The number for the attribute _crypt_ defines the encryption type (0 for no encryption, 1 for _crypt_, 2 for the mysql _PASSWORD_ function and 3 for _MD5_).

Now, everything should be settled. You just have to restart your ftp-server with

```bash
/etc/init.d/vsftpd restart
```

I hope it did work and thank you for reading.
