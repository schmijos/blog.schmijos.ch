---
author: hori
date: 2012-09-03 19:20:17+00:00
kind: article
slug: quick2wire-speed-issues
title: quick2wire speed issues
categories:
- Programming
- Raspberry Pi
tags:
- I/O
- performance
- python
- quick2wire
- RaspberryPi
---

As I was trying to use the quick2wire api to do some bit-banging in order to drive some LED strips I figured out that there were some serious timing issues. As you can see from the readings of my oscilloscope below the minimal time for one low-high-low transition is over 3.5 ms:

[![](http://www.miraculum.ch/wp-content/uploads/peak_q2w_old.jpg)](http://www.miraculum.ch/wp-content/uploads/peak_q2w_old.jpg)

This may not sound as a lot, and in case you are just turning things on and of it wil not trouble you much, but if you want to bit-bang something this is a serious problem. After figuring this one out I saw that one of the recent commits on git-hub showed something about timing improvements. So I pulled the newest version of the GPIO-Admin and the python-API and got better results:

[![](http://www.miraculum.ch/wp-content/uploads/peak_q2w_new.jpg)](http://www.miraculum.ch/wp-content/uploads/peak_q2w_new.jpg)

Even though the time has been reduced to less than a third, it's still not nearly good enough to do the kind of stuff i want to do with it. In my despair I tried the RPi-GPIO library and got realy good results:

[![](http://www.miraculum.ch/wp-content/uploads/peak_RPi-GPIO.jpg)](http://www.miraculum.ch/wp-content/uploads/peak_RPi-GPIO.jpg)

As you can see the transition is down to 10us which is about 1/100 of the improved result from quick2wire. Even though this means I have to run all my projects as root i wil be stuck with the RPi-GPIO library for the length of this project.

I will be publishing my results with the LED stripes here shortly so you can see what became of my project.
