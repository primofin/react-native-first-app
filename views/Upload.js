import React, {useState, useEffect} from 'react';
import {
  Content,
  Form,
  Button,
  Text,
  Item,
} from 'native-base';
import {
  Dimensions,
  Image,
} from 'react-native';
import PropTypes from 'prop-types';
import FormTextInput from '../components/FormTextInput';
import * as ImagePicker from 'expo-image-picker';
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';
import useUploadForm from '../hooks/UploadHooks';

const deviceHeight = Dimensions.get('window').height;

const Upload = (props) => {
  const [image, setImage] = useState(null);

  const {
    handleTitleChange,
    handleDescriptionChange,
    handleUpload,
    inputs,
    validateField,
    validateOnSend,
    errors,
    resetInputs,
  } = useUploadForm();

  const validationProperties = {
    title: {title: inputs.title},
    description: {description: inputs.description},
  };

  const getPermissionAsync = async () => {
    if (Constants.platform.ios) {
      const {status} = await Permissions.askAsync(Permissions.CAMERA_ROLL);
      if (status !== 'granted') {
        alert('Sorry, we need camera roll permissions to make this work!');
      }
    }
  };

  useEffect(() => {
    getPermissionAsync();
  }, []);

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.3,
      exif: true,
    });

    console.log(result);

    if (!result.cancelled) {
      setImage(result);
    }
  };
  const resetForm = () => {
    resetInputs();
    setImage(null);
  }


  return (
    <Content>
      <Form>
        <Item>
          <FormTextInput
            placeholder='Title'
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
            placeholder='Description'
            onChangeText={handleDescriptionChange}
            value={inputs.description}
            onEndEditing={() => {
              validateField(validationProperties.description);
            }}
            error={errors.description}
          />
        </Item>
        {image &&
        <Image source={{uri: image.uri}}
          style={{width: '100%', height: deviceHeight / 3}}/>
        }
        <Button full onPress={pickImage}>
          <Text>Select file</Text>
        </Button>
        <Button dark full onPress={resetForm}>
          <Text>Reset form</Text>
        </Button>
        <Button full danger onPress={() => {
          validateOnSend(validationProperties) && handleUpload(image, props.navigation);
        }}>
          <Text>Upload</Text>
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
