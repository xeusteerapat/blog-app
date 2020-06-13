import { getRepository } from 'typeorm';
import * as bcrypt from 'bcryptjs';
import { UserInputError } from 'apollo-server';
import {
  validateRegisterInput,
  validateLoginInput,
} from './../../utils/validator';
import { User } from './../../entity/User';
import { Post } from './../../entity/Post';
import { Comment } from './../../entity/Comment';
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

    if (title.trim() === '') {
      throw new Error('Post title cannot be empty');
    }
    if (body.trim() === '') {
      throw new Error('Post body cannot be empty');
    }

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

    if (!post) {
      throw new Error('Post not found');
    }

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

    if (!post) {
      throw new Error('Post not found');
    }

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
  createComment: async (parent, { postId, comment }, ctx, info) => {
    const user = auth(ctx);

    if (comment.trim() === '') {
      throw new UserInputError('Empty comment', {
        errors: {
          comment: 'Comment cannot be empty',
        },
      });
    }

    const postRepository = await getRepository(Post);
    const post = await postRepository.findOne({ id: postId });

    const commentRepository = await getRepository(Comment);
    const newComment = await commentRepository.create({
      comment,
      post,
      author: user,
    });

    await commentRepository.save(newComment);

    return newComment;
  },
  updateComment: async (parent, { postId, commentId, comment }, ctx, info) => {
    const user = auth(ctx);
    const postRepository = getRepository(Post);
    const commentRepository = getRepository(Comment);

    const post = await postRepository.findOne({
      where: { id: postId },
      relations: ['author', 'comments'],
    });

    if (!post) {
      throw new Error('Post not found');
    }

    const targetComment = await commentRepository.findOne({
      where: { id: commentId },
      relations: ['author', 'post'],
    });

    if (!targetComment) {
      throw new Error('Comment not found');
    }

    if (user.id !== targetComment.author.id) {
      throw new Error('Action not allowed');
    } else {
      await commentRepository.update(
        { id: commentId },
        { comment, post, author: user }
      );
      const updatedComment = await commentRepository.findOne({
        where: { id: commentId },
        relations: ['author', 'post'],
      });

      return updatedComment;
    }
  },
  deleteComment: async (parent, { commentId }, ctx, info) => {
    const user = auth(ctx);
    const commentRepository = getRepository(Comment);
    const comment = await commentRepository.findOne({
      where: { id: commentId },
      relations: ['author', 'post'],
    });

    if (!comment) {
      throw new Error('Comment not found');
    }

    const targetComment = { ...comment };

    if (user.id !== comment.author.id) {
      throw new Error('Action not allowed');
    } else {
      await commentRepository.remove(comment);

      return targetComment;
    }
  },
};

export default Mutation;
