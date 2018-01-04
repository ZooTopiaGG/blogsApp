'use strict';

import React from 'react';
import {
  Platform,
  AppRegistry,
  Text,
  Button,
  View
} from 'react-native';

import px2dp from '../util/px2dp';

import { StackNavigator, TabNavigator, StackRouter } from 'react-navigation';
import Signin from './Sign/signin.js'
import PersonScreen from './Person/person.js'
import Signup from './Sign/signup.js'


const routerConfigs = {
  Person: { screen: PersonScreen },
  Signin: { screen: Signin },
  Signup: { screen: Signup }
}

const navigationOptionsConfigs = {
  // initialRouteName: 'Person',
  // 设置通用StackNavigator样式 
  navigationOptions: {
    headerTitle: '我',
    headerStyle: {
      height: px2dp(90),
      backgroundColor: '#1675e1',
      elevation: 0 //去阴影  IOS ：iOS下用shadowOpacity: 0。
    },
    headerTintColor: '#fff', // 设置导航条文字颜色
    headerTitleStyle: {
      color: '#fff',
      fontWeight: '400',
      fontSize:16,
      alignSelf: 'center'
    }
  },
}


// 路由功能 stackNavigator 主要是起到 路由切换
const PersonRoute = StackNavigator(routerConfigs, navigationOptionsConfigs)
// StackNavigator(routerConfigs, navigationOptionsConfigs)


// const defaultGetStateForAction = PersonRoute.router.getStateForAction;

// // console.log(defaultGetStateForAction)

// PersonRoute.router.getStateForAction = (action, state) => {
//   // 路由动作 跳转到下一个路由前触发
//   alert(action.routeName)
//   console.log(action.routeName)
//   if (state && action.type === 'Navigation/INIT') {
//     console.log(1111)
//     const routes = [
//       ...state.routes,
//       {key: 'A', routeName: 'Signin', params: { name: action.name1 }},
//       {key: 'B', routeName: 'Signup', params: { name: action.name2 }},
//       {key: 'C', routeName: 'Person', params: { name: action.name3 }},
//     ];
//     return {
//       ...state,
//       routes,
//       index: routes.length - 1,
//     };
//   }
//   console.log(defaultGetStateForAction(action, state))
//   return defaultGetStateForAction(action, state);
// };

export default PersonRoute