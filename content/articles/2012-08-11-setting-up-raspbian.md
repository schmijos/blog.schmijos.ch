---
author: hori
created_at: 2012-08-11 21:33:48+00:00
kind: article
slug: setting-up-raspbian
title: Setting up Raspbian
categories:
- Raspberry Pi
tags:
- debian
- RaspberryPi
- Raspbian
- Setup
---

Since raspberrypi.org recommended to use Raspbian “wheezy” for beginners I thought id start out with this image. I’m not going to do a detailed instruction on how to write the Image to the SD card but you can find a good walkthrough at: [http://elinux.org/RPi_Easy_SD_Card_Setup](http://elinux.org/RPi_Easy_SD_Card_Setup). At the first boot you will be confronted with the Raspi-config tool. This is very useful for initial config although some of the settings can be confusing. Worthwile are the following points:



	
  * **Expand rootfs**: By default the image you loaded onto the SD Card is only 1.8GB large. So only this amount of space is used on the card. The rest cannot be used by default. This option expands the File system to the whole card. If you have a 2GB card this will not help you much. But in my case (4Gb) so I now have 2.2GB more space for my files.

	
  * **Overscan**: If you have problems with a black border around your screen you will have to change these settings. By default I would set it to <Disable>

	
  * **Configure_keyboard**: Here you have to set the layout to the one for your country if you happen to not live in the UK


** **

The rest is not so important for the moment (You get to the finish button by pressing “tab”). The Pi will then do a reboot which will take some time due to the keymap-setings and the expansion of the filesystem. You can always come back to the configurator with the command:

    
    sudo raspi-config


After the reboot we face a comandline with a blinking cursor. Something that my generation is not so used to (dude where’s my mouse?). The standard login is:

Username: pi

Password: raspberry

If you enjoy a GUI just type:

    
    Startx


Press enter and you have got your mouse back :). The command line is the most powerful tool on your Pi so we will mostly be using this instead of the Graphical interface. You can also start LXTerminal inside the GUI which is identical to the raw command line but remember the GUI will slow down your PI considerably.
