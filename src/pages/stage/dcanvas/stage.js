import Dcanvas from './dcanvas'
import { type } from 'os';
export default class Stage {
  constructor(id) {
    this.init(id)
  }
  init(id) {
    this.nodeList = []
    // this.group=[]
    this.selectNodes = []
    //this.lay=[]
    this.id = id
    this.zoomSize = 1
    this.eventCrash=false
  }
  createNode(node) {
    const newNode = new Dcanvas.Node(node)
    this.nodeList.push(newNode)
  }
  filterNode(x, y, w, h) {}
  seletNodes() {}
  layOutToUp(item) {}
  layOutToDown(item) {}
  toGroup(nodes) {}
  checkInStage(e) {
    const [x, y] = [e.target.offsetX, e.target.offsetY]
    //this.nodeList
  }
  Handler(ele) {
    const _this = this
    return {
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
      }
    }
  }
}
//向量积
function checkCrash(point,node){
  const [x,y]=[point.x,point.y]  
  const [PA,PB,PC,PD]=[{x:node.x,y:node.y + node.h},{x:node.x,y:node.y},{x:node.x+node.w,y:node.y},{x:node.x+node.w,y:node.y+node.h}]


}
function clearEventBubble(e) {
  e.stopPropagation ? e.stopPropagation() : e.cancelBubble = true
  e.preventDefault ? e.preventDefault() :  e.returnValue = false  
}
function getStyle(obj, styleName) {
  if (obj.currentStyle) {
    return obj.currentStyle[styleName]
  } else {
    return getComputedStyle(obj, null)[styleName]
  }
}