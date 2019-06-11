export default class DomCavase {
  constructor(el, mode, grid = [5, 5]) {
    this.el = el
    this.mode = mode || 'select'
    this.grid = grid
  }
  set canvasZoom(val) {
    this.el.style.transform = `scale(${val},${val})`
  }
  get canvasZoom() {
    const arr = this.el.style.transform.toString().split(',')
    if (arr.length === 0) {
      const num = arr[1].substring(0, arr[1].length - 1)
      return `${+num * 100}%`
    }
  }
  set canvasOpcity(val) {
    this.el.style.opacity = val
  }
  get canvasOpcity() {
    return getStyle(this.el, 'opacity')
  }
  set canvasWidth(val) {
    this.el.style.width = `${val}px`
  }
  get canvasWidth() {
    return this.el.offsetWidth
  }
  set canvasHeight(val) {
    this.el.style.height = `${val}px`
  }
  get canvasHeight() {
    return this.el.offsetHeight
  }
  set canvasBackColor(val) {
    this.el.style.backgroudColor = `#${val}`
  }
  get canvasBackColor() {
    return getStyle(this.el, 'backgroundColor')
  }
  setImg(url) {
    this.el.style.backgroud = `${url}`
  }
  canvasOnclick(callback) {
    this.el.onclick = e => {
      const event = e || window.event
      callback && typeof callback === 'function' && callback(event)
    
    }
  }
  canvasRightclick(callback) {
    this.el.oncontextmenu = e => {     
    
        const event = e || window.event
        callback && typeof callback === 'function' && callback(event)
        console.log('画布右击')
      
    }
  }

  createNode(ele) {
    return {
      elementType: ele.elementType || 'node',
      x: ele.x,
      y: ele.y,
      type: ele.type || '',
      id: ele.id || getuuid(),
      iconUrl: ele.iconUrl || '',
      isSwich: ele.isSwich === undefined ? true : ele.isSwich,
      nodeBgin: ele.nodeBgin === undefined ? null : ele.nodeBgin.id,
      nodeEnd: ele.nodeEnd === undefined ? null : ele.nodeEnd.id,
      name: ele.text || '',
      childs: ele.childs || null,
      isServiceNode: ele.isServiceNode || '-1',
      isPublish: ele.isPublish || '-1',
      startNodes: ele.startNodes || null,
      endNodes: ele.endNodes || null,
      category: ele.category || ''
    }
  }
  getAllNode() {}
}
function getStyle(obj, styleName) {
  if (obj.currentStyle) {
    return obj.currentStyle[styleName]
  } else {
    return getComputedStyle(obj, null)[styleName]
  }
}
