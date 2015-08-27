---
author: schmijos
created_at: 2013-10-23 12:49:18+00:00
kind: article
slug: altiris-7-5-requires-aspnet-2-0
title: Altiris 7.5 requires ASP.NET 2.0
categories:
- Server Administration
tags:
- Altiris
- server
- Setup
- windows
---

I tried to install the Altiris Client Management Suite 7.5 on Windows Server 2008. I stumbled over two problems: Database Server and IIS. The problems weren't easy to track down, since I didn't know about the existence of LogViewer at the beginning. This very useful tool is located in the Symantec Installation Manager folder and gives you an overview to all occuring exceptions. Since there are always a lot of them, you'll need some practice to locate relevant messages.


### SQL Server


I played around with Microsoft SQL Server without a result. As seen in the servers log files, neither Windows Authentication nor plain database users seemed to work, same thing on a locally set up SQL Express. It only worked for me on SQL Express, when I used the _sa_-account on a previously manually created _Symantec_CMDB_ (no other name!) database by selecting "Existing Database" on the SIM Database Configuration Form.


### IIS


After the SQL Express log files were clean, it still didn't work. After long time searching through the LogViewers messages, I found a warning about accessing the web service _http://Machine:80/Altiris/NS_. There is a problem if you're running your IIS containers with .NET 4.0. The ASP.NET Ajax libraries need to be of version 2.0. Changing the .NET version of the IIS application pool where Altiris is run to .NET 2.0 solved my problems.

![Altiris .NET Requirements](/images/2013/Altiris-IIS-Config-300x116.png)
