import jwt from 'jsonwebtoken';
import * as userData from '../data/auth.js';
import {config} from '../config.js';

export const createToken = (userData) => {
  return jwt.sign(userData, String(config.jwt.secretKey), {
    expiresIn: Number(config.jwt.expiresInSec),
  });
};

export const jwtValidator = async (req, res, next) => {
  const authorization = req.headers.authorization;
  if (!(authorization && authorization.startsWith('Bearer '))) {
    return res.status(403).json({message: '권한이 없습니다'});
  }

  const token = authorization.split(' ')[1];
  jwt.verify(token, String(config.jwt.secretKey), async (error, data) => {
    if (error) {
      return res.status(403).json({message: '권한이 없습니다'});
    }
    const user = await userData.findById(data.id);
    if (!user) {
      return res.status(403).json({message: '권한이 없습니다'});
    }

    req.userId = user.id;
    next();
  });
};
