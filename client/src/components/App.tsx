import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';

interface Post {
  id: string;
  title: string;
  body: string;
}

interface User {
  id: string;
  username: string;
  posts: Post[];
}

const GET_USERS = gql`
  query {
    users {
      id
      username
      posts {
        id
        title
        body
      }
    }
  }
`;

const App = () => {
  const { loading, data } = useQuery(GET_USERS);

  if (loading) {
    return <h1>Loading...</h1>;
  }

  const { users } = data;
  return (
    <div className='App'>
      <ul>
        {users.map((user: User) => (
          <li key={user.id}>{user.username}</li>
        ))}
      </ul>
    </div>
  );
};

export default App;
