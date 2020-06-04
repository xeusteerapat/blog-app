import { ApolloServer, gql } from 'apollo-server';
import { createConnection } from 'typeorm';

const typeDefs = gql`
  type Query {
    hello: String!
  }
`;

const resolvers = {
  Query: {
    hello: () => 'Hello Graphql hahahahaha',
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

createConnection().then(() => {
  server
    .listen({ port: 5500 })
    .then(res => console.log(`🚀 Server is running on port ${res.url} 🚀`));
});
