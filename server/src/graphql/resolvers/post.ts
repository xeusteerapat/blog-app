import { getRepository } from 'typeorm';
import { Post } from './../../entity/Post';
import { User } from './../../entity/User';
import auth from '../../utils/auth';

export const posts = async () => {
  const postRepository = getRepository(Post);
  const posts = await postRepository.find();
  return posts;
};

export const post = async (parent, { postId }, ctx, info) => {
  const postRepository = getRepository(Post);
  const post = await postRepository.findOne({
    id: postId,
  });

  if (!post) {
    throw new Error('Post not found');
  }
  return post;
};

export const createPost = async (
  parent,
  { data: { title, body } },
  ctx,
  info
) => {
  // Checl authorization fromn auth
  const user = auth(ctx);

  const postRepository = getRepository(Post);
  const userRepository = getRepository(User);

  const author = await userRepository.findOne({
    username: user.username,
  });

  console.log('author', author);
  const newPost = await postRepository.create({
    title,
    body,
    author,
  });

  await postRepository.save(newPost);

  return newPost;
};
