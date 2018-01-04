'use strict';

import React, { Component } from 'react';

import {
  StyleSheet,
  View,
  Text,
  Platform,
  TouchableOpacity,
} from 'react-native';
import px2dp from '../../util/px2dp';

export default class ButtonCustom extends Component {
  customButtonFunc () {
    const { buttonFunc } = this.props;
    buttonFunc()
  }
  render() {
    // { ， ， ， } 解构
    const { buttonTitle, buttonStyle, textStyle } = this.props;
    if (Platform.OS === 'android') {
      return (
        <View style={styles.contianer} >
          <TouchableOpacity 
            onPress={ this.customButtonFunc.bind(this) }
            style={ buttonStyle }
          >
          <Text style={ [{ textAlign: 'center' }, textStyle] }>{ buttonTitle }</Text>
          </TouchableOpacity>
        </View>
      );
    } else {
      return (
        <View style={styles.contianer} >
          <TouchableOpacity 
            onPress={ this.customButtonFunc.bind(this) }
            style={ buttonStyle }
          >
          <Text style={ [{ textAlign: 'center' }, textStyle] }>{ buttonTitle }</Text>
          </TouchableOpacity>
        </View>
      )
    }
  }
}

const styles = StyleSheet.create({
  container: {
   flex: 1
  }
});