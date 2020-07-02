import React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import { PostContainer, Content } from '../styles/styles';
import Spinner from '../misc/Spinner';

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
  query post($postId: ID!) {
    post(postId: $postId) {
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

type TParams = { id: string };

const Post = ({ match }: RouteComponentProps<TParams>) => {
  const postId = match.params.id;
  const { data, loading } = useQuery(POST_QUERY, { variables: { postId } });

  if (loading) return <Spinner />;

  const { post } = data;

  return (
    <>
      <h1>{post.title}</h1>
      by {post.author.username}
      <PostContainer>
        <Content>{post.body}</Content>
      </PostContainer>
    </>
  );
};

export default Post;
