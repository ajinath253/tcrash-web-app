#!/bin/bash

if [[ ./validate $1 ]] ; then
echo " in if"
else
echo "in else"
fi
