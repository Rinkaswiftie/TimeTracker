import jwt from 'jsonwebtoken';
import { StatusCodes } from 'http-status-codes';

import { User } from '../models/User';
import { UnauthorizedRequest } from '../errors/unauthorized-request';

const generateAccessToken = (user: any) => jwt.sign(
  {
    email: user.email,
    userId: user._id
  },
  process.env.ACCESS_TOKEN_SECRET,
  {
    expiresIn: process.env.JWT_TOKEN_EXPIRATION,
    issuer: process.env.TOKEN_ISSUER
  }
);

const generateRefreshToken = (user: any) => jwt.sign(
  {
    userId: user._id
  },
  process.env.REFRESH_TOKEN_SECRET,
  {
    expiresIn: process.env.REFRESH_TOKEN_EXPIRATION,
    issuer: process.env.TOKEN_ISSUER
  }
);

module.exports.registerUser = async (req: any, res: any, next: any) => {
  const {
    email,
    password,
    firstName,
    lastName
  } = req.body;
  const emailExists = await User.findOne({ email });
  if (emailExists) {
    return res.status(StatusCodes.BAD_REQUEST)
      .json({ validation: 'Email already registered' });
  }
  const user = new User({
    email,
    firstName,
    lastName
  });
  user.password = user.encryptPassword(password);
  await user.save();
  const refreshToken = generateRefreshToken(User);
  return res.status(StatusCodes.CREATED)
    .json({
      refreshToken
    });
};

module.exports.loginUser = async (req: any, res: any, next: any) => {
  const {
    email = undefined,
    password = undefined
  } = req.body;

  const user = await User.findOne({ email });

  if (!user) {
    return res.status(StatusCodes.BAD_REQUEST)
      .json({ validation: 'Email has not been registered' });
  }
  if (!user.validPassword(password)) {
    return res.status(StatusCodes.BAD_REQUEST)
      .json({ validation: 'Incorrect password' });
  }
  const refreshToken = generateRefreshToken(User);
  return res.status(StatusCodes.CREATED)
    .json({
      refreshToken
    });
};

module.exports.refreshToken = async (req: any, res: any, next: any) => {
  const refreshToken = req.body;

  jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, async (err: any, decoded: any) => {
    if (err) {
      return next(new UnauthorizedRequest(err.message));
    }
    const user = await User.findById(decoded.payload.userId);
    if (user) {
      const accessToken = generateAccessToken(user);
      const userData = user.generateResponseModel();
      return res.status(StatusCodes.ACCEPTED)
        .json({
          accessToken,
          userData
        });
    }
    return next(new UnauthorizedRequest('Authentication failed'));
  });
};
