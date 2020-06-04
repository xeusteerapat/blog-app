import { ApolloServer } from 'apollo-server';
import { createConnection } from 'typeorm';
import typeDefs from './graphql/typeDefs';
import resolvers from './graphql/resolvers';

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

createConnection().then(() => {
  server
    .listen({ port: 5500 })
    .then(res => console.log(`🚀 Server is running on port ${res.url} 🚀`));
});
