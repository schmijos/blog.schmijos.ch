---
author: schmijos
created_at: 2011-03-27 10:27:19+00:00
kind: article
slug: ssh-terminal-you-have-new-mail
title: 'SSH-Terminal: You have new mail'
categories:
- Server Administration
tags:
- mail
---

If I log in to my fileserver per SSH, I get the usual MOTD (message of the day) plus a message
saying "You have new mail" ("Sie haben neue Nachrichten"). After some googleing I found out,
that I had to type in the following to see this "mail": `mail` Very self-explanatory :-P
Then a console mail client appeared on my desk

![mail per ssh](/images/2011/ssh-mail.png)

You can navigate through your in-box by typing the number of a mail.
  
By the way: On boot, the server overwrites your MOTD. You can customize this behavior by
editing _/etc/motd.tail_ and _/etc/init.d/bootmisc.sh_
