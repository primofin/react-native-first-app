import React from 'react';
import {StyleSheet, View, Text} from 'react-native';

const Single = () => {
  return (
    <View style={styles.container}>
      <Text>Single</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 40,
  },
});

export default Single;