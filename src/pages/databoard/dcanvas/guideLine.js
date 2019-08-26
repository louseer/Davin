

import { getuuid } from '@/utils/index'
export default class GuideLine{
  constructor(line){
    this.type=line.type || 'xline' //'yline'
    this.pos=line.pos || 0
    this.id=line.id || getuuid()
  }
}

