import React from 'react';
import {TextInput} from 'react-native';

const FormTextInput = (props) => {
  return (
    <TextInput style={{fontSize: 20}}
      {...props}
    />
  );
};

export default FormTextInput;
