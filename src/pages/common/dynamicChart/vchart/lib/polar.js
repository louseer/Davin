import Echart from './EChart.js';

//V-chart极坐标依赖
import 'echarts/lib/chart/line'
import 'echarts/lib/component/polar'

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
    this.options.legend = {data:legend};
  }

  //设置系列数据
  setSeries(series){
    let newSeries = []
    series.forEach((s) => {s
      newSeries.push({
        coordinateSystem:'polar',
        name: s.name || 'line',
        type: s.type ||'line',
        showSymbol: s.type || false,
        data: s.data || []
      })
    })
    this.options.series = newSeries;
  }

  setData(data) {
    const {series} = data;
    this.setLegend(series);
    this.setSeries(series)
  }

}