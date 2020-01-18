/* eslint-disable max-len */
import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
} from 'react-native';
import PropTypes from 'prop-types';

const ListItem = (props) => {
  return (
    <TouchableOpacity >
      <View style={styles.innerContainer}>
        <Image
          style={styles.img}
          source={{uri: props.singleMedia.thumbnails.w160}}
        />
        <View style={styles.textContainer}>
          <Text style={{fontWeight: 'bold', fontSize: 20}}>{props.singleMedia.title}</Text>
          <Text >{props.singleMedia.description}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};


const styles = StyleSheet.create({
  innerContainer: {
    flex: 1,
    flexDirection: 'row',
    borderTopWidth: 2,
    borderBottomWidth: 2,
    borderColor: 'white',
  },
  img: {
    width: 100,
    height: undefined,
    marginTop: 22,
    marginLeft: 11,
    marginBottom: 20,
    flex: 1,
    borderRadius: 2,
  },
  textContainer: {
    paddingTop: 34,
    marginLeft: 5,
    paddingBottom: 30,
    flex: 1,
  },
});

ListItem.propTypes = {
  singleMedia: PropTypes.object,
};

export default ListItem;
