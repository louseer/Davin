import 'echarts/lib/component/legend'
export default class Echart{
  constructor(config){
    this.config = config
    this.options = null;
  }

  showLegend () {
    this.options.legend.show = true;
  }

  hideLegend () {
    this.options.legend.show = flase;
  }
  


  queryData () {
    
  }

  initOpitions () {
  }
}