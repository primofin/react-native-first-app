/* eslint-disable react/no-unescaped-entities */
/* eslint-disable no-mixed-spaces-and-tabs */
/* eslint-disable no-tabs */
/* eslint-disable max-len */
import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Modal,
  Alert,
  TouchableHighlight,
  Platform,
} from 'react-native';
import PropTypes from 'prop-types';

const ListItem = (props) => {
  const [modalVisible, setModalVisible] = useState(false);
  return (
    <TouchableOpacity
      onPress={() => {
        setModalVisible(true);
      }}
    >
      <Modal
        animationType="slide"
        transparent={false}
        visible= {modalVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
        }}>
        <View style={{marginTop: 40, marginLeft: 25}}>
          <View>
            <Text style={{fontWeight: 'bold'}}>'Filename' image: </Text>
            <Image
              style={{width: '90%', height: 200, resizeMode: 'stretch', marginTop: 3}}
              source={{uri: props.singleMedia.filename}}
            />
            <TouchableHighlight
              onPress={() => {
                setModalVisible(!modalVisible);
              }}>
              <Text style ={{color: 'red'}}>Hide Modal</Text>
            </TouchableHighlight>
          </View>
        </View>
      </Modal>
      <View style={styles.innerContainer}>
        <TouchableOpacity>
          <Image
            style={styles.img}
            source={{uri: props.singleMedia.thumbnails.w160}}
          />
        </TouchableOpacity>
        <View style={styles.textContainer}>
          <Text style={styles.title}>{props.singleMedia.title}</Text>
          <Text>{props.singleMedia.description}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};


const styles = StyleSheet.create({
  innerContainer: {
    flex: 1,
    flexDirection: 'row',
    marginLeft: 3,
    marginRight: 3,
    marginBottom: 6,
    borderWidth: 2,
    borderColor: 'black',
    backgroundColor: '#DB9174',
    shadowColor: '#75746e',
    shadowOffset: {
	    width: 0,
	    height: 6,
    },
    shadowOpacity: 0.5,
    shadowRadius: 7.49,
    elevation: 12,
  },
  img: {
    width: 160,
    height: 100,
    marginTop: 55,
    marginLeft: 11,
    marginBottom: 20,
    flex: 1,
    borderRadius: 200,
  },
  textContainer: {
    paddingTop: 34,
    marginLeft: 5,
    paddingBottom: 30,
    flex: 1,
    fontFamily: 'serif',
    color: 'purple',
  },
  title: {
    fontWeight: 'bold',
    fontSize: 25,
    fontFamily: Platform.OS === 'ios' ? 'Baskerville' : 'monospace',
    color: '#361134',
    paddingBottom: 5,
  },

});

ListItem.propTypes = {
  singleMedia: PropTypes.object,
};

export default ListItem;
