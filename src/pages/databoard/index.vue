<template>
  <div style="overflow: hidden;position: relative; height:100% ">
    <Contextmenu
      :position="rightMenuPosition"
      v-if="rightClick"
      class="rightmenu"
      :rightMenu="rightMenu"
      @hide="contextmenuHide"
    />
    <!-- <div class="ex">
      <input type="text" v-model="domCavase.canvas.width" placeholder="请输入宽度" />
      <input type="text" v-model="domCavase.canvas.height" />
      <input type="text" v-model="domCavase.zoomSize" placeholder="请输入放大值" />
      <input type="text" placeholder="请输入透明度" />
      <input type="select" placeholder="请输入背景色" />
      <select>
        <option value="black">黑色</option>
        <option value="red">红色</option>
        <option value="yellow">黄色</option>
        <option value="blue">蓝色</option>
      </select>

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

          <button @click="downLayer">下移一层</button>

          <button @click="upLayer">上移一层</button>
          <button @click="toBottomLayer">置于底层</button>
          <button @click="toTopLayer">置于顶层</button>
          <button @click="clearLine">清除参考线</button>
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
    </div> -->
    <div class="stage" ref="stage">
      <guide-line
        v-if="showline"
        :previewLine="domCavase.previewLine"
        :lineList="domCavase.lineList"
        :zoomSize="domCavase.zoomSize"
        @removeLine="removeLine"
      />
      <ruler-zoom
        :zoomSize="domCavase.zoomSize"
        @previewLine="previewLine"
        @addLine="addLine"
        @hideline="hideline"
      />
      <Cav :canvasConfig="domCavase.canvas">
        <Node
          class="layernode"
          v-for="(node,index) in domCavase.nodeList"
          :node="node"
          :key="index"
          @nodeDragStart="nodeDragStart"
          @nodeDrag="nodeDrag"
          @resizeNode="resizeNode"
          @nodeClick="nodeClick"
          @nodeDrop="nodeDrop"
          @nodeMousedown="nodeMousedown"
          @nodeResizeMousedown="nodeResizeMousedown"
          @nodeResizeNode="nodeResizeNode"
        ></Node>
      </Cav>
    </div>
  </div>
</template>

<script>
import Dcanvas from './dcanvas/dcanvas'
import Cav from './canvas.vue'
import Node from './layer-node.vue'
import GuideLine from './guideline.vue'
import Contextmenu from './contextmenu.vue'
import { mapState, mapMutations } from 'vuex'
import {
  ELEMENT_SCREEN,
  ELEMENT_MULTI,
  ELEMENT_NODE
} from '@/store/constants.js'
import RulerZoom from './rulerzoom.vue'
import { debuglog } from 'util'
import { getDataBoardData} from '@/api/api.js'

