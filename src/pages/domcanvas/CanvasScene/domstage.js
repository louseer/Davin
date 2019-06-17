export default class Stage {
  constructor(el, mode='select', grid = [5, 5]) {
    this.el = el
    this.mode = mode 
    this.grid = grid
    this.mouseOn = false
    this.pos = GetPosition(this.el)   
  }
  
 
  stageOnclick(callback) {
    this.el.onclick = e => {
      clearEventBubble(e)
      if (e.buttons !== 1 || e.which !== 1) return
      const event = e || window.event
      callback && typeof callback === 'function' && callback(event)
    }
  }
  stageOnmousedown(callback) {
    this.el.onmousedown = e => {
      clearEventBubble(e)

      if (e.buttons !== 1 || e.which !== 1) return
      const event = e || window.event
      callback && typeof callback === 'function' && callback(event)
    }
  }
  stageOnmousemove(callback) {
    this.el.onmousemove = e => {
      if (!this.mouseOn) return
      clearEventBubble(e)
      const event = e || window.event
      callback && typeof callback === 'function' && callback(event)
    }
  }
  stageOnmouseup(callback) {
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
  stageRightclick(callback) {
    this.el.oncontextmenu = e => {
      clearEventBubble(e)
      const event = e || window.event
      callback && typeof callback === 'function' && callback(event)
      console.log('画布右击')
    }
  }
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

//遍历父偏移
function GetPosition(obj) {
  let left = 0
  let top = 0
  while (obj.offsetParent) {
    //如果obj的有最近的父级定位元素就继续
    left += obj.offsetLeft
    top += obj.offsetTop
    obj = obj.offsetParent
  }
  return { left, top }
  
}
