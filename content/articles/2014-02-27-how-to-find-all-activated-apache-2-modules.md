---
kind: article
title: How to Find Activated Apache 2 Modules
slug: how-to-find-all-activated-apache-2-modules
created_at: 2014-02-27
tags: apache, debian, linux, server, setup, ubuntu
---

If you want to know what Apache 2 modules are enabled, you can use the following bash command.

    apachectl -t -D DUMP_MODULES

This provides the following output.

```
Loaded Modules:
 core_module (static)
 log_config_module (static)
 logio_module (static)
 version_module (static)
 mpm_prefork_module (static)
 http_module (static)
 so_module (static)
 alias_module (shared)
 auth_basic_module (shared)
 authn_file_module (shared)
 authz_default_module (shared)
 authz_groupfile_module (shared)
 authz_host_module (shared)
 authz_user_module (shared)
 autoindex_module (shared)
 cgi_module (shared)
 deflate_module (shared)
 dir_module (shared)
 env_module (shared)
 mime_module (shared)
 negotiation_module (shared)
 php5_module (shared)
 reqtimeout_module (shared)
 setenvif_module (shared)
 status_module (shared)
Syntax OK
```

It’s obviously not the only purpose of `apachectl`. Consulting the man page reveals 
some other helpful commands like a config test or start/stop/restart commands which are 
much faster than the init scripts.

It’s noteworthy that `apachectl -?` reveals different arguments than `man apachectl`. 
There are much more arguments you could use.
