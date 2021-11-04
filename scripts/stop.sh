#!/bin/bash
cd /home/ubuntu/Winner-s-Record/server
export INSTOP=instop
pm2 status
pm2 stop app 
pm2 delete app 
pm2 status
