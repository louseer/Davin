<template>
  <div style="overflow: hidden;position: relative; ">
    <input type="text" placeholder="请输入宽度" />
    <input type="text" placeholder="请输入高度" />
    <input type="text" placeholder="请输入放大值" />
    <input type="text" placeholder="请输入透明度" />
    <input type="select" placeholder="请输入背景色" />
    <select v-model="bkg">
      <option value="black">黑色</option>
      <option value="red">红色</option>
      <option value="yellow">黄色</option>
      <option value="blue">蓝色</option>
    </select>
    <h1>画布在下方⬇</h1>
    <button @click="addNode">添加</button>
    <div class="stage" ref="stage">
      <div class="canvas" ref="canvas" id="canvas">
        <div class="node-box" v-if="configer">
          <Node
            class="layernode"
            v-for="(node,index) in domCavase.nodeList"
            :node="node"
            :key="index"
          />
        </div>
        <div v-if="rightClick" class="rightmenu" style="width:200px; height:200px; background:red"></div>
      </div>
    </div>
  </div>
</template>

<script>
import Dcanvas from './dcanvas/dcanvas'

import Node from './layer-node.vue'
export default {
  components: {
    Node
  },
  data() {
    return {
      width: '',
      domCavase: '',
      opacity: '',
      rightClick: false,
      select: [],
      zoom: '',
      canvas: undefined,
      height: '',
      bkg: '',
      sence: '',
      configer: true,
      mode: 'edit'
    }
  },

  watch: {},
  mounted() {
    const handler = this.domCavase.Handler(this.$refs.stage)
    handler.selectNodes()
  },
  methods: {
    addNode() {
      const nodes = [
        new Dcanvas.Node({ x: 0, y: 0, w: 500, h: 500, id: '1' }),
        new Dcanvas.Node({ x: 600, y: 0, w: 900, h: 500, id: '2' }),
        new Dcanvas.Node({ x: 900, y: 500, w: 70, h: 200, id: '3' })
      ]
      nodes.forEach(node => {
        this.domCavase.addNode(node)
      })

      console.log('tag', this.domCavase.nodeList)
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
  .canvas {
    position: absolute;
    width: 500px;
    height: 500px;
    background: gray;
    top: 0;
    left: 0;
  }
}
</style>