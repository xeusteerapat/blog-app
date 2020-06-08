import { getRepository } from 'typeorm';
import { User } from './../../entity/User';
import { Comment } from './../../entity/Comment';

const Post = {
  // author: async (parent, args, context, info) => {
  //   const userRepository = await getRepository(User);
  //   const authors = await userRepository.find({
  //     relations: ['posts', 'comments'],
  //   });
  //   const authorToPost = authors.filter(
  //     author => author.id === parent.author.id
  //   );
  //   return authorToPost;
  // },
};

export default Post;
