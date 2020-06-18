import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { useMutation } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import {
  StyledFormWrapper,
  StyledForm,
  StyledInput,
  StyledButton,
  StyledInputWrapper,
  ValidateError,
  ErrorBox,
} from '../styles/styles';
import Spinner from '../misc/Spinner';

import { AuthContext } from '../../context/auth';

type FormData = {
  username: string;
  password: string;
};

const LOGIN = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      id
      username
      token
    }
  }
`;

const Login = (props: any) => {
  const authContext = useContext(AuthContext);
  const { register: loginUser, setValue, handleSubmit, errors } = useForm<
    FormData
  >();

  const [login, { loading, error }] = useMutation(LOGIN, {
    update: (_, result) => {
      authContext.login(result.data.login);
      props.history.push('/');
    },
    onError: () => null,
  });

  const onSubmit = handleSubmit(({ username, password }) => {
    login({ variables: { username, password } });
    setValue('username', '');
    setValue('password', '');
  });

  if (loading) return <Spinner />;

  return (
    <>
      {error && (
        <>
          {error.graphQLErrors.map(({ message }, i) => (
            <ErrorBox key={i}>{message}</ErrorBox>
          ))}
        </>
      )}
      <StyledFormWrapper>
        <StyledForm onSubmit={onSubmit}>
          <h2>Login</h2>
          <StyledInputWrapper>
            <label htmlFor='username'>Username</label>
            <StyledInput
              type='text'
              name='username'
              ref={loginUser({
                required: true,
              })}
            />
            <ValidateError>
              {errors.username?.type === 'required' && 'Username is required'}
            </ValidateError>
          </StyledInputWrapper>
          <StyledInputWrapper>
            <label htmlFor='password'>Password</label>
            <StyledInput
              type='password'
              name='password'
              ref={loginUser({
                required: true,
                minLength: 8,
              })}
            />
            <ValidateError>
              {errors.password?.type === 'required' && 'Password is required'}
              {errors.password?.type === 'minLength' &&
                'Password must be greater than 8 characters'}
            </ValidateError>
          </StyledInputWrapper>
          <StyledButton type='submit'>Log In</StyledButton>
        </StyledForm>
      </StyledFormWrapper>
    </>
  );
};

export default Login;
