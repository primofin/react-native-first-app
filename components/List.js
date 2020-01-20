import React from 'react';
import {
  FlatList, View, StyleSheet,
} from 'react-native';
import ListItem from './ListItem';
import PropTypes from 'prop-types';

const List = (props) => {
  console.log(props);
  return (
    <View style={styles.container}>
      <FlatList
        data={props.mediaArray}
        renderItem={({item}) => <ListItem singleMedia={item} />}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 0,
    backgroundColor: 'white',
  },
});

List.propTypes = {
  mediaArray: PropTypes.array,
};

export default List;
