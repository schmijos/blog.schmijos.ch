---
title: Manually Setting nVidia Viewport
slug: manually-setting-nvidia-viewport
kind: article
tags: graphics, nvidia, setup, ubuntu
created_at: 2015-08-22
---

Do you know about the problem of attaching a PC to a TV screen and then having lost
the borders of the image? I had that problem too with my Ubuntu media server.
It would not show the whole image in the viewport. Adjusting the resolution did’t
work either. But if you’re using a nVidia graphics card a one-liner can correct what is
shown in the viewport.

    sudo nvidia-settings --assign 0/CurrentMetaMode="HDMI-0: 1280x720 { ViewPortIn=1280x720, ViewPortOut=1220x680+30+20 }"

The ViewPortOut-option shrinks the image by provided x and y values (pixel).
