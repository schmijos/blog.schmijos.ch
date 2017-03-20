---
author: schmijos
created_at: 2017-03-20 22:00:00+00:00
kind: article
slug: git-tag-sort-semantic-versions
title: "Git Tag: Sort by Version"
categories:
- Tools
---

You can list all the tags with the command `git tag`. The output looks like
that if you use tag your commits with versions:

    2.1.2
    2.10.0
    2.2.0

With semantic versioning being in place you probably would like to see
the following listing:

    2.1.2
    2.2.0
    2.10.0

Actually you can achieve that with the option
[`--sort`](https://git-scm.com/docs/git-tag#git-tag---sortltkeygt).
There's even a configuration option present for that:

    git config --global tag.sort version:refname

