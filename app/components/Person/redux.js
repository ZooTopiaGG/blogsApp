'use strict';

import React, { Component } from 'react';

import {
  StyleSheet,
  View,
  Button,
  Text
} from 'react-native';
import { connect } from 'react-redux'

class ReduxScreen extends React.Component {

  render() {
    return (
      <View>
        <Text>我是小丑，QAQ</Text>
        <Button 
          title="点击改变"
          color="#1675e1"
          onPress={onChangeText}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({

});

// 获取state变化
const mapStateToProps= (state) => {
  return {
    // 数据state 变化
    value: state.text,
  }
}

// 发送数据 dispatch 对象
const mapDispatchToProps = (dispatch) => {
  return {
    // 发送行为
    onChangeText: () => {
      dispatch(changeText('我不是小丑，TAT'))
    }
  }
}

// 进行第二次包装，生成新的组件，拥有接收和发送数据的能力 
export default connect(mapStateToProps, mapDispatchToProps)(ReduxScreen);