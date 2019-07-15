export default class DomApp {
  constructor(ele) {
    this.init(ele)
  }
  init(ele) {
    this.ele = ele
  }
  clickHandler(callback) {
    this.ele.click = e => {
      callback && typeof callback === 'function' && callback(e)
    }
  }
}
//托管监听