import React from 'react';
import { useForm } from 'react-hook-form';
import {
  StyledFormWrapper,
  StyledForm,
  StyledInput,
  StyledButton,
  StyledInputWrapper,
  ValidateError,
} from '../styles/styles';

type FormData = {
  username: string;
  password: string;
};

const Login = () => {
  const { register, setValue, handleSubmit, errors } = useForm<FormData>();
  const onSubmit = handleSubmit(({ username, password }) => {
    setValue('username', '');
    setValue('password', '');
  });

  return (
    <StyledFormWrapper>
      <StyledForm onSubmit={onSubmit}>
        <h2>Login</h2>
        <StyledInputWrapper>
          <label htmlFor='username'>Username</label>
          <StyledInput
            type='text'
            name='username'
            ref={register({
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
            ref={register({
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
  );
};

export default Login;
