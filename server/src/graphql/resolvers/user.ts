import { getRepository } from 'typeorm';
import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';
import { UserInputError } from 'apollo-server';
import { User } from './../../entity/User';
import { Post } from './../../entity/Post';
import { Comment } from './../../entity/Comment';
import {
  validateRegisterInput,
  validateLoginInput,
} from '../../utils/validator';

import * as dotenv from 'dotenv';
dotenv.config();

const SALT_ROUND = Number(process.env.BCRYPT_SALT_ROUND);

const generateToken = (user: User) => {
  return jwt.sign(
    {
      id: user.id,
      email: user.email,
      username: user.username,
    },
    process.env.SECRET_OR_KEY,
    { expiresIn: '1h' }
  );
};

export const register = async (
  parent,
  { data: { username, email, password, confirmPassword } },
  ctx,
  info
) => {
  const userRepository = getRepository(User);
  const existingEmail = await userRepository.findOne({ email });
  const existingUsername = await userRepository.findOne({ username });

  const { errors, valid } = validateRegisterInput(
    username,
    email,
    password,
    confirmPassword
  );

  if (!valid) {
    throw new UserInputError('Errors', { errors });
  }

  if (existingEmail) {
    throw new Error('Email already taken');
  } else if (existingUsername) {
    throw new Error('Username already taken');
  } else {
    const salt = await bcrypt.genSalt(SALT_ROUND);
    const hashPassword = await bcrypt.hash(password, salt);

    const user = await userRepository.create({
      username,
      password: hashPassword,
      email,
    });

    await userRepository.save(user);

    const token = generateToken(user);

    return { ...user, token };
  }
};

export const login = async (parent, { username, password }, ctx, info) => {
  const { errors, valid } = validateLoginInput(username, password);

  if (!valid) {
    throw new UserInputError('Errors', { errors });
  }

  const userRepository = getRepository(User);
  const user = await userRepository.findOne({ username });

  if (!user) {
    throw new UserInputError('Username or password incorrect', { errors });
  } else {
    const isSuccess = await bcrypt.compare(password, user.password);

    if (isSuccess) {
      const token = generateToken(user);
      const payload = {
        id: user.id,
        username: user.username,
        token,
      };
      return payload;
    } else {
      throw new UserInputError('Username or password incorrect', { errors });
    }
  }
};

export const users = async (parent, args, ctx, info) => {
  const userRepository = getRepository(User);
  const users = await userRepository.find({ relations: ['posts', 'comments'] });
  return users;
};

export const user = async (parent, { userId }, ctx, info) => {
  const userRepository = getRepository(User);

  const user = await userRepository.findOne({
    where: { id: userId },
    relations: ['posts'],
  });

  return user;
};
