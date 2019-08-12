<template>
  <div style="overflow: hidden;position: relative; height:100% ">
    <div
      v-if="rightClick"
      class="rightmenu"
      style="width:200px; height:200px; background:red; z-index:999999;position: absolute;"
    ></div>
    <div class="ex">
      <input type="text" v-model="domCavase.canvas.width" placeholder="请输入宽度" />
      <input type="text" v-model="domCavase.canvas.height" />
      <input type="text" v-model="domCavase.zoomSize" placeholder="请输入放大值" />
      <!-- <input type="text"  placeholder="请输入透明度" />
    <input type="select" placeholder="请输入背景色" />
    <select>
      <option value="black">黑色</option>
      <option value="red">红色</option>
      <option value="yellow">黄色</option>
      <option value="blue">蓝色</option>
      </select>-->

      <div style="clear:both;padding:10px">
        <div style="margin:0 auto; width:100%">
          <button
            v-for="(btn,index) in  aglinList"
            :key="index"
            style="float:left"
            @click="nodeAlign(btn.type)"
          >{{btn.name}}</button>

          <button @click="fillNode">添加</button>
          <button @click="toGroup">编组</button>
          <button @click="outGroup">解除编组</button>
          <button @click="clear">清空</button>
          <button @click="deleteNode">删除</button>
          <button @click="selectAll">全选</button>
          <button @click="lockNode">锁定</button>
          <button @click="hideNode">隐藏</button>
          <!-- 
        <button @click="downLayer">下移一层</button>
        
          -->
          <button @click="upLayer">上移一层</button>
          <button @click="toBottomLayer">置于底层</button>
          <button @click="toTopLayer">置于顶层</button>
          <button
            style="float:left"
            v-if="multiple.length>=3"
            @click="multipleNodesAlign('VerticalAverage')"
          >垂直均分</button>
          <button
            style="float:left"
            v-if="multiple.length>=3"
            @click="multipleNodesAlign('HorizontalAverage')"
          >水平均分</button>
          <button style="float:left" v-if="multiple.length>=2" @click="nodeAlign('Hline')">水平联排</button>
          <button style="float:left" v-if="multiple.length>=2" @click="nodeAlign('Vline')">垂直联排</button>
        </div>
      </div>
    </div>
    <div class="stage" ref="stage">
      <Cav :canvasConfig="domCavase.canvas">
        <Node
          class="layernode"
          v-for="(node,index) in domCavase.nodeList"
          :node="node"
          :key="index"
          @nodeDragStart="nodeDragStart"
          @nodeDrag="nodeDrag"
          @resizeNode="resizeNode"
          @nodeClick
          @nodeDrop="nodeDrop"
          @nodeMousedown="nodeMousedown"
          @nodeResizeMousedown="nodeResizeMousedown"
          @nodeResizeNode="nodeResizeNode"
        />
      </Cav>
    </div>
  </div>
</template>

