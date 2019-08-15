import Dcanvas from './dcanvas'
import { type } from 'os'
import { getuuid } from '@/utils/index'
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
    this.grid = 10
    this.bassIndex = 9000
    this.maxZoom = 1
    this.minZoom = 0.1
  }
  get indexList() {
    return this.nodeList.sort((a, b) => a.zindex - b.zindex)
  }
  get zoomSize() {
    return this._zoomSize
  }
  set zoomSize(val) {
    if (val <= this.minZoom) {
      this._zoomSize = this.minZoom
      this.canvas.zoomSize = this.minZoom
    } else if (val >= this.maxZoom) {
      this._zoomSize = this.maxZoom
      this.canvas.zoomSize = this.maxZoom
    } else {
      this._zoomSize = val
      this.canvas.zoomSize = val
    }
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

  refreshNodes() {
    this.nodeList.forEach(node => {
      this.selectNodes.forEach(select => {
        node.id === select.id && (node = { ...select })
      })
    })
  }
  refreshSetNode(node, obj) {
    this.nodeList.forEach(n => {
      n.id === node.id && (n = Object.assign(n, obj))
    })
  }
  choiceNodeById(id) {
    this.selectNodes = []
    this.nodeList.forEach(n => {
      n.active = false
      if (n.id === id) {
        if (n.disable || n.hide) return
        if (n.type === 'group') {
          this.selectNodes = [
            n,
            ...this.nodeList.filter(node => n.cid.includes(node.id))
          ].map(en => Object.assign(en, { active: true }))
        } else {
          n.active = true
          this.selectNodes = [n]
        }
      }
    })
  }
  lockNode() {
    this.selectNodes.forEach(n => {
      n.disable = true
      n.active = false
      n.cid &&
        this.nodeList.forEach(node => {
          if (n.cid.includes(node.id)) node.disable = true
          node.active = false
        })
    })
    this.selectNodes = []
  }
  unlockNode(id) {
    this.nodeList.forEach(n => {
      if (n.id === id) {
        if (n.type === 'group') {
          this.nodeList
            .filter(node => n.cid.includes(node.id))
            .forEach(n => {
              n.disable = false
            })
          n.disable = false
        } else if (n.type === 'element' && n.pid === null) {
          n.disable = false
        } else {
          return
        }
      }
    })
  }
  hideNode() {
    this.selectNodes.forEach(n => {
      n.hide = true
      n.active = false
      n.cid &&
        this.nodeList.forEach(node => {
          if (n.cid.includes(node.id)) node.hide = true
          // node.active = false 隐藏不可选中
        })
    })
    this.selectNodes = []
  }
  unhideNode(id) {
    this.nodeList.forEach(n => {
      if (n.id === id) {
        if (n.type === 'group') {
          this.nodeList
            .filter(node => n.cid.includes(node.id))
            .forEach(n => {
              n.hide = false
            })
          n.hide = false
        } else if (n.type === 'element' && n.pid === null) {
          n.hide = false
        } else {
          return
        }
      }
    })
  }
  multipleNodesAlign(type) {
    if (this.selectNodes < 3) return
    const rootNodes = this.selectNodes.filter(n => n.pid === null)
    const { minX, minY, maxX, maxY, maxW, maxH } = this.nodesMaxArea(rootNodes)

    let begin = 0
    const betweenX = (maxX - minX) / (rootNodes.length - 1)

    const betweenY = (maxY - minY) / (rootNodes.length - 1)
    switch (type) {
      case 'HorizontalAverage':
        rootNodes
          .sort((a, b) => a.x - b.x)
          .forEach(node => {
            const dx = minX + begin * betweenX - node.x
            node.x = minX + begin * betweenX
            begin++
            if (node.type === 'group') {
              this.getNodeChildren(node, n => {
                n.x = n.x + dx
              })
            }
          })
        break
      case 'VerticalAverage':
        rootNodes
          .sort((a, b) => a.y - b.y)
          .forEach(node => {
            const dy = minY + begin * betweenY - node.y
            node.y = minY + begin * betweenY
            begin++
            if (node.type === 'group') {
              this.getNodeChildren(node, n => {
                n.y = n.y + dy
              })
            }
          })
        break

      default:
        break
    }
  }
  nodesAlign(type) {
    if (this.selectNodes.length > 1) {
      const rootNodes = this.selectNodes.filter(n => n.pid === null)
      const { minX, minY, maxX, maxY, maxW, maxH } = this.nodesMaxArea(
        rootNodes
      )
      let begin = 0
      switch (type) {
        case 'top':
          rootNodes.forEach(node => {
            const dy = minY - node.y
            node.y = minY
            if (node.type === 'group') {
              this.getNodeChildren(node, n => {
                n.y = n.y + dy
              })
            }
          })
          break

        case 'right':
          rootNodes.forEach(node => {
            const dx = maxW + minX - node.w - node.x
            node.x = maxW + minX - node.w
            if (node.type === 'group') {
              this.getNodeChildren(node, n => {
                n.x = n.x + dx
              })
            }
          })
          break

        case 'bottom':
          rootNodes.forEach(node => {
            const dy = maxH + minY - node.h - node.y
            node.y = maxH + minY - node.h
            if (node.type === 'group') {
              this.getNodeChildren(node, n => {
                n.y = n.y + dy
              })
            }
          })
          break

        case 'left':
          rootNodes.forEach(node => {
            const dx = minX - node.x
            node.x = minX
            if (node.type === 'group') {
              this.getNodeChildren(node, n => {
                n.x = n.x + dx
              })
            }
          })
          break

        case 'VCenter':
          rootNodes.forEach(node => {
            const dy = maxH / 2 + minY - node.h / 2 - node.y
            node.y = maxH / 2 + minY - node.h / 2
            if (node.type === 'group') {
              this.getNodeChildren(node, n => {
                n.y = n.y + dy
              })
            }
          })
          break

        case 'HCenter':
          rootNodes.forEach(node => {
            const dx = maxW / 2 + minX - node.w / 2 - node.x
            node.x = maxW / 2 + minX - node.w / 2
            if (node.type === 'group') {
              this.getNodeChildren(node, n => {
                n.x = n.x + dx
              })
            }
          })
          break
        case 'Hline':
          rootNodes
            .sort((a, b) => a.x - b.x)
            .forEach(node => {
              const dx = minX + begin - node.x
              node.x = minX + begin

              begin += node.w

              if (node.type === 'group') {
                this.getNodeChildren(node, n => {
                  n.x = n.x + dx
                })
              }
            })
          break
        case 'Vline':
          rootNodes
            .sort((a, b) => a.x - b.x)
            .forEach(node => {
              const dy = minY + begin - node.y
              node.y = minY + begin

              begin += node.h

              if (node.type === 'group') {
                this.getNodeChildren(node, n => {
                  n.y = n.y + dy
                })
              }
            })
          break
        default:
          break
      }
    }
  }
  getNodeChildren(node, callback) {
    this.nodeList.forEach(n => {
      if (node.cid.includes(n.id)) {
        callback && typeof callback === 'function' && callback(n)
      }
    })
  }

  eventZoom(e) {
    const clientX = e.clientX / this.zoomSize
    const clientY = e.clientY / this.zoomSize
    return { clientX, clientY }
  }
  addNode(node) {
    node.zindex = this.bassIndex
    this.bassIndex++
    this.nodeList.push(node)
  }
  removeNodes() {
    const dNode = this.selectNodes
    let bindex = 9000
    dNode.forEach(n => {
      this.removeNode(n)
    })
    this.nodeList
      .sort((a, b) => a.zindex - b.zindex)
      .forEach(n => {
        n.zindex = bindex
        bindex++
      })
    this.bassIndex -= this.selectNodes.length
    this.selectNodes = []
  }
  removeNode(node) {
    this.nodeList = this.nodeList.filter(n => n.id !== node.id)
  }
  clear() {
    this.nodeList.splice(0)
    this.selectNodes = []
    this.bassIndex = 9000
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
    this.selectNodes = this.nodeList.filter(
      n => newArry.includes(n.id) && !n.hide && !n.disable
    )
    this.nodeList.forEach(n => {
      this.selectNodes.indexOf(n) !== -1 &&
      nodesInGroup.filter(n => n.type !== 'group').indexOf(n) === -1
        ? (n.active = true)
        : (n.active = false)
    })
  }
  LayerToUp() {
    const selectPnodes = this.selectNodes.filter(n => n.pid === null)
    selectPnodes.forEach(n => {
      const nextPnode = this.nodeList
        .sort((a, b) => a.zindex - b.zindex)
        .find(node => node.zindex > n.zindex && node.pid === null)
      if (nextPnode !== undefined) {
        let pindex = nextPnode.zindex
        n.zindex = pindex
        if (n.cid) {
          this.nodeList
            .filter(cnode => n.cid.includes(cnode.id))
            .forEach(cnode => {
              cnode.zindex = pindex - 1
              pindex--
            })
        }
        n.cid ? (nextPnode.zindex -= n.cid.length + 1) : (nextPnode.zindex -= 1)
        if (nextPnode.cid) {
          this.nodeList
            .filter(cnode => nextPnode.cid.includes(cnode.id))
            .forEach(cn => {
              n.cid ? (cn.zindex -= n.cid.length + 1) : (cn.zindex -= 1)
            })
        }
      }
    })
  }
  LayerToDown(nodes) {}
  LayerToTop() {
    let bindex = 9000
    const arry = this.nodeList
      .sort((a, b) => a.zindex - b.zindex)
      .filter(n => !this.selectNodes.map(n => n.id).includes(n.id))
    const newArry = arry.concat(
      this.selectNodes.sort((a, b) => a.zindex - b.zindex)
    )
    newArry.forEach(n => {
      n.zindex = bindex
      bindex++
    })
  }
  LayerToBottom() {
    let bindex = 9000
    const arry = this.nodeList
      .sort((a, b) => a.zindex - b.zindex)
      .filter(n => !this.selectNodes.map(n => n.id).includes(n.id))
    const newArry = this.selectNodes
      .sort((a, b) => a.zindex - b.zindex)
      .concat(arry)
    newArry.forEach(n => {
      n.zindex = bindex
      bindex++
    })
  }
  outGroup() {
    const pNodes = this.selectNodes.filter(n => n.type === 'group')
    if (pNodes.length < 1) return
    const rootNode = this.selectNodes.filter(
      n => n.type === 'group' && n.pid === null
    )[0]
    this.nodeList.forEach(n => {
      if (rootNode.cid.includes(n.id) && n.pid === rootNode.id) {
        n.pid = null
      }
    })

    this.nodeList = this.nodeList.filter(n => n.id !== rootNode.id)
    this.nodeList
      .sort((a, b) => a.zindex - b.zindex)
      .filter(n => n.zindex > rootNode.zindex)
      .forEach(n => {
        n.zindex--
      })
    this.selectNodes.forEach(n => {
      n.pid === null && (n.active = true)
    })
  }
  toGroup() {
    const pNodes = this.selectNodes.filter(n => n.pid === null)
    if (pNodes.length < 2) return
    const { minX, minY, maxW, maxH } = this.nodesMaxArea(this.selectNodes)
    const uid = getuuid()
    const cids = []
    let maxIndex = 0
    this.selectNodes.forEach(n => {
      n.pid === null && (n.pid = uid)
      n.active = false
      cids.push(n.id)
      n.zindex >= maxIndex && (maxIndex = n.zindex + 1)
    })

    if (this.indexList.map(n => n.zindex).includes(maxIndex)) {
      this.nodeList
        .filter(n => n.zindex >= maxIndex)
        .forEach(n => {
          n.zindex++
        })
      this.bassIndex++
    } else {
      this.bassIndex = maxIndex + 1
    }
    const Gnode = {
      id: uid,
      cid: cids,
      type: 'group',
      x: minX,
      y: minY,
      w: maxW,
      h: maxH,
      active: true,
      zindex: maxIndex
    }
    const groupNode = new Dcanvas.Node(Gnode)
    let mIndex = maxIndex - 1
    this.nodeList.push(groupNode)
    this.selectNodes.push(groupNode)
    this.nodeList
      .sort((a, b) => b.zindex - a.zindex)
      .forEach(n => {
        if (groupNode.cid.includes(n.id)) {
          n.zindex = mIndex
          mIndex--
        }
      })
    console.log('t@@@@@@ag', mIndex, maxIndex)
    const minIndexNodes = this.nodeList.filter(
      n => n.zindex < maxIndex && !groupNode.cid.includes(n.id)
    )
    minIndexNodes.forEach(n => {
      n.zindex = mIndex
      mIndex--
    })
  }
  nodesMaxArea(nodes) {
    const minX = Math.min.apply(null, nodes.map(n => n.x))
    const minY = Math.min.apply(null, nodes.map(n => n.y))
    const maxX = Math.max.apply(null, nodes.map(n => n.x))
    const maxY = Math.max.apply(null, nodes.map(n => n.y))
    const maxW = Math.max.apply(null, nodes.map(n => n.x + n.w)) - minX
    const maxH = Math.max.apply(null, nodes.map(n => n.y + n.h)) - minY

    return { minX, minY, maxX, maxY, maxW, maxH }
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
      onmousewheelHandler(callback) {
        ele.onmousewheel = e => {
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
          const startX = e.clientX - GetPosition(ele).left + ele.scrollLeft
          const startY = e.clientY - GetPosition(ele).top + ele.scrollTop
          callback &&
            typeof callback === 'function' &&
            callback(event, startX, startY)
          console.log('画布右击')
        }
      },
      mouseWheelZoom(callback) {
        this.onmousewheelHandler(e => {
          callback && callback.type === 'function' && callback(e)
        })
      },
      reNameNode(node, newname) {
        node.name = newname
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
          callback && typeof callback === 'function' && callback(event)
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
