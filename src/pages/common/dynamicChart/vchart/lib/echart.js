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
 
  combineConfig() {
    this.options = objDeepMerge(this.options,this.config)
  }

  initOpitions (options) {
    this.options = options;
    this.combineConfig()
  }

  
  queryData () {
    
  }
}