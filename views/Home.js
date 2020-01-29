/* eslint-disable no-trailing-spaces */
/* eslint-disable max-len */

import React from 'react';
import {View} from 'react-native';
import List from '../components/List';
import PropTypes from 'prop-types';

const Home = (props) => {
  const {navigation} = props;
  return (
    <View >
      <List navigation={navigation}></List>
    </View>
  );
};
Home.propTypes = {
  navigation: PropTypes.object,
};


export default Home;
