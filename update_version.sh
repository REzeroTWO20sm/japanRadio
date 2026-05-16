#!/bin/bash
VER=$(date +%s)
sed -i "s|\?v=[0-9]*|?v=$VER|g" /root/japanRadio/index.html
echo "Updated to version $VER"
