/* eslint-disable max-len */

import React from 'react';
import PropTypes from 'prop-types';
import {H3, ListItem as BaseListItem, Thumbnail, Text, Body, Left, Right, Button, Icon} from 'native-base';
import {fetchDELETE} from '../hooks/APIHooks';
import {AsyncStorage} from 'react-native';

const mediaURL = 'http://media.mw.metropolia.fi/wbma/uploads/';
const ListItem = (props) => {
  return (
    <BaseListItem thumbnail>
      <Left>
        <Thumbnail
          square
          source={{uri: mediaURL + props.singleMedia.thumbnails.w160}}
        />
      </Left>
      <Body>
        <H3 numberOfLines={1}>{props.singleMedia.title}</H3>
        <Text numberOfLines={1}>{props.singleMedia.description}</Text>
      </Body>
      <Right>
        <Button onPress={
          () => {
            props.navigation.push('Single', {file: props.singleMedia});
          }
        }>
          <Icon name='eye'></Icon>
        </Button>
        {props.mode === 'myfiles' &&
          <>
            <Button
              full
              warning
              onPress={() => props.navigation.push('Modify', {file: props.singleMedia})}
            >
              <Icon name='create'/>
            </Button>
            <Button
              full
              danger
              onPress={async () => {
                const token = await AsyncStorage.getItem('userToken');
                const del = await fetchDELETE('media', props.singleMedia.file_id,
                    token);
                console.log('delete', del);
                if (del.message) {
                  props.getMedia(props.mode);
                }
              }}
            >
              <Icon name='trash'/>
            </Button>
          </>
        }
      </Right>
    </BaseListItem>
  );
};

ListItem.propTypes = {
  singleMedia: PropTypes.object,
  navigation: PropTypes.object,
  getMedia: PropTypes.func,
  mode: PropTypes.string,
};

export default ListItem;
