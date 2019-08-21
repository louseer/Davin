
import { OPTIONTYPE } from '../core/constants.js'
import {
  _legend,
  _name,
  _radius,
  _show,
  _textStyle
} from './echarts.js'
export const options = {
  tooltip: {
    "type":OPTIONTYPE.GROUP,
    "noview":true,
    "children":{
      formatter:{
        type:OPTIONTYPE.NOVIEW,
        defaultVal:"{a} <br/>{b}: {c} ({d}%)"
      } 
    }
  },
  legend: _legend(),
  series:{
    "type":OPTIONTYPE.GROUP,
    "name":"数据系列",
    "children":{
      "name":_name("系列名称"),
      "type":{
        type:OPTIONTYPE.NOVIEW,
        defaultVal:'pie'
      },
      "radius":_radius(['50%', '70%']),
      "label":{
        "name":"标签",
        "type":OPTIONTYPE.GROUP,
        children:{
          normal:{
            "type":OPTIONTYPE.GROUP,
            "noview":true,
            "children":{
              show:_show(true),
              position:{
                name:"位置",
                type:OPTIONTYPE.SELECT,
                defaultVal:'outside',
                options:[
                  {label:"扇区外侧",value:'outside'},
                  {label:"扇区内侧",value:'inside'},
                  {label:"中心",value:'center'}
                ]
              }
            }
          },
          emphasis:{
            "type":OPTIONTYPE.GROUP,
            "noview":true,
            "children":{
              show: {
                "name":"选中时突出显示",
                "type":OPTIONTYPE.SWITCH,
                "defaultVal":true,
              },
              textStyle:_textStyle("突出样式")
            }
          }
        }
      },
      'labelLine':{
        "type":OPTIONTYPE.NOVIEW,
        "defaultVal":{
            normal: {
              show: false
          }
        }
      }
    }
  }
}


export const defaultData = [
  {value:335, name:'直接访问'},
  {value:310, name:'邮件营销'},
  {value:234, name:'联盟广告'},
  {value:135, name:'视频广告'},
  {value:1548, name:'搜索引擎'}
]
