import Echart from './echart.js';

//V-chart极坐标依赖
import 'echarts/lib/chart/radar'
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
      tooltip: {},
      legend: {
          data: ['预算分配（Allocated Budget）', '实际开销（Actual Spending）']
      },
      radar: {
          // shape: 'circle',
          name: {
              textStyle: {
                  color: '#fff',
                  backgroundColor: '#999',
                  borderRadius: 3,
                  padding: [3, 5]
             }
          },
          indicator: [
             { name: '销售（sales）', max: 6500},
             { name: '管理（Administration）', max: 16000},
             { name: '信息技术（Information Techology）', max: 30000},
             { name: '客服（Customer Support）', max: 38000},
             { name: '研发（Development）', max: 52000},
             { name: '市场（Marketing）', max: 25000}
          ]
      },
      series: [{
          name: '预算 vs 开销（Budget vs spending）',
          type: 'radar',
          // areaStyle: {normal: {}},
          data : [
              {
                  value : [4300, 10000, 28000, 35000, 50000, 19000],
                  name : '预算分配（Allocated Budget）'
              },
               {
                  value : [5000, 14000, 28000, 31000, 42000, 21000],
                  name : '实际开销（Actual Spending）'
              }
          ]
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