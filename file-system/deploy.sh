#!/bin/sh

cp ./dirs.rb /var/cgi-bin/dirs.rb
mkdir -p /var/www/html/fs
cp ./index.html /var/www/html/fs/index.html
cp ./main.js /var/www/html/fs/main.js

cp -r ../tree /var/www/html