#!/bin/bash

USERCMD="/home/ajinath/usercmd/cmd"
RIMOCMD="/home/ajinath/0001-old-home/ajinath/usercmd/cmd/projRimoFlasher"
USERCMD="${USERCMD}:/home/ajinath/0001-old-home/ajinath/work/gdb-debugger/Crash-utility/crash-7.1.9"
NDK="/home/ajinath/0001-old-home/ajinath/work/tools/android-ndk-r13/prebuilt/linux-x86_64/bin"
ANDROID_SDK_TOOL="/home/ajinath/0001-old-home/ajinath/android-sdk-linux/platform-tools"
ANDROID_SDK_TOOL1="/home/ajinath/0001-old-home/ajinath/android-sdk-linux/tools"
ANDROID_SDK_TOOL_BUILD_TOOL="/home/ajinath/0001-old-home/ajinath/android-sdk-linux/build-tools/25.0.1"

export PATH=$PATH:$USERCMD:$ANDROID_SDK_TOOL:$RIMOCMD:$ANDROID_SDK_TOOL_BUILD_TOOL:$ANDROID_SDK_TOOL1:$NDK
export TERM="xterm-256color"

cd tcrash-utility
source build/envsetup.sh

<<comment
echo "-------------------------------------"
echo " Arguments :"
echo "$1"
echo "$2"
echo "$3"
echo "$4"
echo "$5"
echo "$6"
echo "-------------------------------------"
comment

if [ ! -z "$3" ] ; then
echo "==================== $3 =============================="
echo
      ndk-stack  -sym $1/$3  -dump $2

echo
fi



if [ ! -z "$4" ] ; then
echo "==================== $4 =============================="
echo
	ndk-stack  -sym $1/$4  -dump $2

echo
fi

if [ ! -z "$5" ] ; then
echo "==================== $5 =============================="
echo
      ndk-stack  -sym $1/$5  -dump $2

echo
fi

if [ ! -z "$6" ] ; then
echo "==================== $6 =============================="
echo
      ndk-stack  -sym $1/$6  -dump $2

echo
fi


