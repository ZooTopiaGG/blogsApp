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

import px2dp from '../../util/px2dp';

import ButtonCustom from '../Custom/button'
import { TabNavigator, NavigationActions } from 'react-navigation';

class FetchScreen extends Component {
  constructor(props) {
    super(props);
  
    this.state = {
      name: '',
      password: '',
      visible: false
    };


  }
  static navigationOptions = ({ navigation }) => {
    // console.log(navigation)
    // navigation.navigate 解构
    const { navigate } = navigation;
    return {
      headerTitle: '登录',
      headerRight: (
        <Text style={{ color: '#fff', paddingRight: px2dp(40), fontSize:16 }} onPress={() => navigate('Signup')}>注册</Text>
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
  
  // async await 异步操作 
  async _toLogin () {
    console.log(storage)
    this.setState({
      visible: !this.state.visible
    })  
    if (!this.state.name) {
      this.refs.toast.show('用户名不能为空');
      return
    }
    if (!this.state.password) {
      this.refs.toast.show('密码不能为空');
      return
    }
    try {
      // 注意这里的await语句，其所在的函数必须有async关键字声明
      let response = await fetch('http://api.55lover.com/api/login/', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: this.state.name,
          password: this.state.password
        })
      })
      const { goBack, navigate } = this.props.navigation;
      let responseJson = await response.json();
      console.log(responseJson)
      if (responseJson.isSuc) {
        // this.refs.toast.show(`登录成功，${ this.state.name }，欢迎使用55lover`);
        // 存储登录信息
        storage.save({
          key: 'loginState',   // Note: Do not use underscore("_") in key!
          data: { 
            from: 'login',
            id: responseJson.result.id,
            result: responseJson.result
          },
          expires: 1000 * 3600
        });
        console.log(storage)
        setTimeout(() => {
          this.setState({
            visible: !this.state.visible
          })
          navigate('Person', { id: responseJson.result.id, status: true })
        }, 1000)
      } else {
        this.setState({
          visible: !this.state.visible
        })
        this.refs.toast.show(`登录失败，${ responseJson.message }`);
      }
      
    } catch(error) {
      console.error(error)
    }
  }
  render() {
    return (
     <View style={{ flex:1, backgroundColor: '#1675e1', paddingLeft: px2dp(40) ,paddingRight: px2dp(40), paddingTop: px2dp(160) }}>
        <ScrollView>
          <View style={{ marginTop:20 }}>
            <TextInput
              style={{  height:px2dp(100), borderTopLeftRadius: px2dp(4), 
              borderTopRightRadius: px2dp(4), backgroundColor: '#fff', paddingLeft: px2dp(20) }}
              multiline = {false}
              underlineColorAndroid="transparent"
              keyboardType='email-address'
              placeholder='请输入用户名或邮箱'
              placeholderTextColor='#999'
              onChangeText={(name) => {
                this.setState({
                  name
                })
              }}
              value={this.state.name}
            />
          </View>
           <View>
            <TextInput
              secureTextEntry={true}
              style={{ borderColor: '#eee', height:px2dp(100), borderWidth: 1, borderBottomRightRadius: px2dp(4),
              borderBottomLeftRadius: px2dp(4), backgroundColor: '#fff', paddingLeft: px2dp(20) }}
              multiline = {false}
              underlineColorAndroid="transparent"
              placeholder='请输入密码'
              placeholderTextColor='#999'
              onChangeText={(password) => {
                this.setState({
                  password
                })
              }}
              value={this.state.password}
            />
          </View>
          <View style={{ marginTop:30 }}>
              <ButtonCustom 
                buttonTitle="登录"
                buttonFunc={ () => this._toLogin() }
                buttonStyle={{ width:'100%', height:px2dp(100), backgroundColor:'#fff', borderRadius:px2dp(6), justifyContent: 'center',
                 alignItems: 'center'}}
                textStyle={{ color: '#1675e1', fontSize:20 }}
              />
          </View>
        </ScrollView>
        <Toast ref="toast"
        position='center'
         />
         <Spinner visible={this.state.visible}  overlayColor="rgba(0,0,0,0.2)" 
        color="#1675e1"
        size="large"
        >
        </Spinner>
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