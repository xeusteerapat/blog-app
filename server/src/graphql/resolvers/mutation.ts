import { getRepository } from 'typeorm';
import * as bcrypt from 'bcryptjs';
import { UserInputError } from 'apollo-server';
import {
  validateRegisterInput,
  validateLoginInput,
} from './../../utils/validator';
import { User } from './../../entity/User';
import { Post } from './../../entity/Post';
import { generateToken } from './../../utils/generateToken';
import * as dotenv from 'dotenv';
import auth from '../../utils/auth';
dotenv.config();

const SALT_ROUND = Number(process.env.BCRYPT_SALT_ROUND);

const Mutation = {
  register: async (
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
  },
  login: async (parent, { username, password }, ctx, info) => {
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
  },
  createPost: async (parent, { data: { title, body } }, ctx, info) => {
    // Checl authorization fromn auth
    const user = auth(ctx);

    const postRepository = getRepository(Post);
    const userRepository = getRepository(User);

    const author = await userRepository.findOne({
      username: user.username,
    });

    const newPost = await postRepository.create({
      title,
      body,
      author,
    });

    await postRepository.save(newPost);

    return newPost;
  },
  deletePost: async (parent, { postId }, ctx, info) => {
    const user = auth(ctx);
    const postRepository = getRepository(Post);

    const post = await postRepository.findOne({
      where: { id: postId },
      relations: ['author'],
    });

    const postToDelete = { ...post };

    if (user.id !== post.author.id) {
      throw new Error('Action not allowed');
    } else {
      await postRepository.remove(post);

      return postToDelete;
    }
  },
  updatePost: async (parent, { postId, data: { title, body } }, ctx, info) => {
    const user = auth(ctx);
    const postRepository = getRepository(Post);

    const post = await postRepository.findOne({
      where: { id: postId },
      relations: ['author'],
    });

    if (user.id !== post.author.id) {
      throw new Error('Action not allowed');
    } else {
      await postRepository.update({ id: postId }, { title, body });
      const updatedPost = await postRepository.findOne({
        where: { id: postId },
        relations: ['author', 'comments'],
      });

      return updatedPost;
    }
  },
};

export default Mutation;
