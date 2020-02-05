import React, {useContext} from 'react';
import PropTypes from 'prop-types';
import {MediaContext} from '../contexts/MediaContext';
import {getAllMedia} from '../hooks/APIHooks';
import {List as BaseList} from 'native-base';
import ListItem from './ListItem';


const List = (props) => {
  const [media, setMedia] = useContext(MediaContext);
  const [data] = getAllMedia();
  setMedia(data);
  return (
    <BaseList
      dataArray={media}
      renderRow={
        (item) => <ListItem
          navigation={props.navigation}
          singleMedia={item}
        />
      }
      keyExtractor={(item, index) => index.toString()}
    />
  );
};
List.propTypes = {
  navigation: PropTypes.object,
};

export default List;
