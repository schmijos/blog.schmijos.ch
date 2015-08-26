---
author: hori
date: 2012-08-11 22:20:20+00:00
kind: article
slug: remote-tools
title: Remote Tools
categories:
- Raspberry Pi
- Server Administration
tags:
- Putty
- RaspberryPi
- Remote
- SCP
- SSS
- WinSCP
---

If you want to run things on your Raspberry Pi over a network you will need a SSH client like PuTTY which is free and easy to use. This gives you a command line on your local PC, so it is also possible to copy-paste the commands to your Pi which saves you from a lot of anger because of type-o’s.

To move files to and from your Pi you need an SCP Client. Here I recommend WinSCP which is also free to use.

Because these tools are so handy I’ll do a short intro on how to use them:

The first thing we need is the Network-Address (IP) of your Pi:  Were lucky because it tells us this every time it boots while connected to a network. When it has finished booting look two lines above the login prompt. You should find a line saying:

    
    My IP address is xx.xx.xx.xx


Remember this number or write it down as we will be using it later.

**Using PuTTY**

Download and unpack PuTTY to a folder of your choice and start it. All you need to do is enter the IP of your Pi, 10.0.0.141 in my case, and select SSH for the connection type. If you have a somewhat smart DHCP the IP of your Pi will stay the same over long periods of time so you might want to consider adding it to the saved sessions by typing in a name and clicking “Save”.

After you’re done just click “Open”, accept the security certificate and you will see a command line that behaves almost identical to the one on your Pi. Thus the login is the same and so are the commands. You can copy things to and from the clipboard with the right mouse button.

[![](http://www.miraculum.ch/wp-content/uploads/putty-300x288.jpg)](http://www.miraculum.ch/wp-content/uploads/putty.jpg)[![](http://www.miraculum.ch/wp-content/uploads/putty2-300x233.jpg)](http://www.miraculum.ch/wp-content/uploads/putty2.jpg)

Note: typing startx will start the GUI on the Pi and not on the conected remote machine

**Using WinSCP**

When you start WinSCP just input the the IP of your Pi, 10.0.0.141 in my case, into the field Host name. Here you might also want to save your session by clicking “Save” and then connect using the “Login” button

Log in using your standard credentials and accept the security certificate. Now you should see a window split in the middle. The left side is your local PC and the right side is the Raspberry Pi. Now you can drag-and-drop files to and from you’re your Pi and you can also edit text files directly in the integrated editor.

[![](http://www.miraculum.ch/wp-content/uploads/winscp-300x212.jpg)](http://www.miraculum.ch/wp-content/uploads/winscp.jpg)[![](http://www.miraculum.ch/wp-content/uploads/winscp2-300x229.jpg)](http://www.miraculum.ch/wp-content/uploads/winscp2.jpg)

Note: All File transfer is done encrypted so it is not really the best option for copying large files which might take some time.
