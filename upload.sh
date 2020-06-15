#!/usr/bin/env bash

PROJECT="test"
FILES="dist"
SERVER=118.190.135.96
TARGET="root@$SERVER:/usr/share/nginx/html/$PROJECT"
PASSWD=@Iphone1106

function copyfile
{
  expect -c "
    set timeout 90;
    spawn scp -r \"$1\" $2;
    expect {
      \"yes/no\" { send \"yes\r\" ;exp_contine; }
      \"*password:\" { send \"$PASSWD\r\"; }
    };
    expect eof;
  "
}

basedir=`cd $(dirname $0); pwd -P`
for file in $FILES
do
  copyfile "$basedir/$file" $TARGET
done
