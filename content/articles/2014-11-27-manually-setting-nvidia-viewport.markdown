---
author: schmijos
comments: true
date: 2014-11-27 14:33:46+00:00
layout: post
slug: manually-setting-nvidia-viewport
title: Manually Setting nVidia Viewport
wordpress_id: 510
categories:
- Super User
tags:
- graphics
- nvidia
- Setup
- ubuntu
---

Do you know about the problem of attaching a PC to a TV screen and then having lost the borders of the image? I had that problem too with my Ubuntu media server. It would not show the whole image in the viewport. Adjusting the resolution did't work either. But if you're using a nVidia graphics card a one-liner can correct what is shown in the viewport.

[bash]
sudo nvidia-settings --assign 0/CurrentMetaMode="HDMI-0: 1280x720 { ViewPortIn=1280x720, ViewPortOut=1220x680+30+20 }"
[/bash]

The `ViewPortOut`-option shrinks the image by provided x and y values (pixel).
