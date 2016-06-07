---
author: schmijos
created_at: 2016-06-07 22:00:00+00:00
kind: article
slug: secure-a-rails-api-with-auth
title: Secure a Rails API with Authentication
categories:
- Rails
---

If you have an API which you want to protect with an API key you can do
it the following way in Rails.

    class ApplicationController < ActionController::API
      include ActionController::HttpAuthentication::Token::ControllerMethods

      before_action :restrict_access

      private
      def restrict_access
        authenticate_or_request_with_http_token do |token, _options|
          ApiKey.exists?(access_token: token)
        end
      end
    end

This internally executes `authenticate_with_http_token` for checking the
presence of a token in the *HTTP* header and then executes the block. If that
fails `request_http_token_authentication` answers the current request directly
with a *401 Unauthorized*.

