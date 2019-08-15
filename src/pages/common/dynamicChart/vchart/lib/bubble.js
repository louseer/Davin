import Echart from './echart.js';
const defaultOption = {
  grid: {
    show: false,
    left: 60,
    right: 60,
    bottom: 30,
    top:50
  }
}

export default class Line extends Echart{
  constructor(config) {
    super(config);
    this.initOpitions();
  }

  //设置图例
  setLegend(data){
    let legend = [];
    for(let i =0; i< data.length; i++){
      if(!legend.includes(data[i].s)){
        legend.push(data[i].s)
      }
    }
    this.options.legend = {data:legend};
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
    let categories = [];
    for(let i =0; i< data.length; i++){
      if(!categories.includes(data[i].x) && "" !== data[i].x && undefined !== data[i].x && null !== data[i].x){
        categories.push(data[i].x)
      }
    }
    categories.sort(); //排序TODO：后续可能要扩展主轴类目排序功能
    this.options[axis].data = categories
    return categories;
  }

  //设置系列数据
  setSeries(data){
    let categories = this.setAxis(data);
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
        type: 'line',
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
    //this.setLegend(data);
    //this.setSeries(data);
    
  }

  setSample () {
    this.options = Object.assign(defaultOption,{
      legend: {
        right: 10,
        data: ['1990', '2015']
    },
    xAxis: {
        splitLine: {
            lineStyle: {
                type: 'dashed'
            }
        }
    },
    yAxis: {
        splitLine: {
            lineStyle: {
                type: 'dashed'
            }
        },
        scale: true
    },
    series: [{
        name: '1990',
        data: data[0],
        type: 'scatter',
        symbolSize: function (data) {
            return Math.sqrt(data[2]) / 5e2;
        },
        label: {
            emphasis: {
                show: true,
                formatter: function (param) {
                    return param.data[3];
                },
                position: 'top'
            }
        },
        itemStyle: {
            normal: {
                shadowBlur: 10,
                shadowColor: 'rgba(120, 36, 50, 0.5)',
                shadowOffsetY: 5,
                color: new echarts.graphic.RadialGradient(0.4, 0.3, 1, [{
                    offset: 0,
                    color: 'rgb(251, 118, 123)'
                }, {
                    offset: 1,
                    color: 'rgb(204, 46, 72)'
                }])
            }
        }
    }, {
        name: '2015',
        data: data[1],
        type: 'scatter',
        symbolSize: function (data) {
            return Math.sqrt(data[2]) / 5e2;
        },
        label: {
            emphasis: {
                show: true,
                formatter: function (param) {
                    return param.data[3];
                },
                position: 'top'
            }
        },
        itemStyle: {
            normal: {
                shadowBlur: 10,
                shadowColor: 'rgba(25, 100, 150, 0.5)',
                shadowOffsetY: 5,
                color: new echarts.graphic.RadialGradient(0.4, 0.3, 1, [{
                    offset: 0,
                    color: 'rgb(129, 227, 238)'
                }, {
                    offset: 1,
                    color: 'rgb(25, 183, 207)'
                }])
            }
        }
    }]
    });
  }

  combineConfig() {
     //TODO：结合接口this.config 继续整合options
  }

  initOpitions() {
    this.combineConfig();
  }

}