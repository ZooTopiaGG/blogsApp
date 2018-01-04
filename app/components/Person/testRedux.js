'use strict';

import React, { Component } from 'react';

import {
  StyleSheet,
  View,
} from 'react-native';

// 引用外部文件
import Redux  from './person.js'
import { Provider } from 'react-redux'
import configStore from '../../redux/store.js'

console.log(Redux)
console.log(Provider)

// 定义store对象
const store = configStore()

console.log(store)

class testRedux extends Component {
  render() {
    return (
      // 第一层包装 让Redux 组件 获取到store对象 然后回到Redux 进行操作
      <Provider store={ store }>
        <Redux />
      </Provider>
    );
  }
}

export default testRedux;
