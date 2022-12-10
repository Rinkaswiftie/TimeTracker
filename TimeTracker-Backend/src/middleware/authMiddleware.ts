import jwt from 'jsonwebtoken';
import { UnauthorizedRequest } from '../errors/unauthorized-request';
import { BadRequest } from '../errors/bad-request';

module.exports = (req: any, res: any, next: any) => {
  const token = req.headers['Authorization'];
  if (token) {
    jwt.verify(token.replace('Bearer ', ''), process.env.ACCESS_TOKEN_SECRET,
      (err: any, decoded: any) => {
        if (err) {
          if (err.message === 'jwt malformed') {
            return next(new BadRequest(err.message));
          } else {
            return next(new UnauthorizedRequest(err.message));
          }
        }
        // A valid jwt token has been provided
        if (decoded) {
          req.user = decoded.userId;
          return next();
        }
      });
  } else {
    return next(new UnauthorizedRequest('Auth token is not supplied'));
  }
  return next(new UnauthorizedRequest());
};
