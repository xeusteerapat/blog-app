import { getRepository } from 'typeorm';
import { Post } from './../../entity/Post';
import { User } from './../../entity/User';
import auth from '../../utils/auth';

export const posts = async () => {
  const postRepository = getRepository(Post);
  const posts = await postRepository.find({ relations: ['author'] });
  return posts;
};

export const post = async (parent, { postId }, ctx, info) => {
  const postRepository = getRepository(Post);
  const post = await postRepository.findOne({
    where: {
      id: postId,
    },
    relations: ['author'],
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

  const newPost = await postRepository.create({
    title,
    body,
    author,
  });

  await postRepository.save(newPost);

  return newPost;
};

export const deletePost = async (parent, { postId }, ctx, info) => {
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
};

export const updatePost = async (
  parent,
  { postId, data: { title, body } },
  ctx,
  info
) => {
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
      relations: ['author'],
    });

    return updatedPost;
  }
};
