
import bcrypt from 'bcrypt';
import crypto from 'crypto';
import createHttpError from 'http-errors';
import User from '../db/models/User.js';
import Session from '../db/models/Session.js';

const ACCESS_TOKEN_TTL = 15 * 60 * 1000;
const REFRESH_TOKEN_TTL = 30 * 24 * 60 * 60 * 1000;

export const register = async ({ name, email, password }) => {
  const userExists = await User.findOne({ email });
  if (userExists) {
    throw createHttpError(409, 'Email in use');
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await User.create({
    name,
    email,
    password: hashedPassword,
  });

  return {
    _id: user._id,
    name: user.name,
    email: user.email,
  };
};

export const login = async ({ email, password }) => {
  const user = await User.findOne({ email });
  if (!user) throw createHttpError(401);

  const isValid = await bcrypt.compare(password, user.password);
  if (!isValid) throw createHttpError(401);

  await Session.deleteMany({ userId: user._id });

  const accessToken = crypto.randomUUID();
  const refreshToken = crypto.randomUUID();

  await Session.create({
    userId: user._id,
    accessToken,
    refreshToken,
    accessTokenValidUntil: new Date(Date.now() + ACCESS_TOKEN_TTL),
    refreshTokenValidUntil: new Date(Date.now() + REFRESH_TOKEN_TTL),
  });

  return { accessToken, refreshToken };
};

export const refresh = async (refreshToken) => {
  const session = await Session.findOne({ refreshToken });
  if (!session) throw createHttpError(401);

  if (session.refreshTokenValidUntil < Date.now()) {
    throw createHttpError(401);
  }

  await Session.deleteOne({ _id: session._id });

  const accessToken = crypto.randomUUID();
  const newRefreshToken = crypto.randomUUID();

  await Session.create({
    userId: session.userId,
    accessToken,
    refreshToken: newRefreshToken,
    accessTokenValidUntil: new Date(Date.now() + ACCESS_TOKEN_TTL),
    refreshTokenValidUntil: new Date(Date.now() + REFRESH_TOKEN_TTL),
  });

  return accessToken;
};

export const logout = async (refreshToken) => {
  await Session.deleteOne({ refreshToken });
};
