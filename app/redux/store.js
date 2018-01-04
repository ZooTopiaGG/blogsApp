
// 引入 createStore 方法
import { createStore } from 'redux'
// import mutaionsReducer from './reducer'
var mutaionsReducer = require('./reducer.js').default

export default () => {
  // const mutaionsReducer = mutaionsReducer
  // 根据 mutationsReducer 初始化 store
  const store = createStore(mutaionsReducer)
  return store
}
