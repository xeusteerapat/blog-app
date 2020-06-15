import React from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import { PostContainer, CardContainer } from '../styles/styles';

interface User {
  id: string;
  username: string;
}

interface Post {
  id: string;
  title: string;
  body: string;
  author: User;
}

const POST_QUERY = gql`
  query {
    posts {
      id
      title
      body
      author {
        id
        username
      }
    }
  }
`;

const Posts = () => {
  const { data, loading } = useQuery(POST_QUERY);

  if (loading) {
    return <h1>Loading</h1>;
  }

  const { posts } = data;

  return (
    <>
      <h1 style={{ textAlign: 'center' }}>All Posts</h1>
      <PostContainer>
        {posts.map((post: Post) => (
          <CardContainer key={post.id}>
            <Link to={`/post/${post.id}`}>
              <h2>{post.title}</h2>
              {post.body}
            </Link>
            <br />
            by
            <br />
            {post.author.username}
          </CardContainer>
        ))}
      </PostContainer>
    </>
  );
};

export default Posts;
