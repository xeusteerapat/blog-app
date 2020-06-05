import { register, login } from './user';
import { createPost, updatePost, deletePost } from './post';
import { posts, post } from './post';

const resolvers = {
  Query: {
    hello: () => 'Hello Graphql hahahahaha',
    posts,
    post,
  },
  Mutation: {
    register,
    login,
    createPost,
    updatePost,
    deletePost,
  },
};

export default resolvers;
