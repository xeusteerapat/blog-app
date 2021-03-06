import express from 'express';
import cors from 'cors';
import { ApolloServer } from 'apollo-server-express';
import { createConnection } from 'typeorm';
import typeDefs from './graphql/schemas/schema';
import Query from './graphql/resolvers/query';
import Mutation from './graphql/resolvers/mutation';
import User from './graphql/resolvers/user';
import Post from './graphql/resolvers/post';
import Comment from './graphql/resolvers/comment';

const app = express();
app.use(cors());

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
});

server.applyMiddleware({ app });

createConnection()
  .then(() => {
    app.listen(5500, () => {
      console.log(`Server is listening on port 5500 🚀`);
    });
  })
  .catch(err => {
    console.log(err);
  });
