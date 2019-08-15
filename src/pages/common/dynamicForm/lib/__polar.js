import { OPTIONTYPE } from '../core/constants.js'
import {
  _animationDuration,
} from './echarts.js'

export const options = {
  polar: {
    type:OPTIONTYPE.NOVIEW,
    children:{
      center:{
        "name":"中心位置",
        "type":OPTIONTYPE.INPUTNUMBERS,
        defaultVal:['50%', '50%'],
        min:0,
        max:100
      }
    }
  },
  tooltip: {
    type:OPTIONTYPE.GROUP,
    noview:true,
    name:'提示框',
    children:{
      trigger:{
        type:OPTIONTYPE.NOVIEW,
        defaultVal:'axis'
      },
      axisPointer:{
        "name":"轴线指示器",
        "type":OPTIONTYPE.GROUP,
        "children":{
          type:{
            "name":"类型",
            "type":OPTIONTYPE.SELECT,
            defaultVal:'cross',
            options:[
              {value:'line',label:"直线指示器"},
              {value:'shadow',label:"阴影指示器"},
              {value:'none',label:"无指示器"},
              {value:'cross',label:"十字准星指示器"}
            ]
          }
        }
      }
    }
  },
  angleAxis: {
    "name":"角度轴",
    "type":OPTIONTYPE.GROUP,
    "children":{
      startAngle :{
        "name":"起始角度",
        "type":OPTIONTYPE.INPUTNUMBER,
        defaultVal:90,
        "step":"1"
      }
    }
  },
  radiusAxis:{
    "name":"半径轴",
    "type":OPTIONTYPE.GROUP,
    "noview":true,
    "children":{
      min:{
        type:OPTIONTYPE.NOVIEW,
        defaultVal:0
      }
    }
  },
  series: {
    type:OPTIONTYPE.LIST,
    name:'系列',
    "children":[
      {
        type:OPTIONTYPE.GROUP,
        noview:true,
        children:{
          coordinateSystem:{
            type:OPTIONTYPE.NOVIEW,
            defaultVal:'polar'
          },
          name:{
            type:OPTIONTYPE.NOVIEW,
            defaultVal:'line'
          },
          type:{
            type:OPTIONTYPE.NOVIEW,
            defaultVal:'line'
          },
          showSymbol:{
            type:OPTIONTYPE.NOVIEW,
            defaultVal:'false'
          }
        }
      }
    ]
  },
  animationDuration:_animationDuration(2000)
}

export default {options}