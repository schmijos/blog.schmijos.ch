---
author: schmijos
comments: true
date: 2011-11-02 09:40:46+00:00
layout: post
slug: grub2-cant-load-stage2
title: Grub2 can't load stage2
wordpress_id: 232
categories:
- Server Administration
tags:
- ahci
- debian
- sata
- server
---

A week ago, my file server didn't start anymore. After attaching screen and keyboard, the following message appread:

`error: file not found.
grub rescue>`

After trying to reinstall grub by booting from a live cd, the problem still existed. It wouldn't boot.
Since everybody fixes his grub by reinstalling and reconfiguring it, I missed an obvious point in a normal analysis scheme: back to the roots.

The problem was, that somehow Debian switched the SATA mode in BIOS to AHCI after an update. For that reason grub2 could load stage1 from MBR, but not stage2 from the harddisk. Setting it back to SATA made it work like a charm.
