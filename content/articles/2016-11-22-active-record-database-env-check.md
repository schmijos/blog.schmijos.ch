---
author: schmijos
created_at: 2016-11-22 22:00:00+00:00
kind: article
slug: active-record-database-env-check
title: Misconfigured AR Database Environment Check
categories:
- Rails
---

When you execute `rails db:schema:load` the following can happen:

```
rails aborted!
ActiveRecord::ProtectedEnvironmentError: You are attempting to run a destructive
action against your 'production' database.
If you are sure you want to continue, run the same command with the environment
variable:
DISABLE_DATABASE_ENVIRONMENT_CHECK=1
```

This is a protection so that you don't delete any production data by accident.
But what happened to me was that I somewhen reconfigured my local system
to be productive (probably to test something with real data).

It is possible to reconfigure the database environment in
`ar_internal_metadata` with the following command:

```
bin/rails db:environment:set RAILS_ENV=development
```

With that database rake tasks to not complain anymore if you mess with
databases locally.

