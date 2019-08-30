import { OPTIONTYPE } from '../core/constants.js'

export const HORIZONTAL = "horizontal"; //横向
export const VERTICAL = "vertical"; //纵向



export const _textStyle = (name='文本') => {
  return {
    name,
    "type":OPTIONTYPE.GROUP,
    "children":{
      "fontSize": _fontSize(),
      "color": _color(),
      "fontWeight": _fontWeight()
    }
  }
}

export const _legend = () => {
  return {
    "name":"图例",
    "type":OPTIONTYPE.GROUP,
    "children":{
      show:show(),
      orient:orient(),
      position:position(),
      itemGap:itemGap(),
      textStyle:textStyle()
    }
  }
}


export const _grid = () => {
  return {
    "name":"栅格",
    "type":OPTIONTYPE.GROUP,
    "children":{
      show:_show(),
      orient:_orient(),
      position:_position(),
      itemGap:_itemGap(),
      textStyle:_textStyle()
    }
  }
}

export const _xAxis = () => {
  return {
    "name":"X轴",
    "type":OPTIONTYPE.GROUP,
    "children":{
      show:_show(),
      textStyle:_textStyle(),
      type:_type(),
      name:_name("X轴"),
      nameTextStyle:_textStyle(),
      axisLine:_axisLine()
    }
  }
}

export const _yAxis = () => {
  return {
    "name":"Y轴",
    "type":OPTIONTYPE.GROUP,
    "children":{
      show:_show(),
      textStyle:_textStyle(),
      type:_type(),
      name:_name("Y轴"),
      nameTextStyle:_textStyle(),
      axisLine:_axisLine()
    }
  }
}

export const _polar = () => {
  return {
    "name":"极坐标系",
    "type":OPTIONTYPE.GROUP,
    "children":{
      center:_center(),
      axisLine:_axisLine()
    }
  }
}

export const _angleAxis = ({startAngle = 90} = {}) => {
  return {
    "name":"角度轴",
    "type":OPTIONTYPE.GROUP,
    "children":{
      startAngle :_startAngle (startAngle),
      clockwise:_clockwise(),
      axisLine:_axisLine()
    }
  }
}

export const _radiusAxis = ({min=null} = {}) => {
  return {
    "name":"半径轴",
    "type":OPTIONTYPE.GROUP,
    "children":{
      nameTextStyle :_textStyle (),
      axisLine:_axisLine({lineStyle:{type:"dashed"}}),
      min:{
        type:OPTIONTYPE.NOVIEW,
        defaultVal:min
      }
    }
  }
}

export const _animationDuration = (defaultVal = 0) => {
  return {
    "name":"初始动画时长",
    "type":OPTIONTYPE.INPUTNUMBER,
    defaultVal,
    "min":0,
    "max":10000,
    "step":1000
  }
}

export const _radius = (defaultVal = [0, '75%']) => {
  return {
    "name":"内外径",
    "type":OPTIONTYPE.RANGESLIDER,
    defaultVal 
  }
}

export const _axisLabel = () => {
  return {
    "name":"刻度标签",
    "type":OPTIONTYPE.GROUP,
    "children":{
      show :_show (),
      rotate:_rotate()
    }
  }
}

export const _axisLine = ({lineStyle} = {}) => {
  return {
    "name":"轴线",
    "type":OPTIONTYPE.GROUP,
    "children":{
      show :_show (),
      lineStyle:_lineStyle(lineStyle)
    }
  }
}

export const _lineStyle = ({color,width,type} = {}) => {
  return {
    "name":"轴线样式",
    "type":OPTIONTYPE.GROUP,
    "children":{
      color :_color (color),
      width: _width (width),
      type:_lineType(type)
    }
  }
}

export const _radar = () => {
  return {
    "name":"雷达样式",
    "type":OPTIONTYPE.GROUP,
    "children":{
      startAngle:_startAngle(),
      name:{
        "name":"标签样式",
        "type":OPTIONTYPE.GROUP,
        "children":{
          textStyle:_textStyle()
        }
      },
      axisLine:_axisLine({lineStyle:{type:"dashed"}})
    }
  }
}

