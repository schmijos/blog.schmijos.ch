---
kind: article
title: No Escaping Leads to an HTTP 505
slug: no-escaping-leads-to-an-http-505
created_at: 2014-03-06
tags: http, i/o, network, python
---

Today I stumbled over an `HTTP 505` error (version not supported) for the very first time. 
After tracking the request with wireshark, all was clear. The TCP stream looked like this:

```
GET /search.do?textfield=Max Muster HTTP/1.1
Accept-Encoding: identity
Host: intranet.???.ch
User-Agent: Python-urllib/3.3
Connection: close
 
HTTP/1.1 505 HTTP Version Not Supported
Server: Apache-Coyote/1.1
Date: Thu, 06 Mar 2014 08:26:59 GMT
Connection: close
```

The space between `Max` and `Muster` gets the HTTP server disturbed because the second 
space on this line is supposed to indicate the beginning of the protocol definition. 
In python (v3.3) `urllib.request.Request(url=target_url)` does not escape the url. 
I have to do it by myself. So requesting `GET /search.do?textfield=Max%20Muster HTTP/1.1` 
would be the correct way.
