import { register, login, users } from './user';
import { createPost, updatePost, deletePost } from './post';
import { posts, post } from './post';

const resolvers = {
  Query: {
    hello: () => 'Hello Graphql hahahahaha',
    posts,
    post,
    users,
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
