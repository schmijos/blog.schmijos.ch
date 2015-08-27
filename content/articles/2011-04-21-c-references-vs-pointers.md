---
author: schmijos
created_at: 2011-04-21 13:05:45+00:00
kind: article
slug: c-references-vs-pointers
title: C++ - References vs. Pointers
categories:
- Programming
tags:
- C++
---

![memory image](http://www.miraculum.ch/wp-content/uploads/ref-pointer.png)

Two or three weeks ago, we learned about the differences between references and pointers in C++. Since pointers are "evil" in C++, the difference is not very important for the reality, but very important, if you have coded in C before. Therefore, I'd like to explain the difference between references and pointers shortly. 

A pointer is an address of a location of assigned memory space. The compiler knows the width of the memory space. 

A reference is just an alias for some variable or type. You can point a reference to a new variable without knowing, where (at which address) it exactly is.


Look at this example:
```cpp
int *ri;      // ri points to an int
int *&x = ri; // x is a reference to a pointer of an int
*x = 42;      // puts 42 at the address of the by x referenced pointer ri

int main() {
  std::cout << "Address: " << ri << std::endl;
  std::cout << "Value at ri: " << *ri << std::endl;
  std::cout << "Value at x: " << *x << std::endl;
}
```

**Summary:**
Reference = Alias for a value
Pointer = Address of a value
