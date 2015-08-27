---
author: schmijos
created_at: 2014-01-27 13:00:17+00:00
kind: article
slug: keeping-track-of-bash-scripts
title: Keeping Track of Bash Scripts
categories:
- Programming
- Server Administration
- Super User
tags:
- bash
- batch
- linux
---

If you have to execute a lot of bash commands in order, it's hard to keep track of their status. The following script executes any command in a given array and keeps track of its state and its consumed time. Additionally it exits on an error or returns a message on final success.

```bash
#!/bin/bash
clear

readarray <<HERE
	echo "Sample Command 1"
	echo "Hello World!" > /tmp/txt
	wget http://google.ch > /tmp/google
HERE

i=0
for cmd in "${MAPFILE[@]}"; do
	i=$[$i +1]
	echo -e "\n\e[93mstep ${i}\e[0m"
	echo "${cmd}"
	echo "running..."
	time eval $cmd
	if [ $? -ne 0 ]; then
		echo -e "\e[31merror!\e[0m"
		exit
	fi
	echo "step ${i} done."
done

echo -e "\e[32msuccess!\e[0m"
```
