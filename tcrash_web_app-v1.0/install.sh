#!/bin/bash

function progerssinfo(){
echo "-------------------------------------------"
echo " Installing nodes js, Please wait"
echo "-------------------------------------------"
}

function checkVersion(){

echo "-------------------------------------------"
echo -n "$1 version :"
$1 --version
echo "-------------------------------------------"

}

sudo apt-get install nodejs
progerssinfo nodejs
checkVersion nodejs

sudo apt-get install npm

progerssinfo npm
checkVersion npm

sudo npm install -g forever

progerssinfo forever
checkVersion forever

sudo ln -s /usr/bin/nodejs /usr/bin/node  

