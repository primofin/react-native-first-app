/* eslint-disable no-trailing-spaces */
/* eslint-disable max-len */
/* global require */
import React from 'react';
import {View, StyleSheet, Image} from 'react-native';
import List from '../components/List';
import Constants from 'expo-constants';
import {MediaProvider} from '../contexts/MediaContext';


// const Home = () => {
//   return (
//     <View>
//       <View>
//         <Image source={require('../cat.jpg')} style={styles.sliderImg}/>
//       </View>

//       <MediaProvider>
//         <View>
//           <List />
//         </View>
//       </MediaProvider>
//     </View>
//   );
// };
const Home = (props) => {
  const {navigation} = props;
  return (
    <View >
      <List navigation={navigation}></List>
    </View>
  );
};


export default Home;
