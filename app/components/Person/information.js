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
  TextInput,
  Image
} from 'react-native';

import AwesomeIcon from 'react-native-vector-icons/FontAwesome';
import ImagePicker from 'react-native-image-crop-picker';
import ButtonCustom from '../Custom/button'

export default class InformationScreen extends React.Component {
  constructor(props) {
    super(props);
  
    this.state = {
      status: true,
      avatar: 'http://api.55lover.com/static/web/uploads/8dfedc858a913.jpg',
      serverAvatar: '',
      gender: '',
      borndate: '',
      site: '',
      company: '',
      desc: '',
      visible: false
    };
  }

  static navigationOptions = ({ navigation }) => {
    return {
      headerTitle: '个人资料',
      headerRight: (
        <Text></Text>
      )
    }
  }
  async _uploadImg () {
    let image = await ImagePicker.openPicker({
      width: 300,
      height: 300,
      cropping: true
    })
    // console.log(image);
    this.setState({
      avatar: image.path
    })
    let formData = new FormData();
    let file = {uri: image.path, type:'multipart/form-data', name:'image.png'};
    formData.append("imgFile", file);
    try {
      let response = await fetch("http://api.55lover.com/api/upload", {
        method: 'POST',
        headers: {
          'Content-Type': 'multipart/form-data;charset=utf-8'
        },
        body: formData
      });
      // let response = await fn.fetchAjax('api/upload', 'POST', formData)
      let responseJson = await response.json();
      // console.log(responseJson.imgUrl)
      this.setState({
        serverAvatar: responseJson.imgUrl
      })
    } catch (err) {}
  }
  // 提交信息
  async _promptInfo () {
    this.setState({
      visible: !this.state.visible
    })
    let { state, navigate } = this.props.navigation
    if (this.state.gender == '男') {
      var gender = 1
    } else {
      var gender = 0
    }
    if (!this.state.serverAvatar) {
      this.refs.toast.show('头像不能为空')
      return
    }
    if (!this.state.borndate) {
      this.refs.toast.show('出生日期不能为空')
      return
    }
    if (!this.state.company) {
      this.refs.toast.show('公司名称不能为空')
      return
    }
    if (!this.state.desc) {
      this.refs.toast.show('个人介绍不能为空')
      return
    }
    var para = {
      id: state.params.id,
      avatar: this.state.serverAvatar,
      gender: gender,
      borndate: this.state.borndate,
      company: this.state.company,
      desc: this.state.desc,
      site: this.state.site
    }
    // console.log(para)
    let response = await fetch('http://api.55lover.com/api/updateInfo', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(para)
    })
    let responseJson = await response.json();
    this.setState({
      visible: !this.state.visible
    })
    console.log(responseJson)
    // ok了
    await storage.save({
      key: 'loginState',   // Note: Do not use underscore("_") in key!
      data: { 
        from: 'update',
        id: responseJson.result.id,
        result: responseJson.result
      },
      expires: 1000 * 3600
    });
    navigate('Person', { id: responseJson.result.id , status: true, from: 'update'})
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
    if (responseJson.result.gender == 1) {
      var gender = '男'
    } else {
      var gender = '女'
    }
    this.setState({
      serverAvatar: responseJson.result.avatar,
      avatar: responseJson.result.avatar,
      gender: gender,
      borndate: responseJson.result.borndate,
      company: responseJson.result.company,
      desc: responseJson.result.desc,
      site: responseJson.result.site
    })
  }
  componentDidMount () {
    this._getInfo()
  }
  render() {
    const { navigate } = this.props.navigation
    return (
      <ScrollView style={{ flex: 1, backgroundColor: '#fff' }}>
        <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingLeft:px2dp(30), paddingRight: px2dp(30), borderBottomWidth:1,
        borderColor: '#eee', paddingTop: px2dp(20), paddingBottom: px2dp(20) }}>
          <Text><Text style={{ color: 'red' }}>*</Text>头像</Text>
          {/*<Button title="上传调用"
            color="#1675e1"
            onPress={ () => {
              this._uploadImg()
            }}
          />*/}
          <TouchableOpacity style={{ borderColor: '#eee', borderWidth: 1, width:px2dp(140), height: px2dp(140) }} onPress={() => { this._uploadImg() }}>
            <Image source={{uri: this.state.avatar }} style={{ width:px2dp(140), height: px2dp(140) }}/>
          </TouchableOpacity>
        </View>
        <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', paddingLeft:px2dp(30), paddingRight: px2dp(30), borderBottomWidth:1,
        borderColor: '#eee' }}>
          <Text><Text style={{ color: 'red' }}>*</Text>性别</Text>
          <TextInput
            style={{ borderWidth: 0, textAlignVertical: 'center', flex: 1, textAlign: 'right' }}
            underlineColorAndroid="transparent"
            keyboardType='default'
            placeholder= '输入性别'
            placeholderTextColor='#999'
            onChangeText={(gender) => {
             this.setState({
              gender
             })
            }}
            value={this.state.gender}
          />
        </View>
        <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', paddingLeft:px2dp(30), paddingRight: px2dp(30), borderBottomWidth:1,
        borderColor: '#eee' }}>
          <Text><Text style={{ color: 'red' }}>*</Text>出生日期</Text>
          <TextInput
            style={{ borderWidth: 0, textAlignVertical: 'center', flex: 1, textAlign: 'right' }}
            underlineColorAndroid="transparent"
            keyboardType='default'
            placeholder= '输入出生日期'
            placeholderTextColor='#999'
            onChangeText={(borndate) => {
             this.setState({
              borndate
             })
            }}
            value={this.state.borndate}
          />
        </View>
        <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', paddingLeft:px2dp(30), paddingRight: px2dp(30), borderBottomWidth:1,
        borderColor: '#eee' }}>
          <Text><Text style={{ color: 'red' }}>*</Text>公司名称</Text>
          <TextInput
            style={{ borderWidth: 0, textAlignVertical: 'center', flex: 1, textAlign: 'right' }}
            underlineColorAndroid="transparent"
            keyboardType='default'
            placeholder= '输入公司名称'
            placeholderTextColor='#999'
            onChangeText={(company) => {
             this.setState({
              company
             })
            }}
            value={this.state.company}
          />
        </View>
        <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', paddingLeft:px2dp(30), paddingRight: px2dp(30), borderBottomWidth:1,
        borderColor: '#eee' }}>
          <Text><Text style={{ color: 'red' }}>*</Text>个人介绍</Text>
          <TextInput
            style={{ borderWidth: 0, textAlignVertical: 'top', flex: 1, textAlign: 'right' }}
            multiline = {true}
            numberOfLines = {4}
            underlineColorAndroid="transparent"
            keyboardType='default'
            placeholder= '输入个人介绍(100字以内)'
            placeholderTextColor='#999'
            onChangeText={(desc) => {
             this.setState({
              desc
             })
            }}
            value={this.state.desc}
          />
        </View>
        <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', paddingLeft:px2dp(30), paddingRight: px2dp(30), borderBottomWidth:1,
        borderColor: '#eee' }}>
          <Text><Text style={{ color: 'red' }}> </Text>个人网站</Text>
          <TextInput
            style={{ borderWidth: 0, textAlignVertical: 'center', flex: 1, textAlign: 'right' }}
            underlineColorAndroid="transparent"
            keyboardType='default'
            placeholder= '输入个人网站'
            placeholderTextColor='#999'
            onChangeText={(site) => {
             this.setState({
              site
             })
            }}
            value={this.state.site}
          />

        </View>
         <View style={{ paddingLeft:px2dp(30), paddingRight: px2dp(30), marginTop: px2dp(60)}}>
          <ButtonCustom  
            buttonTitle="提交信息"
            buttonFunc={ () => { this._promptInfo() } }
            buttonStyle={{ width:px2dp(690), height:px2dp(100), backgroundColor:'#1675e1', borderRadius:px2dp(6), justifyContent: 'center',
             alignItems: 'center'}}
            textStyle={{ color: '#fff' }}
          />
        </View>
        <Toast ref="toast"
        position='center'
        />
        <Spinner visible={this.state.visible}  overlayColor="rgba(0,0,0,0.2)" 
        color="#1675e1"
        size="large"
        >
        </Spinner>
      </ScrollView>
    );
  }
}
