import Dcanvas from './dcanvas'
import { type } from 'os'
import { getuuid } from '../../utils/index'
export default class Stage {
  constructor(id) {
    this.init(id)
  }
  init(id) {
    this.nodeList = []
    this.selectNodes = []
    this.id = id
    this._zoomSize = 0.5
    this.eventCrash = false
    this.mode = 'select'
    this.canvas = {}
    this._offset = 30
  }
  get zoomSize() {
    return this._zoomSize
  }
  set zoomSize(val) {
    this._zoomSize = val
    this.canvas.zoomSize = val
  }
  get offset() {
    return this._offset
  }
  set offset(val) {
    this._offset = val
    this.canvas.offset = val
  }

  createCanvas(config) {
    const _this = this
    const obj = {
      id: getuuid(),
      zoomSize: _this.zoomSize,
      width: 1920,
      height: 1080,
      offset: _this.offset
    }
    this.canvas = new Dcanvas.Canvas(obj)
    console.log('tag', this.canvas)
  }
  //todo//一次性调用
  refreshGroup(nodes) {
    nodes.forEach(n => {
      if (n.type === 'group') {
        const arr = nodes.filter(c => n.cid.includes(c.id))
        const { minX, minY, maxW, maxH } = this.nodesMaxArea(arr)
        n.x = minX
        n.y = minY
        n.w = maxW
        n.h = maxH
      }
    })
    this.nodeList = nodes
  }
  //todo//一次性调用
  refreshNodes() {
    this.nodeList.forEach(node => {
      this.selectNodes.forEach(select => {
        node.id === select.id && (node = { ...select })
      })
    })
  }
  refreshNode(node) {
    this.nodeList.forEach(n => {
      n.id === node.id && (n = { ...node })
    })
  }
  topAlign() {
    if (this.selectNodes.length > 1) {
      let ws = this.selectNodes.map(n => n.y)
      const min = Math.min.apply(null, ws)
      this.selectNodes.forEach(n => {
        n.y = min
      })
      this.refreshNodes()
    }
  }
  eventZoom(e) {
    const clientX = e.clientX / this.zoomSize
    const clientY = e.clientY / this.zoomSize
    return { clientX, clientY }
  }
  addNode(node) {
    this.nodeList.push(node)
  }
  removeNodes() {
    const dNode = this.selectNodes
    dNode.forEach(n => {
      this.removeNode(n)
    })
    this.selectNodes = []
  }
  removeNode(node) {
    this.nodeList = this.nodeList.filter(n => n.id !== node.id)
  }
  clear() {
    this.nodeList.splice(0)
  }
  createCanvase(obj) {
    this.canvas = obj
  }

  filterNode(rect) {
    console.log(rect)
    const { x, y, w, h } = rect
    const offset = this.offset
    //最小包围和
    const choiceNodes = this.nodeList.filter(
      node =>
        (node.x + node.w) * this.zoomSize + offset >= x &&
        (node.y + node.h) * this.zoomSize + offset >= y &&
        x + w >= node.x * this.zoomSize + offset &&
        y + h >= node.y * this.zoomSize + offset
    )

    const nodesInGroup = []
    choiceNodes.forEach(nodeInSelect => {
      if (nodeInSelect.type === 'group') {
        nodesInGroup.push(
          ...this.nodeList.filter(nodeInAll =>
            nodeInSelect.cid.includes(nodeInAll.id)
          )
        )
      }
    })
    const newArry = [
      ...new Set(nodesInGroup.concat(choiceNodes).map(n => n.id))
    ]
    this.selectNodes = this.nodeList.filter(n => newArry.includes(n.id))
    this.nodeList.forEach(n => {
      this.selectNodes.indexOf(n) !== -1 &&
      nodesInGroup.filter(n => n.type !== 'group').indexOf(n) === -1
        ? (n.active = true)
        : (n.active = false)
    })
  }
  layOutToUp(item) {}
  layOutToDown(item) {}
  outGroup() {
    //TODO:多根节点
    if (this.selectNodes.length === 0) return
    const rootNode = this.selectNodes.filter(
      n => n.type === 'group' && n.pid === null
    )[0]
    this.nodeList.forEach(n => {
      if (rootNode.cid.includes(n.id) && n.pid === rootNode.id) {
        n.pid = null
      }
    })

    this.nodeList = this.nodeList.filter(n => n.id !== rootNode.id)
    this.selectNodes = []
  }
  toGroup() {
    if (this.selectNodes.length === 0) return
    const { minX, minY, maxW, maxH } = this.nodesMaxArea(this.selectNodes)
    const uid = getuuid()
    const cids = []
    this.selectNodes.forEach(n => {
      n.pid === null && (n.pid = uid)
      n.active = false
      cids.push(n.id)
    })

    const Gnode = {
      id: uid,
      cid: cids,
      type: 'group',
      x: minX,
      y: minY,
      w: maxW,
      h: maxH,
      active: true
    }
    const groupNode = new Dcanvas.Node(Gnode)
    this.nodeList.push(groupNode)
    this.selectNodes.push(groupNode)
  }
  nodesMaxArea(nodes) {
    const minX = Math.min.apply(null, nodes.map(n => n.x))
    const minY = Math.min.apply(null, nodes.map(n => n.y))
    const maxW = Math.max.apply(null, nodes.map(n => n.x + n.w)) - minX
    const maxH = Math.max.apply(null, nodes.map(n => n.y + n.h)) - minY
    return { minX, minY, maxW, maxH }
  }
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
      rightclickHandler(callback) {
        ele.oncontextmenu = e => {
          this.mouseOn = false
          clearEventBubble(e)
          const event = e || window.event
          callback && typeof callback === 'function' && callback(event)
          console.log('画布右击')
        }
      },
      selectNodes(callback) {
        let startX = 0
        let startY = 0
        this.mousedownHandler(e => {
          const mouseStopId = setTimeout(() => {
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
          }, 50)
          callback && typeof callback === 'function' && callback(event)
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
