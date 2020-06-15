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
  email: string;
  password: string;
  confirmPassword: string;
};

const Register = () => {
  const { register, setValue, handleSubmit, errors } = useForm<FormData>();
  const onSubmit = handleSubmit(
    ({ username, email, password, confirmPassword }) => {
      console.log({ username, email, password, confirmPassword });
      setValue('username', '');
      setValue('email', '');
      setValue('password', '');
      setValue('confirmPassword', '');
    }
  );

  return (
    <StyledFormWrapper>
      <StyledForm onSubmit={onSubmit}>
        <h2>Register</h2>
        <StyledInputWrapper>
          <label htmlFor='username'>Username</label>
          <StyledInput
            type='text'
            name='username'
            ref={register({
              required: true,
              minLength: 8,
            })}
          />
          <ValidateError>
            {errors.username?.type === 'required' && 'Username is required'}
            {errors.username?.type === 'minLength' &&
              'Username must be greater than 8 characters'}
          </ValidateError>
        </StyledInputWrapper>
        <StyledInputWrapper>
          <label htmlFor='email'>Email</label>
          <StyledInput
            type='email'
            name='email'
            ref={register({
              required: true,
            })}
          />
          <ValidateError>{errors.email && 'Email is required'}</ValidateError>
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
        <StyledInputWrapper>
          <label htmlFor='confirmPassword'>Confirm Password</label>
          <StyledInput
            type='password'
            name='confirmPassword'
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
        <StyledButton type='submit'>Register</StyledButton>
      </StyledForm>
    </StyledFormWrapper>
  );
};

export default Register;
