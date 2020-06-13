type Errors = {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
};

export const validateRegisterInput = (
  username,
  email,
  password,
  confirmPassword
) => {
  const errors = <Errors>{};

  if (username.trim() === '') {
    errors.username = 'User name cannot be empty';
  }

  if (email.trim() === '') {
    errors.email = 'Email name cannot be empty';
  } else {
    const regEx = /^([0-9a-zA-Z]([-.\w]*[0-9a-zA-Z])*@([0-9a-zA-Z][-\w]*[0-9a-zA-Z]\.)+[a-zA-Z]{2,9})$/;
    if (!email.match(regEx)) {
      errors.email = 'Please enter valid email address';
    }
  }

  if (password.trim() === '') {
    errors.password = 'Password Email name cannot be empty';
  } else if (password.length < 8) {
    errors.confirmPassword = 'Password must be 8 characters or longer';
  } else if (password !== confirmPassword) {
    errors.confirmPassword = 'Password must be match';
  }

  return {
    errors,
    valid: Object.keys(errors).length < 1,
  };
};

export const validateLoginInput = (username, password) => {
  const errors = <Errors>{};

  if (username.trim() === '') {
    errors.username = 'User name cannot be empty';
  }

  if (password.trim() === '') {
    errors.password = 'Password Email name cannot be empty';
  }

  return {
    errors,
    valid: Object.keys(errors).length < 1,
  };
};
