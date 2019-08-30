import { OPTIONTYPE } from '../core/constants.js'
import {
  _center,
  _axisPointer,
  _angleAxis,
  _radiusAxis,
  _animationDuration

} from './echarts.js'

export const options = {
  id:{
    name:"id",
    type:OPTIONTYPE.NOVIEW,
    defaultVal:"",//TODO:自动编号
  },
  title:{
    name:"名称",
    type:OPTIONTYPE.NOVIEW,
    defaultVal:"极坐标双数值轴",
  },
  type:{
    name:"id",
    type:OPTIONTYPE.NOVIEW,
    defaultVal:"polar",
  },
  options:{ //echarts官方配置项
    name:"图表配置",
    type:OPTIONTYPE.GROUP,
    noview:1,
    children:{
      id:{
        name:"id",
        type:OPTIONTYPE.NOVIEW,
        defaultVal:"",//TODO:自动编号
      },
      polar: {
        type:OPTIONTYPE.GROUP,
        name:'极坐标',
        noview:true,
        children:{
          center:_center(['50%', '54%'])
        }
      },
      angleAxis: _angleAxis({startAngle: 0}),
      radiusAxis: _radiusAxis({min: 0}),
      tooltip: {
        type:OPTIONTYPE.GROUP,
        noview:true,
        name:'提示框',
        children:{
          trigger:{
            type:OPTIONTYPE.NOVIEW,
            defaultVal:'axis'
          },
          axisPointer:_axisPointer({type: 'cross'})
        }
      },
      series: {
        type:OPTIONTYPE.LIST,
        name:'系列',
        "children":[
          {
            type:OPTIONTYPE.GROUP,
            noview:1,
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
  }
}

export default {options}