import { register } from './user';
import { posts } from './post';

const resolvers = {
  Query: {
    hello: () => 'Hello Graphql hahahahaha',
    posts,
  },
  Mutation: {
    register,
  },
};

export default resolvers;
