---
author: schmijos
created_at: 2013-09-26 14:50:33+00:00
kind: article
slug: modifying-a-list-of-strings-in-powershell
title: Modifying a List of Strings in Powershell
categories:
- Programming
tags:
- batch
- powershell
- windows
---

Today I tried to convert all strings in an array to lower case in the most simple way. Instead of using a common `for`- or `foreach`-block I use the short form of `foreach` in combination with a pipe.

```powershell
$strings = "lULz", "GacH"
$strings | % { $_.ToLower() }
$strings | % { $_.ToUpper() }
```

With `$_` you can access each element and set it to lower- or upper case. As you can see, it is very compact.

The result looks like that:

```plain
lulz
gach
LULZ
GACH
```

