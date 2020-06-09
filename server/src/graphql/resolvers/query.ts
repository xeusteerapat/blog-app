import { Post } from './../../entity/Post';
import { User } from './../../entity/User';
import { Comment } from './../../entity/Comment';
import { getRepository } from 'typeorm';

const Query = {
  users: async (parent, args, ctx, info) => {
    const userRepository = getRepository(User);
    const users = await userRepository.find({
      relations: ['posts', 'comments'],
    });

    return users;
  },
  user: async (parent, { userId }, ctx, info) => {
    const userRepository = getRepository(User);

    const user = await userRepository.findOne({
      where: { id: userId },
      relations: ['posts'],
    });

    return user;
  },
  posts: async (parent, args, ctx, info) => {
    const postRepository = getRepository(Post);
    const posts = await postRepository.find({
      relations: ['author', 'comments'],
    });

    return posts;
  },
  post: async (parent, { postId }, ctx, info) => {
    const postRepository = getRepository(Post);
    const post = await postRepository.findOne({
      where: {
        id: postId,
      },
      relations: ['author', 'comments'],
    });

    if (!post) {
      throw new Error('Post not found');
    }
    return post;
  },
  comments: async (parent, agrs, ctx, info) => {
    const commentRepository = await getRepository(Comment);
    const comments = await commentRepository.find({
      relations: ['author', 'post'],
    });

    // console.log(comments);

    return comments;
  },
};

export default Query;
