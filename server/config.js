import dotenv from 'dotenv';
dotenv.config();

export const config = {
  jwt: {
    secretKey: process.env.ACCESS_SECRET,
    expiresInSec: process.env.TOKEN_EXPIRES_SEC,
  },
  bcrypt: {
    saltRounds: process.env.BCRYPT_SALT_ROUNDS,
  },
  host: {
    port: process.env.HOST_PORT,
  },
  kakao: {
    clientId: process.env.KAKAO_CLIENT_ID,
    clientSecret: process.env.KAKAO_CLIENT_SECRET,
    redirectUrl: process.env.KAKAO_REDIRECTURI,
  },
  db: {
    dbUser: process.env.DATABASE_USER,
    dbPassword: process.env.DATABASE_PASSWORD,
    dbHost: process.env.DATABASE_HOST,
    dbPort: process.env.DATABASE_PORT,
  },
};
