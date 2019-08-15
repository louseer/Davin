import Echart from './echart.js';
const defaultOption = {
  
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
      grid: {
        show: false,
        left: 50,
        right: 10,
        bottom: 30
      },
      title: {
          text: '漏斗图',
          subtext: '纯属虚构'
      },
      tooltip: {
          trigger: 'item',
          formatter: "{a} <br/>{b} : {c}%"
      },
      toolbox: {
          feature: {
              dataView: {readOnly: false},
              restore: {},
              saveAsImage: {}
          }
      },
      legend: {
          data: ['展现','点击','访问','咨询','订单']
      },
      calculable: true,
      series: [
          {
              name:'漏斗图',
              type:'funnel',
              left: '10%',
              top: 60,
              //x2: 80,
              bottom: 60,
              width: '80%',
              // height: {totalHeight} - y - y2,
              min: 0,
              max: 100,
              minSize: '0%',
              maxSize: '100%',
              sort: 'descending',
              gap: 2,
              label: {
                  show: true,
                  position: 'inside'
              },
              labelLine: {
                  length: 10,
                  lineStyle: {
                      width: 1,
                      type: 'solid'
                  }
              },
              itemStyle: {
                  borderColor: '#fff',
                  borderWidth: 1
              },
              emphasis: {
                  label: {
                      fontSize: 20
                  }
              },
              data: [
                  {value: 60, name: '访问'},
                  {value: 40, name: '咨询'},
                  {value: 20, name: '订单'},
                  {value: 80, name: '点击'},
                  {value: 100, name: '展现'}
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