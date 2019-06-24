//全局chartOption json
const option = {
  legend:{  //图例
    show: false, //默认不展示
    textStyle:{ //可继承自textStyle
      color: '#333',
      fontStyle: 'normal',
      fontWeight: 'normal',
      fontFamily: 'sans-serif',
      fontSize: 12,
      backgroundColor:'transparent'
    }
  },
  grid:{
    show:false
  },
  xAxis: {
    show:true,
    name:'',
    nameTextStyle:{//可继承自textStyle
      color: '#333',
      fontStyle: 'normal',
      fontWeight: 'normal',
      fontFamily: 'sans-serif',
      fontSize: 12,
      backgroundColor:'transparent',
    },
    nameGap:20,
    axisLine:{

    },
    splitLine:{
      show:true
    },
    splitArea:{
      show:true
    },
    type: 'category',//'value','category','time','log'
    data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
  },
  yAxis: {
    type: 'value'
  },
  series: [{
    data: [820, 932, 901, 934, 1290, 1330, 1320],
    type: 'line'
  }]
};

//各个图表区别于全局option固定默认值：
//折线图
const lineChartSimple = {
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
};

const barChartSimple = {
  
};



const textStyle = {
  color: '#333',
  fontStyle: 'normal',
  fontWeight: 'normal',
  fontFamily: 'sans-serif',
  fontSize: 12,
  backgroundColor:'transparent'
}