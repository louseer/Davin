export default {
  legend: {
    data: ['line']
  },
  polar: {
    center: ['60%', '54%']
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
      showSymbol: false
    }
  ],
  animationDuration: 0
}