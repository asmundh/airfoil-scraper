#!/bin/bash
cat links.txt | xargs -P4 wget -P download
