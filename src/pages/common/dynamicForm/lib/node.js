import { OPTIONTYPE } from '../core/constants.js'
const options = {
  "id":{
    "type":OPTIONTYPE.NOVIEW, 
    "defaultVal":""
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
    "defaultVal":50,
    "min":50,
    "max":50
  },
  "h":{
    "name":"高度",
    "type":OPTIONTYPE.INPUTNUMBER,
    "defaultVal":50,
    "min":50,
  }
}
export default {options}
