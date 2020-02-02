/* eslint-disable react/prop-types */
import React from 'react';
import {
  Item,
  Label,
  Input,
} from 'native-base';

const FormTextInput = (props) => {
  const {success, error, label, ...otherProps} = props;
  return (
    <Item success={success} error={error} floatingLabel>
      <Label>{label}</Label>
      <Input style={{fontSize: 20}}
        {...otherProps}
      />
    </Item>

  );
};

export default FormTextInput;
