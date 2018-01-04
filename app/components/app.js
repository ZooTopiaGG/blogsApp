'use strict';

import React, { Component } from 'react';
import {
  Platform,
  View,
  StatusBar,
  StyleSheet,
  AsyncStorage
} from 'react-native';

// const instructions = Platform.select({
//   ios: 'Press Cmd+R to reload,\n' +
//     'Cmd+D or shake for dev menu',
//   android: 'Double tap R on your keyboard to reload,\n' +
//     'Shake or press menu button for dev menu',
// });
import px2dp from '../util/px2dp';
// import px2dp from './app/util/px2dp';

import Spinner from 'react-native-loading-spinner-overlay';

global.Spinner = Spinner;

global.MessageBarAlert = require('react-native-message-bar').MessageBar;
global.MessageBarManager = require('react-native-message-bar').MessageBarManager;
import TabBarNavigatorScreen from './tabBarNavigator.js';
import Toast from 'react-native-easy-toast';
global.Toast = Toast;
global.DURATION = require('react-native-easy-toast').DURATION;

import Storage from 'react-native-storage';
// console.log(1)
// console.log(AsyncStorage.setItem('res', 'ahahah'))
// console.log(2)
// console.log(AsyncStorage.getItem('res'))
global.storage = new Storage({
  // 最大容量，默认值1000条数据循环存储
  size: 1000,

  // 存储引擎：对于RN使用AsyncStorage，对于web使用window.localStorage
  // 如果不指定则数据只会保存在内存中，重启后即丢失
  storageBackend: AsyncStorage,
    
  // 数据过期时间，默认一整天（1000 * 3600 * 24 毫秒）* 1(天数)，设为null则永不过期
  defaultExpires: 1000 * 3600 * 24 * 7,
    
  // 读写时在内存中缓存数据。默认启用。
  enableCache: true,
    
  // 如果storage中没有相应数据，或数据已过期，
  // 则会调用相应的sync方法，无缝返回最新数据。
  // sync方法的具体说明会在后文提到
  // 你可以在构造函数这里就写好sync的方法
  // 或是在任何时候，直接对storage.sync进行赋值修改
  // 或是写到另一个文件里，这里require引入
  // sync: require('你可以另外写一个文件专门处理sync')  
  sync : {
    // we'll talk about the details later.
  }
})

export default class MyBlogApp extends Component {

  componentDidMount() {
    // Toast.registerToast(this.refs.toast)
    MessageBarManager.registerMessageBar(this.refs.alert);
    // this.getPromiseRequest()
    // this.getAsyncRequest()
  }
  componentWillUnmount() {
    // Remove the alert located on this master page from the manager
    MessageBarManager.unregisterMessageBar();
  }
  render() {
    return (
      <View style={ styles.container }>
        <TabBarNavigatorScreen />
        <StatusBar
        hidden={false}
        backgroundColor={'#1675e1'}
        />
        <MessageBarAlert ref="alert" />
        {/*<Toast ref="toast" />*/}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
})

