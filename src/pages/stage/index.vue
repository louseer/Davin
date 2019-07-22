<template>
  <div style="overflow: hidden;position: relative; ">
    <input type="text" placeholder="请输入宽度" />
    <input type="text" placeholder="请输入高度" />
    <input type="text" placeholder="请输入放大值" />
    <input type="text" placeholder="请输入透明度" />
    <input type="select" placeholder="请输入背景色" />
    <select>
      <option value="black">黑色</option>
      <option value="red">红色</option>
      <option value="yellow">黄色</option>
      <option value="blue">蓝色</option>
    </select>
    <h1>画布在下方⬇</h1>
    <button @click="fillNode">添加</button>
    <button @click="totop">对齐</button>
    <button @click="toGroup">编组</button>
    <button @click="clear">清空</button>
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
        />
      </Cav>
      <div v-if="rightClick" class="rightmenu" style="width:200px; height:200px; background:red"></div>
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
      startY: 0
    }
  },

  watch: {
    domCavase: {
      handler: function() {
        console.log('选择节点', this.domCavase.selectNodes)
        // console.log('全部节点',this.domCavase.nodeList)
      },
      deep: true
    }
  },
  mounted() {
    const handler = this.domCavase.Handler(this.$refs.stage)

    handler.selectNodes(e => {
      this.rightClick = false
    })

    handler.rightclickHandler(e => {
      this.rightClick = true
    })
  },
  methods: {
    clear() {
      this.domCavase.clear()
    },
    totop() {
      //TODO: group
      this.domCavase.topAlign()
    },
    toGroup() {
      this.domCavase.toGroup()
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
          n => n.groupId === node.groupId
        )
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
      const names = this.domCavase.selectNodes.map(n => n.id)
      if (node.type === 'element') {
        this.domCavase.nodeList.forEach(n => {
          if (names.includes(n.id)) {
            n.x = n.x + dx
            n.y = n.y + dy
            this.startX = this.domCavase.eventZoom(e).clientX
            this.startY = this.domCavase.eventZoom(e).clientY
          }
        })
      }
      if (node.type === 'group') {
        this.domCavase.nodeList.forEach(n => {
          if (node.groupId === n.groupId || names.includes(n.id)) {
            n.x = n.x + dx
            n.y = n.y + dy
            this.startX = this.domCavase.eventZoom(e).clientX
            this.startY = this.domCavase.eventZoom(e).clientY
          }
        })
      }
    },
    fillNode() {
      const nodes = [
        { x: 0, y: 0, w: 500, h: 500 },
        { x: 600, y: 0, w: 900, h: 500 },
        { x: 900, y: 500, w: 70, h: 200 },
        {
          x: 0,
          y: 0,
          w: 200,
          h: 60
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
    },
    eventZoom(e) {
      this.domCavase.eventZoom(e)
    }
  },
  created() {
    this.domCavase = new Dcanvas.Stage()
  }
}
</script>

<style scoped lang='less'>
input {
  border: 1px #dddddd solid;
  height: 40px;
  width: 200px;
  // float: left;
  margin-right: 20px;
  float: left;
}
select {
  border: 1px #dddddd solid;
  height: 40px;
  width: 200px;
  // float: left;
  margin-right: 20px;
  float: left;
}
.stage {
  width: 100%;
  height: 800px;
  background: url(~images/pointe.png) repeat #666666;
  position: relative;
  overflow: hidden;
  perspective: 1920px;
  perspective-origin: 0% 0%;
}
</style>