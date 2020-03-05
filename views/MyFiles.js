
import React from 'react';
import {View, StyleSheet} from 'react-native';
import List from '../components/List';
import PropTypes from 'prop-types';

const MyFiles = (props) => {
  const {navigation} = props;
  return (
    <View style={styles.container}>
      <List navigation={navigation} mode={'myfiles'}></List>
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

MyFiles.propTypes = {
  navigation: PropTypes.object,
};


export default MyFiles;
