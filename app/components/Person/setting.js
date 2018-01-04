'use strict';

import React, { Component } from 'react';

// 如果需要用stylesheet 使用px2dp 需要再次引入
import fn from '../../util/common';
import px2dp from '../../util/px2dp';

import {
  StyleSheet,
  View,
  Text,
  Button,
  ScrollView,
  Dimensions,
  TouchableOpacity,
  Image,
  AsyncStorage,
} from 'react-native';

import AwesomeIcon from 'react-native-vector-icons/FontAwesome';
import ButtonCustom from '../Custom/button'

var STORAGE_KEY = 'I_AM_KEY';

export default class SettingScreen extends React.Component {
  constructor(props) {
    super(props);
  
    this.state = {
      isLogin: true
    };
  }
  static navigationOptions = ({ navigate }) => {
    return {
      headerTitle: '设置',
      headerRight: (
        <Text></Text>
      )
    }
  }
 // 获取
  async _get() {
      console.log('Demo._get()');
      try {// try catch 捕获异步执行的异常
          var value = await AsyncStorage.getItem(STORAGE_KEY);
          console.log(value)
          if (value !== null){
              console.log('_get() success: ' ,value);
          } else {
              console.log('_get() no data');
          }
      } catch (error) {
          console.log('_get() error: ',error.message);
      }
  }

  // 保存
  async _save(value) {
      console.log('Demo._save()');
      try {
          await AsyncStorage.setItem(STORAGE_KEY, value);
          console.log('_save success: ',value);
      } catch (error) {
          console.log('_save error: ',error.message);
      }
  }

  // 删除
  async _remove() {
      console.log('Demo._remove()');
      try {
          await AsyncStorage.removeItem(STORAGE_KEY);
          console.log('_remove() success');
      } catch (error) {
          console.log('_remove() error: ', error.message);
      }
  }
  _loginout() {
    const { navigate } = this.props.navigation
    storage.remove({
      key: 'loginState'
    })
    console.log(storage)
    navigate('Person')
  }
  componentDidMount () {
    // 判断是否登录
    storage.load({
      key: 'loginState'
    })
    .then(ret => {
      this.setState({
        isLogin: true
      })
    })
    .catch(err => { 
      console.log(err.message) 
      this.setState({
        isLogin: false
      })
    })
  }
  render() {
    const { navigate } = this.props.navigation
    if (this.state.isLogin) {
      return (
        <ScrollView style={{ flex: 1, backgroundColor: '#fff' }}>
          <View style={{ alignItems:'center', marginTop: px2dp(100) }}>
            <ButtonCustom
            buttonTitle="退出登录"
            buttonFunc={ () => this._loginout() }
            buttonStyle={{ width:px2dp(690), height:px2dp(100), backgroundColor:'red', borderRadius:px2dp(6), justifyContent: 'center',
             alignItems: 'center'}}
            textStyle={{ color: '#fff' }}
            />
          </View>
        </ScrollView>
      );
    } else {
      return (
        <ScrollView style={{ flex: 1, backgroundColor: '#fff' }}>
          <View style={{ alignItems:'center', marginTop: px2dp(100) }}>
            <ButtonCustom
            buttonTitle="前往登录"
            buttonFunc={ () => navigate('Signin') }
            buttonStyle={{ width:px2dp(690), height:px2dp(100), backgroundColor:'#1675e1', borderRadius:px2dp(6), justifyContent: 'center',
             alignItems: 'center'}}
            textStyle={{ color: '#fff' }}
            />
          </View>
        </ScrollView>
      );
    }
    
  }
}

