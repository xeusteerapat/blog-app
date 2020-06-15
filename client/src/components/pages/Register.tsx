import React from 'react';
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
} from '../styles/styles';

type FormData = {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
};

const REGISTER = gql`
  mutation register(
    $username: String!
    $email: String!
    $password: String!
    $confirmPassword: String!
  ) {
    register(
      data: {
        username: $username
        email: $email
        password: $password
        confirmPassword: $confirmPassword
      }
    ) {
      id
      username
      email
      token
    }
  }
`;

const Register = () => {
  const { register: registerUser, setValue, handleSubmit, errors } = useForm<
    FormData
  >();
  const [register, { data }] = useMutation(REGISTER);
  const onSubmit = handleSubmit(
    ({ username, email, password, confirmPassword }) => {
      register({
        variables: {
          username,
          email,
          password,
          confirmPassword,
        },
      });
      setValue('username', '');
      setValue('email', '');
      setValue('password', '');
      setValue('confirmPassword', '');
    }
  );

  console.log(data);

  return (
    <StyledFormWrapper>
      <StyledForm onSubmit={onSubmit}>
        <h2>Register</h2>
        <StyledInputWrapper>
          <label htmlFor='username'>Username</label>
          <StyledInput
            type='text'
            name='username'
            ref={registerUser({
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
            ref={registerUser({
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
            ref={registerUser({
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
            ref={registerUser({
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
