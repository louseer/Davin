import { OPTIONTYPE } from '../core/constants.js'
import { 
  OPACITY_MIN,
  OPACITY_MAX,
  OPACITY_STEP
} from './constants.js'

const options = {
  "id":{
    "type":OPTIONTYPE.NOVIEW, 
    "defaultVal":""
  },
  "name":{
    "name":"名称",
    "type":OPTIONTYPE.INPUT,
    "defaultVal":''
  },
  "x":{
    "name":"x",
    "type":OPTIONTYPE.INPUTNUMBER,
    "defaultVal":50
  },
  "y":{
    "name":"y",
    "type":OPTIONTYPE.INPUTNUMBER,
    "defaultVal":50
  },
  "w":{
    "name":"宽度",
    "type":OPTIONTYPE.INPUTNUMBER,
    "defaultVal":150,
    "min":0
  },
  "h":{
    "name":"高度",
    "type":OPTIONTYPE.INPUTNUMBER,
    "defaultVal":50,
    "min":0
  },
  "opacity":{
    "name":"透明度",
    "type":OPTIONTYPE.SLIDER,
    "defaultVal":OPACITY_MAX,
    "min":OPACITY_MIN,
    "max":OPACITY_MAX,
    "step":OPACITY_STEP
  }
}
export default {options}
