'use strict';

import React, { Component } from 'react';

import {
  StyleSheet,
  View,
  Text
} from 'react-native';

import { TabNavigator, NavigationActions, StackNavigator } from 'react-navigation';
import AwesomeIcon from 'react-native-vector-icons/FontAwesome';
import px2dp from '../util/px2dp';

import PersonScreen from './Person/person.js'
// import PersonScreen from './router.config.js'
import HomeScreen from './Home/home.js'
import SearchScreen from './Search/search.js'
import MessageScreen from './Message/message.js'
import SigninScreen from './Sign/signin.js'
import SignupScreen from './Sign/signup.js'
import InformationScreen from './Person/information.js'
import SettingScreen from './Person/setting.js'
import ArticleRoute from './Home/article'
import DynamicRoute from './Home/dynamic'
import MusicRoute from './Home/music'
import DetailsScreen from './Home/details'
import TechnologyRoute from './Home/technology'

const TabBarNavigatorScreen = TabNavigator({
  Home: { 
    screen: HomeScreen,
    path:'app/home',
    navigationOptions: {
      header: null,
      tabBarLabel: '首页',
      tabBarIcon: ({ tintColor, focused }) => (
        <AwesomeIcon
          name="home"
          style={{ color: tintColor }}
          size={px2dp(54)}
        />
      ),
    },
  },
  Search: { 
    screen: SearchScreen,
    path:'app/search',
    navigationOptions: {
      headerLeft: null,
     
      tabBarLabel: '发现',
      tabBarIcon: ({ tintColor, focused }) => (
        <AwesomeIcon
          name="compass"
          style={{ color: tintColor }}
          size={px2dp(54)}
        />
      ),
    },
  },
  Message: { 
    screen: MessageScreen,
    path:'app/message',
    navigationOptions: {
      headerLeft: null,
     
      tabBarLabel: '消息',
      tabBarIcon: ({ tintColor, focused }) => (
        <AwesomeIcon
          name="bell"
          style={{ color: tintColor }}
          size={px2dp(46)}
        />
      ),
    },
  },
  Person: { 
    screen: PersonScreen,
    path:'app/person',
    navigationOptions: {
      headerLeft: null,
      tabBarLabel: '我',
      tabBarIcon: ({ tintColor, focused }) => (
        <AwesomeIcon
          name="user-circle"
          size={px2dp(48)}
          style={{ color: tintColor }}
        />
      ),
    },
  }, 
}, {
    // initialRouteName: 'Home',
    tabBarPosition: 'bottom', // 显示在底端，android 默认是显示在页面顶端的
    animationEnabled: false, // 切换页面时是否有动画效果
    swipeEnabled: false, // 是否可以左右滑动切换tab
    backBehavior: 'none', // 按 back 键是否跳转到第一个Tab(首页)， none 为不跳转
    tabBarOptions: {
      activeTintColor: '#1675e1', // 文字和图片选中颜色
      inactiveTintColor: '#7f8389', // 文字和图片未选中颜色
      showIcon: true,
      labelStyle: {
        fontSize: 11, 
        marginTop: 0 // 设置文字样式
      },
      indicatorStyle: {
        height: 0, // 如TabBar下面显示有一条线，可以设高度为0后隐藏
      },
      style: {
          backgroundColor: '#fff', // TabBar 背景色
          height: 50
      },
    },
});

// 路由列表
const Components = {
  Signin: { screen: SigninScreen, path:'app/signin' },
  Signup: { screen: SignupScreen, path:'app/signup' },
  Search: { screen: SearchScreen, path:'app/search' },
  Message: { screen: MessageScreen, path:'app/message' },
  Home: { screen: HomeScreen, path:'app/home' },
  Article: { screen: ArticleRoute, path:'app/article' },
  Technology: { screen: TechnologyRoute, path:'app/technology' },
  Details: { screen: DetailsScreen, path:'app/article/details/:userid' },
  Information: { screen: InformationScreen, path:'app/Person/infomation' },
  Setting: { screen: SettingScreen, path:'app/Person/setting' },
}


// 注册路由
const NewRoute = StackNavigator({
  NewHome: {
    screen: TabBarNavigatorScreen,
    path: 'app/newhome',
   
  },
  ...Components
}, {
  // 设置主page navigationOptions 参数
  navigationOptions: { 
    // headerTitle: '公用', // 不能设置 不然会覆盖子路由标题
    headerStyle: {
      height: px2dp(90),
      backgroundColor: '#1675e1',
      elevation: 0 //去阴影  IOS ：iOS下用shadowOpacity: 0。
    },
    // headerBackTitle: null,
    headerTintColor: '#fff', // 设置导航条文字颜色
    headerTitleStyle: {
      color: '#fff',
      fontWeight: '400',
      fontSize:16,
      alignSelf: 'center'
    }
  },
  mode: 'card'
})

export default NewRoute;