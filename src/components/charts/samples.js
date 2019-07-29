import echarts from 'echarts';
export const color = ['#1c5c7e', '#7a7149', '#775031', '#772d31'];

//折线
export const line = {
  grid: {
    show: false,
    left: 50,
    top: 10,
    right: 10,
    bottom: 30
  },
  legend: {
    show: false,
    orient: 'horizontal',
    left: 'center',
    data: ['直接访问', '邮件营销', '联盟广告', '视频广告', '搜索引擎'],
    textStyle: {
      color: "#fff"
    }
  },
  xAxis: {
    type: 'category',
    data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    splitLine: {
      show: false
    },
    axisTick: {
      show: true,
      interval: 0,
      inside: true,
      lineStyle: {
        color: "rgb(255, 255, 255)",
        width: 1
      },
      length: 1
    },
    axisLine: {
      lineStyle: {
        color: "rgb(255, 255, 255)",
        width: 1
      }
    },
    axisLabel: {
      show: true,
      textStyle: {
        color: "rgb(240, 240, 240)",
        fontSize: 12
      },
      margin: 5,
    }
  },
  yAxis: {
    type: 'value',

    splitLine: {
      lineStyle: {
        color: "rgba(57, 71, 87,1)",
        width: 1
      }
    },
    axisLine: {
      show: false
    },
    axisLabel: {
      show: false,
    },
    splitArea: {
      show: false
    },

  },
  // color:['#1c5c7e','#7a7149','#775031','#772d31'],

  textStyle: {
    color: "rgb(240,240,240)"
  },
  tooltip: {
    // trigger: 'item',
    // formatter: "{a} <br/>{b} : {c} ({d}%)",
    trigger: 'axis',
    axisPointer: {
      lineStyle: {
        color: "rgb(90, 94, 96)",
        type: "dotted",
        width: 1
      }
    }
  },
  series: [{
      data: [820, 932, 901, 934, 1290, 1330, 1320],
      type: 'line',
      itemStyle: {
        normal: {
          areaStyle: {
            type: "default",
          },

          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
            offset: 0,
            color: '#06375c'
          }, {
            offset: 1,
            color: "rgba(25, 41, 60,0)"
          }]),
          lineStyle: {
            color: "rgb(13, 101, 137)",
            width: 2
          }
        }
      },
    },
    {
      data: [820, 932, 901, 934, 1290, 1330, 1320],
      type: 'line',
      itemStyle: {
        normal: {
          areaStyle: {
            type: "default",
          },

          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
            offset: 0,
            color: "rgba(255, 255, 255,0.4)"
          }, {
            offset: 1,
            color: "rgba(255, 255, 255,0)"
          }]),
          lineStyle: {
            color: "rgba(255, 255, 255,0.8)",
            width: 2
          }
        }
      },
    },
    {
      data: [820, 932, 901, 934, 1290, 1330, 1320],
      type: 'line',
      itemStyle: {
        normal: {
          areaStyle: {
            type: "default",
          },

          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
            offset: 0,
            color: "rgba(197, 174, 70,1)"
          }, {
            offset: 1,
            color: "rgba(197, 174, 70,0.2)"
          }]),
          lineStyle: {
            color: "rgb(122, 113, 73)",
            width: 2
          }
        }
      },
    }
  ]
}

