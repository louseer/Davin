import Echart from './echart.js';

//V-chart极坐标依赖
import 'echarts/lib/chart/pie'
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
    this.setLegend(data);
    this.setSeries(data)
  }

  //引入模板配置
  setSample () {
    this.options = {
      tooltip: {
          trigger: 'item',
          formatter: "{a} <br/>{b}: {c} ({d}%)"
      },
      legend: {
        show:false,
          orient: 'vertical',
          x: 'left',
          data:['直接访问','邮件营销','联盟广告','视频广告','搜索引擎']
      },
      series: [
          {
              name:'访问来源',
              type:'pie',
              radius: ['50%', '70%'],
              avoidLabelOverlap: false,
              label: {
                  normal: {
                      show: true,
                      position: 'outside'
                  },
                  emphasis: {
                      show: true,
                      textStyle: {
                          fontSize: '20',
                          fontWeight: 'bold'
                      }
                  }
              },
              labelLine: {
                  normal: {
                      show: false
                  },
                  emphasis: {
                    show: true
                }
              },
              data:[
                  {value:335, name:'直接访问'},
                  {value:310, name:'邮件营销'},
                  {value:234, name:'联盟广告'},
                  {value:135, name:'视频广告'},
                  {value:1548, name:'搜索引擎'}
              ]
          }
      ]
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