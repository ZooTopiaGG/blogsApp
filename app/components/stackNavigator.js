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
import NavigatorScreen from './navgaitor.js'
import HomeScreen from './home.js'
import FlexScreen from './flex.js'
import ScrollViewScreen from './scrollView.js'
import FlatListScreen from './flatList.js'
import FetchScreen from './fetch.js'
import IntervalScreen from './interval.js'
import SetNativePropsScreen from './setNativeProps.js'
import TabNavigatorScreen from './tabNavigator.js'
import InfoAndNoneScreen from './infoAndNone.js'

// 路由功能 stackNavigator 主要是起到 路由切换
const stackNavigator = StackNavigator({
  Home: { screen: HomeScreen },
  Navigator: { screen: NavigatorScreen },
  Flex: { screen: FlexScreen },
  ScrollView: { screen: ScrollViewScreen },
  FlatList: { screen: FlatListScreen },
  Fetch: { screen: FetchScreen },
  Interval: { screen: IntervalScreen },
  SetNativeProps: { screen:SetNativePropsScreen },
  TabNavigator: { screen:TabNavigatorScreen },
  InfoAndNone: { screen:InfoAndNoneScreen }
}, {
  navigationOptions: {  // 屏幕导航的默认选项, 也可以在组件内用 static navigationOptions 设置(会覆盖此处的设置)
    gesturesEnabled: true,
    cardStyle: {
      height: 0
    }
  },
  mode: 'card', // 路由切换模式  modal 上下切换
})

export default stackNavigator

