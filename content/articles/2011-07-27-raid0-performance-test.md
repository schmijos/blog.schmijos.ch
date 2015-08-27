---
author: schmijos
created_at: 2011-07-27 14:45:48+00:00
kind: article
slug: raid0-performance-test
title: RAID0 Performance Test
categories:
- Server Administration
tags:
- debian
- harddisk
- hardware
- performance
- raid
---

Recently I had to compose a file server for high load LAN read access. My first thought was to implement a RAID 0 over 4 harddisks. I took a dual core 2.5GHz CPU and 2GB of RAM. I attached four 500GB SATA drives to the mainboard and then I installed Debian 6 Squeeze on a small part of the first hd. The rest of it and the other drives were dedicated to the RAID 0.

After the installation and the configuration of the system, I measured the read/write performance of the RAID. I did it with the time dd combination:

`time dd if=/dev/zero of=file bs=1k count=20000000`
and
`time dd if=file of=/dev/null`

![RAID 0 - Performance Test 1](/images/2011/raid0diagram1.png)

As you see, write actions perform better than read actions. Why is that and how can we invert this effect? I think it's because the RAID software hasn't to check where to write data, but it must search for it on read access.

A complete test with [Bonnie++](http://en.wikipedia.org/wiki/Bonnie%2B%2B) delivers slightly different results: 

* 


Sequential Write: 290Mb/s
Sequential Read: 308Mb/s
Random Seeks: 651/s (That's twice the seek rate of my two RAID5 servers.)



Does anybody know why the test results of Bonnie++ and dd are so different?


