#!/bin/bash

#FilePath=$(echo ${1#*/})
FilePath=$1
line=$(cat $FilePath | grep fingerprint)
line1=$(echo ${line#*DEBUG})
line2=$(echo ${line1#*:})
echo -n $line2

