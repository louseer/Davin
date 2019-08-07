
import { ELEMENT_RFORM,ELEMENT_GRID,ELEMENT_SCREEN,ELEMENT_GROUP,ELEMENT_NODE } from "@/store/constants"
export class RFormOptions {
  constructor(config){
    this.config = config
  }

  init(config){
    const defaultConfig = {
      "rform":{

      }
    }
  }
}

export default class OptionsHandler {
  constructor(type){
    this.type = type;
    this.options = this.initOptions(type)
  }

  initOptions (type) {
    if(ELEMENT_RFORM === type){
      return {
        
      }
    }

    if(ELEMENT_GRID === type){
      
    }

    if(ELEMENT_SCREEN === type){
      
    }

    if(ELEMENT_GROUP === type){
      
    }

    if(ELEMENT_NODE === type){
      
    }
  }
}