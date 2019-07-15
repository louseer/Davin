import Dcanvas from './dcanvas'
import { type } from 'os'
export default class Stage {
  constructor(id) {
    this.init(id)
  }
  init(id) {
    this.nodeList = []
    this.selectNodes = []
    this.id = id
    this.zoomSize = 1
    this.eventCrash = false
    this.mode = 'select'
  }
  addNode(node) {
    this.nodeList.push(node)
  }
  filterNode(rect) {
    const { x, y, w, h } = rect
    this.selectNodes = this.nodeList.filter(
      node =>
        node.x + node.w >= x &&
        node.y + node.h >= y &&
        x + w >= node.x &&
        y + h >= node.y
    )

    console.log(this.selectNodes)
  }
  layOutToUp(item) {}
  layOutToDown(item) {}
  toGroup(nodes) {}
  checkInStage(e) {
    const [x, y] = [e.target.offsetX, e.target.offsetY]
  }
  Handler(ele) {
    const _this = this
    return {
      mouseOn: false,
      clickHandler(callback) {
        ele.onclick = e => {
          clearEventBubble(e)
          const event = e || window.event
          callback && typeof callback === 'function' && callback(event)
        }
      },
      mousedownHandler(callback) {
        ele.onmousedown = e => {
          clearEventBubble(e)
          const event = e || window.event
          callback && typeof callback === 'function' && callback(event)
        }
      },
      mousemoveHandler(callback) {
        ele.onmousemove = e => {
          if (!this.mouseOn) return
          clearEventBubble(e)
          const event = e || window.event
          callback && typeof callback === 'function' && callback(event)
        }
      },
      mouseupHandler(callback) {
        ele.onmouseup = e => {
          if (!this.mouseOn) return
          clearEventBubble(e)
          const event = e || window.event
          callback && typeof callback === 'function' && callback(event)
        }
      },
      selectNodes() {
        let startX = 0
        let startY = 0
        this.mousedownHandler(e => {
          this.mouseOn = true
          startX = e.clientX - GetPosition(ele).left + ele.scrollLeft
          startY = e.clientY - GetPosition(ele).top + ele.scrollTop
          let selDiv = document.createElement('div')
          selDiv.style.cssText =
            'position:absolute;width:0;height:0;margin:0;padding:0;border:1px dashed #eee;z-index:1000;opacity:0.6;display:none;'
          selDiv.id = 'selectDiv'
          ele.appendChild(selDiv)
          selDiv.style.left = startX + 'px'
          selDiv.style.top = startY + 'px'
          console.log('回来了', '')
        })
        this.mousemoveHandler(e => {
          let _x = e.clientX - GetPosition(ele).left + ele.scrollLeft
          let _y = e.clientY - GetPosition(ele).top + ele.scrollTop
          let _H = ele.clientHeight

          if (_y >= _H && ele.scrollTop <= _H) {
            ele.scrollTop += _y - _H
          }
          // 向上拖拽
          if (e.clientY <= GetPosition(ele).top && ele.scrollTop > 0) {
            ele.scrollTop = Math.abs(e.clientY - GetPosition(ele).top)
          }

          let selDiv = document.getElementById('selectDiv')
          selDiv.style.display = 'block'
          selDiv.style.left = Math.min(_x, startX) + 'px'
          selDiv.style.top = Math.min(_y, startY) + 'px'
          selDiv.style.width = Math.abs(_x - startX) + 'px'
          selDiv.style.height = Math.abs(_y - startY) + 'px'
          selDiv.style.cursor = 'crosshair'
        })
        this.mouseupHandler(e => {
          this.mouseOn = false
          let selDiv = document.getElementById('selectDiv')
          const rect = {
            x: +selDiv.style.left.substring(0, selDiv.style.left.length - 2),
            y: +selDiv.style.top.substring(0, selDiv.style.top.length - 2),
            w: +selDiv.style.width.substring(0, selDiv.style.width.length - 2),
            h: +selDiv.style.height.substring(0, selDiv.style.height.length - 2)
          }
          _this.filterNode(rect)
          
          selDiv.style.display = 'none'
          selDiv.remove()
        })
      }
    }
  }
}
//向量积
function checkCrash(point, node) {
  const [x, y] = [point.x, point.y]
  const [PA, PB, PC, PD] = [
    { x: node.x, y: node.y + node.h },
    { x: node.x, y: node.y },
    { x: node.x + node.w, y: node.y },
    { x: node.x + node.w, y: node.y + node.h }
  ]
  const [a, b, c, d] = [
    (PB.x - PA.x) * (y - PA.y) - (PB.y - PA.y) * (x - PA.x),
    (PC.x - PB.x) * (y - PB.y) - (PC.y - PB.y) * (x - PB.x),
    (PD.x - PC.x) * (y - PC.y) - (PD.y - PC.y) * (x - PC.x),
    (PA.x - PD.x) * (y - PD.y) - (PA.y - PD.y) * (x - PD.x)
  ]
  return (
    (a > 0 && b > 0 && c > 0 && d > 0) || (a < 0 && b < 0 && c < 0 && d < 0)
  )
}
function clearEventBubble(e) {
  if (e.stopPropagation) e.stopPropagation()
  else e.cancelBubble = true
  if (e.preventDefault) e.preventDefault()
  else e.returnValue = false
}
function getStyle(obj, styleName) {
  if (obj.currentStyle) {
    return obj.currentStyle[styleName]
  } else {
    return getComputedStyle(obj, null)[styleName]
  }
}
function GetPosition(obj) {
  let left = 0
  let top = 0
  while (obj.offsetParent) {
    left += obj.offsetLeft
    top += obj.offsetTop
    obj = obj.offsetParent
  }
  return { left, top }
}
