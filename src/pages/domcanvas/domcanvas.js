export default class DomCavase {
  constructor(el, mode, grid = [5, 5]) {
    this.el = el
    this.mode = mode || 'select'
    this.grid = grid
    this.mouseOn = false
    this.pos = GetPosition(this.el)
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
    this.pos=GetPosition(this.el)
  }
  get canvasWidth() {
    return this.el.offsetWidth
  }
  set canvasHeight(val) {
    this.el.style.height = `${val}px`
    this.pos=GetPosition(this.el)
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

  canvasRightclick(callback) {
    this.el.oncontextmenu = e => {
      clearEventBubble(e)
      const event = e || window.event
      callback && typeof callback === 'function' && callback(event)
      console.log('画布右击')
    }
  }
  selectNode(callback) {
    let mouseStopId
    // let mouseOn = false
    let startX = 0
    let startY = 0
    let selectContainer = this.el
    //let pos = GetPosition(selectContainer)
    
    console.log(selectContainer)
    window.onresize=()=>{
      this.pos=GetPosition(this.el)
    }
    
    if (this.mode !== 'select') return
    this.canvasOnmousedown(e => {
      mouseStopId = setTimeout(() => {
        this.mouseOn = true
        startX = e.clientX - this.pos.left + selectContainer.scrollLeft     
        startY = e.clientY - this.pos.top + selectContainer.scrollTop      
        let selDiv = document.createElement('div')
        selDiv.style.cssText =
          'position:absolute;width:0;height:0;margin:0;padding:0;border:1px dashed #eee;background-color:#aaa;z-index:1000;opacity:0.6;display:none'
        selDiv.id = 'selectDiv'
        selectContainer.appendChild(selDiv)
        console.log(this.el)
        selDiv.style.left = startX + 'px'
        selDiv.style.top = startY + 'px'
      }, 0)
    })
    this.canvasOnmousemove(e => {
      let _x = e.clientX - this.pos.left + selectContainer.scrollLeft
      let _y = e.clientY - this.pos.top + selectContainer.scrollTop
      let _H = selectContainer.clientHeight

      if (_y >= _H && selectContainer.scrollTop <= _H) {
        selectContainer.scrollTop += _y - _H
      }
      // 向上拖拽
      if (e.clientY <= this.pos.top && selectContainer.scrollTop > 0) {
        selectContainer.scrollTop = Math.abs(e.clientY - this.pos.top)
      }

      let selDiv = document.getElementById('selectDiv')
      selDiv.style.display = 'block'
      selDiv.style.left = Math.min(_x, startX) + 'px'
      selDiv.style.top = Math.min(_y, startY) + 'px'
      selDiv.style.width = Math.abs(_x - startX) + 'px'
      selDiv.style.height = Math.abs(_y - startY) + 'px'
    })
    this.canvasOnmouseup(e => {
      let selDiv = document.getElementById('selectDiv')
      let pos = GetPosition(selDiv)
      let fileDivs = document.getElementsByClassName('layernode')
      let selectedEls = []
      let l = selDiv.offsetLeft
      let t = selDiv.offsetTop
      let w = selDiv.offsetWidth
      let h = selDiv.offsetHeight
      for (let i = 0; i < fileDivs.length; i++) {
        let sl = fileDivs[i].offsetWidth + fileDivs[i].offsetLeft
        let st = fileDivs[i].offsetHeight + fileDivs[i].offsetTop

        if (
          sl > l &&
          st > t &&
          fileDivs[i].offsetLeft < l + w &&
          fileDivs[i].offsetTop < t + h
        ) {
          selectedEls.push(fileDivs[i])
        }
      }

      console.log(selectedEls)
      selDiv.style.display = 'none'
      selDiv.remove()
     
      this.mouseOn = false
      callback && typeof callback === 'function' && callback(selectedEls)
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
