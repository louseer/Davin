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
 * type = OPTIONTYPE.NOVIEW 表示此项不展示视图
 */
const options = {
  // "offset":{
  //   "type":OPTIONTYPE.NOVIEW,
  //   "defaultVal":""
  // },
  // "zoomSize":{
  //   "type":OPTIONTYPE.NOVIEW,
  //   "defaultVal":""
  // },
  "id":{
    "type":OPTIONTYPE.NOVIEW, 
    "defaultVal":""
  },
  "name":{
    "name":"大屏名称",
    "type":OPTIONTYPE.INPUT, //文字输入框
    "defaultVal":"新建大屏"
  },
  "brief":{
    "name":"简介",
    "type":OPTIONTYPE.TEXTAREA,
    "defaultVal":""
  },
  "width":{
    "name":"宽度",
    "type":OPTIONTYPE.INPUTNUMBER, //文字输入框
    "defaultVal":800
  },
  "height":{
    "name":"高度",
    "type":OPTIONTYPE.INPUTNUMBER, //文字输入框
    "defaultVal":800
  },
  'adaptive':{
    name:"屏幕适配",
    "type":OPTIONTYPE.SELECT,
    options:[
      {"label":"全屏铺满","value":0},
      {"label":"等比缩放宽度铺满","value":1},
      {"label":"等比缩放高度铺满","value":2}
    ]
  },
  "background":{
    "name":"大屏背景",
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
        "step":BGIMG_BLUR_STEP,
        attr:{
          "show-input":true
        }
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
        "defaultVal":"#464a4e"
      } 
    }
  },
  "thumbnail":{
    "name":"缩略图",
    "type":OPTIONTYPE.COVER,
    "btns":[
      {text:'截取画布',className:'',event:'intercept-canvas'},
      {text:'上传图片',className:'',event:'upload-caver'}
    ],
    "defaultVal":""
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
  rfBgimgSwitch(value){
    var bgoptions = this.background.children;
    bgoptions.systemImg.hide = value !== 1;
    bgoptions.uploadImg.hide = value !== 2;
    bgoptions.imgRepeat.hide = value === 0;
    bgoptions.imgBlur.hide = value === 0;
    bgoptions.imgOpacity.hide = value === 0;
  }
}

export default {options,handlers}