export default {
  components: {
    Node,
    Cav,
    Contextmenu,
    RulerZoom,
    GuideLine
  },
  data() {
    return {
      stop: false,
      showline: true,
      domCavase: '',
      rightClick: false,
      mode: 'edit',
      startX: 0,
      startY: 0,
      dx: 0,
      dy: 0,
      rightMenuPosition: {},
      dnode: '',
      ctrlDown: false,
      nodelist: [],
      aglinList: [
        { type: 'top', name: '顶对齐' },
        { type: 'right', name: '右对齐' },
        { type: 'bottom', name: '底对齐' },
        { type: 'left', name: '左对齐' },
        { type: 'VCenter', name: '垂直居中' },
        { type: 'HCenter', name: '水平居中' }
      ],
      rightMenu: [],
      canvasRightEvent: [14, 15, 16, 17, 18],
      nodeRightEvent: [0, 1, 2, 3, 4, 5, 6, 7, 8],
      nodesRightEvent: [7, 8, 9, 10, 11, 12, 13],
      rightAllMenu: [
        {
          name: '置顶',
          event: this.toTopLayer
        },
        {
          name: '置底',
          event: this.toBottomLayer
        },

        {
          name: '上移一层',
          event: this.upLayer
        },
        {
          name: '下移一层',
          event: this.upLayer
        },

        {
          name: '锁定',
          event: this.lockNode
        },
        {
          name: '隐藏',
          event: this.hideNode
        },
        {
          name: '重命名',
          event: this.reNameNode
        },
        {
          name: '复制',
          event: this.copyNode
        },
        {
          name: '删除',
          event: this.deleteNode
        },
        {
          name: '图层操作',
          event: () => {},
          children: [
            {
              name: '组合',
              event: () => {
                this.toGroup()
              }
            },
            {
              name: '取消组合',
              event: () => {
                this.outGroup()
              }
            },
            {
              name: '锁定',
              event: () => {
                this.lockNode()
              }
            },
            {
              name: '隐藏',
              event: () => {
                this.hideNode()
              }
            }
          ]
        },
        {
          name: '顺序',

          children: [
            {
              name: '置顶',
              event: () => {
                this.toTopLayer()
              }
            },
            {
              name: '置底',
              event: () => {
                this.toBottomLayer()
              }
            },
            {
              name: '上移一层',
              event: () => {
                this.upLayer()
              }
            },
            {
              name: '下移一层',
              event: () => {
                this.downLayer()
              }
            }
          ]
        },
        {
          name: '保存为wighet',
          event: () => {
            this.toWighet()
          }
        },
        {
          name: '导出数据为CSV',
          event: () => {
            this.toCSV()
          }
        },
        {
          name: '导出数据为Excel',
          event: () => {
            this.toExcel()
          }
        },
        {
          name: '粘贴',
          event: () => {
            this.paste()
          }
        },
        {
          name: '全选',
          event: () => {
            this.selectAll()
          }
        },
        {
          name: '清空画布',
          event: () => {
            this.clear()
          }
        },
        {
          name: '画布设置',
          event: () => {
            this.stageSet()
          }
        },
        {
          name: '恢复默认',
          event: () => {
            this.toDefault()
          }
        }
      ]
    }
  },
  computed: {
    multiple() {
      return this.domCavase.selectNodes.filter(n => n.pid === null)
    },
    ...mapState('databoard', {
      databoardID:state => state.databoardID
    })
  },

  mounted() {
    let _this = this
    window.document.onkeydown = function(e) {
      const keynum = window.event ? e.keyCode : e.which

      if (keynum === 17) {
        if (this.ctrlDown) return
        _this.ctrlDown = true
        console.log(_this.ctrlDown)
        return
      }
    }
    window.document.onkeyup = function(e) {
      const keynum = window.event ? e.keyCode : e.which
      _this.ctrlDown = false
      console.log(_this.ctrlDown)
    }

    const handler = this.domCavase.Handler(this.$refs.stage)
    handler.clickHandler(e => {
      this.setEditType(ELEMENT_SCREEN)
    })
    handler.selectNodes(e => {
      this.rightClick = false
      this.$emit('selectNodes', this.domCavase.selectNodes)
      console.log('##@@@sdfsdfsfdsdf', this.domCavase.selectNodes)
      //this.$emit('nodelistChange', this.domCavase.nodeList)
    })
    handler.onmousewheelHandler(e => {
      let startZoom = this.domCavase.zoomSize
      if (e.wheelDelta == 120) {
        startZoom += 0.05
        this.setZoom(startZoom)
      } else {
        startZoom -= 0.05
        this.setZoom(startZoom)
      }
    })

    handler.rightclickHandler((e, x, y) => {
      const obj = {
        x: x,
        y: y
      }

      if (e.target.className === 'select-mask') {
        if (this.domCavase.selectNodes.length === 1) {
          this.rightMenu = this.rightAllMenu.filter((n, index) =>
            this.nodeRightEvent.includes(index)
          )
        } else {
          this.rightMenu = this.rightAllMenu.filter((n, index) =>
            this.nodesRightEvent.includes(index)
          )
        }
      } else {
        this.rightMenu = this.rightMenu = this.rightAllMenu.filter((n, index) =>
          this.canvasRightEvent.includes(index)
        )
      }

      this.rightMenuPosition = obj
      this.rightClick = true
    })
  },
  methods: {
    ...mapMutations('databoard', ['initDataboard', 'setEditType','_updateDB']),
    hideline() {
      this.showline = !this.showline
    },
    removeLine(id) {
      this.domCavase.removeGuideLineById(id)
    },
    clearLine() {
      this.domCavase.clearGuideLine()
    },
    addLine(pos, type) {
      this.domCavase.createGuideLine(pos, type)
    },
    previewLine(pos, type) {
      this.domCavase.createPreviewLine(pos, type)
     
    },
    getNodeLlist(callback) {
      callback &&
        typeof callback === 'function' &&
        callback(this.domCavase.nodeList)
    },
    getCanvasConfig() {
      console.log(this.domCavase.canvas)
      return this.domCavase.canvas
    },
    setZoom(val) {
      this.domCavase.zoomSize = val
      this.$emit('zoomChange', this.domCavase.zoomSize)
    },
    contextmenuHide() {
      this.rightClick = false
    },
    choiceNodeById(id) {
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
      this.dnode = JSON.parse(JSON.stringify(node))
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
        case 'rt':
          node.w = node.w + _x / this.domCavase.zoomSize
          node.h = node.h - _y / this.domCavase.zoomSize
          node.y = node.y + _y / this.domCavase.zoomSize
          break
        case 'mt':
          node.h = node.h - _y / this.domCavase.zoomSize
          node.y = node.y + _y / this.domCavase.zoomSize
          break
        case 'lt':
          node.w = node.w - _x / this.domCavase.zoomSize
          node.h = node.h - _y / this.domCavase.zoomSize
          node.y = node.y + _y / this.domCavase.zoomSize
          node.x = node.x + _x / this.domCavase.zoomSize
          break
        case 'ml':
          node.w = node.w - _x / this.domCavase.zoomSize
          node.x = node.x + _x / this.domCavase.zoomSize
          break
        case 'lb':
          node.w = node.w - _x / this.domCavase.zoomSize
          node.x = node.x + _x / this.domCavase.zoomSize
          node.h = node.h + _y / this.domCavase.zoomSize
          break
        default:
          break
      }
      this.dx = e.clientX
      this.dy = e.clientY
      const { zW, zH, zX, zY, cX, cY } = this.nodeResizeZoom(this.dnode, node)

      if (node.cid === null) return
      const chilrenlist = node.cid
      this.domCavase.nodeList.forEach(n => {
        if (chilrenlist.includes(n.id)) {
          if (zX === 1 && zY === 1) {
            n.x = node.x + (n.x - node.x) * zW
            n.y = node.y + (n.y - node.y) * zH
            n.w = n.w * zW
            n.h = n.h * zH
          } else {
            n.w = n.w * zW
            n.h = n.h * zH
            n.x = node.x - (n.x - node.x) * zW
            n.y = node.y - (n.y - node.y) * zH
            console.log('@@@@@@@@@@@@@@@@@@@BUGBUGBUGBUGBUGBUGBUG', n.x, n.y)
          }
        }
      })

      this.dnode = JSON.parse(JSON.stringify(node))
    },
    nodeResizeZoom(oldNode, newNode) {
      const zW = newNode.w / oldNode.w
      const zH = newNode.h / oldNode.h
      const zX = newNode.x / oldNode.x
      const zY = newNode.y / oldNode.y
      const cX = newNode.x - oldNode.x
      const cY = newNode.y - oldNode.y
      return { zW, zH, zX, zY, cX, cY }
    },
    nodeResizeMousedown(e, node) {
      this.dx = e.clientX
      this.dy = e.clientY
      this.dnode = JSON.parse(JSON.stringify(node))
      console.log(this.dnode.w, '')
    },
    downLayer() {
      this.domCavase.LayerToDown()
      this.$emit('nodelistChange', this.domCavase.nodeList)
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
    nodeClick() {
      this.$emit('nodeClick', this.domCavase.selectNodes)
    },
    nodeMousedown(node) {
      this.rightClick = false
      if (this.domCavase.selectNodes.map(n => n.id).includes(node.id)) return
      console.log('@@@@@@@@@@@@@@@', this.ctrlDown)
      if (node.type === 'element') {
        if (this.ctrlDown) {
          this.domCavase.selectNodes.push(node)
          this.domCavase.nodeList.forEach(n => {
            n.id === node.id && (n.active = true)
          })
        } else {
          this.domCavase.selectNodes = [node]
          this.domCavase.nodeList.forEach(n => {
            n.id === node.id ? (n.active = true) : (n.active = false)
          })
        }
      }
      if (node.type === 'group') {
        if (this.ctrlDown) {
          this.domCavase.selectNodes.push(
            ...this.domCavase.nodeList.filter(
              n => node.cid.includes(n.id) || node.id === n.id
            )
          )
          this.domCavase.nodeList.forEach(n => {
            n.id === node.id && (n.active = true)
          })
        } else {
          this.domCavase.selectNodes = this.domCavase.nodeList.filter(
            n => node.cid.includes(n.id) || node.id === n.id
          )
          this.domCavase.nodeList.forEach(n => {
            n.id === node.id ? (n.active = true) : (n.active = false)
          })
        }
      }
    },
    resizeNode(e, node) {
      this.domCavase.refreshNode(node)
    },
    nodeDrag(e, node) {
      const yArray = this.domCavase.lineList
        .filter(n => n.type === 'xline')
        .map(n => n.pos)
      const xArray = this.domCavase.lineList
        .filter(n => n.type === 'yline')
        .map(n => n.pos)
      const _x = this.domCavase.eventZoom(e).clientX
      const _y = this.domCavase.eventZoom(e).clientY
      const dx = _x - this.startX
      const dy = _y - this.startY
      let stop = false
      let offset = [0, 0, 0, 0]
      const idList = this.domCavase.selectNodes.map(n => n.id)
      for (let i = 0; i < this.domCavase.selectNodes.length; i++) {
        let nd = this.domCavase.selectNodes[i]
        const l = xArray.filter(v => Math.abs(nd.x + dx - v) < 3)[0]
        const t = yArray.filter(v => Math.abs(nd.y + dy - v) < 3)[0]
        const r = xArray.filter(v => Math.abs(nd.x + nd.w + dx - v) < 3)[0]
        const b = yArray.filter(v => Math.abs(nd.y + nd.h + dy - v) < 3)[0]
        const check = [l, t, r, b]
        if (check.every(v => v === undefined)) {
          stop = false
        } else {
          const [_l, _t, _r, _b] = [
            nd.x + dx - l,
            nd.y + dy - t,
            nd.x + nd.w + dx - r,
            nd.y + nd.h + dy - b
          ]
          offset = [_l, _t, _r, _b]
          offset = offset.map(v => (v ? v : 0))
          console.log(offset)
          stop = true
          break
        }
      }
      const [_l, _t, _r, _b] = offset
      if (!stop) {
        this.domCavase.selectNodes.map(n =>
          Object.assign(n, {
            x: n.x + dx,
            y: n.y + dy
          })
        )
        stop = false
      } else {
        this.domCavase.selectNodes.map(n =>
          Object.assign(n, {
            x: n.x - _l - _r + dx,
            y: n.y - _t - _b + dy
          })
        )
      }
      console.log('tag', stop)

      this.startX = this.domCavase.eventZoom(e).clientX
      this.startY = this.domCavase.eventZoom(e).clientY
    },
    toggleGrop() {
      const rootLIst = this.domCavase.selectNodes.filter(n => n.pid === null)
      if (rootLIst.length === 1) {
        this.domCavase.outGroup()
      } else {
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
    },
    queryDataboard() {
      getDataBoardData(this.databoardID).then(rsp => {
        console.log(rsp)
        if(rsp.status === 0){
          this.canvasConfig = rsp.data
          this.domCavase.createCanvas(this.canvasConfig) 
          this.initDataboard(this.domCavase.canvas)
        }else{
          console.log("接口请求失败")
        }
      })
    }
  },
  created() {
    
    this.domCavase = new Dcanvas.Stage()  
    this.queryDataboard(); 
    this.nodelist = this.domCavase.nodeList
    if (JSON.parse(window.localStorage.getItem('saveNode'))) {
      JSON.parse(window.localStorage.getItem('saveNode'))
        .sort((a, b) => a.zindex - b.zindex)
        .forEach(n => {
          this.addNode(n)
        })
    }
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
  bottom: 30px;
  z-index: 9999;
}
.stage {
  width: 100%;
  height: 100%;
  background: url(~images/pointe.png) repeat #27272b;
  position: relative;
  overflow: hidden;
  cursor: crosshair;
  // perspective: 1920px;
  // perspective-origin: 0% 0%;
}
</style>