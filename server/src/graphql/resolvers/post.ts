const Post = {
  author: async (parent, args, context, info) => {
    return parent.author;
  },
  comments: async (parent, args, context, info) => {
    return parent.comments;
  },
};

export default Post;
