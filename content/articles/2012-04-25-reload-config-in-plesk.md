---
kind: article
title: Reload Config in Plesk
slug: reload-config-in-plesk
created_at: 2012-04-25
tags: plesk, server, vhost
---

If you change something in your vhost config, it is not visible yet. 
You first have to reload it with a plesk script which is not found easily. 
On console it’s done this way:

    /usr/local/psa/admin/sbin/websrvmng -u --vhost-name=npl.ch

Where [npl.ch](/web/20120624225151/http://npl.ch/ "noprobLAN Host") is the vhost to be updated.
