---
author: schmijos
created_at: 2015-03-09 10:02:32+00:00
kind: article
slug: delete-versioned-amazon-s3-bucket
title: Delete Versioned Amazon S3 Bucket
categories:
- Server Administration
tags:
- aws
- cloud
- Setup
---

If you've enabled versioning in an Amazon S3 Bucket it's not that easy to delete it. Open the web console and execute the following steps:





  1. Delete All Objects


  2. Suspend Versioning


  3. Show Versions


  4. Delete Versions


  5. Delete Bucket



All these steps are also possible on the console (_aws-cli_), but I didn't find out how yet.





  1. `aws s3 rm --recursive s3://mybucket`


  2. `aws s3api put-bucket-versioning --bucket mybucket --versioning-configuration Status=Suspended`


  3. --


  4. (Delete All Versions)


  5. `aws s3 rb --force s3://mybucket`


