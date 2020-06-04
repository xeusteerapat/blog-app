import { register, login } from './user';
import { createPost } from './post';
import { posts } from './post';

const resolvers = {
  Query: {
    hello: () => 'Hello Graphql hahahahaha',
    posts,
  },
  Mutation: {
    register,
    login,
    createPost,
  },
};

export default resolvers;
