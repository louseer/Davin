import Echart from './echart.js';
import 'echarts/lib/chart/line'
const defaultOption = {
  grid: {
    show: false,
    left: 50,
    right: 10,
    bottom: 30
  }
}
const defaultFieldMap = {
  "x":"x",
  "y":"y",
  "s":"s"
}
export default class Line extends Echart{
  constructor(config) {
    super(config);
    this.initOpitions();
  }

  //设置图例
  setLegend(series){
    let legend = [];
    series.forEach((s) => {s
      legend.push(s.name);
    })
    this.options.legend = {data:legend};
  }

  //设置系列数据
  setSeries(series){
    let newSeries = []
    series.forEach((s,i) => {s
      newSeries.push({
        name: s.name || `line${i}`,
        type: 'line',
        data: s.data || []
      })
    })
    this.options.series = newSeries;
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
  setAxis(categories){
    let axis = this.getMainAxisName();
    this.options[axis].data = categories
  }

  setData(data) {
    const {categories,series} = data;
    this.setAxis(categories);
    this.setLegend(series);
    this.setSeries(series)
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