const Comment = {
  author: async (parent, args, context, info) => {
    return parent.author;
  },
  post: async (parent, args, context, info) => {
    return parent.post;
  },
};

export default Comment;
