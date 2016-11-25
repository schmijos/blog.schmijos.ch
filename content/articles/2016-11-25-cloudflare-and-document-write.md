---
author: schmijos
created_at: 2016-11-22 22:00:00+00:00
kind: article
slug: cloudflare-and-document-write
title: Cloudflare and document.write
categories:
- Web
---

Cloudflare's Rocket Loader is being intercepted by the new Chrome (v54) and
Firefox rules regarding `document.write` (more here:
https://developers.google.com/web/updates/2016/08/removing-document-write).

Because of that, pages where Cloudflare decided to inject the rocket loader (for
example not if you visit a page with Safari) doesn't load any scripts sourced
with `data-rocketsrc`.

*Change the Rocket Loader mode in Cloudflare to _manual_* or wait for a
solution.

