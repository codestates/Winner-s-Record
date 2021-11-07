#!/bin/bash
cd /home/ubuntu/Winner-s-Record/server

export ACCESS_SECRET=$(aws ssm get-parameters --region ap-northeast-2 --names ACCESS_SECRET --query Parameters[0].Value | sed 's/"//g')
export BCRYPT_SALT_ROUNDS=$(aws ssm get-parameters --region ap-northeast-2 --names BCRYPT_SALT_ROUNDS --query Parameters[0].Value | sed 's/"//g')
export DATABASE_HOST=$(aws ssm get-parameters --region ap-northeast-2 --names DATABASE_HOST --query Parameters[0].Value | sed 's/"//g')
export DATABASE_USER=$(aws ssm get-parameters --region ap-northeast-2 --names DATABASE_USER --query Parameters[0].Value | sed 's/"//g')
export HOST_PORT=$(aws ssm get-parameters --region ap-northeast-2 --names HOST_PORT --query Parameters[0].Value | sed 's/"//g')
export KAKAO_CLIENT_ID=$(aws ssm get-parameters --region ap-northeast-2 --names KAKAO_CLIENT_ID --query Parameters[0].Value | sed 's/"//g')
export KAKAO_CLIENT_SECRET=$(aws ssm get-parameters --region ap-northeast-2 --names KAKAO_CLIENT_SECRET --query Parameters[0].Value | sed 's/"//g')
export KAKAO_REDIRECTURI=$(aws ssm get-parameters --region ap-northeast-2 --names KAKAO_REDIRECTURI --query Parameters[0].Value | sed 's/"//g')
export SOCKET_PORT=$(aws ssm get-parameters --region ap-northeast-2 --names SOCKET_PORT --query Parameters[0].Value | sed 's/"//g')
export TOKEN_EXPIRES_SEC=$(aws ssm get-parameters --region ap-northeast-2 --names TOKEN_EXPIRES_SEC --query Parameters[0].Value | sed 's/"//g')

authbind --deep pm2 start app.js