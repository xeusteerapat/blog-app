import React from 'react';
import {
  StyledFormWrapper,
  StyledForm,
  StyledInput,
  StyledButton,
} from '../styles/styles';

const Login = () => {
  const handleInput = (e: React.FormEvent) => {};
  const handleSubmit = (e: React.FormEvent) => {};
  return (
    <StyledFormWrapper>
      <StyledForm onSubmit={handleSubmit}>
        <h2>Login</h2>
        <label htmlFor='username'>Username</label>
        <StyledInput
          type='text'
          name='username'
          // value={state.name}
          onChange={handleInput}
        />
        <label htmlFor='password'>Password</label>
        <StyledInput
          type='password'
          name='password'
          // value={state.email}
          onChange={handleInput}
        />
        <StyledButton type='submit'>Log In</StyledButton>
      </StyledForm>
    </StyledFormWrapper>
  );
};

export default Login;
