import { getRepository } from 'typeorm';
import { UserInputError } from 'apollo-server';
import { Post } from './../../entity/Post';
import { Comment } from './../../entity/Comment';
import auth from '../../utils/auth';

export const createComment = async (parent, { postId, comment }, ctx, info) => {
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
};

export const comments = async (parent, agrs, ctx, info) => {
  const commentRepository = await getRepository(Comment)
    .createQueryBuilder('comment')
    .leftJoinAndSelect('post.comments', 'postId')
    .where('post.id = :postId');

  return commentRepository;
};
