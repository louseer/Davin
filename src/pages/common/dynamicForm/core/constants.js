/**
 * 控件类型
 */
export const OPTIONTYPE = {
  GROUP:"group", //组。以折叠框展示其children.此类型的控件若配置了noview属性且值为true，则等于脱壳，即不展示组的信息，直接渲染子控件。（从视图上看，没有分组下展抽屉）
  NOVIEW:"noview", //无视图（即不渲染控件）。仅为字段用来存数据。
  INPUT:'input',
  SWITCH:'switch',
  INPUTNUMBER:"inputNumber",
  INPUTNUMBERS:"inputNumbers", //可以考虑封装一个location组件。鼠标点击即表示位置。
  SELECT:"select",
  RADIO:"radio",
  SLIDER:"slider",
  COLORPICKER:"colorPicker",
  IMGSELECT:"ImgSelect", 
  IMGUPLOAD:"ImgUpload", 
  FILEUPLOAD:"fileUpload", 
  TEXTAREA:'textarea',
  INFO:'info', //只展示信息，无交互控件
  RANGESLIDER:'rangeslider',//带range的slider
  BUTTON_GROUP:'button_group',//按钮组
  COVER:'cover', //封面设置
  LIST:'list' //这个配置项是一个数组，每组都有配置。主要用于echarts里面多系列情况。
}