export const _tooltip =() =>{
  return {
    "name":"提示框",
    "type":OPTIONTYPE.GROUP,
    "children":{
      width: _width (),
      type:_lineType(),
      textStyle:_textStyle()
    }
  }
}



//适用在tooltip内
export const _axisPointer = ({type} = {}) => {
  return {
    "name":"轴线指示器",
    "type":OPTIONTYPE.GROUP,
    "children":{
      show:_show(),
      type:_pointerType(type),
      label:{
        "name":"文本标签",
        "type":OPTIONTYPE.GROUP,
        "children":{
          "fontSize": _fontSize(),
          "color": _color(),
          "fontWeight": _fontWeight(),
          backgroundColor:{
            "name":"背景色",
            "type":OPTIONTYPE.COLORPICKER,
          }
        }
      },
      lineStyle:_lineStyle()
    }
  }
}


export const _pointerType = (defaultVal='line') => {
  return {
    "name":"类型",
    "type":OPTIONTYPE.SELECT,
    defaultVal,
    options:[
      {value:'line',label:"直线指示器"},
      {value:'shadow',label:"阴影指示器"},
      {value:'none',label:"无指示器"},
      {value:'cross',label:"十字准星指示器"}
    ]
  }
}




export const _width = (defaultVal = 1) => {
  return {
    "name":"线宽",
    "type":OPTIONTYPE.INPUTNUMBER,
    defaultVal,
    min:1
  }
}

export const _lineType = (defaultVal='solid') => {
  return {
    "name":"轴线类型",
    "type":OPTIONTYPE.SELECT,
    defaultVal,
    options:[
      {"label":"实线","value":"solid"},
      {"label":"虚线","value":"dashed"},
      {"label":"点状","value":"dotted"}
    ]
  }
}

export const _fontSize = (defaultVal = 12) => {
  return {
    "name":"字号",
    "type":OPTIONTYPE.INPUTNUMBER,
    defaultVal,
    "step":"1"
  }
}

export const _color = (defaultVal = "#333") => {
  return {
    "name":"颜色",
		"type":OPTIONTYPE.COLORPICKER,
    defaultVal
  }
}

export const _fontWeight = (defaultVal = 'normal') => {
  return {
    "name":"粗细",
    "type":OPTIONTYPE.SELECT,
    defaultVal,
    "options": [
      {"lable":"Normal","value":"normal"},
      {"lable":"Bold","value":"bold"},
      {"lable":"Bolder","value":"bolder"},
      {"lable":"Lighter","value":"lighter"},
      {"lable":"100","value":"100"},
      {"lable":"200","value":"200"},
      {"lable":"300","value":"300"},
      {"lable":"400","value":"400"},
      {"lable":"500","value":"500"},
      {"lable":"600","value":"600"},
      {"lable":"700","value":"700"},
      {"lable":"800","value":"800"},
      {"lable":"900","value":"900"}
    ]
  }
}


export const _show = (defaultVal = false) => {
  return {
    "name":"显示/隐藏",
		"type":OPTIONTYPE.SWITCH,
    defaultVal
  }
}

export const _orient = () => {
  return {
    "name":"排列",
		"type":OPTIONTYPE.RADIO,
    "defaultVal":HORIZONTAL,
    "options":[
      {"lable":"横向","value":HORIZONTAL},
      {"lable":"纵向","value":VERTICAL}
    ],
    "handle":'gridOrientChange'
  }
}

