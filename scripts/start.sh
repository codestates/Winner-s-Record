#!/bin/bash
cd /home/ubuntu/Winner-s-Record/server

export ISIN=$(aws ssm get-parameters --region ap-northeast-2 --names ISIN --query Parameters[0].Value | sed 's/"//g')
export A=a

authbind --deep pm2 start app.js