//柱状图
export const bar = {
  textStyle: {
    color: "#fff"
  },
  grid: {
    show: false,
    left: 60,
    top: 10,
    right: 10,
    bottom: 20
  },
  legend: {
    show: false,
  },
  tooltip: {
    show: true
  },
  xAxis: {
    type: 'category',
    data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    splitLine: {
      show: false
    },
    axisTick: {
      show: true,
      interval: 0,
      inside: true,
      lineStyle: {
        color: "rgb(255, 255, 255)",
        width: 1
      },
      length: 0,
    },
    axisLine: {
      lineStyle: {
        color: "rgb(255, 255, 255)",
        width: 1
      }
    },
    axisLabel: {
      show: true,
      textStyle: {
        color: "rgb(240, 240, 240)",
        fontSize: 12
      },
      margin: 5,
    }
  },
  yAxis: {
    type: 'value',
    name: 'KW',
    splitLine: {
      lineStyle: {
        color: "rgba(57, 71, 87,1)",
        width: 1
      }
    },
    axisLine: {
      show: false
    },
    axisLabel: {
      show: false,
    },
    splitArea: {
      show: false
    },

  },
  series: [{
    data: [120, 200, 150, 80, 70, 110, 130],
    type: 'bar',
    barWidth: '10px',
    itemStyle: {
      color: new echarts.graphic.LinearGradient(
        0, 0, 0, 1,
      [
          {offset: 0, color: '#20abf4'},
          {offset: 1, color: '#d2f0fa'}
      ]
   ),
      barBorderRadius: [4, 4, 0, 0],
      shadowColor: 'rgba(255,255,255,1)',
                        shadowBlur: 4 ,

    },
  }]
}

//进度条
export const progressBar = {
  grid: {
    show: false,
    left: 75,
    top: 10,
    right: 10,
    bottom: 20
  },
  yAxis: [{
    type: "category",
    data: ["江苏电力", "广州腾讯", "浙江阿里", "中国石油", "福建水电", "中国铁塔", "国家电网", "浙江广电", "南京电力", "北京神马"],
    axisLine: {
      show: false
    },
    axisLabel: {
      show: true,
      textStyle: {
        color: "rgb(240, 240, 240)",
        fontSize: 14,
        fontWeight: "bold"
      },
      margin: 10,
    },
    axisTick: {
      show: false
    },
    splitLine: {
      show: false
    },
    splitArea: {
      show: false
    }
  }],
  xAxis: [{
    type: "value",
    splitLine: {
      show: false
    },
    axisLine: {
      show: false
    },
    axisTick: {
      show: false
    },
    splitArea: {
      show: false
    },
    axisLabel: {
      show: false
    }
  }],
  series: [{
    data: [500, 500, 500, 500, 500, 500, 500],
    type: 'bar',
    barWidth: '8px',
    itemStyle: {
      color: '#000',
      borderColor: '#fff',
      opacity: 0.2,
      barBorderRadius: 4,

    }
  }, {
    data: [320, 310, 245, 300, 380, 490, 247],
    type: 'bar',
    barWidth: '6px',
    barGap: '-100%',
    itemStyle: {
      color: '#fff',
      barBorderRadius: 3,
      shadowColor: "#fff",
      shadowBlur: 6
    },
    label: {
      show: true,
      formatter:'{c}',
      position: 'right'
    }
  }]
}

//饼图
export const pie = {
  tooltip: {
    trigger: 'item',
    formatter: "{a} <br/>{b} : {c} ({d}%)"
  },
  legend: {
    show: false,
    orient: 'vertical',
    left: 'left',
    data: ['直接访问', '邮件营销', '联盟广告', '视频广告', '搜索引擎']
  },
  color: [
    new echarts.graphic.LinearGradient(0, 0, 1, 0, [{
      offset: 0,
      color: '#FF7800'
    }, {
      offset: 1,
      color: '#FFA200'
    }]),
    new echarts.graphic.LinearGradient(0, 0, 1, 0, [{
      offset: 0,
      color: '#1756F5'
    }, {
      offset: 1,
      color: '#45B6FF'
    }]),
    new echarts.graphic.LinearGradient(0, 0, 1, 0, [{
      offset: 0,
      color: '#CCCCCC'
    }, {
      offset: 1,
      color: '#666666'
    }]),
    new echarts.graphic.LinearGradient(0, 0, 1, 0, [{
      offset: 0,
      color: '#FFD814'
    }, {
      offset: 1,
      color: '#FFA300'
    }]),
    new echarts.graphic.LinearGradient(0, 0, 1, 0, [{
      offset: 0,
      color: '#917DFF'
    }, {
      offset: 1,
      color: '#652BFF'
    }])
  ],

  series: [{
    name: '访问来源',
    type: 'pie',
    radius: ['45%', '65%'],
    center: ['50%', '50%'],
    data: [{
        value: 335,
        name: '直接访问',
  //       itemStyle:{
  //         normal:{
  //           color: new echarts.graphic.LinearGradient(1, 1, 0, 1, [{
  //                           offset: 0,
  //                           color: "rgba(158,216,231,1)",
  //                       }, {
  //                           offset: 0.7,
  //                             color: "rgba(192,247,255,1)",
  //                       }]),
  // shadowColor: '#267b9f',
  //             shadowBlur: 20
  //         }
  //       }
      },
      {
        value: 310,
        name: '邮件营销'
      },
      {
        value: 234,
        name: '联盟广告'
      },
      {
        value: 135,
        name: '视频广告'
      },
      {
        value: 1548,
        name: '搜索引擎'
      }
    ],
    itemStyle: {
      emphasis: {
        shadowBlur: 10,
        shadowOffsetX: 0,
        shadowColor: 'rgba(0, 0, 0, 0.5)'
      }
    },
    label: {

      normal: {
        textStyle: {
          fontSize:16,
          color: "rgba(255, 255, 255, 1)"
        }
      }
    },
    labelLine: {
      normal: {
        lineStyle: {
          color: "rgba(255, 255, 255, 1)"
        },
        smooth: 0,
        length: 10,
        length2: 10
      }
    },
  }]
}

