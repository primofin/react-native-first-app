/* eslint-disable no-trailing-spaces */
/* eslint-disable max-len */

import React from 'react';
import {View, StyleSheet} from 'react-native';
import List from '../components/List';
import PropTypes from 'prop-types';

const Home = (props) => {
  const {navigation} = props;
  return (
    <View style={styles.container}>
      <List navigation={navigation}></List>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    paddingHorizontal: 10,
    paddingTop: 40,
  },
});

Home.propTypes = {
  navigation: PropTypes.object,
};


export default Home;
