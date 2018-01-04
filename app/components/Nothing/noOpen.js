'use strict';

import React, { Component } from 'react';

import {
  StyleSheet,
  View,
  Text,
  Image
} from 'react-native';
// 如果需要用stylesheet 使用px2dp 需要再次引入
import px2dp from '../../util/px2dp';

export default class NoopenRoute extends React.Component {
  // static navigationOptions = {
  //   title: '信息'
  // }
  render() {
    return (
      <View style={styles.container} >
          <Image source={require('../../assets/8.png')} style={{ width: px2dp(163), height: px2dp(183) }} />
          <Text style={styles.flexTitle}>功能暂未开放哦</Text>
      </View>
    );
  }
}
// flex:1 使view 充满整个盒子
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  flexTitle: {
    marginTop: px2dp(40)
  }
});