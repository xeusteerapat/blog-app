import { ApolloServer } from 'apollo-server';
import { createConnection } from 'typeorm';
import typeDefs from './graphql/schema';
import Query from './graphql/resolvers/query';
import Mutation from './graphql/resolvers/mutation';
import User from './graphql/resolvers/user';
import Post from './graphql/resolvers/post';
import Comment from './graphql/resolvers/comment';

const server = new ApolloServer({
  typeDefs,
  resolvers: {
    Query,
    Mutation,
    User,
    Post,
    Comment,
  },
  context: ({ req }) => ({ req }),
  playground: true,
  introspection: true,
});

createConnection()
  .then(() => {
    server
      .listen({ port: 5500 })
      .then(res => console.log(`🚀 Server is running on port ${res.url} 🚀`));
  })
  .catch(err => {
    console.log(err);
  });
