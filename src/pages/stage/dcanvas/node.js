export default class Node {
  constructor(node) {
    this.id = node.id
    this.active=node.active
    this.x = node.x
    this.y = node.y
    this.w = node.w
    this.h = node.h
    this.groupId = node.groupId
    
  }
  click(e){
    console.log(this.id)
  }
}
