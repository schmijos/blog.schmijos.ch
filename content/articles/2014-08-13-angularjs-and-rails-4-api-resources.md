---
title: AngularJS and Rails 4 Api Resources
slug: angularjs-and-rails-4-api-resources
kind: article
tags: GRAPHICS, NVIDIA, SETUP, UBUNTU
created_at: 2015-08-22
---

Since Mai I work for Renuo, a Swiss web dev company specialized in Rails. I’m on a project called Agricircle and I have the chance to design an api for a new tool, we’d like to use there. I tried different strategies and I’ll try to describe the succeeding one by why it is better.

The API
I decided to use plain Rails routing and Ruby inheritance for the api. This meets best the requirement of DRY versioning. Most of the rails api gems just introduce a lot of obfuscation. Josh Symonds has a good article comparing some of them. The only gem I use here is the rails-api gem. It uses a smaller middleware stack and therefore optimizes performance. You could go further and just use Rails Metal for even faster apis.

The only additional middleware I use at the moment is ImplicitRender, since I want to serve the views with jbuilder automatically. I do that intentionally because I want the views to be real views. You could let ImplicitRender away and just use calls in every action to render the whole object as json (render json: @object).

I decided not to version the models. Compatibility to lower api versions should here be provided through the api controllers. Sometimes that may be difficult, but I think it reduces complexity of data keeping enormously.

The Consumer
The frontend application consuming the Rails api uses the AngularJS framework. AngularJS is well suited for asynchronous standalone web or mobile apps. Also using a mostly independet frontend framework forces you to separate data from user interaction. So you’re ending up with two separate applications: one for machines and one for human users. That’s a good thing.

Sample Application Code
You can find the sample code on github. Feel free to report improvements as issue. Now I’m going to explain some important parts of the sample application.

Rails

The rails part relies on standard libraries. Only rails-api is used as an additional gem.

Routing

config/routes.rb contains the versioned provided resources in the api namespace. For every api version, we introduce a new sub-namespace where we can declare new features.

1
2
3
4
5
6
7
8
9
10
11
12
13
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
Models

app/models/sample.rb is intentionally kept simple. There’s no versioning here. We’re always dealing with the newest data. The api controllers are held responsible of backwards compatibility. This constraint is maybe not suitable for very big and often changing apis.

1
2
3
class Sample < ActiveRecord::Base
  validates_presence_of :name
end
Controllers

app/controllers/api/v1/samples_controller.rb contains the version 1 controller for handling access to sample resources. It is based on a small api controller (provided by the rails-api gem).

1
2
3
4
5
6
7
8
9
10
11
class Api::V1::SamplesController < Api::ApplicationController
  before_action :set_sample, only: [:show, :update, :destroy]
 
  # GET /api/v1/samples
  # GET /api/v1/samples.json
  def index
    @api_v1_samples = Sample.all
    render json: @api_v1_samples
  end
 
  # ...
app/controllers/api/v2/samples_controller.rb contains version 2 based on version 1 by inheritance. Here we have access to all version 1 features and additionally to a new feature by the action new_feature.

1
2
3
4
5
class Api::V2::SamplesController < Api::V1::SamplesController
  def new_feature
    render json: "lulz feature"
  end
end
AngularJS

Entry point for the AnguarJS app is the Rails controller called page_controller.rb. So the AngularJS app is not completely standalone but loosely tied to Rails. This has the advantage that it can use the Rails asset pipeline and its caching.

Routing

app/assets/javascripts/app/app.js.coffee contains configurations for the ngRoute module. I also use a Rails gem named angular-rails-templates for autoloading slim templates. Rendering of slim files has to be enabled (see: config/initializers/angular_assets.rb).

1
2
3
4
5
6
7
8
9
10
11
@sampleapi = angular.module('sampleapi', ['ngRoute', 'rails', 'templates'])
 
@sampleapi.config(($routeProvider) ->
    $routeProvider
 
      .when '/samples/index',
        templateUrl: 'samples/index.html', # directing to .slim
        controller: 'SamplesController'
 
      .otherwise({redirectTo: '/samples/index'})
)
Controllers

app/assets/javascripts/app/controllers/samples_controller.js.coffee contains the AngularJS controller for loading samples from the api. All CRUD operations are included in the sample code.

1
2
3
4
5
6
7
8
9
@sampleapi.controller 'SamplesController', ['$scope', 'Sample', ($scope, Sample) ->
  $scope.samples = []
 
  # ng-init binding (Service Call)
  $scope.loadSamples = () ->
    Sample.query().then (results) ->
      $scope.samples = results
 
  # ...
Models

This simple application doesn’t contain own javascript models. Everything is just loaded from the api. That’s done with services and model factories in app/assets/javascripts/app/services/sample.js.coffee. For generating parameter formats accepted by Rails, I use a gem called angularjs-rails-resource. It took some time to find that, but I think it really simplifies things a lot (like mapping CRUD update to PATCH).

1
2
3
@sampleapi.factory 'Sample', ['railsResourceFactory', (railsResourceFactory) ->
  return railsResourceFactory({url: '/api/v2/samples', name: 'sample'});
]

