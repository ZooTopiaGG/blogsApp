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
  Image
} from 'react-native';

import AwesomeIcon from 'react-native-vector-icons/FontAwesome';

class IsLogin extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      status: false,
      userinfo: {
        name: '',
        email: '',
        avatar: 'http://api.55lover.com/static/web/uploads/8dfedc858a913.jpg',
        desc: '',
        company: ''
      }
    };
  }

  async _getInfo () {
    const { state } = this.props.navigation
    let response = await fetch('http://api.55lover.com/api/getInfo/'+ state.params.id, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    })
    // console.log(response)
    let responseJson = await response.json();
    // console.log(responseJson)
    this.setState({
      status: state.params.status,
      userinfo: responseJson.result,
    })
  }

  async _storage () {
    var d = new Date()
    var d1 = d.getTime()
    console.log(d1)
    try{
      let ret = await storage.load({
        key: 'loginState',
      })
      var d2 = d.getTime()
      console.log(d2)
      this.setState({ 
        userinfo: ret.result,
        status: true
      })
    }
    catch(err) {
      this.setState({ 
        status: false
      });
      MessageBarManager.showAlert({
        message: '未登录或者登录信息已过期',
        alertType: 'info',
      })
    }
    
  }
  componentDidMount () {
    // const { state } = this.props.navigation
    // if (state.params.from == 'update') {
    //   console.log(`_getInfo success`)
    //   this._getInfo()
    // } else {
    //   // 读取
    //   this._storage()
    // }
    this._storage()
    // // 替代方案 // 登录信息
    // const { state } = this.props.navigation
    // if (state.params && state.params.id) { // id 不存在 表示没登陆
    //   this._getInfo()
    //   return
    // } else {
    //   // this.setState({
    //   //   status: false
    //   // })
    // }
  }
  render() {
    const { navigate } = this.props.navigation
    if (this.state.status) {
      return (
        <View>
          <View style={{ backgroundColor:'#f7f7f7', height: px2dp(30) }}></View>
          <View style={{ position: 'relative', width: Dimensions.get('window').width, height: px2dp(340), display: 'flex', justifyContent: 'center'
          }}>
            <Image source={require('../../assets/52.png')} style={{ position: 'absolute', left: 0, top: 0, width: Dimensions.get('window').width, 
            height: px2dp(340), resizeMode:'cover' }}/>
            <View style={{ display: 'flex', flexDirection: 'row', marginLeft: px2dp(40), alignItems: 'center', marginRight: px2dp(40) }}>
              <Image source={{uri: this.state.userinfo.avatar }} style={{ width:px2dp(130), height: px2dp(130), borderRadius: 4 }}/>
              <View style={{ flex: 1 }}>
                <Text style={[styles.uname, { fontSize: 24 }]}>{ this.state.userinfo.name } <Text style={{ fontSize: 14 }}>{ this.state.userinfo.company }</Text></Text>
                <Text style={[styles.uname, { fontSize: 14 }]}>{ this.state.userinfo.email }</Text>
              </View>
              <AwesomeIcon name="pencil-square-o" size={px2dp(64)} style={{ color:'#fff' }} onPress={() => {
                navigate('Information', { id: this.state.userinfo.id })
              }}/>
            </View>
            <View style={{ marginLeft: px2dp(40), marginRight: px2dp(40), marginTop: px2dp(40)}}>
              <Text style={{ color:'#fff' }}>个人介绍： { this.state.userinfo.desc }</Text>
            </View>
          </View>
          <View style={{ backgroundColor:'#f7f7f7', height: px2dp(30) }}></View>
        </View>
      )
    } else {
      return (
        <TouchableOpacity
          activeOpacity={0.9}
          onPress={() => {
            navigate('Signin')
          }}
        >
          <View style={{ backgroundColor:'#f7f7f7', height: px2dp(30) }}></View>
          <View style={{ position: 'relative', width: Dimensions.get('window').width, height: px2dp(340), display: 'flex', justifyContent: 'center' }}>
            <Image source={require('../../assets/52.png')} style={{ position: 'absolute', left: 0, top: 0, width: Dimensions.get('window').width, 
            height: px2dp(340), resizeMode:'cover' }}/>
            <View style={{ display: 'flex', flexDirection: 'row', marginLeft: px2dp(60), alignItems: 'center' }}>
              <Image source={require('../../assets/1069.png')} style={{ width:px2dp(140), height: px2dp(140), borderRadius: 4 }}/>
              <View>
                <Text style={styles.uname}>登录/注册</Text>
                <Text style={{ fontSize:14, color:"#fff", marginLeft: px2dp(20) }}>登录后，可查看更多信息</Text>
              </View>
            </View>
          </View>
          <View style={{ backgroundColor:'#f7f7f7', height: px2dp(30) }}></View>
        </TouchableOpacity>
      )
    }
  }
}

export default class PersonScreen extends React.Component {
  constructor(props) {
    super(props);
  }
  static navigationOptions = ({ navigate }) => {
    return {
      headerTitle: '我',
    }
  }
  render() {
    const { navigate } = this.props.navigation
    return (
      <ScrollView style={{ flex: 1, backgroundColor: '#fff' }}>
        <IsLogin {...this.props}/>
        <TouchableOpacity
          activeOpacity={1}
          onPress={() => {
            navigate('Technology')
          }}
        >
        <View style={{ display: 'flex', flexDirection: 'row', justifyContent:'space-between', paddingLeft: px2dp(40), paddingRight: px2dp(40), 
        height: px2dp(100), alignItems: 'center', borderBottomWidth: 1, borderColor:'#e1e1e1', borderStyle: 'solid' }}>
          <AwesomeIcon name="pencil-square" size={px2dp(64)} style={{ color:'#1675e1' }}/>
          <Text style={{flex: 1, marginLeft: px2dp(30)}}>博主精选</Text>
          <AwesomeIcon name="chevron-right" size={px2dp(32)} style={{ color:'#bbb' }}/>
        </View>
        </TouchableOpacity>
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
        <View style={{ backgroundColor:'#f7f7f7', height: px2dp(30) }}></View>
        <TouchableOpacity
          activeOpacity={1}
          onPress={() => {
            navigate('Setting')
          }}
        >
          <View style={{ display: 'flex', flexDirection: 'row', justifyContent:'space-between', paddingLeft: px2dp(40), paddingRight: px2dp(40), 
          height: px2dp(100), alignItems: 'center', borderBottomWidth: 1, borderColor:'#e1e1e1', borderStyle: 'solid' }}
          >
            <AwesomeIcon name="gear" size={px2dp(64)} style={{ color:'#1675e1' }}/>
            <Text style={{flex: 1, marginLeft: px2dp(30)}} >设置</Text>
            <AwesomeIcon name="chevron-right" size={px2dp(32)} style={{ color:'#bbb' }}/>
          </View>
        </TouchableOpacity>
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
