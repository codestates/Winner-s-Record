#!/bin/bash
cd /home/ubuntu/Winner-s-Record/server

export INSTART=instart

authbind --deep pm2 start app.js