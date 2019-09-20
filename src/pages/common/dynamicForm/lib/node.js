import { OPTIONTYPE } from '../core/constants.js'
const options = {
  "name":{
    "name":"名称",
    "type":OPTIONTYPE.NOVIEW,
    "defaultVal":''
  },
  "size":{
    "name":"大小",
    "type":OPTIONTYPE.INPUTNUMBERS,
    "defaultVal":[400,300],
    "min":[10,10],
    "unit":'px'
  },
  "location":{
    "name":"定位",
    "type":OPTIONTYPE.INPUTNUMBERS,
    "defaultVal":[50,50],
    "min":[0,0],
    "unit":'px'
  }
}
export default {options}
