---
author: hori
created_at: 2012-08-13 21:44:31+00:00
kind: article
slug: using-quick2wire-python-api
title: Using Quick2Wire Python API
categories:
- Raspberry Pi
- Server Administration
tags:
- api
- debian
- python
- quick2wire
- RaspberryPi
- Raspbian
---

As we saw in my last post we can now use our I/O’s but it’s very complicated and unhandy. So in this post I will show you how to use the python API to control our I/O’s inside a python script.

Note: The gpio-admin tool is stringent necessary to use the python-api

**Software Setup:**

The API relies on python3 so we have to install this with:

sudo apt-get install python3

Python si a very simple but jet powerfule language especially with al the modules that can be imported. If you don’t know it yet I chold recoment the Google class which covers all the basics:

[http://code.google.com/intl/de-DE/edu/languages/google-python-class/](http://code.google.com/intl/de-DE/edu/languages/google-python-class/)

You need to download the files from Github if you haven’t already done so. (same procedure as with the gpio-admin):

`git clone https://github.com/quick2wire/quick2wire-python-api.git`

I have a separate folder home/git for all my repositories so all my files will point to this location.

Since the API is also still under development I wouldn’t install it just yet but instead we include:

```python
import sys
# appends to PYTHONPATH the location of the example codes
sys.path.append(r'/home/pi/git/quick2wire-python-api/src/')
```


in all our files so python will know where to look for the files and we can update them with git when newer versions become available.

**Hardware Setup:**

Basicly the hardware Setup stayed the same as in the last post  ([http://www.miraculum.ch/2012/08/13/installing-and-using-quik2wire-gpio-admin/](http://www.miraculum.ch/2012/08/13/installing-and-using-quik2wire-gpio-admin/)) Due to a bug in the API the pins 24 and 26 (GPIO7 and 8) don’t work correctly at the moment so I moved the switch to pin 16 (GPIO23) and the LED to pin 18 (GPIO24)

**Python Scripts:**

Now we are ready to run our first python script: It basicly does the same thing we did manualy with the gpio-admin. It prints out the status of the switch every second and toggles the LED. You can copy the whole sample scipt into a file and name it something.py. I recommend you do this at your normal PC and then copy the file over to the Pi using WinSCP (see earlier post).

```python
#!/usr/bin/env python3
import sys
# appends to PYTHONPATH the location of the example codes
sys.path.append(r'/home/pi/git/quick2wire-python-api/src/')

from time import sleep
from quick2wire.gpio import Pin, exported

with exported(Pin(18, Pin.Out)) as LED, exported(Pin(16, Pin.In)) as switch:
while True:
LED.value = 1 - LED.value
print(switch.value)
sleep(1)
```

you can run your script using the command:
`python3 /Desktop/gpio.py`
In my case the filename is gpio.py and this file is located on the desktop. You need to exchange these values with wherever you saved your file and whatever you named it.

The sctipt runs until you terminate it using Ctrl+C

Now lets take this code apart some:
`#!/usr/bin/env python3`
Tells the script where it can find the python files

    
    <code> </code>
    <code>import sys</code>
    <code># appends to PYTHONPATH the location of the example codes</code>
    <code>sys.path.append(r'/home/pi/git/quick2wire-python-api/src/')</code>


As already mentioned these lines tell python where the python-api is located since we diden't install it.

    
    <code>from time import sleep</code>
    <code>from quick2wire.gpio import Pin, exported</code>


These two lines import functions from other modules so we can use them in this script

    
    <code>with exported(Pin(18, Pin.Out)) as LED, exported(Pin(16, Pin.In)) as switch:</code>


This line exports the pins we need. Special about this way of exporting them is that they automatically get unexported when the script is aborted or doesn’t execute correctly. As you can see each pin accepts 2 arguments: A pin number and a direction. Note that the pin-numbers are now the actual numbers on the header and not the GPIOxx numbers anymore!

    
    <code>        while True:</code>
    <code>               LED.value = 1 - LED.value</code>
    <code>               print(switch.value)</code>
    <code>               sleep(1)</code><code></code>


This is an endless loop which:



	
  * Toggles the LED-pin

	
  * Prints the state of the switch

	
  * Sleeps for 1 Second


As you can see there are no conditions to ext the loop that’s why you have to abort the script manualy.

This concludes the python-API post. As you can see this implementation makes controlling the pins much easier and the possibility’s inside a python script are endless.

**Happy I/O ing!**
