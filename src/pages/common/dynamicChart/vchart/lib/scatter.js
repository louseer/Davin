import Echart from './EChart.js';

//V-chart极坐标依赖
import 'echarts/lib/chart/scatter'
export default class Polar extends Echart{
  constructor(config) {
    super(config);
  }

  //设置图例
  setLegend(series){
    let legend = [];
    series.forEach((s) => {s
      legend.push(s.name);
    })
    this.options.legend.data = legend;
  }

  //设置系列数据
  setSeries(data){
    this.options.series[0].data = data;
  }

  //将接口数据设置入图表
  setData(data) {
    console.log(data)
    // this.setLegend(data);
    // this.setSeries(data)
  }
}