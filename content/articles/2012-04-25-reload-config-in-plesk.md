---
author: schmijos
created_at: 2012-04-25 14:02:43+00:00
kind: article
slug: reload-config-in-plesk
title: Reload Config in Plesk
categories:
- Server Administration
tags:
- plesk
- server
- vhost
---

If you change something in your vhost config, it is not visible yet. You first have to reload it with a plesk script which is not found easily. On console it's done this way:
`/usr/local/psa/admin/sbin/websrvmng -u --vhost-name=npl.ch`
Where [npl.ch](http://npl.ch) is the vhost to be updated.
