---
author: schmijos
created_at: 2015-05-21 20:41:10+00:00
kind: article
slug: wrap-up-separating-applications
title: 'Wrap-Up: Separating Applications'
categories:
- Programming
tags:
- api
- architecture
- concepts
- oop
- team
---

Last year I wrote about how you could design an application with [AngularJS and Rails API Resources](/2014/08/13/angularjs-and-rails-4-api-resources/). In the meantime I made some further experiences I'd like to share.

I said that you should design your application with keeping in mind which parts should be consumed by machines and which should be used by humans. This still holds true but needs to be intensified. It's not enough to think about the buzzwords _separation of concern_ and _information expert_. You must enforce it.


## **Create separate projects!**


Over time developers will turn your application into a monolithic block if they can. They'll link together what is meant to be separate because it's easier. Protect them from themselves by separating projects. Create a lot of applications of which each has its own code base and is responsible for its own specific purpose. You may think this generates a lot of overhead. That's true. You're going to set up more _VCS_ repositories, more _CI_ configurations and more _IDE_ configurations. You'll even have to switch the code base if you want to get context knowledge about the whole application or if leaky abstractions arise. Going further you could also think of doing project management separately or even differently.

But given a common sense you may gain a lot from those downsides:



	
  * It's easier to distribute work and specialised knowledge to miscellaneous developers. This also makes developers happier. They like having a realm to be responsible of.

	
  * People will speak to each other for specifying (unified) API's. If they don't, they cannot use a software feature. Here also lives some danger: Pay attention to keep the applications _[DRY](https://en.wikipedia.org/wiki/Don't_repeat_yourself)_. If everything goes well, you'll end up having several applications with APIs well defined and understood.

	
  * Technology stacks are exchangeable as long as they implement the API's they should provide or consume. If everything is in the same project this can be more difficult.

	
  * Tests are being run because they can be run fast.

	
  * It's easier to put more manpower on a project. New people don't have to deal with complexity they're not interested in. They only have to set up their project and implement against the APIs available in the staging environment.

	
  * People can use technologies they know and like for new parts of an application. It's also easier to try out new technologies without much risk. And you know: Developers go nuts for new technologies!

	
  * You'll automatically think a bit more long-term because versioning of the applications can and will be an issue for more complex projects. Instead of patching around inside a monolithic block you and the developer will have to think about features affecting compatibility. So you're sacrificing some flexibility (which will [haunt you back](https://en.wikipedia.org/wiki/Technical_debt)) for a lot of stability.

	
  * Most of the points above are hiring arguments. Developers want to work with you if they can work with their technologies on their projects.


I think the are more pros and contras and definitely it's not all black and white but for me that's the way to think now.


## **Conclusions**


**Old and busted**: It's all about APIs. That was always the case. But now with weak-typed/script languages it's even more important to enforce clean encapsulation (You can do the same amount of damage with monkey patching as you can do with pointers).

**New hotness**: Enforce good encapsulation by separating projects. This is how the internet works. And it works well for us at Renuo. Btw. [we are hiring](https://www.renuo.ch/jobs/150426-ruby-on-rails-entwickler-job/)!

* * *

### **Update**

I was missing a buzzword: _microservice_

> The goal of microservices is to sufficiently decompose the application in order to facilitate agile application development and deployment.

That's from the [nginx tech-blog](https://nginx.com/blog/introduction-to-microservices), which I recommend to read.
