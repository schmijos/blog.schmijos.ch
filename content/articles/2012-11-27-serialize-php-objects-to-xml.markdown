---
author: schmijos
comments: true
date: 2012-11-27 13:42:34+00:00
layout: post
slug: serialize-php-objects-to-xml
title: Serialize PHP Objects to XML
wordpress_id: 356
categories:
- Programming
- Uncategorized
tags:
- Java
- php
- xml
---

Since I didn't find a good solution to serialize PHP objects to XML, I wrote a Serializer-Class by myself:

> [Bitbucket XMLSerializer Project](https://bitbucket.org/schmijos/xmlserializer) <

Here is an example of how to use it:
[php]
<?php
header('Content-Type: text/plain');
require_once 'XML/Serializer.php';
$testArray = array('gach' => 5, 1 => array(6,7));
echo XmlSerializer::toXml($testArray);
[/php]

I wanted to use XML to exchange data between PHP and Java. But XML isn't really suited for unsafe PHP objects. The far more better way (for simple objects) is to use JSON with `json_encode` on PHP and the [GSON library](http://code.google.com/p/google-gson/) on Java.
