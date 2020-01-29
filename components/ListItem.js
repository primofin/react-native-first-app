/* eslint-disable react/prop-types */
/* eslint-disable react/no-unescaped-entities */
/* eslint-disable no-mixed-spaces-and-tabs */
/* eslint-disable no-tabs */
/* eslint-disable max-len */
import React from 'react';
import {
  TouchableOpacity,
} from 'react-native';
import PropTypes from 'prop-types';
import {Content, List, ListItem as ListItemThumbnail, Thumbnail, Text, Body, Left, Right, Button} from 'native-base';

const apiUrl = 'http://media.mw.metropolia.fi/wbma/uploads/';
const ListItem = (props) => {
  const item = props.singleMedia;
  return (

    <Content>
      <List >
        <ListItemThumbnail thumbnail >
          <Left>
            <TouchableOpacity
              onPress={
                () => {
                  props.navigation.push('Single', {
                    title: props.singleMedia.title,
                    filename: apiUrl + props.singleMedia.filename,
                    description: props.singleMedia.description,
                    time_added: props.singleMedia.time_added,
                  });
                }
              }>
              <Thumbnail square source={{uri: apiUrl + item.thumbnails.w160}}/>
            </TouchableOpacity>
          </Left>
          <Body>
            <Text>{props.singleMedia.title}</Text>
            <Text note numberOfLines={2}>{props.singleMedia.description}</Text>
          </Body>
          <Right>
            <Button
              onPress={
                () => {
                  props.navigation.push('Single', {
                    title: props.singleMedia.title,
                    filename: apiUrl + props.singleMedia.filename,
                    description: props.singleMedia.description,
                    time_added: props.singleMedia.time_added,
                  });
                }
              }>
              <Text>View</Text>
            </Button>
          </Right>
        </ListItemThumbnail>
      </List>
    </Content>

  );
};

ListItem.propTypes = {
  singleMedia: PropTypes.object,
};

export default ListItem;
