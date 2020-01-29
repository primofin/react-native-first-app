// Navigator.js
/* eslint-disable react/display-name */
import Home from '../views/Home';
import Profile from '../views/Profile';
import Single from '../views/Single';
import AuthLoading from '../views/AuthLoading';
import Login from '../views/Login';
import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import {createBottomTabNavigator} from 'react-navigation-tabs';
import {createStackNavigator} from 'react-navigation-stack';
import React from 'react';
import {Icon} from 'native-base';

const TabNavigator = createBottomTabNavigator(
    {
      Home,
      Profile,
    },
    {
      defaultNavigationOptions: ({navigation}) => ({
        tabBarIcon: () => {
          const {routeName} = navigation.state;
          let iconName;
          if (routeName === 'Home') {
            iconName = 'home';
          } else if (routeName === 'Profile') {
            iconName = 'person';
          }

          // You can return any component that you like here!
          return <Icon
            name={iconName}
            size={25}
          />;
        },
      }),
      tabBarOptions: {
        activeTintColor: '#000',
      },
    },
);

TabNavigator.navigationOptions = ({navigation}) => {
  const {routeName} = navigation.state.routes[navigation.state.index];

  // You can do whatever you like here to pick the title based on the route name
  const headerTitle = routeName;

  return {
    headerTitle,
  };
};

const StackNavigator = createStackNavigator(
    // RouteConfigs
    {
      Home: {
        screen: TabNavigator,
        navigationOptions: {
          headerMode: 'none', // this will hide the header
        },
      },
      Single: {
        screen: Single,
      },
      Logout: {
        screen: Login,
      },
    },
);

const Navigator = createSwitchNavigator(
    {
      AuthLoading: AuthLoading,
      App: StackNavigator,
      Auth: Login,
    },
    {
      initialRouteName: 'AuthLoading',
    },
);

export default createAppContainer(Navigator);


// Another way to change the header of the Profile
// const ProfileNavigator = createStackNavigator({
//   Profile: {
//     screen: Profile,
//   },
// });
// const StackNavigator = createStackNavigator(
//     // RouteConfigs
//     {
//       Home: {
//         screen: Home,
//         navigationOptions: {
//           headerMode: 'none', // this will hide the header
//         },
//       },
//       Single: {
//         screen: Single,
//       },
//     },
// );

// const TabNavigator = createBottomTabNavigator(
//     {
//       Home: {
//         screen: StackNavigator,
//       },
//       Profile: {
//         screen: ProfileNavigator,
//       },
//     },
//     {
//       defaultNavigationOptions: ({navigation}) => ({
//         tabBarIcon: () => {
//           const {routeName} = navigation.state;
//           let iconName;
//           if (routeName === 'Home') {
//             iconName = 'home';
//           } else if (routeName === 'Profile') {
//             iconName = 'person';
//           }

//           // You can return any component that you like here!
//           return <Icon
//             name={iconName}
//             size={25}
//           />;
//         },
//       }),
//     },
// );

// const Navigator = createSwitchNavigator(
//     {
//       AuthLoading: AuthLoading,
//       App: TabNavigator,
//       Auth: Login,
//     },
//     {
//       initialRouteName: 'AuthLoading',
//     },
// );

// export default createAppContainer(Navigator);
