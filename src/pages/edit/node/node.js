

export default class Node {
  constructor (el,config){
    this.el = el;
    this.config = config;
  }

  init () {
    this.displayW = this.config.width * this.scale;
    this.displayH = this.config.height * this.scale;
    this.displayT = this.config.top * this.scale;
    this.displayL = this.config.left * this.scale;
    this.zIndex = this.config.zIndex;
    this.bindDragEvent();
  }

  bindDragEvent(){
    if(this.config.isLocked || this.config.isHide){
      return;
    }
    this.el.ondragstart = (event) => {
      let e = event || window.event;
      this.dx = e.clientX - this.el.offsetLeft
      this.dy = e.clientY - this.el.offsetTop
    }

    this.el.ondrag = (event) => {
      let e = event || window.event;
      this.el.style.left = `${(e.clientX - this.dx)}px`;
      this.el.style.top = `${(e.clientY - this.dy)}px`;
    }

    this.el.ondragen = (event) => {
      var e = event || window.event;
      this.displayT = e.clientY - this.dy;
      this.displayL = e.clientX - this.dx
      this.el.style.left = `${this.displayL}px`;
      this.el.style.top = `${this.displayT}px`;
    }
  }
}