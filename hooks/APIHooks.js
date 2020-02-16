import {AsyncStorage} from 'react-native';

const apiUrl = 'http://media.mw.metropolia.fi/wbma/';

const fetchGET = async (endpoint = '', params = '', token = '') => {
  const fetchOptions = {
    headers: {
      'x-access-token': token,
    },
  };
  const response = await fetch(apiUrl + endpoint + '/' + params,
      fetchOptions);
  if (!response.ok) {
    throw new Error('fetchGET error: ' + response.status);
  }
  return await response.json();
};

const fetchPOST = async (endpoint = '', data = {}, token = '') => {
  const fetchOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-access-token': token,
    },
    body: JSON.stringify(data),
  };
  const response = await fetch(apiUrl + endpoint, fetchOptions);
  const json = await response.json();
  console.log(json);
  if (response.status === 400 || response.status === 401) {
    const message = Object.values(json).join();
    throw new Error(message);
  } else if (response.status > 299) {
    throw new Error('fetchPOST error: ' + response.status);
  }
  return json;
};


const getAllMedia = async () => {
  const json = await fetchGET('media/all', '');
  const result = await Promise.all(
      json.files.map(async (item) => {
        return await fetchGET('media', item.file_id);
      }),
  );
  return result;
};


const getUser = async (id) => {
  try {
    const token = await AsyncStorage.getItem('userToken');
    return await fetchGET('users', id, token);
  } catch (e) {
    console.log(e.message);
  }
};

const getUserMedia = async (token) => {
  const json = await fetchGET('media/user', '', token);
  const result = await Promise.all(json.map(async (item) => {
    return await fetchGET('media', item.file_id);
  }));
  return result;
};

const fetchDELETE = async (endpoint = '', params = '', token = '') => {
  const fetchOptions = {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      'x-access-token': token,
    },
  };
  const response = await fetch(apiUrl + endpoint + '/' + params,
      fetchOptions);
  if (!response.ok) {
    throw new Error('fetchGET error: ' + response.status);
  }
  return await response.json();
};

// const getFavouriteMedia = async (id) => {
//   try {
//     return await fetchGET('/favourites/file/', id);
//   } catch (e) {
//     console.log('getAllMedia error', e.message);
//   }
// };

export {getAllMedia, fetchGET, fetchPOST, getUser, getUserMedia, fetchDELETE, fetchPUT};