<script>
import Dcanvas from './dcanvas/dcanvas'
import Cav from './canvas.vue'
import Node from './layer-node.vue'
export default {
  components: {
    Node,
    Cav
  },
  data() {
    return {
      domCavase: '',
      canvasConfig: '',
      rightClick: false,
      mode: 'edit',
      startX: 0,
      startY: 0,
      dx: 0,
      dy: 0,
      dnode: '',
      nodelist: [],
      aglinList: [
        { type: 'top', name: '顶对齐' },
        { type: 'right', name: '右对齐' },
        { type: 'bottom', name: '底对齐' },
        { type: 'left', name: '左对齐' },
        { type: 'VCenter', name: '垂直居中' },
        { type: 'HCenter', name: '水平居中' }
      ]
    }
  },
  computed: {
    multiple() {
      return this.domCavase.selectNodes.filter(n => n.pid === null)
    }
  },
  // watch: {
  //   domCavase: {
  //     handler: function(val) {
  //       this.$emit('nodelistChange', val)
  //     },
  //     deep: true
  //   }
  // },
  mounted() {
    const handler = this.domCavase.Handler(this.$refs.stage)
    handler.selectNodes(e => {
      this.rightClick = false
      console.log('##@@@sdfsdfsfdsdf')
      //this.$emit('nodelistChange', this.domCavase.nodeList)
    })
    handler.mouseWheelZoom()
    handler.rightclickHandler(e => {
      this.rightClick = true
    })
  },
  methods: {
    choiceNodeById(id){
     this.domCavase.choiceNodeById(id)
      this.$emit('nodelistChange', this.domCavase.nodeList)
    },
    hideNode() {
      this.domCavase.hideNode()
      this.$emit('nodelistChange', this.domCavase.nodeList)
    },
    unhideNode(id) {
      this.domCavase.unhideNode(id)
      this.$emit('nodelistChange', this.domCavase.nodeList)
    },
    lockNode() {
      this.domCavase.lockNode()
      this.$emit('nodelistChange', this.domCavase.nodeList)
    },
    unlockNode(id) {
      this.domCavase.unlockNode(id)
    },
    selectAll() {
      this.domCavase.selectNodes = this.domCavase.nodeList.filter(
        n => !n.disable
      )
      this.domCavase.selectNodes = this.domCavase.selectNodes.map(n =>
        Object.assign(n, { active: true })
      )
    },
    nodeResizeNode(type, e, node) {
      e.target.style.opacity = '1'
      const event = e || window.event
      const _x = e.clientX - this.dx
      const _y = e.clientY - this.dy
      switch (type) {
        case 'mr':
          node.w = node.w + _x / this.domCavase.zoomSize
          break
        case 'rb':
          node.w = node.w + _x / this.domCavase.zoomSize
          node.h = node.h + _y / this.domCavase.zoomSize
          break
        case 'mb':
          node.h = node.h + _y / this.domCavase.zoomSize
          break
        default:
          break
      }
      this.dx = e.clientX
      this.dy = e.clientY
      const { zW, zH, zX, zY } = this.nodeResizeZoom(this.dnode, node)

      if (node.cid === null) return
      const chilrenlist = node.cid
      this.domCavase.nodeList.forEach(n => {
        if (chilrenlist.includes(n.id)) {
          n.x = node.x + (n.x - node.x) * zW
          n.y = node.y + (n.y - node.y) * zH
          n.w = n.w * zW
          n.h = n.h * zH
        }
      })
      this.dnode = JSON.parse(JSON.stringify(node))
    },
    nodeResizeZoom(oldNode, newNode) {
      const zW = newNode.w / oldNode.w
      const zH = newNode.h / oldNode.h
      const zX = newNode.x / oldNode.x
      const zY = newNode.y / oldNode.y
      return { zW, zH, zX, zY }
    },
    nodeResizeMousedown(e, node) {
      this.dx = e.clientX
      this.dy = e.clientY
      this.dnode = JSON.parse(JSON.stringify(node))
      console.log(this.dnode.w, '')
    },
    upLayer() {
      this.domCavase.LayerToUp()
      this.$emit('nodelistChange', this.domCavase.nodeList)
    },
    toTopLayer() {
      this.domCavase.LayerToTop()
      this.$emit('nodelistChange', this.domCavase.nodeList)
    },
    toBottomLayer() {
      this.domCavase.LayerToBottom()
      this.$emit('nodelistChange', this.domCavase.nodeList)
    },
    deleteNode() {
      this.domCavase.removeNodes()
      this.$emit('nodelistChange', this.domCavase.nodeList)
    },
    outGroup() {
      this.domCavase.outGroup()
      this.$emit('nodelistChange', this.domCavase.nodeList)
    },
    clear() {
      this.domCavase.clear()
      this.$emit('nodelistChange', this.domCavase.nodeList)
    },
    nodeAlign(type) {
      this.domCavase.nodesAlign(type)
    },
    multipleNodesAlign(type) {
      this.domCavase.multipleNodesAlign(type)
    },
    toGroup() {
      this.domCavase.toGroup()
      this.$emit('nodelistChange', this.domCavase.nodeList)
    },
    nodeDragStart(e) {
      this.startX = this.domCavase.eventZoom(e).clientX
      this.startY = this.domCavase.eventZoom(e).clientY
    },
    nodeDrop(node) {
      this.domCavase.refreshNodes()
    },
    nodeMousedown(node) {
      if (this.domCavase.selectNodes.map(n => n.id).includes(node.id)) return
      if (node.type === 'element') {
        this.domCavase.selectNodes = [node]
        this.domCavase.nodeList.forEach(n => {
          n.id === node.id ? (n.active = true) : (n.active = false)
        })
      }
      if (node.type === 'group') {
        this.domCavase.selectNodes = this.domCavase.nodeList.filter(
          n => node.cid.includes(n.id) || node.id === n.id
        )
        this.domCavase.nodeList.forEach(n => {
          n.id === node.id ? (n.active = true) : (n.active = false)
        })
      }
    },
    resizeNode(e, node) {
      this.domCavase.refreshNode(node)
    },
    nodeDrag(e, node) {
      const _x = this.domCavase.eventZoom(e).clientX
      const _y = this.domCavase.eventZoom(e).clientY
      const dx = _x - this.startX
      const dy = _y - this.startY
      const idList = this.domCavase.selectNodes.map(n => n.id)
      if (node.type === 'element') {
        this.domCavase.nodeList.forEach(n => {
          if (idList.includes(n.id)) {
            n.x = n.x + dx
            n.y = n.y + dy
            this.startX = this.domCavase.eventZoom(e).clientX
            this.startY = this.domCavase.eventZoom(e).clientY
          }
        })
      }
      if (node.type === 'group') {
        this.domCavase.nodeList.forEach(n => {
          if (node.cid.includes(n.id) || idList.includes(n.id)) {
            n.x = n.x + dx
            n.y = n.y + dy
            this.startX = this.domCavase.eventZoom(e).clientX
            this.startY = this.domCavase.eventZoom(e).clientY
          }
        })
      }
    },
     toggleGrop(){
      const rootLIst=this.domCavase.selectNodes.filter(n=>n.pid === null )
      if(rootLIst.length === 1  ){
       this.domCavase.outGroup()
      }
      else{
       this.domCavase.toGroup()
      }
      this.$emit('nodelistChange', this.domCavase.nodeList)
     },

    fillNode() {
      const nodes = [
        { x: 0, y: 0, w: 200, h: 200, name: '1基本饼图' },
        { x: 250, y: 0, w: 200, h: 200, name: '2基本什么图' },
        { x: 450, y: 0, w: 200, h: 200, name: '3ZZZZXXX图' },
        { x: 650, y: 0, w: 200, h: 200, name: '4各种图' },
        {
          x: 850,
          y: 0,
          w: 200,
          h: 200,
          elType: 'title',
          disable: true,
          name: '中华锁王'
        },
        {
          x: 1050,
          y: 0,
          w: 200,
          h: 200,
          elType: 'pie',
          name: '小透明',
          hide: true
        }
      ]
      nodes.forEach(node => {
        this.addNode(node)
      })

      console.log('tag', this.domCavase.nodeList)
    },
    addNode(node) {
      const newNode = new Dcanvas.Node(node)
      this.domCavase.addNode(newNode)
      this.$emit('nodelistChange', this.domCavase.nodeList)
    },
    eventZoom(e) {
      this.domCavase.eventZoom(e)
    }
  },
  created() {
    this.domCavase = new Dcanvas.Stage()
    this.domCavase.createCanvas()
    console.log('@@@@@@@@', this.domCavase.canvas)
    this.nodelist = this.domCavase.nodeList
  }
}
</script>

<style scoped lang='less'>
button {
  border: 1px white solid;
  font: 12px/1 '微软雅黑';
  padding: 5px;
  border-radius: 4px;
  margin-right: 2px;
  cursor: pointer;
  &:hover {
    background: darkgray;
    color: #ffffff;
  }
}
input {
  border: 1px #dddddd solid;
  height: 25px;
  width: 50px;
  // float: left;
  margin-right: 20px;
  float: left;
  font-size: 12px;
}
select {
  border: 1px #dddddd solid;
  height: 40px;
  width: 200px;
  // float: left;
  margin-right: 20px;
  float: left;
}
.ex {
  position: absolute;
  width: 100%;
  height: 200px;
  bottom: 0;
  z-index: 9999;
}
.stage {
  width: 100%;
  height: 100%;
  background: url(~images/pointe.png) repeat #27272b;
  position: relative;
  overflow: hidden;
  // perspective: 1920px;
  // perspective-origin: 0% 0%;
}
</style>