---
kind: article
title: Backspace Not Working in VIM on Mac OS X
slug: backspace-not-working-in-vim-on-mac-os-x
created_at: 2014-07-03
tags: configuration, mac, vim
---

If _backspace_ isn’t working on your Mac, then maybe VIM is running in compatibility mode.
That means, you don’t have any of the _Vi improved_ features enabled. You can set the following
in your `~/.vimrc` to disable compatibility mode and set a “normal” backspace behaviour:

```
set nocompatible
set backspace=indent,eol,start
```
