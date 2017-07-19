---
author: schmijos
created_at: 2017-07-19 10:26:00+00:00
kind: article
slug: track-hotjar-user-id-in-sentry
title: "Track Hotjar User ID in Sentry"
categories:
- Programming
- Error Handling
---

Stuff goes wrong on your website. It happens. We know it. We have measures to
log all kind of stuff. At [Renuo](https://renuo.ch) we use an external service
called [Sentry](https://sentry.io/) to log errors happening in our web apps.
We use it for backend and frontend. With it, we can log user email addresses
to find out who was affected by which error and then we try to reproduce it.

Wouldn't it be cool to have a video which let's us see exactly what steps the
user undertook to produce the error?

It's easily possible. For usability tests we use
[Hotjar](https://www.hotjar.com/) already. So let's simply configure Sentry
in the frontend to log the Hotjar user:

    var hotjarUserId = hj.pageVisit.property.get('userId').split("-").shift();

    Raven.setExtraContext({
      hotjar_user_id: hotjarUserId
    })

With the next error happening we'll see an extra field called
`hotjar_user_id`. Then we can filter our Hotjar video recordings for the
value in this field and we see exactly what the user did.

Be aware that this doesn't work for all the errors happening since Hotjar
only tracks samples.

