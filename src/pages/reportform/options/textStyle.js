export const fontSize = (val) => {
  const defaultVal = 12;
  return {
    "name":"字号",
    "type":"inputNumber",
    "default":defaultVal,
    "value":val || defaultVal,
    "step":"1"
  }
}

export const color = (val) => {
  const defaultVal = "#333";
  return {
    "name":"颜色",
		"type":"colorPicker",
    "default":defaultVal,
    "value":val || defaultVal
  }
}

export const fontWeight = (val) => {
  const defaultVal = "normal";
  return {
    "name":"粗细",
    "type":"select",
    "default":defaultVal,
    "value":val || defaultVal,
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

export default textStyle = (text) => {
  text = text || {}
  return {
    "fontSize": fontSize(text.fontSize),
    "color": color(text.color),
    "fontWeight": color(text.fontWeight),
  }
}