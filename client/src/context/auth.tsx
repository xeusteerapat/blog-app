import React, { createContext, useReducer } from 'react';

interface Userdata {
  id: string;
  username: string;
  token: string;
}

const user = {
  id: '',
  username: '',
  token: '',
};

// Discriminated Unions types
type Action =
  | {
      type: 'LOGIN';
      payload: Userdata;
    }
  | {
      type: 'LOGOUT';
      payload: Userdata | null;
    };

const AuthContext = createContext({
  user,
  login: (data: Userdata) => {},
  logout: () => {},
});

const authReducer = (state: Userdata, action: Action) => {
  switch (action.type) {
    case 'LOGIN':
      return {
        ...state,
        id: action.payload.id,
        username: action.payload.username,
        token: action.payload.token,
      };
    case 'LOGOUT':
      return {
        ...state,
        id: '',
        username: '',
        token: '',
      };
    default:
      return state;
  }
};

const AuthProvider = (props: any) => {
  const [state, dispatch] = useReducer(authReducer, user);

  const login = (data: Userdata) => {
    localStorage.setItem('accessToken', data.token);
    dispatch({
      type: 'LOGIN',
      payload: data,
    });
  };

  const logout = () => {
    localStorage.removeItem('accessToken');
    dispatch({
      type: 'LOGOUT',
      payload: null,
    });
  };

  return (
    <AuthContext.Provider
      value={{
        user: state,
        login,
        logout,
      }}
      {...props}
    />
  );
};

export { AuthContext, AuthProvider };
