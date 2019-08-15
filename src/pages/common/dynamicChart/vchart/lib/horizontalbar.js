import Echart from './echart.js';
import 'echarts/lib/chart/bar'
import 'echarts/lib/component/tooltip'
const defaultOption = {
  grid: {
    show: false,
    left: 20,
    right: 10,
    bottom: 30
  }
}

export default class Line extends Echart{
  constructor(config) {
    super(config);
    this.initOpitions();
  }

  //设置图例
  setLegend(data){
    this.options.legend = this.options.legend || {};
    this.options.legend.data = data;
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
    this.options[axis].data = data
    return categories;
  }

  //设置系列数据
  setSeries(data){
    let {categories}= data;
    this.setAxis(data);
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
        type: 'bar',
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
    //this.mapFields(data);
    const {categories} = data;
    //this.setLegend(categories);
    //this.setSeries(data);
    
  }

  setSample () {
    this.options = {
      tooltip: {
          trigger: 'axis',
          axisPointer: {
              type: 'shadow'
          }
      },
      legend: {
          data: ['2011年', '2012年']
      },
      grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
      },
      xAxis: {
          type: 'value',
          boundaryGap: [0, 0.01]
      },
      yAxis: {
          type: 'category',
          data: ['巴西','印尼','美国','印度','中国','世界人口(万)']
      },
      series: [
          {
              name: '2011年',
              type: 'bar',
              data: [18203, 23489, 29034, 104970, 131744, 630230]
          },
          {
              name: '2012年',
              type: 'bar',
              data: [19325, 23438, 31000, 121594, 134141, 681807]
          }
      ]
    };
  }

  combineConfig() {
     //TODO：结合接口this.config 继续整合options
  }

  initOpitions() {
    this.setSample();
    this.combineConfig();
  }

}