//仪表
export const gauge = {
  tooltip: {
    formatter: "{a} <br/>{b} : {c}%"
  },

  series: [{
    name: '响应能力',
    type: 'gauge',
    center: ['50%', '50%'], // 默认全局居中
    radius: '100%',
    startAngle: 225,
    endAngle: -45,
    min: 0,
    max: 100,
    //endAngle:0,
    splitNumber: 6,
    axisLine: { // 坐标轴线
      lineStyle: { // 属性lineStyle控制线条样式
        color: [[0.4, 'rgba(255,255,255,1)'],
          [0.8, new echarts.graphic.LinearGradient(
            0, 0, 1, 0, [{
                    offset: 0,
                    color: 'rgba(189,246,254,1)',
                },
                {
                    offset: 1,
                    color: 'rgba(158,216,230,1)',
                }
            ]
        )],

          [1,new echarts.graphic.LinearGradient(
            0, 0, 1, 0, [{
                    offset: 0,
                    color: 'rgba(190,228,245,1)',
                },
                {
                    offset: 1,
                    color: 'rgba(94,185,243,1)',
                }
            ]
        )]
        ],
        width: 12,

      }
    },
    axisLabel: { // 坐标轴小标记
      textStyle: { // 属性lineStyle控制线条样式
        color: '#fff',

      }
    },
    axisTick: { // 坐标轴小标记
      length: 16, // 属性length控制线长
      lineStyle: { // 属性lineStyle控制线条样式
        color: '#fff',

      }
    },
    splitLine: { // 分隔线
      length: 20, // 属性length控制线长
      lineStyle: { // 属性lineStyle（详见lineStyle）控制线条样式
        width: 2,
        color: '#fff',

      }
    },
    pointer: {
      width: 5,
      itemStyle:{
        color:'#ffffff'
      }

    },
    title: {
      offsetCenter: [0, '-120%'], // x, y，单位px
      textStyle: { // 其余属性默认使用全局文本样式，详见TEXTSTYLE
        fontWeight: 'bolder',
        fontStyle: 'italic',
        color: '#fff',
      }
    },
    detail: {
      width: 80,
      height: 30,
      offsetCenter: [0, '90%'], // x, y，单位px
      textStyle: { // 其余属性默认使用全局文本样式，详见TEXTSTYLE
        fontWeight: 'bolder',
        color: '#fff',
        fontSize: 14
      },
      formatter: '{value}'
    },
    data: [{
      value: 1.5,
      unit: '万 千瓦'
    }]
  }]
}

//散点图
export const scatter = {
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

//漏斗图
export const funnel = {
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

//词云？

//
export const radar =  {
  title: {
      text: '基础雷达图'
  },
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