import React, {useState, useEffect} from 'react';
import {AsyncStorage} from 'react-native';
import {
  Container,
  Content,
  Card,
  CardItem,
  Left,
  Body,
  H3,
  Icon,
  Text,
} from 'native-base';
import PropTypes from 'prop-types';
import AsyncImage from '../components/AsyncImage';
import {Dimensions} from 'react-native';
import {getUser, fetchPOST} from '../hooks/APIHooks';
import {Video} from 'expo-av';

const deviceHeight = Dimensions.get('window').height;

console.log('dh', deviceHeight);

const mediaURL = 'http://media.mw.metropolia.fi/wbma/uploads/';


const Single = (props) => {
  const [owner, setOwner] = useState({});
  const {navigation} = props;
  console.log('Singel navi', navigation.state);
  const file = navigation.state.params.file;

  const getOwner = async () => {
    const data = await getUser(file.user_id);
    setOwner(data);
    console.log('file owner', owner);
  };
  const like = async () => {
    try {
      const token = await AsyncStorage.getItem('userToken');
      return await fetchPOST('favourites', file.file_id, token);
    } catch (e) {
      console.log(e.message);
    }
  };
  useEffect(() => {
    getOwner();
  }, []);
  return (
    <Container>
      <Content>
        <Card>
          <CardItem>
            {file.media_type === 'image' &&
            <AsyncImage
              style={{
                width: '100%',
                height: deviceHeight / 2,
              }}
              spinnerColor='#777'
              source={{uri: mediaURL + file.filename}}
            />
            }
            {file.media_type === 'video' &&
              <Video
                source={{uri: mediaURL + file.filename}}
                rate={1.0}
                volume={1.0}
                isMuted={false}
                resizeMode="contain"
                shouldPlay
                isLooping
                useNativeControls
                style={{width: '100%', height: deviceHeight / 2}}
              />
            }
          </CardItem>
          <CardItem>
            <Left>
              <Icon name='image'/>
              <Body>
                <H3>{file.title}</H3>
                <Text>{file.description}</Text>
                <Text>File_id: {file.file_id}</Text>
                <Text>By userID: {file.user_id}, username: {owner.username}</Text>
                <Icon type="FontAwesome" name="heart" onPress={like}/>
              </Body>
            </Left>
          </CardItem>
        </Card>
      </Content>
    </Container>
  );
};

Single.propTypes = {
  navigation: PropTypes.object,
  file: PropTypes.object,
};

export default Single;
