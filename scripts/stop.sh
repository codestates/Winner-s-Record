#!/bin/bash
cd /home/ubuntu/Winner-s-Record/server
export INSTOP=instop
pm2 stop app 2> /dev/null || true
pm2 delete app 2> /dev/null || true
