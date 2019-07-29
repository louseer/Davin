
export default class Node {
  constructor (config,scale){
    this.config = config;
    this.scale = scale;
  }

  set width(val) {
    this.config.width = val;
  }

  get width() {
    return parseInt(this.config.width * this.scale)
  }

  set height(val) {
    this.config.height = val;
  }

  get height() {
    return parseInt(this.config.height * this.scale)
  }
  
  set top(val) {
    this.config.top = val;
  }

  get top() {
    return parseInt(this.config.top * this.scale)
  }

  set left(val) {
    this.config.left = val;
  }

  get left() {
    return parseInt(this.config.left * this.scale)
  }

  set zIndex(val) {
    this.config.zIndex = val;
  }

  get zIndex() {
    return parseInt(this.config.zIndex)
  }
}