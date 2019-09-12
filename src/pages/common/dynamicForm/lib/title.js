import { OPTIONTYPE } from '../core/constants.js'
import {
  _fontSize,
  _color
} from './echarts.js'

const options = {
  id:{
    name:"id",
    type:OPTIONTYPE.NOVIEW,
    defaultVal:"",//TODO:自动编号
  },
  title:{
    name:"名称",
    type:OPTIONTYPE.NOVIEW,
    defaultVal:"通用标题",
  },
  type:{
    name:"类型",
    type:OPTIONTYPE.NOVIEW,
    defaultVal:"title",
  },
  options:{ //echarts官方配置项
    name:"图表配置",
    type:OPTIONTYPE.GROUP,
    noview:1,
    children:{
      text:{
        "name":"标题",
        "type":OPTIONTYPE.INPUT, //文字输入框
        "defaultVal":"自定义标题"
      },
      fontSize:_fontSize(),
      color: _color()
    }
  }
}

export default {
  options
}