const DASHBOARD_DEFAUTL_W = 1980;
const DASHBOARD_DEFAUTL_H = 1080;
const DASHBOARD_DEFAUTL_BGC = '#000';
const GRID_DEFAULT_W = 10;
const SHOW_GRID = false;

//实际数据应该是从数据库获取的。数据库预置。
//可以提供设置为模板的功能。
const DASHBAORD_TEMP_1 = {
  id:0,
  name: '企业实时销售数据',
  abstract: '',
  icon:'',
  sacle:1,
  width:DASHBOARD_DEFAUTL_W,
  height:DASHBOARD_DEFAUTL_H,
  gridWidth:GRID_DEFAULT_W,
  showGrid:SHOW_GRID,
  background:DASHBOARD_DEFAUTL_BGC,
  charts:[{
    "type": "bar",
    "name": "横向柱图",
    "remark": "",
    "width": 370,
    "height": 215,
    "left": 1485,
    "top": 445,
    "isLocked": false,
    "isHided":false,
    "zIndex": 94,
    "id": "dc_1013e-ah6ec4ty-33nvrv",
    "refreshIntervel": 1000,
    "dataConfig": {
      "type":"api",
      "apiUrl":"/mock/横向柱状图.json",
      "sqlModeID":"",//sql建模id
      "needAutoRefresh": true,
      "autoRefreshInterval": 1800
    },
    "config": {
      "chartLegend": false,
      "dataZoomStart": 60,
      "dataZoomEnd": 100,
      "marginLeft": 55,
      "marginTop": 20,
      "marginRight": 20,
      "marginBottom": 40,
      "yType": "normal",
      "defaultLegendCount": 0,
      "barMaxWidth": 16,
      "barMinHeight": 2,
      "barBorderRadius": 0,
      "xLabelRotate": -25,
      "hideYSplitArea": true,
      "dataSortType": "desc",
      "slideInterval": 3,
      "hideLoading": true,
      "hideYSplitLine": true,
      "axisColor": "#ccc",
      "axisLabelColor": "#ccc",
      "chartReverse": false,
      "openCustomColor": false,
      "chartTopShow": false,
      "xLableAllShow": true
    },
    "drill_down": [],
    "hash": "dc_1013e-ah6ec4ty-33nvrv",
    "drill_down_open": false,
    "dd_model_hashs": "", 
    "dataModelHash": "",
    "isDashChart": 1,
    "drillDownOpen": false,
    "drillDown": []
  }]
}

export default class Dashboard {
  constructor (configData = DASHBAORD_TEMP_1) {
    Object.assign(this,configData)
  }

  //计算宽高比
  calcWTHRatio(){
    let gcd = this.getGCD();
    return {w:DASHBOARD_DEFAUTL_W/gcd,h:DASHBOARD_DEFAUTL_H/gcd}
  }

  //获取最大公约数
  getGCD(){
    let a = this.width;
    let b = this.height;
    while( a % b != 0 ){
      let c = a % b;
      a = b;
      b = c;
    }
    return b;
  }

}