---
author: schmijos
created_at: 2011-08-06 11:11:14+00:00
kind: article
slug: cant-mount-samba-share-more-than-onc
title: Cant Mount Samba Share More Than Once
categories:
- Server Administration
tags:
- debian
- samba
- server
---

On my samba server I had the problem, that just one user at the time could access the share. I had `security=user` activated. The log file under `/var/log/samba/log.smbd` said at the last line:

`smbd_open_once_socket: open_socket_in: Address already in use`
(Die Adresse wird bereits verwendet)

I googled it and stumbled over a very different topic describing other problems. There it was mentioned as a solution to add a user per smbpasswd. Then I realized, that I didn't have my system user in that database.

The problem is, if the samba config requires a user to exists on the linux server, samba can log in the user only once. I think that's because the samba runs on that user. The samba user database must have sort of a mapper interface, which maps multiple samba users to just one system user.

The console command `smbpasswd -a username` resolved my issue and now I can connect from multiple computers to the share.
