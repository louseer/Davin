import { OPTIONTYPE } from '../core/constants.js'
import { 
  GRID_DEF_W,
  GRID_DEF_H,

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
  OPACITY_MIN,
  OPACITY_MAX,
  OPACITY_STEP,
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


const GRID_W_MIN = 1;
const GRID_W_MAX = 12;
const GRID_H_MIN = 1;


/**
 * 报表编辑form 表单项配置器
 */
const options = {
  "i":{
    "type":OPTIONTYPE.NOVIEW, 
    "defaultVal":""
  },
  "x":{
    "type":OPTIONTYPE.NOVIEW
  },
  "y":{
    "type":OPTIONTYPE.NOVIEW
  },
  "w":{
    "name":"宽度",
    "type":OPTIONTYPE.INPUTNUMBER,
    "defaultVal":GRID_DEF_W,
    "min":GRID_W_MIN,
    "max":GRID_W_MAX
  },
  "h":{
    "name":"高度",
    "type":OPTIONTYPE.INPUTNUMBER,
    "defaultVal":GRID_DEF_H,
    "min":GRID_H_MIN,
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
