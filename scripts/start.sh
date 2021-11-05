#!/bin/bash
cd /home/ubuntu/Winner-s-Record/server
authbind --deep pm2 start app.js
sleep 10s && pm2 status
