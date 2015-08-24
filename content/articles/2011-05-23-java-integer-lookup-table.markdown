---
author: schmijos
date: 2011-05-23 08:40:37+00:00
kind: article
slug: java-integer-lookup-table
title: Java - Integer Lookup Table
categories:
- Programming
tags:
- Java
---

Have you already once asked yourself, what's the difference between _equals(..)_ and the _==_ operator? It's simple to explain it, but side-effects of this purpose can be enormous.

**The Explanation:**
_x.equals(y)_ checks, if the values of instance _x_ are equal to the values of instance _y_. You can override _equals()_ and define by yourself, which properties should be compared.
The _==_ operator checks if two instances are the same. That means, they are stored at the same address in memory.

**My Side-Effect Experience:**
I tried to compare two _int_ variables with _==_. That worked well for small numbers, but wasn't correct for large ones. I tried to debug it and found out, that the magical barrier lied at 127 for which the _==_ comparison worked. I asked my prof and he said that Java had an internal lookup table for integers to speed up operations. That means, the Java Virtual Machine instantiates every instance of the integers between 0 and 127 at startup. Later Java just uses pointers to reference to these numbers. Values greater than 127 are really instantiated and therefore the _==_ comparison doesn't work as expected on them.
