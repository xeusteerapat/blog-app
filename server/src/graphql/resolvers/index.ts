import { register, login, users, user } from './user';
import { createPost, updatePost, deletePost } from './post';
import { posts, post } from './post';

const resolvers = {
  Query: {
    hello: () => 'Hello Graphql hahahahaha',
    posts,
    post,
    users,
    user,
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
