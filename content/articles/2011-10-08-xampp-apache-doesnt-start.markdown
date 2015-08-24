---
author: schmijos
date: 2011-10-08 19:34:06+00:00
kind: article
slug: xampp-apache-doesnt-start
title: Xampp Apache Doesn't Start
categories:
- Server Administration
- Uncategorized
tags:
- apache
- ports
- server
- xampp
---

On a xampp installation on windows, you can start the apache web server per control panel. If it stops after a short period indicating the status "starting..." you may have the same problem I had:

Port 80 is occupied by another service.

In my case it was Skype which per default binds to port 80. To work around that problem, you'll have to start apache before Skype. Skype then will bind to port 443 which is enough out of the way for most appliances.

If you're not running Skype, port 80 might be occupied by IIS or another webserver.
