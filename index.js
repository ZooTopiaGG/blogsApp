import React, { Component } from 'react';
import { AppRegistry } from 'react-native';
import Navigation from './app/components/app';
import SplashScreen from 'react-native-smart-splash-screen'
// import App from './App';
// import px2dp from './app/util/px2dp';
window.px2dp = require('./app/util/px2dp')

export default class MyBlogApp extends Component {
  componentDidMount () {
    //SplashScreen.close(SplashScreen.animationType.scale, 850, 500)
    SplashScreen.close({
      animationType: SplashScreen.animationType.scale,
      duration: 850,
      delay: 500,
    })
  }
  render() {
    return (
        <Navigation />
    );
  }
}

AppRegistry.registerComponent('MyBlogApp', () => MyBlogApp);
