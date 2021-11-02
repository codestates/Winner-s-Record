#!/bin/bash
cd /home/ubuntu/Winner-s-Record/server

export ISIN=aaaaa

authbind --deep pm2 start app.js