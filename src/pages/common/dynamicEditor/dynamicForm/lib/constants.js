/**
 * 控件类型
 */
export const OPTIONTYPE = {
  GROUP:"group", //组。以折叠框展示其children
  NOVIEW:"noview", //无视图（即不渲染控件）。仅为字段用来存数据。
  INPUT:'input',
  SWITCH:'switch',
  INPUTNUMBER:"inputNumber",
  SELECT:"select",
  RADIO:"radio",
  SLIDER:"slider",
  COLORPICKER:"colorPicker",
  IMGSELECT:"ImgSelect", 
  IMGUPLOAD:"ImgUpload", 
  FILEUPLOAD:"fileUpload", 
  TEXTAREA:'textarea'
}

export const GROUP = "group"; //组。以折叠框展示其children
export const NOVIEW = "noview"; //无视图（即不渲染控件）。仅为字段用来存数据。
export const INPUT = 'input'
export const SWITCH = 'switch'
export const INPUTNUMBER = "inputNumber"
export const SELECT = "select"
export const RADIO = "radio"
export const SLIDER = "slider"
export const COLORPICKER = "colorPicker"
export const IMGSELECT = "ImgSelect"; 
export const IMGUPLOAD = "ImgUpload"; 
export const FILEUPLOAD = "fileUpload"; 
export const TEXTAREA = 'textarea'

/**
 * 配置项公共默认值
 */
export const REFRESH_INTERVAL = 30; //刷新间隔
export const BGIMG_BLUR = 5; //背景模糊
export const BGIMG_BLUR_MIN = 0;
export const BGIMG_BLUR_MAX = 20;
export const BGIMG_BLUR_STEP = 1;
export const BGIMG_OPACITY = 80; //背景透明度
export const BGIMG_OPACITY_MIN = 0;
export const BGIMG_OPACITY_MAX = 100;
export const BGIMG_OPACITY_STEP = 1;
export const WHITE = "rgba(255, 255, 255, 1)";
export const CHBK = "rgba(75, 75, 75, 1)";


export const IMG_SOURCE_TYPE = [
  {"label":"无","value":0},
  {"label":"内置","value":1},
  {"label":"上传","value":2}
]

export const IMG_SCALE_TYPE = [
  {"label":"拉伸铺满","value":0},
  {"label":"横向拉伸纵向重复","value":1},
  {"label":"纵向拉伸横向重复","value":2},
  {"label":"重复排列","value":3}
]

export const BORER_TYPE = [
  {"label":"实线","value":"solid"},
  {"label":"虚线","value":"dashed"},
  {"label":"点状","value":"dotted"},
  {"label":"双线","value":"double"} 
]

export const THEM_TYPE = [
  {"label":"主题一","value":0},
  {"label":"主题二","value":1},
  {"label":"主题三","value":2}
]

export const COLOR_PREDEFINE = [
  '#ff4500',
  '#ff8c00',
  '#ffd700',
  '#90ee90',
  '#00ced1',
  '#1e90ff',
  '#c71585',
  'rgba(255, 69, 0, 0.68)',
  'rgb(255, 120, 0)',
  'hsv(51, 100, 98)',
  'hsva(120, 40, 94, 0.5)',
  'hsl(181, 100%, 37%)',
  'hsla(209, 100%, 56%, 0.73)',
  '#c7158577'
]