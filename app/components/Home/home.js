'use strict';

import React, { Component  } from 'react';

import {
  Platform,
  StyleSheet,
  View,
  Text
} from 'react-native';

import { TabNavigator } from 'react-navigation';
import AwesomeIcon from 'react-native-vector-icons/FontAwesome';
import px2dp from '../../util/px2dp';
import ArticleRoute from './article'
import DynamicRoute from './dynamic'
import MusicRoute from './music'
import TechnologyRoute from './technology'

var HomeScreen;
// 判断操作系统
// TabNavigator tabbar 顶部 底部导航栏
if (Platform.OS === 'android') {
  HomeScreen = TabNavigator({
    Article: { 
      screen: ArticleRoute, // 需要引入Technology.js注册的模块 以此类推
      path:'app/home/article',
      navigationOptions: {
        tabBarLabel: '文章',
      },
    },
    Technology: { 
      screen: TechnologyRoute,
      path:'app/home/technology',
      navigationOptions: {
        tabBarLabel: '技术',
      },
    },
    Music: { 
      screen: MusicRoute,
      path:'app/home/music',
      navigationOptions: {
        tabBarLabel: '音乐',
      },
    },
    Dynamic: { 
      screen: DynamicRoute,
      path:'app/home/dynamic',
      navigationOptions: {
        tabBarLabel: '动态',
      },
    }, 
  }, {
      tabBarOptions: {
        animationEnabled: true, // 切换页面时是否有动画效果
        swipeEnabled: true, // 是否可以左右滑动切换tab
        activeTintColor: '#fff', // 文字和图片选中颜色
        inactiveTintColor: '#fff', // 文字和图片未选中颜色
        indicatorStyle: {
          // height: 0, // 如TabBar下面显示有一条线，可以设高度为0后隐藏
          // backgroundColor: '#1675e1'
        },
        style: {
            backgroundColor: '#1675e1', // TabBar 背景色
            height: px2dp(90),
        },
      },
  });
} else {
    HomeScreen = TabNavigator({
    Article: { 
      screen: ArticleRoute,
      navigationOptions: {
        title: '文章',
      },
    },
    Technology: { 
      screen: TechnologyRoute,
      navigationOptions: {
        title: '技术',
      },
    },
    Music: { 
      screen: MusicRoute,
      navigationOptions: {
        title: '音乐',
      },
    },
    Dynamic: { 
      screen: DynamicRoute,
      navigationOptions: {
        title: '动态',
      },
    }, 
  }, {
      tabBarOptions: {
        activeTintColor: '#1675e1', // 文字和图片选中颜色
        inactiveTintColor: '#888', // 文字和图片未选中颜色
        tabStyle: {
            elevation: 0 ,
        },
        indicatorStyle: {
          // height: 0, // 如TabBar下面显示有一条线，可以设高度为0后隐藏
        },
        style: {
            backgroundColor: '#fff', // TabBar 背景色
            height: px2dp(90),
        },
      },
  });
}

export default HomeScreen;