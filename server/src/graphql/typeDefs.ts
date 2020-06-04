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
    title: String!
    body: String!
    author: User!
  }

  type Query {
    hello: String!
    posts: [Post]!
    post(postId: ID!): Post
  }

  input RegisterInput {
    username: String!
    password: String!
    confirmPassword: String!
    email: String!
  }

  input PostInput {
    title: String!
    body: String!
  }

  type Mutation {
    register(data: RegisterInput): User!
    login(username: String!, password: String!): User!
    createPost(data: PostInput!): Post!
    deletePost(postId: ID!): Post!
  }
`;

export default typeDefs;
