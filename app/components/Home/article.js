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
  TouchableOpacity
} from 'react-native';

import AwesomeIcon from 'react-native-vector-icons/FontAwesome';

export default class ArticleRoute extends Component {
  constructor(props) {
    super(props);
    this.state = {
      result: [],
      opacity: 0.8,
    };
  }
  // async await 异步操作 
  async getArticleRequest () {
    try {
      // 注意这里的await语句，其所在的函数必须有async关键字声明
      let response = await fetch('http://api.55lover.com/api/getArticle', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          page:1,
          size:20,
          columntype:0,
        })
      })
      let responseJson = await response.json();
      this.setState((resultState) => {
        return {
          result : responseJson.result
        }
      })
      // return responseJson
    } catch(error) {
      console.error(error)
    }
  }
  componentDidMount () {
    this.getArticleRequest()
  }
  render() {
    const { navigate, goBack, setParams  } = this.props.navigation
    return (
      <ScrollView style={{ flex: 1, backgroundColor: '#fff' }}>
        {
          this.state.result.map((val, index) => {
            return (
              <TouchableOpacity 
              activeOpacity= { this.state.opacity }
              key={ val.id } 
              onPress={() => { 
                navigate('Details', { id: val.id, headerTitle: val.title })
              }}
              >
              <View 
              style={{ paddingLeft: px2dp(30), paddingRight: px2dp(30), paddingTop: px2dp(30), paddingBottom: px2dp(30), borderBottomWidth: 1, borderColor:'#e1e1e1', borderStyle: 'solid' }}>
                <View style={{ flexDirection: 'column',marginBottom:px2dp(30)}}>
                  <Text numberOfLines={2} style={{ color: '#444', fontSize: 16 }}>{ val.title }</Text>
                  <Text style={{marginTop:px2dp(10), fontSize: 12, color: '#999'}}>邓鹏 / 文章 / {val.type==1 ? '转载': '原创'} / { fn.getCommonTime(val.createAt) }  阅读量：{val.viewcount} </Text>
                </View>
                <View style={{ display: 'flex', flexDirection: 'row', justifyContent:'space-between', alignItems: 'center', width: px2dp(460)}}>
                  <Text numberOfLines={5} style={{ width: px2dp(460) }}>{ val.desc }</Text>
                  <Image source={{uri: val.smallimg }} style={{ width:px2dp(200), height: px2dp(160), marginLeft: px2dp(30) }}/>
                </View>
              </View>
              </TouchableOpacity>
            )
          })
        }
      </ScrollView>
    );
  }
}

