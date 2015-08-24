---
author: schmijos
date: 2014-01-20 16:28:14+00:00
kind: article
slug: python-namespace-renaming
title: Python Namespace Renaming
categories:
- Programming
- Python
tags:
- python
---

A lazy programmer is a good programmer. But maybe you're using the `print` function everywhere in your python code. What now, if you want to use nicer outputs with `pprint`? And how to remain lazy? Do you search and replace every occurence of `print`? Instead of that I suggest adding the following line before your code. This mechanism defines an alias and is described [in this PEP](http://www.python.org/dev/peps/pep-0221/).

[python]
from pprint import pprint as print
[/python]

Now `print` is replaced by the much nicer `pprint`. I'm not quite sure if it is good style, because you are adding obscurity and making code more complex to understand. But that's on you to decide. Here's just the effect:

[python]
>>> arrr = ([[x,2*x, 3*x] for x in range(10)])
>>> print(arrr)
[[0, 0, 0],
 [1, 2, 3],
 [2, 4, 6],
 [3, 6, 9],
 [4, 8, 12],
 [5, 10, 15],
 [6, 12, 18],
 [7, 14, 21],
 [8, 16, 24],
 [9, 18, 27]]
>>> 
[/python]

You can undefine this alias by deleting it. After that, the code shows its orignal behaviour. 
[python]
>>> del print
>>> print(arrr)
[[0, 0, 0], [1, 2, 3], [2, 4, 6], [3, 6, 9], [4, 8, 12], [5, 10, 15], [6, 12, 18], [7, 14, 21], [8, 16, 24], [9, 18, 27]]
>>
[/python]
