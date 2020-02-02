import {useState} from 'react';
import validate from 'validate.js';
import {constraints} from '../validation/Constraints';


const useSignUpForm = () => {
  const [inputs, setInputs] = useState({});
  const handleUsernameChange = (text) => {
    setInputs((inputs) =>
      ({
        ...inputs,
        username: text,
      }));
  };
  const handleEmailChange = (text) => {
    setInputs((inputs) =>
      ({
        ...inputs,
        email: text,
      }));
  };
  const handleFullNameChange = (text) => {
    setInputs((inputs) =>
      ({
        ...inputs,
        full_name: text,
      }));
  };
  const handlePasswordChange = (text) => {
    setInputs((inputs) =>
      ({
        ...inputs,
        password: text,
      }));
  };
  const handleConfirmPasswordChange = (text) => {
    setInputs((inputs) =>
      ({
        ...inputs,
        confirmPassword: text,
      }));
  };

  const validatingForm = (input) => {
    const check = validate(input, constraints);
    if (!check) {
      const bugs= [];
      const isValidated=true;
      return [isValidated, bugs];
    } else {
      const bugs = Object.keys(check);
      const isValidated=false;
      return [isValidated, bugs];
    }
  };

  return {
    inputs,
    handleUsernameChange,
    handlePasswordChange,
    handleEmailChange,
    handleFullNameChange,
    handleConfirmPasswordChange,
    validatingForm,
  };
};


export default useSignUpForm;
