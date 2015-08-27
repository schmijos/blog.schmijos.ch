---
author: hori
created_at: 2012-08-13 18:50:02+00:00
kind: article
slug: installing-and-using-quik2wire-gpio-admin
title: Installing and using Quik2Wire GPIO-Admin
categories:
- Programming
- Raspberry Pi
tags:
- debian
- GPIO-Admin
- I/O
- quick2wire
---

The one thing I was most excited about is the fact that some of the Pins of the Processor have been pulled out for the user to use. You might have noticed those 26 pins sticking up into the skies at the edge of your PI. This includes normal I/O’s, I2C, SPI Serial etc. For me who likes to tinker with all sorts of electronics this is great news because it exploits the possibility to interface my Raspberry Pi to almost all my previous projects, and makes it a great platform to develop new projects on. Before I start with the high-level interfaces I will do just a input, output operations since this is the simplest of all to do.

Input and output means we will be connecting a switch and some LED’s to the Pi in order to simulate any input or output device. But this is only the hardware part. Then we need to control the Pins in the software to do what we want them to do.

**Hardware Setup:**

For this you will need:



	
  * A breadboard of some sort

	
  * Some LED’s

	
  * A tactile switch

	
  * Some Resistors (270Ohm for the LED’s and 10K for the Switch

	
  * Jumper wires, M/F


You can either pick them up at your local electronics store or you can buy a complete package somewhere. I got mine from Skpang together with a very neat case for the Pi which includes a small breadbording area.  I can only recommend this case. [http://www.skpang.co.uk/catalog/starter-kit-for-raspberry-pi-p-1070.html](http://www.skpang.co.uk/catalog/starter-kit-for-raspberry-pi-p-1070.html)

(NO, I don’t work for them :) )

The Hardware build up is as follows:

![Shematic for the first I/O Test](/images/2012/GPIO-300x278.jpg)

Note you can use almost any pin Instead of GPIO7 and 8.

[http://elinux.org/Rpi_Low-level_peripherals](http://elinux.org/Rpi_Low-level_peripherals) Lists all the pins and their functions. You can use everypin that says GPIOxx. Just remember to use the actual pins you connected in the software.

When it’s done it should look something like this:

![](/images/2012/GPIO2-1024x613.jpg)

**Software Setup:**

The most used Python library at the moment is RPi.GPIO but it has one big disadvantage: It requires you to be root in order to use the GPIO pins. On Linux systems the root user is so powerful, that we only use it when this is really necessary because with it you could really damage your system or simply delete all files on your Pi with one command. So I am going to use a library from the guys over at Quick2Wire that has a workaround for this problem.

At the moment they’re tool is still under heavy development so I recommend creating a local copy of the Github repository to stay up to date. They have detailed instructions on how to do this here:

[http://quick2wire.com/articles/a-gentle-guide-to-git-and-github/](http://quick2wire.com/articles/a-gentle-guide-to-git-and-github/)

You want to install the gpio-admin not the python-api (you can download that to we will need it later) so you change the clone command to:

    
    git clone https://github.com/quick2wire/quick2wire-gpio-admin.git


After it has finished downloading you can install it by moving into the directory with:

    
    sudo cd quick2wire-gpio-admin/


and then running

    
    sudo make install


now all we need to do is add ourselves to the user group gpio with:

    
    sudo adduser $USER gpio


In order for these changes to take effect you have to log off and on again. Now we can read the state of our switch with the command. To use the pin we have to export it with the command:

    
    gpio-admin export 8


now we can read the state with:

    
    <code>cat /sys/devices/virtual/gpio/gpio</code><code>8</code><code>/value</code>


Note that pressed is 0 and released is 1 because of the way we connected the hardware.

We can also control the LED by exporting the pin:

    
    gpio-admin export 7


and setting the state to output with:

`echo out > /sys/devices/virtual/gpio/gpio7/direction`

Now we can set the output to high or low using:

    
    <code>echo 1 > /sys/devices/virtual/gpio/gpio7/value</code>
    <code>echo </code><code>0</code><code> > /sys/devices/virtual/gpio/gpio7/value</code>


Once were done we have to unexport the pins again so someone else could use them:

    
    <code>gpio-admin unexport </code><code>7 gpio-admin unexport </code><code>8</code>
    <code> </code>


This is how we can control our in and outputs. You may have noticed that it’s very hard to handle in code but the guys at Quick2Wire also have a solution for this: An API for python which makes GPIO’s much easier to handle. I will be explaining this in another post. Right nowits time to celebrate our first IO operation.

**Cheers!**
