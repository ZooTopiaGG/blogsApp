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
import NonewsRoute from '../Nothing/noNews.js'
import px2dp from '../../util/px2dp';

// 路由功能 stackNavigator 主要是起到 路由切换
// const MessageRoute = StackNavigator({
//   Nonews: {
//     screen: NonewsRoute,

//   },
// }, { // 设置通用StackNavigator样式 
//   navigationOptions: {
//     headerTitle: '消息',
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
// })

// export default MessageRoute

export default class MessageScreen extends Component {
  static navigationOptions = ({ navigate }) => {
    return {
      headerTitle: '消息',
      headerTitleStyle: {
        color: '#fff',
        fontWeight: '400',
        fontSize:16,
        alignSelf: 'center'
      },
      headLeft: null
    }
  }
  render () {
    return (
      <NonewsRoute />
    )
  }
}
