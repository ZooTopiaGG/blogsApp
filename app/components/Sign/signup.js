'use strict';

import React, { Component } from 'react';

import {
  StyleSheet,
  View,
  Button,
  Image,
  Text,
  TextInput,
  ScrollView
} from 'react-native';
import ButtonCustom from '../Custom/button'
import px2dp from '../../util/px2dp';


class FetchScreen extends Component {
  constructor(props) {
    super(props);
  
    this.state = {
      password: '',
      password1: '',
      name: '',
      email: '',
      gender: ''
    };
  }
  static navigationOptions = ({ navigation }) => {
    const { navigate , goBack } = navigation;
    return {
      headerTitle: '注册',
      headerRight: (
        <Text style={{ color: '#fff', paddingRight: px2dp(40), fontSize:16 }} onPress={() => goBack() }>登录</Text>
      ),
      headerTitleStyle: {
        alignSelf: null,
        color: '#fff',
        fontWeight: '400',
        fontSize:16,
      },
      // tabBarVisible: false
    }
  }
  async _toSignup () {
    if (!this.state.name) {
      this.refs.toast.show('用户名不能为空');
      return
    }
    if (!this.state.email) {
      this.refs.toast.show('邮箱不能为空');
      return
    }
    if (!this.state.gender) {
      this.refs.toast.show('性别不能为空');
      return
    }
    if (!this.state.password) {
      this.refs.toast.show('密码不能为空');
      return
    }
    if (!this.state.password1) {
      this.refs.toast.show('密码不能为空');
      return
    }
    try {
      // 注意这里的await语句，其所在的函数必须有async关键字声明
      let response = await fetch('http://api.55lover.com/api/signup/', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: this.state.name,
          password: this.state.password,
          password1: this.state.password1,
          gender: this.state.gender,
          email: this.state.email,
        })
      })
      const { goBack } = this.props.navigation;
      let responseJson = await response.json();
      console.log(responseJson)
      if (responseJson.isSuc) {
        goBack()
      } else {
        this.refs.toast.show(`注册失败，${responseJson.message}`);
      }
      
    } catch(error) {
      console.error(error)
    }
  }
  componentDidMount() {
    // this.getPromiseRequest()
    // this.getAsyncRequest()
  }
  render() {
    return (
     <View style={{ flex:1, backgroundColor: '#1675e1', paddingLeft: px2dp(40) ,paddingRight: px2dp(40), paddingTop: px2dp(160) }}>
        <ScrollView>
          <View style={{ marginTop:20 }}>
            <TextInput
              style={{ borderColor: '#eee', height:px2dp(100), borderWidth: 1, borderBottomWidth: 0, borderTopLeftRadius: px2dp(4), 
              borderTopRightRadius: px2dp(4), backgroundColor: '#fff', paddingLeft: px2dp(20) }}
              multiline = {false}
              underlineColorAndroid="transparent"
              keyboardType='default'
              placeholder='请输入姓名'
              placeholderTextColor='#999'
              onChangeText={(name) => {
                this.setState({
                  name
                })
              }}
            />
          </View>
          <View>
            <TextInput
              style={{ height:px2dp(100), backgroundColor: '#fff', paddingLeft: px2dp(20) }}
              multiline = {false}
              underlineColorAndroid="transparent"
              keyboardType='email-address'
              placeholder='请输入邮箱'
              placeholderTextColor='#999'
              onChangeText={(email) => {
                this.setState({
                  email
                })
              }}
            />
          </View>
          <View>
            <TextInput
              style={{ borderColor: '#eee', height:px2dp(100), borderWidth: 1, borderBottomWidth: 0, backgroundColor: '#fff', paddingLeft: px2dp(20) }}
              multiline = {false}
              underlineColorAndroid="transparent"
              keyboardType='email-address'
              placeholder='请输入性别'
              placeholderTextColor='#999'
              onChangeText={(gender) => {
                this.setState({
                  gender
                })
              }}
            />
          </View>
          <View>
            <TextInput
              secureTextEntry={true}
              style={{borderColor: '#eee', height:px2dp(100), borderWidth: 1, borderBottomWidth: 0, backgroundColor: '#fff', paddingLeft: px2dp(20) }}
              multiline = {false}
              underlineColorAndroid="transparent"
              placeholder='请输入密码'
              placeholderTextColor='#999'
              onChangeText={(password) => {
                this.setState({
                  password
                })
              }}
            />
          </View>
           <View>
            <TextInput
              secureTextEntry={true}
              style={{ borderColor: '#eee', height:px2dp(100), borderWidth: 1, borderTopWidth: 0,  borderBottomRightRadius: px2dp(4),
              borderBottomLeftRadius: px2dp(4), backgroundColor: '#fff', paddingLeft: px2dp(20) }}
              multiline = {false}
              underlineColorAndroid="transparent"
              placeholder='请确认密码'
              placeholderTextColor='#999'
              onChangeText={(password1) => {
                this.setState({
                  password1
                })
              }}
              value={this.state.password1}
            />
          </View>
          <View style={{ marginTop:30 }}>
              <ButtonCustom 
                buttonTitle="注册"
                buttonFunc={ () => this._toSignup() }
                buttonStyle={{ width:'100%', height:px2dp(100), backgroundColor:'#fff', borderRadius:px2dp(6), justifyContent: 'center',
                 alignItems: 'center'}}
                textStyle={{ color: '#1675e1', fontSize:20 }}
              />
          </View>
        </ScrollView>
        <Toast ref='toast'
        position='center'
         />
     </View>
    );
  }
}

const styles = StyleSheet.create({
  info: {
    display: 'flex',
    flexDirection: 'column'
  },
});


export default FetchScreen;