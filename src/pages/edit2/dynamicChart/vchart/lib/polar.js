import Echart from './echart.js';
import { POLARCENTER } from "../optionsMap/index.js";
import 'echarts/lib/chart/line'
import 'echarts/lib/component/polar'

export default class Polar extends Echart{
  constructor(config) {
    super(config);
    this.editItems = [POLARCENTER];
    this.initOpitions();
  }

  setData(data) {
    const {series} = data;
    let legend = [];
    let newSeries = []
    series.forEach((s) => {s
      legend.push(s.name);
      newSeries.push({
        coordinateSystem:'polar',
        name: s.name || 'line',
        type: s.type ||'line',
        showSymbol: s.type || false,
        data: s.data || []
      })
    })
    this.options.legend = {data:legend};
    this.options.series = newSeries;
  }

  setSample () {
    this.options = {
      legend: {
        data: ['line']
      },
      polar: {
        center: ['50%', '54%']
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'cross'
        }
      },
      angleAxis: {
        type: 'value',
        startAngle: 0
      },
      radiusAxis: {
        min: 0
      },
      series: [
        {
          coordinateSystem: 'polar',
          name: 'line',
          type: 'line',
          showSymbol: false,
          data: []
        }
      ],
      animationDuration: 2000
    }
    console.log(this.options)
  }

  combineConfig() {
     //TODO：结合接口this.config 继续整合options
  }

  initOpitions() {
    this.setSample();
    this.combineConfig();
  }

}