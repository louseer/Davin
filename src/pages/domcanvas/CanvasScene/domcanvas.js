export default class Canvas {
  constructor(el, mode='select', grid = [5, 5]) {
    this.el = el    
    this.canvasZoom=1
  }
  set canvasZoom(val) {   
    this.el.style.transform=`scale(${val})`
    this.el.style.transformOrigin=`0% 0%`
    
  }
  get canvasZoom() {
    const str=this.el.style.transform
    if(!str) return
    return +str.substring(6, str.length - 1)    
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
    this.el.style.backgroundColor = `${val}`
  }
  get canvasBackColor() {
    return getStyle(this.el, 'backgroundColor')
  }
  setImg(url) {
    this.el.style.backgroud = `${url}`
  }
  canvasOnclick(callback) {
    this.el.onclick = e => {
      clearEventBubble(e)
      if (e.buttons !== 1 || e.which !== 1) return
      const event = e || window.event
      callback && typeof callback === 'function' && callback(event)
    }
  }
  canvasOnmousedown(callback) {
    this.el.onmousedown = e => {
      clearEventBubble(e)

      if (e.buttons !== 1 || e.which !== 1) return
      const event = e || window.event
      callback && typeof callback === 'function' && callback(event)
    }
  }
  canvasOnmousemove(callback) {
    this.el.onmousemove = e => {
      if (!this.mouseOn) return
      clearEventBubble(e)
      const event = e || window.event
      callback && typeof callback === 'function' && callback(event)
    }
  }
  canvasOnmouseup(callback) {
    this.el.onmouseup = e => {
      if (!this.mouseOn) return
      clearEventBubble(e)
      const event = e || window.event
      callback && typeof callback === 'function' && callback(event)
    }
  }
  domcumentOnmouseup(callback) {
    document.onmouseup = e => {
      if (!this.mouseOn) return
      clearEventBubble(e)
      const event = e || window.event
      callback && typeof callback === 'function' && callback(event)
    }
  } 

  canvasRightclick(callback) {
    this.el.oncontextmenu = e => {
      clearEventBubble(e)
      const event = e || window.event
      callback && typeof callback === 'function' && callback(event)
      console.log('画布右击')
    }
  }
  clearNode(){
    let fileDivs = document.getElementsByClassName('layernode')   
   console.log(Array.from(fileDivs)) 
   Array.from(fileDivs).forEach(ele=>{
    ele.remove()
   })

  }
  
  createNode(ele) {
    return {
      elementType: ele.elementType || 'node',
      x: ele.x,
      y: ele.y,
      type: ele.type || '',
      id: ele.id || getuuid(),
      iconUrl: ele.iconUrl || '',
      name: ele.text || '',
      childs: ele.childs || null
    }
  }
  getAllNode() {}
}

//获取相应属性
function getStyle(obj, styleName) {
  if (obj.currentStyle) {
    return obj.currentStyle[styleName]
  } else {
    return getComputedStyle(obj, null)[styleName]
  }
}

//阻止冒泡
function clearEventBubble(e) {
  if (e.stopPropagation) e.stopPropagation()
  else e.cancelBubble = true
  if (e.preventDefault) e.preventDefault()
  else e.returnValue = false
}


