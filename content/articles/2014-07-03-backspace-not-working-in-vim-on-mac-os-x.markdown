---
author: schmijos
comments: true
date: 2014-07-03 08:28:23+00:00
layout: post
slug: backspace-not-working-in-vim-on-mac-os-x
title: Backspace Not Working in VIM on Mac OS X
wordpress_id: 554
categories:
- Super User
tags:
- configuration
- mac
- vim
---

If _backspace_ isn't working on your Mac, then maybe VIM is running in compatibility mode. That means, you don't have any of the _Vi improved_ features enabled. You can set the following in your `~/.vimrc` to disable compatibility mode and set a "normal" backspace behaviour:

[plain]
set nocompatible
set backspace=indent,eol,start
[/plain]
