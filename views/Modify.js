/* eslint-disable max-len */
import React, {useState, useEffect} from 'react';
import {
  Content,
  Form,
  Button,
  Text,
  Item,
  CardItem,
  Video,
} from 'native-base';
import {
  Dimensions,
  Image,
} from 'react-native';
import AsyncImage from '../components/AsyncImage';
import PropTypes from 'prop-types';
import FormTextInput from '../components/FormTextInput';
import useModifyForm from '../hooks/ModifyHooks';
import {fetchPUT} from '../hooks/APIHooks';

const deviceHeight = Dimensions.get('window').height;
const mediaURL = 'http://media.mw.metropolia.fi/wbma/uploads/';

const Upload = (props) => {
  const {navigation} = props;
  const file = navigation.state.params.file;
  const {
    handleTitleChange,
    handleDescriptionChange,
    handleModify,
    inputs,
    validateField,
    validateOnSend,
    errors,
    resetInputs,
  } = useModifyForm();

  const validationProperties = {
    title: {title: inputs.title},
    description: {description: inputs.description},
  };

  const resetForm = () => {
    resetInputs();
  };


  return (
    <Content>
      <Form>
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
        <Item>
          <FormTextInput
            placeholder={'Title: '+file.title}
            onChangeText={handleTitleChange}
            value={inputs.title}
            onEndEditing={() => {
              validateField(validationProperties.title);
            }}
            error={errors.title}
          />
        </Item>
        <Item>
          <FormTextInput
            placeholder={'Description: ' + file.description}
            onChangeText={handleDescriptionChange}
            value={inputs.description}
            onEndEditing={() => {
              validateField(validationProperties.description);
            }}
            error={errors.description}
          />
        </Item>

        <Button dark full onPress={resetForm}>
          <Text>Reset form</Text>
        </Button>
        <Button full danger onPress={() => {
          validateOnSend(validationProperties) && handleModify(file.file_id, props.navigation);
        }}>
          <Text>Update</Text>
        </Button>
      </Form>
    </Content>
  );
};

// proptypes here
Upload.propTypes = {
  navigation: PropTypes.object,
};

export default Upload;
