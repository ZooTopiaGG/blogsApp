//导入actions
import * as TYPES from './type.js'

// reducer 文件就是起到更新 state 的作用嘛，所以我们将改变 文字 的逻辑放到这里，
// 当reducer 匹配到当前的点击行为为 CHANGE_TEXT 时，就执行相应的操作，
// 返回一个新的 state 给我们使用，如果匹配不到，那么就默认返回一个不变的新 state：

//初始化值

const initialState = {
    angular: 0,
    react: 0,
    vuejs: 0
};

const mutionsReducer = ( state = initialState, actions ) => {
  const newState = state
  const text = actions.text
  //判断actions的类型
  switch (actions.type) {
    case 'CHANGE_TEXT':
      return {
        ...newState,
        text: text
      }
    default:
      return {
        ...newState,
        text: state.text
      }
  }
}

export default mutionsReducer