---
author: schmijos
created_at: 2014-08-13 11:17:53+00:00
kind: article
slug: angularjs-and-rails-4-api-resources
title: AngularJS and Rails 4 Api Resources
categories:
- Programming
- Rails
tags:
- angularjs
- api
- architecture
- oop
- rails
---

Since Mai I work for [Renuo](https://www.renuo.ch/), a Swiss web dev company specialized in Rails. I'm on a project called [Agricircle](http://www.agricircle.com/) and I have the chance to design an api for a new tool, we'd like to use there. I tried different strategies and I'll try to describe the succeeding one by why it is better.


## The API


I decided to use plain _Rails_ routing and _Ruby_ inheritance for the api. This meets best the requirement of _DRY_ versioning. Most of the rails api gems just introduce a lot of obfuscation. Josh Symonds has a [good article](http://joshsymonds.com/blog/2013/02/22/existing-rails-api-solutions-suck/) comparing some of them. The only gem I use here is the _rails-api_ gem. It uses a smaller middleware stack and therefore optimizes performance. You could go further and just use _[Rails Metal](http://railscasts.com/episodes/150-rails-metal?view=asciicast)_ for even faster apis.

The only additional middleware I use at the moment is _ImplicitRender_, since I want to serve the views with _jbuilder_ automatically. I do that intentionally because I want the views to be real views. You could let _ImplicitRender_ away and just use calls in every action to render the whole object as _json_ (`render json: @object`).

I decided **not** to version the models. Compatibility to lower api versions should here be provided through the api controllers. Sometimes that may be difficult, but I think it reduces complexity of data keeping enormously.


## The Consumer


The frontend application consuming the _Rails_ api uses the _AngularJS_ framework. _AngularJS_ is well suited for asynchronous standalone web or mobile apps. Also using a mostly independet frontend framework forces you to separate data from user interaction. So you're ending up with two separate applications: one for machines and one for human users. That's a good thing.



## Sample Application Code


You can find the [sample code on github](https://github.com/schmijos/sample-rails-api). Feel free to report improvements as issue. Now I'm going to explain some important parts of the sample application.



### Rails


The rails part relies on standard libraries. Only _rails-api_ is used as an additional gem.



#### Routing


`config/routes.rb` contains the versioned provided resources in the api namespace. For every api version, we introduce a new sub-namespace where we can declare new features.
[rails]
namespace :api, defaults: {format: :json}, constraints: { format: 'json' } do
  namespace :v1 do
    resources :samples
  end

  namespace :v2 do
    resources :samples do
      collection do
        get 'new_feature'
      end
    end
  end
end
[/rails]



#### Models


`app/models/sample.rb` is intentionally kept simple. There's no versioning here. We're always dealing with the newest data. The api controllers are held responsible of backwards compatibility. This constraint is maybe not suitable for very big and often changing apis.
[rails]
class Sample < ActiveRecord::Base
  validates_presence_of :name
end
[/rails]



#### Controllers


`app/controllers/api/v1/samples_controller.rb` contains the version 1 controller for handling access to _sample_ resources. It is based on a small api controller (provided by the _rails-api_ gem).
[rails]
class Api::V1::SamplesController < Api::ApplicationController
  before_action :set_sample, only: [:show, :update, :destroy]

  # GET /api/v1/samples
  # GET /api/v1/samples.json
  def index
    @api_v1_samples = Sample.all
    render json: @api_v1_samples
  end

  # ...
[/rails]

`app/controllers/api/v2/samples_controller.rb` contains version 2 based on version 1 by inheritance. Here we have access to all version 1 features and additionally to a new feature by the action `new_feature`.
[rails]
class Api::V2::SamplesController < Api::V1::SamplesController
  def new_feature
    render json: "lulz feature"
  end
end
[/rails]



### AngularJS


Entry point for the _AnguarJS_ app is the _Rails_ controller called `page_controller.rb`. So the _AngularJS_ app is not completely standalone but loosely tied to _Rails_. This has the advantage that it can use the _Rails_ asset pipeline and its caching.



#### Routing


`app/assets/javascripts/app/app.js.coffee` contains configurations for the _ngRoute_ module. I also use a _Rails_ gem named _angular-rails-templates_ for autoloading slim templates. Rendering of _slim_ files has to be enabled (see: `config/initializers/angular_assets.rb`).
[ror]
@sampleapi = angular.module('sampleapi', ['ngRoute', 'rails', 'templates'])

@sampleapi.config(($routeProvider) ->
    $routeProvider

      .when '/samples/index',
        templateUrl: 'samples/index.html', # directing to .slim
        controller: 'SamplesController'

      .otherwise({redirectTo: '/samples/index'})
)
[/ror]



#### Controllers


`app/assets/javascripts/app/controllers/samples_controller.js.coffee` contains the _AngularJS_ controller for loading _samples_ from the api. All CRUD operations are included in the sample code. 
[ror]
@sampleapi.controller 'SamplesController', ['$scope', 'Sample', ($scope, Sample) ->
  $scope.samples = []

  # ng-init binding (Service Call)
  $scope.loadSamples = () ->
    Sample.query().then (results) ->
      $scope.samples = results

  # ...
[/ror]



#### Models


This simple application doesn't contain own javascript models. Everything is just loaded from the api. That's done with services and model factories in `app/assets/javascripts/app/services/sample.js.coffee`. For generating parameter formats accepted by _Rails_, I use a gem called _angularjs-rails-resource_. It took some time to find that, but I think it really simplifies things a lot (like mapping CRUD update to `PATCH`).
[ror]
@sampleapi.factory 'Sample', ['railsResourceFactory', (railsResourceFactory) ->
  return railsResourceFactory({url: '/api/v2/samples', name: 'sample'});
]
[/ror]
