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
  Image,
  TextInput
} from 'react-native';

import AwesomeIcon from 'react-native-vector-icons/FontAwesome';
import ButtonCustom from '../Custom/button'

export default class DynamicRoute extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = {
      text: '',
      placeholder: '输入评论',
      result: [],
      touserid: 'd17692be-eca7-41ef-87df-aef4313e2b02', // m如果没有设置，则默认管理员
      tousername: '邓鹏', // 如果没有设置，则默认管理员
      isreply: 0
    };
  }
  // async await 异步操作 
  async getDynamicRequest () {
    try {
      // 注意这里的await语句，其所在的函数必须有async关键字声明
      let response = await fetch('http://47.93.97.52:8088/api/getDynamicList')
      let responseJson = await response.json();
      responseJson.result.forEach(val => {
        val.placeholder = '输入评论',
        val.text = ''
      })
      // console.log(responseJson)
      this.setState((resultState) => {
        return {
          result : responseJson.result,
        }
      })
      // return responseJson
    } catch(error) {
      console.error(error)
    }
  }
  async _publicDynamic(index, val) {
    const { navigate } = this.props.navigation
    try {
      let res = await storage.load({
        key: 'loginState'
      })
      var para = {
        dynamicid: val.id,
        userid: res.result.id, // 登录用户
        username: res.result.name, // 登录用户
        touserid: this.state.touserid || 'd17692be-eca7-41ef-87df-aef4313e2b02', // 默认管理员 'd17692be-eca7-41ef-87df-aef4313e2b02',
        tousername: this.state.tousername || '邓鹏', // 默认管理员 '邓鹏',
        isreply: this.state.isreply || 0,
        comment: val.text
      }
      let response = await fetch('http://api.55lover.com/api/addComments', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(para)
      })
      let responseJson = await response.json();
      this.refs.toast.show('发布成功')
      if (responseJson.isSuc) {
        this.getDynamicRequest()
      }
      return responseJson
    }
    catch (err) {
      this.refs.toast.show('未登录或者登录信息已过期')
      navigate('Signin')
    }
  }
  componentDidMount () {
    this.getDynamicRequest()
  }
  render() {
    // const { navigate } = this.props.navigation
    return (
      <View style={{ flex: 1, backgroundColor: '#fff' }}>
      <ScrollView >
        {
          this.state.result.map((val, index) => {
            return (
              <View key={ val.id } style={{ paddingLeft: px2dp(30), paddingRight: px2dp(30), paddingTop: px2dp(30), paddingBottom: px2dp(30), borderBottomWidth: 1, 
                borderColor:'#e1e1e1', borderStyle: 'solid' }}>
                <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
                  <Image source={require('../../assets/401d0002e863aa27e41e.jpg')} style={{ width:px2dp(80), height: px2dp(80), marginRight: px2dp(30), 
                    borderRadius: px2dp(6) }}/>
                  <Text numberOfLines={5} style={{ flex: 1 }}>亲密的羊角升荣</Text>
                  <Text style={{ color: '#1675e1' }} onPress={() => {
                    val.placeholder = '输入评论';
                    this.setState({
                      placeholder: '输入评论',
                      isreply: 0,
                      touserid: 'd17692be-eca7-41ef-87df-aef4313e2b02',
                      tousername: '邓鹏'
                    })
                  }}>评论</Text>
                </View>
                <View style={{ flexDirection: 'column', marginBottom: px2dp(30), marginTop: px2dp(30)}}>
                  <Text style={{ color: '#444', fontSize: 16 }}>{ val.content }</Text>
                  <Text style={{marginTop:px2dp(10), fontSize: 12, color: '#999'}}>发布时间：{ fn.getCommonTime(val.createAt) }  浏览次数：153 </Text>
                </View>
                {
                  val.commentsList.map((val1, index1) => {
                    return (
                      <View key={ index1 }  style={{ display: 'flex', flexDirection: 'row', width:px2dp(690) }}>
                        <Text >
                          <Text style={{ color:'#1675e1' }}>{val1.username}</Text>{ val1.isreply == 1 ? <Text>回复<Text style={{ color:'#1675e1' }}>{val1.tousername}</Text></Text> : null}：
                          <Text style={{ paddingRight: px2dp(20) }}>{ val1.comment }</Text>
                          <Text style={{ color: '#1675e1', marginLeft: px2dp(20), marginRight: px2dp(20) }}
                            onPress= { () => {
                              val.placeholder = `回复${ val1.username }:`;
                              this.setState({
                                placeholder: `回复${ val1.username }:`,
                                isreply: 1,
                                touserid: val1.userid,
                                tousername: val1.username
                              })
                            }}
                          >    回复</Text>
                          <Text>    { fn.getCommonTime(val1.createAt) }</Text>
                        </Text>
                      </View>
                    )
                  })
                }
                
                <View style={{ flexDirection: 'column', marginTop: px2dp(30)}}>
                  <TextInput
                    style={{ borderColor: '#eee', borderWidth: 1, borderRadius: px2dp(4), textAlignVertical: 'top' }}
                    multiline = {true}
                    numberOfLines = {4}
                    underlineColorAndroid="transparent"
                    keyboardType='default'
                    placeholder= { val.placeholder }
                    placeholderTextColor='#999'
                    onChangeText={(text) => {
                      val.text = text // 赋值个单个 val对象
                      this.setState({
                        text: val.text
                      })
                    }}
                    value={val.text}
                  />
                </View>
                <View style={{ marginTop: px2dp(20), alignItems: 'flex-end'}}>
                  <ButtonCustom
                  buttonTitle="发布评论"
                  buttonFunc={ () => this._publicDynamic(index, val) }
                  buttonStyle={{ width:px2dp(200), height:px2dp(80), backgroundColor:'#1675e1', borderRadius:px2dp(6), justifyContent: 'center',
                   alignItems: 'center'}}
                  textStyle={{ color: '#fff' }}
                  />
                </View>
              </View>
            )
          })
        }
      </ScrollView>
      <Toast ref='toast'
        position='center'
         />
      </View>
    );
  }
}

