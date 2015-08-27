---
author: schmijos
created_at: 2012-04-28 19:15:44+00:00
kind: article
slug: kismet-for-asus-eeepc-1000he
title: Kismet for Asus EeePC 1000HE
categories:
- Super User
---

Kismet is a powerful wifi analysis tool. It lists all available wireless networks around your position.

![Kismet Screenshot](http://www.miraculum.ch/wp-content/uploads/Bildschirmfoto-am-2012-04-28-204439-300x175.png)

But there's one little problem with the installation. The Kismet server needs to know the chipset of you wireless
card and your user name. Therefore you have to edit the following entries in `/etc/kismet/kismet.conf`:

```
suiduser=username
source=rt2500,wlan0,atheros
```
