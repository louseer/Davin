import { objDeepMerge } from '@/utils/index.js'

export default class Dchart{
  constructor(config){
    this.config = config
    this.options = null;
  }

  combineConfig(options) {
    this.options = objDeepMerge(this.options,options)
  }

  initOpitions (options) {
    this.options = options;
    if(this.config.chart){
      this.combineConfig(this.config.chart)
    }
  }

}