import { getuuid } from '@/utils/index'
import Dcanvas from './dcanvas'
import { timingSafeEqual } from 'crypto'
export default class Node {
  constructor(node) {
    this.type=node.type || 'element'
    this.id = node.id || getuuid()
    this.active=node.active || false
    this.x = node.x || 0
    this.y = node.y || 0
    this.w = node.w || 0
    this.h = node.h || 0
    this.elType=node.elType || 'normal'
    this.zindex=node.zindex || 9000   
    this.disable=node.disable || false
    this.pid=node.pid || null
    this.cid=node.cid || null
    this.name=node.name || (this.type ==='group' ? '组' : '元素')
    this.hide=node.hide || false
    this.chart=node.chart || null
    this.opacity = node.opacity || 100
  }
 
 
 
}

function clearEventBubble(e) {
  if (e.stopPropagation) e.stopPropagation()
  else e.cancelBubble = true
  if (e.preventDefault) e.preventDefault()
  else e.returnValue = false
}