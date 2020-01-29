import React, {useState} from 'react';
import {
  Container,
  Header,
  Body,
  Title,
  Content,
  Form,
  Button,
  Text,
  Item,
  H2,
} from 'native-base';
import {
  AsyncStorage,
} from 'react-native';
import PropTypes from 'prop-types';
import {fetchGET, fetchPOST} from '../hooks/APIHooks';
import FormTextInput from '../components/FormTextInput';
import useSignUpForm from '../hooks/LoginHooks';

const Login = (props) => {
  const [error, setError] = useState('');
  const {
    handleUsernameChange,
    handlePasswordChange,
    handleEmailChange,
    handleFullnameChange,
    inputs,
  } = useSignUpForm();
  const signInAsync = async () => {
    try {
      const user = await fetchPOST('login', inputs);
      console.log('Login', user);
      await AsyncStorage.setItem('userToken', user.token);
      await AsyncStorage.setItem('user', JSON.stringify(user.user));
      props.navigation.navigate('App');
    } catch (e) {
      console.log('signInAsync error: ' + e.message);
      setError(e.message);
    }
  };
  const registerAsync = async () => {
    try {
      const result = await fetchPOST('users', inputs);
      console.log('register', result);
      signInAsync();
    } catch (e) {
      console.log('registerAsync error: ', e.message);
      setError(e.message);
    }
  };

  return (
    <Container>
      <Header>
        <Body><Title>MyApp</Title></Body>
      </Header>
      <Content>
        {/* login form */}
        <Form>
          <Title>
            <H2>Login</H2>
          </Title>
          <Item>
            <FormTextInput
              autoCapitalize='none'
              value={inputs.username}
              placeholder='username'
              onChangeText={handleUsernameChange}
            />
          </Item>
          <Item>
            <FormTextInput
              autoCapitalize='none'
              value={inputs.password}
              placeholder='password'
              secureTextEntry={true}
              onChangeText={handlePasswordChange}
            />
          </Item>
          <Button full onPress={signInAsync}><Text>Sign in!</Text></Button>
        </Form>

        {/* register form */}
        <Form>
          <Title>
            <H2>Register</H2>
          </Title>
          <Item>
            <FormTextInput
              autoCapitalize='none'
              value={inputs.username}
              placeholder='username'
              onChangeText={handleUsernameChange}
            />
          </Item>
          <Item>
            <FormTextInput
              autoCapitalize='none'
              value={inputs.email}
              placeholder='email'
              onChangeText={handleEmailChange}
            />
          </Item>
          <Item>
            <FormTextInput
              autoCapitalize='none'
              value={inputs.fullname}
              placeholder='fullname'
              onChangeText={handleFullnameChange}
            />
          </Item>
          <Item>
            <FormTextInput
              autoCapitalize='none'
              value={inputs.password}
              placeholder='password'
              secureTextEntry={true}
              onChangeText={handlePasswordChange}
            />
          </Item>
          <Button full onPress={registerAsync}>
            <Text>Register!</Text>
          </Button>
        </Form>
        <Text>{error}</Text>
      </Content>
    </Container>
  );
};

// proptypes here
Login.propTypes = {
  navigation: PropTypes.object,
};

export default Login;
