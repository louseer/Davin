import echarts from 'echarts';
import samples from './samples.js';

// class Axis {
//   constructor (name,show = true,type = 'category',data = null) {
//     this.name = name;
//     this.show = show;
//     this.type = type;
//     this.data = data;
//   }
// }

export default class Chart{
  constructor(el,config){
    this.el = el;
    this.config = config;
    this.chart = null
    this.init();
    
  }

  getDatas(){
    const url = this.config.dataConfig.apiUrl;
    window.axios.get(url).then(rsp => {
      let data = rsp.data.data;
      this.setOption(data);
    }).catch()
  }

  init() {
    this.chart = echarts.init(this.el);
    this.getDatas();
  }

  labelFormatter (value, index ,type) {
    if('value' === type){
      if(value < 10000){
        return value;
      }else if(10000 <= value && value < 1000000){
        return (value / 10000) +'万'
      }else {
        return (value / 1000000) +'百万'
      }
    }
  }

  setOption(data){
    let options = samples[this.config.type];
    //主轴分类 及 副轴数值
    let axis = [];
    axis = axis.concat(options.xAxis,options.yAxis)
    for(var v of axis){
      if('object' === typeof v){
        if(v.type === 'category'){
          v.data = data.categories
        }else{
          v.axisLabel = {}
          v.axisLabel.formatter = (value, index) => {
            return this.labelFormatter(value, index,v.type)
          }
        }
      }
    }

    //数据集
    let series = data.series;
    for(var i = 0; i < series.length; i++){
      
      series[i].type = series[i].type || this.config.type
    }
    
    options.series = series
    this.chart.setOption(options)
  }
}

