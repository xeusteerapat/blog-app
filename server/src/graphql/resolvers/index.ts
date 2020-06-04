import { register, login } from './user';
import { posts } from './post';

const resolvers = {
  Query: {
    hello: () => 'Hello Graphql hahahahaha',
    posts,
  },
  Mutation: {
    register,
    login,
  },
};

export default resolvers;
