<template>
  <div style="overflow: hidden;position: relative; ">
    <input v-model="width" type="text" placeholder="请输入宽度">
    <input v-model="height" type="text" placeholder="请输入高度">
    <input v-model="zoom" type="text" placeholder="请输入放大值">
    <input v-model="opacity" type="text" placeholder="请输入透明度">
    <input v-model="bkg" type="select" placeholder="请输入背景色">
    <select v-model="bkg"> 
      <option value="black">黑色</option>
      <option value="red">红色</option>
      <option value="yellow">黄色</option>
      <option value="blue">蓝色</option>
    </select>
    <h1>画布在下方⬇</h1>
    <button @click="clearCanvas">清空画布</button>
    <div class="stage" ref="stage">
      <div class="canvas" ref="canvas" id="canvas">
        <div class='node-box' v-if='configer'>
          <Node class="layernode" v-for='(chart,index) in configer.charts' :key='index'  :config='chart' :draggable="mode === 'edit'"/>
        </div>
        <layer-node v-for class="layernode" style="top:0px; left:0px"></layer-node>
        <layer-node v-for class="layernode" style="top:200px; left:90px"></layer-node>
        <layer-node v-for class="layernode" style="top:50px; left:300px"></layer-node>
        <div v-if="rightClick" class="rightmenu" style="width:200px; height:200px; background:red"></div>
      </div>
    </div>
  </div>
</template>

<script>
//import domCavase from '././domcanvas'
import DomCanvas from './index';
import layerNode from '././layer-node.vue'
import Node from '../components/node/node.vue'
import Configer from '../utils/dashboardConfiger.js'

export default {
  components: {
    layerNode,
    Node
  },
  data() {
    return {
      width: '',
      domCavase: {},
      opacity: '',
      rightClick: false,
      select: [],
      zoom:'',
      canvas:undefined,
      height:'',
      bkg:'',
      sence:'',
      configer: null,
      mode:'edit'
    }
  },

  watch: {
    opacity(val) {
      this.sence.canvas.canvasOpcity = +val
    },
    width(val) {
       this.sence.canvas.canvasWidth = +val
    },
    zoom(val){     
       this.sence.canvas.canvasZoom = +val
       const nodes=document.getElementsByClassName('layernode')
       Array.from(nodes).forEach(node=>{
        console.log(node.offsetLeft,node.offsetTop,node.offsetWidth,node.offsetHeight) 
        })
       
    },
    select(val) {
      Array.from(val).forEach(node=>{
        node.style.border="5px #000000 dashed"
        })
      console.log('选中的子元素', val)
    },
    height(val){
       this.sence.canvas.canvasHeight = +val
    },
    bkg(val){
       this.sence.canvas.canvasBackColor=val
    }

  },
  mounted() {
    const stage = this.$refs.stage
    const canvas = this.$refs.canvas 
    const idcanvas = document.getElementById('canvas')    
    this.sence= new DomCanvas(stage,canvas)
  
    this.sence.canvas.canvasOnclick(e => {
      this.rightClick = false
      console.log(e.screenX, e.screenY)
    })
     this.sence.canvas.canvasRightclick(e => {
      this.rightClick = true
    })
    this.sence.selectNode('layernode',node => {
      this.select=[]
      this.select = node
    })

    
  },
  methods: {
     clearCanvas() {
     this.sence.canvas.clearNode()
    },
    toggleMode() {
      this.domCavase.mode = 'select'
      console.log( this.domCavase.mode)
    }
  },
  created () {
    this.configer = new Configer();
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
  background:url(~images/pointe.png) repeat #666666  ; 
  position: relative; 
  .canvas {
    position: absolute;
    width:500px;
    height: 500px;
    background: gray;
    top:0;
    left: 0;

  }
}
</style>