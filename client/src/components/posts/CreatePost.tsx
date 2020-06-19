import React, { useState } from 'react';
import CKEditor from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

import {
  StyledFormWrapper,
  StyledForm,
  StyledInput,
  StyledButton,
  StyledInputWrapper,
  ValidateError,
  ErrorBox,
} from '../styles/styles';

const CreatePost = () => {
  const accessToken = localStorage.getItem('accessToken');

  const [value, setValue] = useState('');

  const handleChange = (e: React.FormEventHandler, editor: any) => {
    console.log(editor.getData());
  };

  if (!accessToken) {
    return (
      <div>
        <h1>Please Login</h1>
      </div>
    );
  }

  return (
    <>
      <h1>Create your post</h1>
      <StyledFormWrapper>
        <StyledForm>
          <StyledInputWrapper>
            <label htmlFor='title'>Title</label>
            <StyledInput type='text' name='title' />
          </StyledInputWrapper>
          <StyledInputWrapper>
            <CKEditor editor={ClassicEditor} onChange={handleChange} />
          </StyledInputWrapper>
          <StyledButton type='submit'>Create Post</StyledButton>
        </StyledForm>
      </StyledFormWrapper>
    </>
  );
};

export default CreatePost;
