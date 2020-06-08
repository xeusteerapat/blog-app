import { getRepository, createQueryBuilder } from 'typeorm';
import { Post } from '../../entity/Post';
import { Comment } from '../../entity/Comment';

const User = {
  posts: async (parent, args, context, info) => {
    const postRepository = getRepository(Post);
    const posts = await postRepository.find({
      relations: ['author', 'comments'],
    });

    const postsRelateToAuthor = posts.filter(
      post => post.author.id === parent.id
    );
    return postsRelateToAuthor;
  },
  comments: async (parent, args, context, info) => {
    const commentRepository = await getRepository(Comment);
    const comments = await commentRepository.find({
      relations: ['author', 'post'],
    });

    const commentsRelateToAuthor = comments.filter(
      comment => comment.author.id === parent.id
    );
    return commentsRelateToAuthor;
  },
};

export default User;
