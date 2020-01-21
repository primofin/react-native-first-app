import React from 'react';
import {StyleSheet, View, Text, Image} from 'react-native';

const Single = (props) => {
  return (
    <View style={styles.container}>
      <Text>
        Title:
        {JSON.stringify(props.navigation.getParam('title'))}
      </Text>
      <Image
        style={{width: '90%', height: 400, marginTop: 15}}
        source={{uri: props.navigation.getParam('filename')}}
      />
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
