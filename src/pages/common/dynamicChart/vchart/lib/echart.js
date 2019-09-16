import 'echarts/lib/component/legend'
import { objDeepMerge } from '@/utils/index.js'

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
 
  combineConfig(options) {
    this.options = objDeepMerge(this.options,options)
  }

  initOpitions (options) {
    this.options = options;
    if(this.config.options){
      this.combineConfig(this.config.options)
    }
  }

  queryData () {
    
  }
}