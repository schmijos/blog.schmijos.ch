---
author: schmijos
date: 2011-07-30 09:55:13+00:00
kind: article
slug: mounting-failure-because-of-32bit-limit
title: Mounting Failure Because of 32bit Limit
categories:
- Server Administration
tags:
- debian
- harddisk
- server
---

Recently I set up a Debian Squeeze on a 20TB RAID5 fileserver. When I tried to set up the xfs file system with partman, the following message appeared:

`Der Versuch, ein Dateisystem vom Typ xfs auf /dev/sda als /srv einzubinden, ist fehlgeschlagen.`

or in english:

`The attempt to mount a file system with type xfs in /dev/sda at /srv failed.`

I didn't find the solution to this on google, I didn't even find a similar problem. I could format the filesystem, but not mount it. 
Later I thought about the underlaying hardware architecture, a 32bit dualcore server board. After having a look at the output of the `df`-command, it was clear. The volume had a sector count of `2147483647+` and was of type `ee`. What now? A complex decision: Split up the RAID, buy a 64bit board or use a file system like btrfs. I tried btrfs, but it's performance was pretty bad because of my 2GB RAM. And because I'd like to run this server now, I abandoned to buy a new board and splitted up the RAID.
