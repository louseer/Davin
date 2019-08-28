import Echart from './echart.js';

//V-chart极坐标依赖
import 'echarts/lib/chart/scatter'
export default class Polar extends Echart{
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

  //引入模板配置
  setSample () {
    this.options = {
      xAxis: {},
      yAxis: {},
      series: [{
          symbolSize: 20,
          data: [
              [10.0, 8.04],
              [8.0, 6.95],
              [13.0, 7.58],
              [9.0, 8.81],
              [11.0, 8.33],
              [14.0, 9.96],
              [6.0, 7.24],
              [4.0, 4.26],
              [12.0, 10.84],
              [7.0, 4.82],
              [5.0, 5.68]
          ],
          type: 'scatter'
      }]
    }
  }

  combineConfig() {
     //TODO：结合接口this.config 继续整合options
  }

  initOpitions() {
    this.setSample();
    this.combineConfig();
  }

}