import React, {useContext} from 'react';
import {
  FlatList, View, StyleSheet,
} from 'react-native';
import ListItem from './ListItem';
import PropTypes from 'prop-types';
import {MediaContext} from '../contexts/MediaContext';
import {getAllMedia} from '../hooks/APIHooks';


const List = (props) => {
  const [media, setMedia] = useContext(MediaContext);
  const [data] = getAllMedia();
  setMedia(data);
  return (
    <View style={styles.container}>
      <FlatList
        data={media}
        keyExtractor={(item, index)=> index.toString()}
        renderItem={
          ({item}) => <ListItem
            navigation={props.navigation}
            singleMedia={item}
          />}
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
