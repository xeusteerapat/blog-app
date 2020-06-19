import React from 'react';

const CreatePost = () => {
  const accessToken = localStorage.getItem('accessToken');

  if (!accessToken) {
    return (
      <div>
        <h1>Please Login</h1>
      </div>
    );
  }

  return (
    <div>
      <h1>Create your post</h1>
    </div>
  );
};

export default CreatePost;
