---
author: schmijos
date: 2014-03-28 15:31:12+00:00
kind: article
slug: vba-object-initialization-trap
title: VBA Object Initialization Trap
categories:
- Programming
- VBA
tags:
- ctor
- oop
- vba
---

What would you naively expect from the following code?

[vb]
Dim c As New Collection
Dim i As Integer

For i = 1 To 2
    Dim o As New Field
    o.Name = "f" & CStr(i)
    c.Add o
Next i

Debug.Print c(1).Name
Debug.Print c(2).Name
[/vb]

Yes, but the output is the following

[plain]
f2
f2
[/plain]

That's because combination of declaration and initialization does NOT allocate new memory more than once. Therefore object `o` remains at the same place for all iterations of the loop. As excpected `o` isn't visible outside the loops scope.

The correct way to achieve that every object in the collection becomes another instance of `Field` would be an instantiation with `set`:

[vb]
Dim c As New Collection
Dim i As Integer

For i = 1 To 2
    Dim o As Field
    Set o = New Field
    o.Name = "f" & CStr(i)
    c.Add o
Next i

Debug.Print c(1).Name
Debug.Print c(2).Name
[/vb]

Now the output is as expected:

[plain]
f1
f2
[/plain]
