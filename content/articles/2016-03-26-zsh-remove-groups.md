---
author: admin
created_at: 2016-03-23 11:00:00+00:00
kind: article
slug: zsh-remove-groups
title: Write Less - Remove in Groups
categories:
- System
---

Today I learned that you can remove multiple files by using groups in ZSH

    rm ./config/locales/{en,fr}/parcels.yml

You can use this pattern for more, e.g.:

    touch blub-{1,2,3,4,5}

will create 5 files named `blub-1`, `blub-2`, `blub-3`, `blub-4` and `blub-5`.

