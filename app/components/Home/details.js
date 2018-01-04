'use strict';

import React, { Component } from 'react';

// 如果需要用stylesheet 使用px2dp 需要再次引入
import px2dp from '../../util/px2dp';
import fn from '../../util/common';

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

import {
  PlaceholderContainer,
  Placeholder
} from 'react-native-loading-placeholder';
import LinearGradient from 'react-native-linear-gradient';

import { NavigationActions } from 'react-navigation';
import AwesomeIcon from 'react-native-vector-icons/FontAwesome';
import HTMLView from 'react-native-render-html';

export default class DetailsScreen extends Component {
  loadingComponent: Promise<React.Element<*>>;
  loadingComponent1: Promise<*>;
  constructor(props) {
    super(props);
    // 设置初始值 以防加载出来是undefined
    this.state = {
      result: [],
      opacity: 0.6,
      content: '<div></div>',
      title: '',
      createAt: '',
      viewcount: '',
      type: 1,
      visible: true,
    };
  }
  static navigationOptions = ({ navigation, screenProps }) => {
    // 设置header left right 使其title 居中
    return {
      headerTitle: navigation.state.params?navigation.state.params.headerTitle:'详情', // 接收父页面传过来的参数值
      headerRight: (
        <Text></Text>
      )
    }
  }
  // async await 异步操作 
  async getArticleRequest () {
    let { state } = this.props.navigation
    try {
      // 注意这里的await语句，其所在的函数必须有async关键字声明
      let response = await fetch('http://api.55lover.com/api/getArticle/' + state.params.id, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      })
      let responseJson = await response.json();
      this.setState({
        result : responseJson.result,
        content: responseJson.result.content,
        title: responseJson.result.title,
        type: responseJson.result.type,
        createAt: fn.getCommonTime(responseJson.result.createAt),
        viewcount: responseJson.result.viewcount,
      })
      // return responseJson
    } catch(error) {
      console.error(error)
    }
  }
  componentDidMount () {
  };
  componentWillMount(): void {
    this.getArticleRequest()
    this.loadingComponent = new Promise(resolve => {
      setTimeout(() => {
        this.setState({
          visible: !this.state.visible,
        })
        resolve(
          <View
            style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
          >
            <View style={ styles.content }>
              <Text style={{ fontSize:20, marginBottom: px2dp(60) }}>{ this.state.title }</Text>
              <View style={ styles.info }>
                <Image source={{ uri: 'http://47.93.97.52/static/img/23115938.e2eb00d.jpg' }} style={{ width: px2dp(90), height: px2dp(90), 
                borderRadius: px2dp(90), marginRight: px2dp(40) }}/>
                <View>
                  <View style={ styles.tab }>
                    <Text style={ styles.marginR20 }>作者：邓鹏</Text> 
                    <Text>类型：{ this.state.type===1 ? '转载':'原创' }</Text>
                  </View>
                  <View style={ styles.tab }>
                    <Text style={ styles.marginR20 }>创建时间： {this.state.createAt}</Text> 
                    <Text>阅读：{ this.state.viewcount }</Text>
                  </View>
                </View>
              </View>
              <HTMLView html={ this.state.content }
                imagesMaxWidth={ px2dp(690) }
              />
            </View>
          </View>
        );
      }, 300);
    })
  }

  render() {
    return (
      <ScrollView style={{ flex: 1, backgroundColor: '#fff' }}>
        {/*<View style={ styles.content }>
          <Text style={{ fontSize:20, marginBottom: px2dp(60) }}>{ this.state.title }</Text>
          <View style={ styles.info }>
            <Image source={{ uri: 'http://47.93.97.52/static/img/23115938.e2eb00d.jpg' }} style={{ width: px2dp(90), height: px2dp(90), 
            borderRadius: px2dp(90), marginRight: px2dp(40) }}/>
            <View>
              <View style={ styles.tab }>
                <Text style={ styles.marginR20 }>作者：邓鹏</Text> 
                <Text>类型：{ this.state.type===1 ? '转载':'原创' }</Text>
              </View>
              <View style={ styles.tab }>
                <Text style={ styles.marginR20 }>创建时间： {this.state.createAt}</Text> 
                <Text>阅读：{ this.state.viewcount }</Text>
              </View>
            </View>
          </View>
          <HTMLView html={ this.state.content }
            imagesMaxWidth={ px2dp(690) }
          />
        </View>*/}
        <PlaceholderExample loader={this.loadingComponent} />
        <Spinner 
        visible={this.state.visible}  
        overlayColor="rgba(0,0,0,0.2)" 
        color="#1675e1"
        size="large"
        >
        </Spinner>
      </ScrollView>
    );
  }
}
const Gradient = (): React.Element<*> => {
  return (
    <LinearGradient
      colors={['#eeeeee', '#dddddd', '#eeeeee']}
      style={{
        flex: 1,
        width: 120
      }}
    />
  );
};

const PlaceholderExample = ({
  loader
}: {
  loader: Promise<*>
}): React.Element<*> => {
  return (
    <PlaceholderContainer
      style={styles.placeholderContainer}
      animatedComponent={<Gradient />}
      duration={2000}
      delay={1000}
      loader={loader}
    >
      <Placeholder style={[styles.placeholder, { width: '90%', height: 40, marginTop: 120 }]} />
      <View style={{ flexDirection: 'row' }}>
        <Placeholder style={[styles.placeholder, { width: 50, height: 50 }]} />
        <View
          style={{
            flexDirection: 'column',
            width: '100%',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <Placeholder
            style={[
              styles.placeholder,
              {
                width: '50%',
                height: 10
              }
            ]}
          />
          <Placeholder
            style={[
              styles.placeholder,
              {
                width: '35%',
                height: 7
              }
            ]}
          />
        </View>
      </View>

      <Placeholder
        style={[styles.placeholder, { marginTop: 20, width: '80%' }]}
      />
      <Placeholder style={[styles.placeholder, { width: '80%' }]} />
      <Placeholder style={[styles.placeholder, { width: '85%' }]} />
      <Placeholder style={[styles.placeholder, { width: '90%' }]} />
      <Placeholder style={[styles.placeholder, { width: '80%' }]} />
      <Placeholder style={[styles.placeholder, { width: '74%' }]} />
    </PlaceholderContainer>
  );
};


let styles = StyleSheet.create({
  content: {
    paddingRight: px2dp(30),
    paddingLeft: px2dp(30),
    paddingBottom: px2dp(30),
    paddingTop: px2dp(30)
  },
  info: {
    display: 'flex',
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: px2dp(40)
  },
  tab: {
    display: 'flex',
    flexDirection: 'row'
  },
  marginR20: {
    marginRight: px2dp(20)
  },

  container: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 25,
    backgroundColor: '#f6f7f8'
  },
  placeholderContainer: {
    width: '100%',
    backgroundColor: '#fff',
  },
  placeholder: {
    height: 8,
    marginTop: 6,
    marginLeft: 15,
    alignSelf: 'flex-start',
    justifyContent: 'center',
    backgroundColor: '#eeeeee'
  },
  row: {
    flexDirection: 'row',
    width: '100%'
  }
})
