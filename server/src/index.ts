import { ApolloServer } from 'apollo-server';
import { createConnection, getManager } from 'typeorm';
import typeDefs from './graphql/typeDefs';
import Query from './graphql/resolvers/query';
import Mutation from './graphql/resolvers/mutation';
import User from './graphql/resolvers/user';
import Post from './graphql/resolvers/post';

const server = new ApolloServer({
  typeDefs,
  resolvers: {
    Query,
    Mutation,
    User,
    Post,
  },
  context: ({ req }) => ({ req }),
});

createConnection().then(() => {
  server
    .listen({ port: 5500 })
    .then(res => console.log(`🚀 Server is running on port ${res.url} 🚀`));
});
