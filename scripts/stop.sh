#!/bin/bash
cd /home/ubuntu/Winner-s-Record/server
export INSTOP=instop
pm2 stop app.js 2> /dev/null || true
pm2 delete app.js 2> /dev/null || true