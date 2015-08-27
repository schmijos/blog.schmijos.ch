---
author: schmijos
created_at: 2011-09-20 09:49:13+00:00
kind: article
slug: php-constructor-curiosit
title: PHP Constructor Curiosity
categories:
- Programming
tags:
- ctor
- oop
- php
---

With the development of my own [MVC](http://en.wikipedia.org/wiki/Model%E2%80%93view%E2%80%93controller) framework I stumbled over a weird PHP problem which only really matters for just-PHP-programmers. Since in PHP 5.3.0 a constructor can be declared as a method named after the class.

```php
<?php
class Index {
  public function __construct() { echo "before 5.3.0"; }
  public function index() { echo "5.3.0 or later"; }
  // case of function name doesn't matter!
}

$blub = new Index();
```

Inside namespaces this "feature" was removed with PHP version 5.3.3. Outside of namespaces it still exists.

Personally I am not happy about this change, since it is not consistent with PHP destructor functions.
