'use strict';

import React, { Component } from 'react';

// 如果需要用stylesheet 使用px2dp 需要再次引入
import px2dp from '../../util/px2dp';

import {
  StyleSheet,
  View,
  Text,
  Button,
  ScrollView,
  Dimensions,
  Image
} from 'react-native';

import AwesomeIcon from 'react-native-vector-icons/FontAwesome';

export default class MusicRoute extends React.Component {
  render() {
    // const { navigate } = this.props.navigation
    return (
      <ScrollView style={{ flex: 1, backgroundColor: '#fff' }}>
        <View style={{ position: 'relative', width: Dimensions.get('window').width, height: px2dp(340), display: 'flex', justifyContent: 'center' }}>
          <Image source={require('../../assets/52.png')} style={{ position: 'absolute', left: 0, top: 0, width: Dimensions.get('window').width, 
          height: px2dp(340), resizeMode:'cover' }}/>
          <View style={{ display: 'flex', flexDirection: 'row', marginLeft: px2dp(60), alignItems: 'center' }}>
            <Image source={require('../../assets/1069.png')} style={{ width:px2dp(175), height: px2dp(175), borderRadius: 4 }}/>
            <Text style={styles.uname}>邓鹏</Text>
          </View>
        </View>
        <View style={{ display: 'flex', flexDirection: 'row', justifyContent:'space-between', paddingLeft: px2dp(40), paddingRight: px2dp(40), 
        height: px2dp(100), alignItems: 'center', borderBottomWidth: 1, borderColor:'#e1e1e1', borderStyle: 'solid' }}>
          <AwesomeIcon name="pencil-square" size={px2dp(64)} style={{ color:'#1675e1' }}/>
          <Text style={{flex: 1, marginLeft: px2dp(30)}}>博主文章</Text>
          <AwesomeIcon name="chevron-right" size={px2dp(32)} style={{ color:'#bbb' }}/>
        </View>
        <View style={{ backgroundColor:'#f7f7f7', height: px2dp(30) }}></View>
        <View>
          <View style={{ display: 'flex', flexDirection: 'row', justifyContent:'space-between', paddingLeft: px2dp(40), paddingRight: px2dp(40), 
          height: px2dp(100), alignItems: 'center', borderBottomWidth: 1, borderColor:'#e1e1e1', borderStyle: 'solid' }}>
            <AwesomeIcon name="envelope-square" size={px2dp(64)} style={{ color:'#EB6F5A' }}/>
            <Text style={{flex: 1, marginLeft: px2dp(30)}}>意见反馈</Text>
            <AwesomeIcon name="chevron-right" size={px2dp(32)} style={{ color:'#bbb' }}/>
          </View>
          <View style={{ display: 'flex', flexDirection: 'row', justifyContent:'space-between', paddingLeft: px2dp(40), paddingRight: px2dp(40), 
          height: px2dp(100), alignItems: 'center', borderBottomWidth: 1, borderColor:'#e1e1e1', borderStyle: 'solid' }}>
            <AwesomeIcon name="exclamation-circle" size={px2dp(64)} style={{ color:'#FFB138' }}/>
            <Text style={{flex: 1, marginLeft: px2dp(30)}}>使用帮助</Text>
            <AwesomeIcon name="chevron-right" size={px2dp(32)} style={{ color:'#bbb' }}/>
          </View>
          <View style={{ display: 'flex', flexDirection: 'row', justifyContent:'space-between', paddingLeft: px2dp(40), paddingRight: px2dp(40), 
          height: px2dp(100), alignItems: 'center', borderBottomWidth: 1, borderColor:'#e1e1e1', borderStyle: 'solid' }}>
            <AwesomeIcon name="external-link-square" size={px2dp(64)} style={{ color:'#3EABFF' }}/>
            <Text style={{flex: 1, marginLeft: px2dp(30)}}>联系博主</Text>
            <AwesomeIcon name="chevron-right" size={px2dp(32)} style={{ color:'#bbb' }}/>
          </View>
        </View>

        {/*<View style={{ marginBottom: 20 }}>
          <Button
            onPress={() => navigate('InfoAndNone', { user: 'Lucy`s' , mode: 'info'})}
            title="InfoAndNone with 邓鹏"
          />
        </View>*/}
      </ScrollView>
    );
  }
}

let styles = StyleSheet.create({
  uname: {
    color: '#fff',
    marginLeft: px2dp(20),
    fontSize: 20
  }
})
