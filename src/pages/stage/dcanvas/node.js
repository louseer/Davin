import { getuuid } from '../../utils/index'
import Dcanvas from './dcanvas'
export default class Node {
  constructor(node) {
    this.type=node.type || 'element'
    this.id = node.id || getuuid()
    this.active=node.active || false
    this.x = node.x || 0
    this.y = node.y || 0
    this.w = node.w || 0
    this.h = node.h || 0
    //this.groupId = node.groupId || ''
    this.index=node.index || 1   
    this.disable=node.disable || false
    this.pid=node.pid || null
    this.cid=node.cid || null
  }
  
 
 
}

function clearEventBubble(e) {
  if (e.stopPropagation) e.stopPropagation()
  else e.cancelBubble = true
  if (e.preventDefault) e.preventDefault()
  else e.returnValue = false
}