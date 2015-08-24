---
author: schmijos
comments: true
date: 2014-01-15 15:42:48+00:00
layout: post
slug: runtime-analysis-real-world-example
title: Runtime Analysis - Real World Example
wordpress_id: 454
categories:
- Programming
- Python
tags:
- algorithm
- batch
- bioinformatics
- performance
- python
---

For my civil service I sometimes work for the bioinformatics departement of Agroscope. They basically just analyze big data sets and set it in relation to other fields of bio sciences.

For some reason they wanted to correlate DNA mutation positions with DNA recombination sequences of bacteria. This is about finding out if a position is in one of any of the provided ranges. The input data is a list of positions (pos) and a list of sequences (min, max) - both lists contain more than 100'000 entries. The output should be a list of positions matching at least one of the sequence ranges and a list of positions not matching any of the ranges.

[python]
ranges = [(3,7),(5,20),(21,35)]
positions [4,6,22]
[/python]

The bioinformatics guys wrote some code to achieve that, but they complained about it running to slow. A short look at the code revealed something that was preached in my studies a lot: nested loops are maybe bad. The worst case runtime of the one presented to me was _O(n²)_. This is relevant in theory, but hardly ever in practical experience. This time it was. The given script ran for about 6 hours before completion.

I redesigned the algorithm to an asymptotic runtime of _O(n log(log(n)))_. It then completed in less than a second. I use the fact that the input data is sorted. Sorted lists are searcheable in _O(log(n))_. The other fact is, that we don't need ranges anymore if the upper bound is below the position currently searched for. For the example input above that means if we are searching for _22_, then we don't need to include the first two ranges in our search. And because the mutation positions are sorted too, we can delete all passed recombination ranges since they are never going to be used again.

The resulting code is shown here (using Python 3):

[python]
import bisect, csv, time

INPUT_FILE = "daten.txt"
OUTPUT_POSITIVE = "positive.txt"
OUTPUT_NEGATIVE = "negative.txt"

rangeData = []
posData = []
matchingPositions = []
notMatchingPositions = []

def main():
    # parse csv columns to 2 arrays rangeData and posData
    print("reading %s..." % INPUT_FILE)
    start = time.clock()

    with open(INPUT_FILE, 'r') as f:
        next(f) # skip first line (titles: min, max, pos)
        for line in csv.reader(f, delimiter='\t'):
            try:
                rangeData.append((int(line[0]), int(line[1]))) # read ranges as tuples
            except:
                pass
            try:
                posData.append(int(line[2]))
            except:
                pass

    end = time.clock()
    print("> done (%.2gs)" % (end-start))

    # search in posData for values in range
    # because posData is sorted, we can search in O(n log(n))
    # by deleting already found entries, our search improves to O(n log(log(n)))
    print("match ranges...")
    start = time.clock()

    for r in rangeData:
        lbound = bisect.bisect_left(posData, r[0]) # search min bound
        ubound = bisect.bisect_left(posData, r[1]) # search max bound
        if (lbound < ubound):
            # save and delete posData which matches a range
            matchingPositions.extend(posData[lbound:ubound])
            del posData[lbound:ubound]
        else:
            # since we didn't find a value for the given range in posData and
            # because rangeData is sorted too, values smaller than ubound
            # aren't relevant anymore. Future search can be speed up by
            # deleting them.
            notMatchingPositions.extend(posData[0:ubound])
            del posData[0:ubound]

    # all remaining posData isn't in any range and should be saved
    notMatchingPositions.extend(posData)
    posData.clear() # for correctness' sake

    end = time.clock()
    print("> done (%.2gs)" % (end-start))

    # how much did match a range?
    print("> position data in some range: %d" % len(matchingPositions))
    print("> position data NOT in any range: %d" % len(notMatchingPositions))

    # lets write the thing to some file
    print("writing to %s and %s..." %(OUTPUT_POSITIVE, OUTPUT_NEGATIVE))
    start = time.clock()

    with open(OUTPUT_POSITIVE, 'w+') as f:
        f.writelines( "%s\n" % item for item in matchingPositions )
    with open(OUTPUT_NEGATIVE, 'w+') as f:
        f.writelines( "%s\n" % item for item in notMatchingPositions )

    end = time.clock()
    print("> done (%.2gs)" % (end-start))

if __name__ == '__main__':
    main()
[/python]
