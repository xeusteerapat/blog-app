import React from 'react';
import {
  StyledFormWrapper,
  StyledForm,
  StyledInput,
  StyledButton,
} from '../styles/styles';

const Register = () => {
  const handleInput = (e: React.FormEvent) => {};
  const handleSubmit = (e: React.FormEvent) => {};
  return (
    <StyledFormWrapper>
      <StyledForm onSubmit={handleSubmit}>
        <h2>Register</h2>
        <label htmlFor='username'>Username</label>
        <StyledInput
          type='text'
          name='username'
          // value={state.name}
          onChange={handleInput}
        />
        <label htmlFor='email'>Email</label>
        <StyledInput
          type='email'
          name='email'
          // value={state.email}
          onChange={handleInput}
        />
        <label htmlFor='password'>Password</label>
        <StyledInput
          type='password'
          name='password'
          // value={state.email}
          onChange={handleInput}
        />
        <label htmlFor='confirmpassword'>Confirm Password</label>
        <StyledInput
          type='password'
          name='confirmpassword'
          // value={state.email}
          onChange={handleInput}
        />
        <StyledButton type='submit'>Register</StyledButton>
      </StyledForm>
    </StyledFormWrapper>
  );
};

export default Register;
