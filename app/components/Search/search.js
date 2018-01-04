'use strict';

import React, { Component } from 'react';
import {
  Platform,
  AppRegistry,
  Text,
  Button,
  View
} from 'react-native';

import { StackNavigator } from 'react-navigation';
import NoopenRoute from '../Nothing/noOpen.js'
import px2dp from '../../util/px2dp';

// const routerConfigs = {
//   Nonews: {
//     screen: NoopenRoute,
//   },
// }

// const navigationConfigs = { // 设置通用StackNavigator样式 
//   navigationOptions: {
//     headerTitle: '发现',
//     headerStyle: {
//       height: px2dp(90),
//       backgroundColor: '#1675e1',
//       elevation: 0 //去阴影  IOS ：iOS下用shadowOpacity: 0。
//     },
//     headerTintColor: '#fff', // 设置导航条文字颜色
//     headerTitleStyle: {
//       color: '#fff',
//       fontWeight: '400',
//       fontSize:16,
//       alignSelf: 'center'
//     }
//   },
// }

// // 路由功能 stackNavigator 主要是起到 路由切换
// const SearchRoute = StackNavigator(routerConfigs, navigationConfigs)

// export default SearchRoute


export default class SearchScreen extends Component {
  static navigationOptions = ({ navigation }) => {
    // navigation.navigate 解构
    const { navigate } = navigation;
    return {
      headerTitle: '发现',
      // headerRight: (
      //   <Text style={{ color: '#fff', paddingRight: px2dp(40), fontSize:16 }} onPress={() => navigate('Signup')}>注册</Text>
      // ),
      // headerTitleStyle: {
      //   alignSelf: null,
      //   color: '#fff',
      //   fontWeight: '400',
      //   fontSize:16,
      // },
      // tabBarVisible: false
    }
  }
  render () {
    return (
      <NoopenRoute />
    )
  }
}

