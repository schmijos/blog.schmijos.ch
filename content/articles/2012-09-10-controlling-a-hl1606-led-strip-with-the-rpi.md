---
author: hori
created_at: 2012-09-10 22:52:08+00:00
kind: article
slug: controlling-a-hl1606-led-strip-with-the-rpi
title: Controlling a HL1606 LED strip with the RPi
categories:
- Programming
- Raspberry Pi
tags:
- HL1606
- LED
- python
- RaspberryPi
- RGB
---

As I announced in my last post, I have been working on a library to control a LED strip. But not the kind you normally see with one color or sometimes even RGB, mine allows me to control each LED by its self. The ultimate goal is to build a network bandwidth-monitor like this: [http://beta.ivc.no/wiki/index.php/LED_Bandwidth_Monitor](http://beta.ivc.no/wiki/index.php/LED_Bandwidth_Monitor)

You can watch the result of the library here (does not include the network-part):

::


::

I have also uploaded the whole Project (Source files, examples and hardware layout) to my Git account: [https://github.com/jhorisberger/RPi-HL1606](https://github.com/jhorisberger/RPi-HL1606)


## Hardware


The whole project was a bit more complicated as I anticipated, because these strips are operated on 5V and would not (unlike most IC’s) accept 3,3V as a valid high signal. It took me quite some time to figure this one outJ. So to use the strip I needed to provide level-shifting. Because for this specific application data is only sent and not received by the Pi I used a simple quadruple dual-input AND-Gate that accepts 3,3V as high. It’s connected like this:

![](/images/2012/Levelshifter.jpg)

You could also do this with some transistors, but I think it’s not worth the hassle as these chips only cost a couple of cents, are available everywhere and do the job perfectly and quick.  In the end it looked like this:

![](/images/2012/HL1606_Aufbau-1024x613.jpg)

Note that i added some LED's to check on the status of the signals and ensure they work corectly


## The software part:


The protocol to control the LED’s is rather simple although very badly documented. The only datasheet I found out there that was not Chinese was translated very badly and had the pin-outs wrong. But with the help or this Page: [http://bleaklow.com/2010/05/24/how_the_hl1606_works.html](http://bleaklow.com/2010/05/24/how_the_hl1606_works.html) I  finaly got it working.  You can find a detailed description of the interface in the readme in the Repository. It’s SPI-Like and is implemented using Bit-Banging because I haven’t tried out the hardware-SPI interface yet. It uses the RPi-GPIO library to controll the IO's because of the speed issues i adressed in my last post.  The repository also contains a whole package of examples and a readme of how to use them.

With that done “all” I have to do is get the network-side of things working to finish my bandwidth-monitor.

I hope this Library helps some of you out there interfacing with this not-so-easy chip type. I would love to hear if you built something using this library!
