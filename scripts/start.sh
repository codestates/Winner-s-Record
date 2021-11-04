#!/bin/bash
cd /home/ubuntu/Winner-s-Record/server

export ISIN=$(aws ssm get-parameters --region ap-northeast-2 --names ISIN --query Parameters[0].Value | sed 's/"//g')
export A=a

pm2 status
authbind --deep pm2 start app.js
sleep 10s && pm2 status
sleep 10s && pm2 status
