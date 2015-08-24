---
author: schmijos
comments: true
date: 2014-01-21 15:32:59+00:00
layout: post
slug: use-a-proxy-with-ubuntu-apt
title: Use a Proxy with Ubuntu APT
wordpress_id: 480
categories:
- Super User
tags:
- network
- ports
- Setup
- ubuntu
---

If `apt-get` complains about not being able to reach the mirror server, you maybe are behind a proxy. Apt then just hangs until it shows a connection timeout message.

You can configure a proxy for Apt by adding the folloing line to `/etc/apt/apt.conf.d/01proxy`.

[bash]
Acquire::http::Proxy "http://proxyaddressorname:proxyport";
[/bash]

`01proxy` is a chained config file for Apt and can be created if it doesn't exist.

After adding the entry, you can test the configuration by running `sudo apt-get update`. It should work now.

**Update 1:**
Use the following bash commands to configure a proxy for _git_:

[bash]
export http_proxy=http://proxyaddressorname:proxyport
git config --global http.proxy $http_proxy
[/bash]

**Update 2:**
For _easy_install_ and _pip_ you can get the proxy settings working by exporting a https proxy, which actually is a http proxy.
[bash]
export https_proxy=http://proxyaddressorname:proxyport
[/bash]
