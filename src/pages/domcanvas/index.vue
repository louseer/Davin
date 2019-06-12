<template>
  <div style="overflow: hidden;position: relative; ">
    <input v-model="width" type="text" placeholder="请输入宽度">
    <input v-model="opacity" type="text" placeholder="请输入透明度">
    <h1>画布在下方⬇</h1>

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
      rightClick: false
    }
  },

  watch: {
    opacity(val) {
      this.domCavase.canvasOpcity = +val
    },
    width(val) {
      this.domCavase.canvasWidth = +val
    }
  },
  mounted() {
    const stage = this.$refs.stage
    const canvas = this.$refs.canvas
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
    this.domCavase.selectNode()
    console.log(this.domCavase.canvasWidth)
  },
  methods: {
    name() {}
  }
}
</script>

<style scoped lang='less'>
input {
  border: 1px #dddddd solid;
  height: 40px;
  width: 300px;
  // float: left;
  margin-right: 20px;
  float: left;
}
.stage {
  width: 100%;
  height: 800px;
  background: black;
  position: relative;
  .canvas {
    position: relative;
    width: 90%;
    height: 90%;
    background: gray;
    margin: auto;
    margin-top: 99px;
  }
}
</style>