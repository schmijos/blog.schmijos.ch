---
author: schmijos
created_at: 2011-07-28 11:32:41+00:00
kind: article
slug: unity-sucks-on-asus-eee-pc-1000he
title: Unity sucks on Asus Eee PC 1000HE
categories:
- Super User
tags:
- 1000HE
- eeepc
- netbook
- performance
- ubuntu
- unity
---

I always used Ubuntu with Gnome 2 on my Asus EeePC 1000HE netbook. Today this seems a bit antiquated. Since Unity has nicer windows and the Apple style window frames which are integrated into the task bar. I thought to give it a try with the update from Ubuntu 10.04 (Lucid Lynx) to Ubuntu 11.04 (Natty Narwhal).

I installed the Ubuntu Desktop Edition on my netbook - the Netbook Edition is now obsolete, because it is merged into the standard version. Looking at the result, I was disappointed by the long initialization time and the laggy handling of Unity. After very frustrating hours looking for a solution and even thinking about changing the linux distribution, I found an Ubuntu developers blog entry about a new package called "unity-2d". The comments on the blog post promised epic performance and good user experience on slow systems.

I wanted to try it and therefore typed into my console:

`sudo apt-get install unity-2d`

It said, that the package was not found. Later I realized, that my package list was just virginal after the fresh installation. The following did it:

`sudo apt-get update
sudo apt-get upgrade
sudo apt-get install unity-2d`

Now I'm fueled with fresh 2D power and the system feels really fast :-)

![Console on Unity 2D](http://www.miraculum.ch/wp-content/uploads/unity-2d-300x175.png)
