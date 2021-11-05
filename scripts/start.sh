#!/bin/bash
cd /home/ubuntu/Winner-s-Record/server
pm2 start app.js
sleep 10s && pm2 status
pm2 kill
pm2 start app.js
