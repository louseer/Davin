import { OPTIONTYPE } from '../core/constants.js'
import {
  _fontSize,
} from './echarts.js'

const options = {
  text:{
    "name":"标题",
    "type":OPTIONTYPE.INPUT, //文字输入框
    "defaultVal":"自定义标题"
  },
  fontSize:_fontSize()
}

export default {
  options
}