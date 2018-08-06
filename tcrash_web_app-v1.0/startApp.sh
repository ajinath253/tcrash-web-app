
filename=$(date +%s)
errorFile="logs/errorlogs_${filename}.txt"
PORT=9292 forever start bin/www -e ${errorFile}
