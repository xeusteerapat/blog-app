import { gql } from 'apollo-server';

const typeDefs = gql`
  type User {
    id: ID!
    username: String!
    email: String!
    password: String!
    token: String!
    posts: [Post!]!
    comments: [Comment!]!
  }

  type Post {
    id: ID!
    title: String!
    body: String!
    author: User!
    comments: [Comment!]!
  }

  type Comment {
    id: ID!
    comment: String!
    post: Post!
    author: User!
  }

  type Query {
    hello: String!
    posts: [Post]!
    post(postId: ID!): Post
    users: [User]!
    user(userId: ID!): User!
    comments: [Comment]!
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
    updatePost(postId: ID!, data: PostInput!): Post!
    createComment(postId: ID!, comment: String!): Comment!
    deleteComment(postId: ID!, commentId: ID!): Comment!
  }
`;

export default typeDefs;
