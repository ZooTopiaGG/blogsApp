import * as TYPES from './type.js'
// 初始化CHANGE_TEXT对象

export const changeText = (text) => {
  return {
    type: TYPES.CHANGE_TEXT,
    text,
    key: new Date() // 获取不一样的key值
  }
}