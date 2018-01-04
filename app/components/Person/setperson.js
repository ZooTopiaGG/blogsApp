'use strict';

import React from 'react';
import {
  Platform,
  AppRegistry,
  Text,
  Button,
  View
} from 'react-native';

import { StackNavigator } from 'react-navigation';
import px2dp from '../../util/px2dp';

import PersonScreen from './person.js'
import SigninScreen from '../Sign/signin.js'
import SignupScreen from '../Sign/signup.js'

// 路由功能 stackNavigator 主要是起到 路由切换
const PersonRoute = StackNavigator({
  Person: { screen: PersonScreen }
}, { // 设置通用StackNavigator样式 
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
})

export default PersonRoute