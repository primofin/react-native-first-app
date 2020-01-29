/* eslint-disable max-len */
import React from 'react';
import {Image} from 'react-native';
import PropTypes from 'prop-types';
import {Container, Content, Card, CardItem, Text, Body, Icon, Left} from 'native-base';
const Single = (props) => {
  return (
    <Container>
      <Content>
        <Card style={{flex: 0}}>
          <CardItem>
            <Body>
              <Image source={{uri: props.navigation.getParam('filename')}} style={{height: 380, width: 380, flex: 1}}/>
            </Body>
          </CardItem>
          <CardItem>
            <Left style={{flex: 1}}>
              <Icon name='image' />
            </Left>
            <Body style={{flex: 8}}>
              <Text style={{fontWeight: 'bold'}}>
                {props.navigation.getParam('title')}
              </Text>
              <Text>
                {props.navigation.getParam('description')}
              </Text>
              <Text>
                Time added:
                {props.navigation.getParam('time_added')}
              </Text>
            </Body>
          </CardItem>
        </Card>
      </Content>
    </Container>
  );
};


Single.propTypes = {
  navigation: PropTypes.object,
};

export default Single;
// <View >
//       <Text>
//         Title:
//         {JSON.stringify(props.navigation.getParam('title'))}
//       </Text>
//       <Image
//         source={{uri: props.navigation.getParam('filename')}}
//       />
//     </View>
