/* eslint-disable max-len */

import React from 'react';
import PropTypes from 'prop-types';
import {H3, ListItem as BaseListItem, Thumbnail, Text, Body, Left, Right, Button} from 'native-base';

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
          <Text>View</Text>
        </Button>
      </Right>
    </BaseListItem>
  );
};

ListItem.propTypes = {
  singleMedia: PropTypes.object,
  navigation: PropTypes.object,
};

export default ListItem;
