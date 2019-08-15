import { OPTIONTYPE } from '../core/constants.js'
import { 
  REFRESH_INTERVAL,
  IMG_SOURCE_TYPE,
  IMG_SCALE_TYPE,
  BORER_TYPE,
  THEM_TYPE,
  BGIMG_BLUR,
  BGIMG_BLUR_MIN,
  BGIMG_BLUR_MAX,
  BGIMG_BLUR_STEP,
  BGIMG_OPACITY,
  BGIMG_OPACITY_MIN,
  BGIMG_OPACITY_MAX,
  BGIMG_OPACITY_STEP,
  WHITE,
  CHBK,
  COLOR_PREDEFINE
} from './constants.js'

/**
 * 独有常量
 */

const BORDER_R_GRID = 8;
const BORDER_W_GRID = 0;
const BORDER_GRID = 0;
const SHADOW_OFFSET = 11;
const SHADOW_BLUR = 3;


/**
 * 报表编辑form 表单项配置器
 */
const options = {
  "id":{
    "type":OPTIONTYPE.NOVIEW, 
    "defaultVal":""
  },
  "name":{
    "name":"报表名称",
    "type":OPTIONTYPE.INPUT, //文字输入框
    "defaultVal":"我的报表"
  },
  "brief":{
    "name":"简介",
    "type":OPTIONTYPE.TEXTAREA,
    "defaultVal":""
  },
  "isPublic":{
    "name":"是否公开",
    "type":OPTIONTYPE.SWITCH,  //切换开关
    "defaultVal":false
  },
  "autoRefresh":{
    "name":"自动刷新",
    "type":OPTIONTYPE.SWITCH,
    "defaultVal":false,
    "handle":"autoRefresh"
  },
  "refreshInterval":{
    "name":"刷新间隔",
    "type":OPTIONTYPE.INPUTNUMBER, //数字翻牌器输入框
    "defaultVal":REFRESH_INTERVAL,
    "hide":true
  },
  "them":{
    "name":"颜色主题",
    "type":OPTIONTYPE.SELECT,
    "options":THEM_TYPE,
    "defaultVal":0
  },
  "background":{
    "name":"报表背景",
    "type":OPTIONTYPE.GROUP,
    "children":{
      "imgSouce":{
        "name":"背景图",
        "type":OPTIONTYPE.RADIO,  //radio单选
        "defaultVal":0,
        "handle":"rfBgimgSwitch",
        "options":IMG_SOURCE_TYPE
      },
      "systemImg":{
        "name":"选择图片",
        "type":OPTIONTYPE.IMGSELECT,
        "hide":true,
        "defaultVal":''
      },
      "uploadImg":{
        "name":"上传图片",
        "type":OPTIONTYPE.IMGUPLOAD,
        "hide":true,
        "defaultVal":''
      },
      "imgRepeat":{
        "name":"布局",
        "type":OPTIONTYPE.SELECT,
        "defaultVal":0,
        "hide":true,
        "options":IMG_SCALE_TYPE
      },
      "imgBlur":{
        "name":"模糊度",
        "type":OPTIONTYPE.SLIDER,
        "hide":true,
        "defaultVal":BGIMG_BLUR,
        "min":BGIMG_BLUR_MIN,
        "max":BGIMG_BLUR_MAX,
        "step":BGIMG_BLUR_STEP
      },
      "imgOpacity":{
        "name":"透明度",
        "type":OPTIONTYPE.SLIDER,
        "hide":true,
        "defaultVal":BGIMG_OPACITY,
        "min":BGIMG_OPACITY_MIN,
        "max":BGIMG_OPACITY_MAX,
        "step":BGIMG_OPACITY_STEP
      },
      "bgcolor":{
        "name":"背景色",
        "type":OPTIONTYPE.COLORPICKER,
        "predefine":COLOR_PREDEFINE,
        "defaultVal":WHITE
      } 
    }
  },
  "grid":{
    "name":"Widget",
    "type":OPTIONTYPE.GROUP,
    "children":{
      "titleColor":{
        "name":"标题颜色",
        "type":OPTIONTYPE.COLORPICKER,
        "predefine":COLOR_PREDEFINE,
        "defaultVal":CHBK
      },
      "bgcolor":{
        "name":"背景色",
        "type":OPTIONTYPE.COLORPICKER,
        "predefine":COLOR_PREDEFINE,
        "defaultVal":WHITE
      } ,
      "borderRadius":{
        "name":"边框圆角",
        "type":OPTIONTYPE.INPUTNUMBER,
        "defaultVal":BORDER_R_GRID
      },
      "borderWdith":{
        "name":"边框宽度",
        "type":OPTIONTYPE.INPUTNUMBER,
        "defaultVal":BORDER_W_GRID
      },
      "borderType":{
        "name":"边框式样",
        "type":OPTIONTYPE.SELECT,
        "defaultVal":BORDER_GRID,
        "options":BORER_TYPE
      },
      "shadowOffset":{
        "name":"阴影偏移量",
        "type":OPTIONTYPE.INPUTNUMBER,
        "defaultVal":SHADOW_OFFSET
      },
      "shadowBlur":{
        "name":"阴影宽度",
        "type":OPTIONTYPE.INPUTNUMBER,
        "defaultVal":SHADOW_BLUR
      }
    }
  }
  
}

/**
 * 处理器
 * 每个选项值发生改变时，需要独立处理的回调函数。特别适用于联动、校验
 * 重要提示：handels里的函数执行时，都会将this指向以options对象生成的form表单对象，其结构与options一致。
 * 函数名 即 上面json项里面的handle值
 * 入参接收两个参数：newvalue，oldvalue
 */
const handlers = {
  autoRefresh(value){
    this.refreshInterval.hide = !value;
  },

  rfBgimgSwitch(value){
    var bgoptions = this.background.children;
    console.log("rfBgimgSwitch",bgoptions)
    bgoptions.systemImg.hide = value !== 1;
    bgoptions.uploadImg.hide = value !== 2;
    bgoptions.imgRepeat.hide = value === 0;
    bgoptions.imgBlur.hide = value === 0;
    bgoptions.imgOpacity.hide = value === 0;
  }
}

export default {options,handlers}
