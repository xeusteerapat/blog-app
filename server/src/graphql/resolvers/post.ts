import { getRepository } from 'typeorm';
import { User } from '../../entity/User';
import { Comment } from '../../entity/Comment';

const Post = {
  author: async (parent, args, context, info) => {
    const userRepository = await getRepository(User);
    const users = await userRepository.find({
      relations: ['posts'],
    });

    const authorToPost = users.find(user => user.id === parent.author.id);
    return authorToPost;
  },
  comments: async (parent, args, context, info) => {
    const commentRepository = await getRepository(Comment);
    const comments = await commentRepository.find({
      relations: ['post'],
    });

    const commentToPost = comments.filter(
      comment => comment.post.id === parent.id
    );
    return commentToPost;
  },
};

export default Post;
