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
  const [password, setPassword]=useState();
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

  const handleToggleClick = ()=> {
    setRegister(!register);
  };

  const confirmPassword = (password) => {
    return setPassword(password);
  };

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
                onEndEditing= { async (evt) => {
                  const text = evt.nativeEvent.text;
                  return confirmPassword(text);
                }}
              />
            </Item>
            <Item>
              <FormTextInput
                autoCapitalize='none'
                value={inputs.password}
                placeholder='confirm password'
                secureTextEntry={true}
                onChangeText={handlePasswordChange}
                onEndEditing={ async (evt) => {
                  const text = evt.nativeEvent.text;
                  if (text !== password) {
                    Alert.alert('Those passwords did not match. Try again');
                  }
                }}
              />
            </Item>
            <Button full onPress={registerAsync}>
              <Text>Register!</Text>
            </Button>
            <Button full warning onPress={handleToggleClick}>
              <Text>{register ? 'No account yet ?' : 'Have account already ?'}</Text>
            </Button>
          </Form>
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
