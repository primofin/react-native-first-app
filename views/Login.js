/* eslint-disable max-len */
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
  View,
  Alert,
} from 'react-native';
import PropTypes from 'prop-types';
import {fetchPOST, checkUsername} from '../hooks/APIHooks';
import FormTextInput from '../components/FormTextInput';
import useSignUpForm from '../hooks/LoginHooks';

const Login = (props) => {
  const [register, setRegister]= useState('false');
  const [error, setError] = useState('');
  const {
    handleUsernameChange,
    handlePasswordChange,
    handleEmailChange,
    handleFullnameChange,
    handleConfirmPasswordChange,
    inputs,
    validatingForm,
  } = useSignUpForm();


  const signInAsync = async () => {
    try {
      const user = await fetchPOST('login', inputs);
      console.log('Login', user);
      await AsyncStorage.setItem('userToken', user.token);
      await AsyncStorage.setItem('user', JSON.stringify(user.user));
      props.navigation.navigate('App');
    } catch (e) {
      alert('Please type the right username and password!');
      console.log('signInAsync error: ' + e.message);
      setError(e.message);
    }
  };

  const registerAsync = async () => {
    try {
      const [isValidated, bugs] = validatingForm(inputs);
      if (isValidated) {
        const result = await fetchPOST('users', inputs);
        console.log('register', result);
        signInAsync();
      } else {
        const string= bugs.toString();
        alert(string==='confirmPassword'? 'Confirmed password does NOT match Password':`Make sure ${string} in correct format` );
      }
    } catch (e) {
      console.log('registerAsync error: ', e.message);
      setError(e.message);
    }
  };

  const handleToggleClick = ()=> {
    setRegister(!register);
  };

  const successVariable = true;

  return (

    <Container>
      <Header>
        <Body><Title>MyApp</Title></Body>
      </Header>
      <Content>
        {/* login form */}
        { register &&
          <View >
            <Form >
              <Title>
                <H2>Login</H2>
              </Title>
              <Item>
                <FormTextInput
                  success={successVariable}
                  error={!successVariable}
                  autoCapitalize='none'
                  value={inputs.username}
                  placeholder='username'
                  label='username'
                  onChangeText={handleUsernameChange}
                />
              </Item>
              <Item>
                <FormTextInput
                  autoCapitalize='none'
                  value={inputs.password}
                  placeholder='password'
                  label='password'
                  secureTextEntry={true}
                  onChangeText={handlePasswordChange}
                />
              </Item>
              <Button full onPress={signInAsync}>
                <Text>Login !</Text>
              </Button>
              <Button full warning onPress={handleToggleClick}>
                <Text>{register ? 'No account yet ?' : 'Have account already ?'}</Text>
              </Button>
            </Form>
          </View>
        }
        {/* Register form */}
        { !register &&
        <View >
          <Form >
            <Title>
              <H2>Register</H2>
            </Title>
            <Item>
              <FormTextInput
                autoCapitalize='none'
                value={inputs.username}
                placeholder='username'
                label='username'
                onChangeText={handleUsernameChange}
                onEndEditing={async (evt) => {
                  const text = evt.nativeEvent.text;
                  if (text==='') {
                    Alert.alert('Username can not be blank !');
                  } else {
                    const isAvaiable= await checkUsername(text);
                    (!isAvaiable && Alert.alert('Username is already existed !'));
                  }
                }}
              />
            </Item>
            <Item>
              <FormTextInput
                autoCapitalize='none'
                value={inputs.email}
                placeholder='email'
                label='email'
                onChangeText={handleEmailChange}
              />
            </Item>
            <Item>
              <FormTextInput
                autoCapitalize='none'
                value={inputs.full_name}
                placeholder='fullname'
                label='fullname'
                onChangeText={handleFullnameChange}
              />
            </Item>
            <Item>
              <FormTextInput
                autoCapitalize='none'
                value={inputs.password}
                placeholder='password'
                label='password'
                secureTextEntry={true}
                onChangeText={handlePasswordChange}
              />
            </Item>
            <Item>
              <FormTextInput
                autoCapitalize='none'
                value={inputs.confirmPassword}
                placeholder='confirm password'
                label='confirm password'
                secureTextEntry={true}
                onChangeText={handleConfirmPasswordChange}
              />
            </Item>
            <Button full onPress={registerAsync}>
              <Text>Register!</Text>
            </Button>
            <Button full warning onPress={handleToggleClick}>
              <Text>{register ? 'No account yet ?' : 'Have account already ?'}</Text>
            </Button>
          </Form>
          <Text>{error}</Text>
        </View>
        }
      </Content>
    </Container>

  );
};

// proptypes here
Login.propTypes = {
  navigation: PropTypes.object,
};

export default Login;
