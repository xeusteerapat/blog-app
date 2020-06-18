import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { Navbar } from '../styles/styles';

import { AuthContext } from '../../context/auth';

const Header = () => {
  const { user, logout } = useContext(AuthContext);

  return (
    <Navbar>
      <ul>
        <li>
          <Link to='/'>Home</Link>
        </li>
        <li>
          <Link to='/create'>Write post</Link>
        </li>
        <li>
          <Link to='/about'>About Us</Link>
        </li>
        <li>
          Posts <i className='fas fa-angle-down'></i>
          <ul>
            <li>
              <Link to='/posts'>All Posts</Link>
            </li>
            <li>Recommended</li>
            <li>Archived</li>
          </ul>
        </li>
        {user.token ? (
          <>
            <li
              style={{
                float: 'right',
              }}
            >
              <Link to='/login'>{user.username}</Link>
            </li>
            <li
              style={{
                float: 'right',
              }}
              onClick={logout}
            >
              Logout
            </li>
          </>
        ) : (
          <>
            <li
              style={{
                float: 'right',
              }}
            >
              <Link to='/login'>Login</Link>
            </li>
            <li
              style={{
                float: 'right',
              }}
            >
              <Link to='/register'>Register</Link>
            </li>
          </>
        )}
      </ul>
    </Navbar>
  );
};

export default Header;
