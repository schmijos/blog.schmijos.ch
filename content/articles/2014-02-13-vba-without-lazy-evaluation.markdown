---
author: schmijos
date: 2014-02-13 16:59:25+00:00
kind: article
slug: vba-without-lazy-evaluation
title: VBA without Lazy-Evaluation
categories:
- Programming
- VBA
tags:
- logic
- syntax
- vba
---

Next to other annoying facts of Visual Basic for Applications the following  one kicked my ass today.

VBA (v7.0) does not evaluate logical expressions lazily.

[vb]
Function getTrue()
    Debug.Print "darnit"
    getTrue = True
End Function

Private Sub testBtn_Click()
    Dim a, b As Boolean
    a = False
    b = a And getTrue
End Sub
[/vb]

If you execute `testBtn_Click`, the output of this code is `darnit`. That doesn't seem to be a very dramatic behaviour in this case but its relevant if you're planning if-statements and exit strategies where one of the succeeding logical statements only can be evaluated if a predecessor evaluated to _true_ (or sometimes _false_). The following is an example how it does **not** work in VBA.

[vb]
If UBound(range) = 1 And IsNumeric(range(0)) Then
    Debug.Print "Success"
End If
[/vb]

In VBA if `range` hasn't any elements, there will be a runtime error. You have to rearrange your code to some thing like that:

[vb]
If UBound(range) = 1 Then
    If IsNumeric(range(0)) Then
        Debug.Print "Success"
    End If
End If
[/vb]

This one got me on a much more complex situation, where I had to invert all logical expressions to exit a _sub_. **Grrrrrrr!**
