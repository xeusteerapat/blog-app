import React from 'react';
import { useForm } from 'react-hook-form';
import {
  StyledFormWrapper,
  StyledForm,
  StyledInput,
  StyledButton,
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
        <label htmlFor='username'>Username</label>
        <StyledInput type='text' name='username' ref={register} />
        <label htmlFor='email'>Email</label>
        <StyledInput type='email' name='email' ref={register} />
        <label htmlFor='password'>Password</label>
        <StyledInput type='password' name='password' ref={register} />
        <label htmlFor='confirmPassword'>Confirm Password</label>
        <StyledInput type='password' name='confirmPassword' ref={register} />
        <StyledButton type='submit' onClick={() => {}}>
          Register
        </StyledButton>
      </StyledForm>
    </StyledFormWrapper>
  );
};

export default Register;
