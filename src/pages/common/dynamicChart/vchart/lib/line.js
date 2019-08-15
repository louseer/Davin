import Echart from './echart.js';
import 'echarts/lib/chart/line'
const defaultOption = {
  grid: {
    show: false,
    left: 50,
    right: 10,
    bottom: 30,
    top:20
  }
}

export default class Line extends Echart{
  constructor(config) {
    super(config);
    this.initOpitions();
  }

  //设置图例
  setLegend(data){
    let legend = [];
    for(let i =0; i< data.length; i++){
      if(!legend.includes(data[i].s)){
        legend.push(data[i].s)
      }
    }
    this.options.legend = {data:legend};
  }

  //获取类目/时间轴，即主轴。
  getMainAxisName(){
    if(this.options.xAxis.type === "category" || this.options.xAxis.type === "time"){
      return 'xAxis';
    }else{
      return 'yAxis';
    }
  }

  //设置坐标（类目、时间）轴
  setAxis(data){
    let axis = this.getMainAxisName();
    let categories = [];
    for(let i =0; i< data.length; i++){
      if(!categories.includes(data[i].x) && "" !== data[i].x && undefined !== data[i].x && null !== data[i].x){
        categories.push(data[i].x)
      }
    }
    categories.sort(); //排序TODO：后续可能要扩展主轴类目排序功能
    this.options[axis].data = categories
    return categories;
  }

  //设置系列数据
  setSeries(data){
    let categories = this.setAxis(data);
    let newSeries = [];
    let sdata = {};
    let sname = [];
    for(let i =0; i< data.length; i++){
      let cindex = categories.indexOf(data[i].x)
      let k = data[i].s !== undefined ? data[i].s : "__null__"
      sdata[k] = sdata[k] || [];
      sdata[k][cindex] = data[i].y
    }
    sname = Object.keys(sdata);
    sname.forEach(n => {
      newSeries.push({
        name: n !== "__null__" ? n :"",
        type: 'line',
        data: sdata[n]
      })
    })
   
    this.options.series = newSeries;
  }


  //映射字段
  mapFields(data){
    const { fieldMap } = this.config.data;
    for(let i =0; i< data.length; i++){
      let d = data[i];
      if("x" !== d[fieldMap.x]){
        d.x = d[fieldMap.x];  
      }
      if("y" !== d[fieldMap.y]){
        d.y = d[fieldMap.y];
      }
      if("s" !== d[fieldMap.s]){
        d.s = d[fieldMap.s];
      }
    }
  }

  setData(data) {
    this.mapFields(data);
    this.setLegend(data);
    this.setSeries(data);
    
  }

  setSample () {
    this.options = Object.assign(defaultOption,{
        xAxis: {
            type: 'category',
            data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
        },
        yAxis: {
            type: 'value'
        },
        series: [{
            data: [820, 932, 901, 934, 1290, 1330, 1320],
            type: 'line'
        }]
    });
  }

  combineConfig() {
     //TODO：结合接口this.config 继续整合options
  }

  initOpitions() {
    this.setSample();
    this.combineConfig();
  }

}