export const _position = () => {
  const defaultVal = "{'left':'center','top':'top'}";
  return {
    "name":"位置",
		"type":OPTIONTYPE.SELECT,
    defaultVal,
    "options":[
      {"lable":"顶部居左","value":"{'left':'left','top':'top'}","hidewhen":VERTICAL},
      {"lable":"顶部居中","value":"{'left':'center','top':'top'}","hidewhen":VERTICAL},
      {"lable":"顶部居右","value":"{'left':'right','top':'top'}","hidewhen":VERTICAL},
      {"lable":"底部居中","value":"{'left':'left','top':'bottom'}","hidewhen":VERTICAL},
      {"lable":"底部居中","value":"{'left':'center','top':'bottom'}","hidewhen":VERTICAL},
      {"lable":"底部居中","value":"{'left':'right','top':'bottom'}","hidewhen":VERTICAL},
      {"lable":"左侧居上","value":"{'left':'left','top':'top'}","hidewhen":HORIZONTAL},
      {"lable":"左侧居中","value":"{'left':'left','top':'middle'}","hidewhen":HORIZONTAL},
      {"lable":"左侧居下","value":"{'left':'left','top':'bottom'}","hidewhen":HORIZONTAL},
      {"lable":"右侧居上","value":"{'left':'right','top':'top'}","hidewhen":HORIZONTAL},
      {"lable":"右侧居中","value":"{'left':'right','top':'middle'}","hidewhen":HORIZONTAL},
      {"lable":"右侧居下","value":"{'left':'right','top':'bottom'}","hidewhen":HORIZONTAL},
    ]
  }
}

export const _itemGap = (defaultVal = 10) => {
  return {
    "name":"间距",
		"type":OPTIONTYPE.SLIDER,
    defaultVal,
    "min":10,
    "max":1000,
    "step":10
  }
}


export const _left = () => {
  const defaultVal = 10
  return {
    "name":"左边距",
    "type":OPTIONTYPE.SLIDER,
    defaultVal,
    "unit":"%",
    min:0,
    max:100,
    step:1
  }
}

export const _right = () => {
  const defaultVal = 10
  return {
    "name":"右边距",
    "type":OPTIONTYPE.SLIDER,
    defaultVal,
    "unit":"%",
    min:0,
    max:100,
    step:1
  }
}

export const _top = () => {
  const defaultVal = 10
  return {
    "name":"上边距",
    "type":OPTIONTYPE.SLIDER,
    defaultVal,
    "unit":"%",
    min:0,
    max:100,
    step:1
  }
}

export const _bottom = () => {
  const defaultVal = 10
  return {
    "name":"下边距",
    "type":OPTIONTYPE.SLIDER,
    defaultVal,
    "unit":"%",
    min:0,
    max:100,
    step:1
  }
}

export const _type = () => {
  return {
    "name":"轴类型",
		"type":OPTIONTYPE.SELECT,
    "defaultVal":'',
    "options":[
      {"lable":"数值","value":"value"},
      {"lable":"类目","value":"category"},
      {"lable":"时间","value":"time"},
      {"lable":"对数","value":"log"}
    ]
  }
}

export const _name = (defaultVal='名称') => {
  return {
    "name":"名称",
		"type":OPTIONTYPE.INPUT,
    defaultVal
  }
}

export const _startAngle = (defaultVal = 90) => {
  return {
    "name":"起始角度",
    "type":OPTIONTYPE.INPUTNUMBER,
    defaultVal,
    "step":"1"
  }
}

export const _clockwise = () => {
  return {
    "name":"方向",
    "type":OPTIONTYPE.RADIO,
    "defaultVal":false,
    "options":[
      {label:"逆时针",value:false},
      {label:"顺时针",value:true}
    ]
  }
}

export const _center = (defaultVal = ['50%', '50%']) => {
  return {
    "name":"中心位置",
    "type":OPTIONTYPE.INPUTNUMBERS,
    defaultVal,
    unit:'%',
    min:[0,0],
    max:[100,100],
    step:[5,5],
    valueWithUnit:true
  }
}

export const _rotate = () => {
  return {
    "name":"起始角度",
    "type":OPTIONTYPE.INPUTNUMBER,
    "defaultVal":90,
    "min":-90,
    "max":90,
    "step":"1"
  }
}


export const echartHandle = {
  gridOrientChange () {

  }
}