import { objDeepMerge } from '@/utils/index.js'

export default class Canvas {
  constructor(config) {
    objDeepMerge(this,config)
    // this.width = config.width
    // this.height = config.height
    // this.offset=config.offset
    // this.zoomSize=config.zoomSize
    // this.id=config.id
    // this.name=config.name
  }
}
