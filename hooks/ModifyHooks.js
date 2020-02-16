import {useState, useContext} from 'react';
import {AsyncStorage} from 'react-native';
import {fetchGET} from './APIHooks';
import {MediaContext} from '../contexts/MediaContext';
import validate from 'validate.js';

const constraints = {
  title: {
    presence: {
      message: 'cannot be blank.',
    },
    length: {
      minimum: 3,
      message: 'must be at least 3 characters',
    },
  },
  description: {
    presence: {
      message: 'cannot be blank.',
    },
    length: {
      minimum: 5,
      message: 'must be at least 5 characters',
    },
  },
};
const useModifyForm = () => {
  const [media, setMedia] = useContext(MediaContext);
  const [inputs, setInputs] = useState({});
  const [errors, setErrors] = useState({});

  const handleTitleChange = (text) => {
    setInputs((inputs) =>
      ({
        ...inputs,
        title: text,
      }));
  };

  const handleDescriptionChange = (text) => {
    setInputs((inputs) =>
      ({
        ...inputs,
        description: text,
      }));
  };
  const validateField = (attr) => {
    const attrName = Object.keys(attr).pop(); // get the only or last item from array
    const valResult = validate(attr, constraints);
    console.log('valresult', valResult);
    let valid = undefined;
    if (valResult[attrName]) {
      valid = valResult[attrName][0]; // get just the first message
    }
    setErrors((errors) =>
      ({
        ...errors,
        [attrName]: valid,
        fetch: undefined,
      }));
  };

  const validateOnSend = (fields) => {
    for (const [key, value] of Object.entries(fields)) {
      console.log(key, value);
      validateField(value);
    }

    if (errors.title !== undefined ||
      errors.description !== undefined ) {
      return false;
    } else {
      return true;
    }
  };
  const resetInputs = () => {
    setInputs('');
  };

  const handleModify = async (params, navigation) => {
    const fd = new FormData();
    fd.append('title', inputs.title);
    fd.append('description', inputs.description);

    console.log('FD:', fd);

    try {
      const token = await AsyncStorage.getItem('userToken');

      const fetchOptions = {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'x-access-token': token,
        },
        body: JSON.stringify(fd),
      };

      const result = await fetch(
          'http://media.mw.metropolia.fi/wbma/media'+ '/' + params,
          fetchOptions,
      );
      const json = await result.json();
      console.log('upload result:', json);
      if (json.file_id) {
        // modify successful
        const json = await fetchGET('media/all');
        const result = await Promise.all(json.files.map(async (item) => {
          return await fetchGET('media', item.file_id);
        }));
        setMedia(result);
        navigation.push('MyFiles');
      }
    } catch (e) {
      console.log(e.message);
    }
  };

  return {
    handleTitleChange,
    handleDescriptionChange,
    handleModify,
    inputs,
    errors,
    setErrors,
    validateField,
    validateOnSend,
    resetInputs,
  };
};

export default useModifyForm;
