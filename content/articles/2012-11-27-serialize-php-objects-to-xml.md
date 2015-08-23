---
kind: article
title: Serialize PHP Objects to XML
slug: serialize-php-objects-to-xml
created_at: 2012-11-27
tags: java, php, xml
---

Since I didn’t find a good solution to serialize PHP objects to XML, 
I wrote a Serializer-Class by myself:

> [Bitbucket XMLSerializer Project](/web/20141203055857/https://bitbucket.org/schmijos/xmlserializer "Bitbucket XMLSerializer Project") <

Here is an example of how to use it:

```
<?php
header(‘Content-Type: text/plain’);
require_once ‘XML/Serializer.php';
$testArray = array(‘gach’ => 5, 1 => array(6,7));
echo XmlSerializer::toXml($testArray);
```

I wanted to use XML to exchange data between PHP and Java. 
But XML isn’t really suited for unsafe PHP objects. 
The far more better way (for simple objects) is to use JSON 
with `json_encode` on PHP and 
the [GSON library](/web/20141203055857/http://code.google.com/p/google-gson/ "GSON Library") 
on Java.
