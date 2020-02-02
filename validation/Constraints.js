
const constraints = {
  username: {
    presence: {
      allowEmpty: false,
    },
    length: {
      minimum: 3,
      message: '^Your username must be at least 3 characters',
    },
  },
  password: {
    presence: {
      allowEmpty: false,
    },
    length: {
      minimum: 5,
      message: '^Your password must be at least 5 characters',
    },
  },
  email: {
    presence: {
      allowEmpty: false,
    },
    email: {
      message: '^Please enter a valid email address',
    },
  },
  full_name: {
    length: {
      minimum: 5,
      message: '^Your username must be at least 5 characters',
    },
  },
  confirmPassword: {
    presence: {
      allowEmpty: false,
    },
    equality: 'password',
  },
};
export default constraints;
