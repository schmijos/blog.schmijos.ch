---
author: schmijos
date: 2011-05-23 07:27:35+00:00
kind: article
slug: cp-casting-excercise
title: C++ Casting Excercise
categories:
- Programming
tags:
- C++
- casting
---

I always thought casting to be an easy exercise - hard to debug, but easy to perform. Sure, you must know some symbols like _u_ and leading zeroes and there are also specialities like that a character is casted to an unsigned integer and so on. But then Mr. Sommerlad came up with the following confusing example:
[cpp]
cout << -3u + 2.0 << endl;
[/cpp]
What will the output be? The question is, to what the _u_ sign is bound. What binds stronger? The minus or the _u_ sign. The answer is _-3u_ remains unsigned and therefore is mapped to 232-3 in a 32 bit system. The output on the console will be _4.2950e+09_.
That is because the minus sign is **not** a cast.
