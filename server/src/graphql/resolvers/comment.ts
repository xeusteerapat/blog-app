import { getRepository } from 'typeorm';
import { User } from '../../entity/User';
import { Post } from '../../entity/Post';

const Comment = {
  author: async (parent, args, context, info) => {
    const userRepository = await getRepository(User);
    const users = await userRepository.find({
      relations: ['comments'],
    });

    console.log('Parent', parent);
    // console.log('User form DB', users);

    const commentToAuthor = users.find(user => user.id === parent.author.id);
    return commentToAuthor;
  },
  post: async (parent, args, context, info) => {
    const postRepository = await getRepository(Post);
    const posts = await postRepository.find({
      relations: ['comments'],
    });

    const postToComment = posts.find(post => post.id === parent.post.id);
    return postToComment;
  },
};

export default Comment;
