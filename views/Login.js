import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  Button,
  AsyncStorage,
} from 'react-native';
import PropTypes from 'prop-types';
import {login, register} from '../hooks/APIHooks';
import FormTextInput from '../components/FormTextInput';
import useSignUpForm from '../hooks/LoginHooks';


const Login = (props) => { // props is needed for
  const {inputs,
    handleUsernameChange,
    handlePasswordChange,
    handleEmailChange,
    handleFullNameChange,
  } = useSignUpForm();
  const signInAsync = async () => {
    try {
      const user = await login(inputs);
      console.log('Login', user);
      await AsyncStorage.setItem('userToken', user.token);
      await AsyncStorage.setItem('user', JSON.stringify(user.user));
      props.navigation.navigate('App');
    } catch (e) {
      console.log('error:', e.message);
    }
  };
  const registerAsync = async () => {
    try {
      await register(inputs);
      signInAsync(inputs);
    } catch (e) {
      console.log('error:', e.message);
    }
  };
  return (
    <View style={styles.container}>
      <View style={styles.login_container}>
        {/* login form */}
        <Text>Login</Text>
        <View style={styles.form}>
          <FormTextInput
            autoCapitalize='none'
            placeholder='username'
            name = 'username'
            value={inputs.username}
            onChangeText={handleUsernameChange}
          />
          <FormTextInput
            autoCapitalize='none'
            placeholder='password'
            secureTextEntry={true}
            name = 'password'
            value={inputs.password}
            onChangeText={handlePasswordChange}
          />
          <Button title="Sign in!" onPress={signInAsync} />
        </View>
      </View>
      <View style={styles.register_container}>
        <Text>Register</Text>
        <View style={styles.form}>
          <FormTextInput
            autoCapitalize='none'
            placeholder='username'
            name = 'username'
            value={inputs.username}
            onChangeText={handleUsernameChange}
          />
          <FormTextInput
            autoCapitalize='none'
            placeholder='email'
            name = 'email'
            value={inputs.email}
            onChangeText={handleEmailChange}
          />
          <FormTextInput
            autoCapitalize='none'
            placeholder='fullname'
            name = 'fullname'
            value={inputs.full_name}
            onChangeText={handleFullNameChange}
          />
          <FormTextInput
            autoCapitalize='none'
            placeholder='password'
            secureTextEntry={true}
            name = 'password'
            value={inputs.password}
            onChangeText={handlePasswordChange}
          />
          <Button title="Register !" onPress={registerAsync} />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 60,
  },
  register_container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

// proptypes here
Login.prototype = {
  navigation: PropTypes.object,
};

export default Login;
