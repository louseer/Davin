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
        <layer-node v-for class="layernode"></layer-node>
        <layer-node v-for class="layernode"></layer-node>
        <layer-node v-for class="layernode"></layer-node>
        <div v-if="rightClick" class="rightmenu" style="width:200px; height:200px; background:red"></div>
      </div>
    </div>
  </div>
</template>

<script>
import domCavase from '././domcanvas'
import layerNode from '././layer-node.vue'
export default {
  components: {
    layerNode
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
      bkg:''
    }
  },

  watch: {
    opacity(val) {
      this.domCavase.canvasOpcity = +val
    },
    width(val) {
      this.domCavase.canvasWidth = +val
    },
    zoom(val){     
      this.domCavase.canvasZoom = +val    
    },
    select(val) {
      console.log('选中的子元素', val)
    },
    height(val){
      this.domCavase.canvasHeight = +val
    },
    bkg(val){
      this.domCavase.canvasBackColor=val
    }

  },
  mounted() {
    const stage = this.$refs.stage
    const canvas = this.$refs.canvas
    this.canvas=canvas
    const idcanvas = document.getElementById('canvas')
    console.log(canvas.offsetTop)
    this.domCavase = new domCavase(canvas)
    console.log(this.domCavase)
  
    this.domCavase.canvasOnclick(e => {
      this.rightClick = false
      console.log(e.screenX, e.screenY)
    })
    this.domCavase.canvasRightclick(e => {
      this.rightClick = true
    })
    this.domCavase.selectNode(node => {
      this.select = node
    })

    console.log(this.domCavase.canvasWidth)
  },
  methods: {
     clearCanvas() {
      this.domCavase.clearNode()
    },
    toggleMode() {
      this.domCavase.mode = 'select'
      console.log( this.domCavase.mode)
    }
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
 // display: flex;
  .canvas {
    position: relative;
    width:500px;
    height: 500px;
    background: gray;
    margin: auto;
    margin-top: 99px;

  }
}
</style>