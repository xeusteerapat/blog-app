import { getRepository } from 'typeorm';
import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';
import { User } from './../../entity/User';

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
