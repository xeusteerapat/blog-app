import { register, login, users, user } from './user';
import { createPost, updatePost, deletePost } from './post';
import { posts, post } from './post';
import { comments, createComment } from './comment';

const resolvers = {
  Query: {
    hello: () => 'Hello Graphql hahahahaha',
    posts,
    post,
    users,
    user,
    comments,
  },
  Mutation: {
    register,
    login,
    createPost,
    updatePost,
    deletePost,
    createComment,
  },
};

export default resolvers;
