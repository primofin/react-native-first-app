import React, {useContext} from 'react';
import {
  FlatList, View, StyleSheet,
} from 'react-native';
import ListItem from './ListItem';
import PropTypes from 'prop-types';
import {MediaContext} from '../contexts/MediaContext';
import {useFetch} from '../hooks/APIHooks';


const List = (props) => {
  const [media, setMedia] = useContext(MediaContext);
  const url = 'https://raw.githubusercontent.com/mattpe/wbma/master/docs/assets/test.json';
  const [data, loading] = useFetch(url);
  console.log(data, loading);
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
