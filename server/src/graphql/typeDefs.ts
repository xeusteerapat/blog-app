import { gql } from 'apollo-server';

const typeDefs = gql`
  type User {
    id: ID!
    username: String!
    email: String!
    password: String!
    token: String!
  }

  type Post {
    id: ID!
    body: String!
  }

  type Query {
    hello: String!
    posts: [Post]!
  }

  input RegisterInput {
    username: String!
    password: String!
    confirmPassword: String!
    email: String!
  }

  type Mutation {
    register(data: RegisterInput): User!
  }
`;

export default typeDefs;
