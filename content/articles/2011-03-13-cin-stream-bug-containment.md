---
author: schmijos
date: 2011-03-13 17:49:19+00:00
kind: article
slug: cin-stream-bug-containment
title: cin stream - bug containment?
categories:
- Programming
tags:
- C++
- streams
---

Since this semester I'm learning C++ from Mr. Sommerlad at HSR. As an early exercise we should implement a small program searching the console stream for the vocal character count. Therefore I wrote the following:

[cpp]#include <iostream>
#include <iterator>
#include <map>
#include <boost/assign.hpp>
using namespace std;

int main() {
	map m; char c;
	boost::assign::insert(m)('a',0)('e',0)('i',0)('o',0)('u',0);

	while (cin) {
		cin >> c;
		if (m.find(c) != m.end()) m[c]++;
	}

	for (map::iterator it = m.begin(); it != m.end(); it++) {
		cout << (*it).first << ": " << (*it).second << endl;
	}
}[/cpp]
At first I initialize a map where I'm going to count the vocals. I'm initializing it with zeroes per _boost::assign_. Then I iterate through the stream _cin_ and check if the current character is a vocal (exists as key in the map). At least I iterate through the map and write all vocal counts to the console.

This piece of code works as expected if the last character typed in is a consonant. Otherwise the output looks like this:
[caption id="attachment_34" align="alignnone" width="248" caption="Counting Vocals the Wrong Way"][![Vocal Count Fail](http://www.miraculum.ch/wp-content/uploads/wrong-console.png)](http://www.miraculum.ch/wp-content/uploads/wrong-console.png)[/caption]


Whats wrong? 
The point is, that the loop condition is still satisfied when the EOF character shows in. Therefore the last character is shifted twice.

You might see what's wrong with this piece of code, because the _while_ condition looks unfamiliar to you. The _while_ loop should look like this:
[php]	while (cin >> c) {
		if (m.find(c) != m.end()) m[c]++;
	}[/php]
Then the output is correct.
[caption id="attachment_37" align="alignnone" width="247" caption="Counting Vocals the Right Way"][![Correct Vocal Count](http://www.miraculum.ch/wp-content/uploads/right-console.png)](http://www.miraculum.ch/wp-content/uploads/right-console.png)[/caption]

Why this weird behavior? There should be thrown an out of bound exception or something like that. Eventually it's some sort of "modern" bug containment for people who use streams carelessly or it is because of the consideration that a stream should be infinite by design.
