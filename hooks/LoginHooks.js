import {useState} from 'react';


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


  return {
    inputs,
    handleUsernameChange,
    handlePasswordChange,
    handleEmailChange,
    handleFullNameChange,
    handleConfirmPasswordChange,
  };
};


export default useSignUpForm;
