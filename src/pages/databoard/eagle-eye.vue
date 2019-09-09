<template>
  <div
    class="eagle-eye"
    @mousedown.stop
    :style=" `width: ${eWidth}px;height: ${eHeight}px;`"
    @mouseup="screenDragend($event)"
  >
    <div class="nodes">
      <ol
        class="subnode"
        v-for="(node , index) in parentNodes"
        :key="node.id"
        :style="subNodeStyle(node)"
      ></ol>
    </div>
    <ol class="e_canvas" :style="ecanvas"></ol>
    <ol
      class="screen"
      :style="screenStyle"
      @mousedown="screenDragstart($event)"
      @mousemove="screenDrag($event)"
      @drop.prevent
    ></ol>
  </div>
</template>

<script>
export default {
  props: {
    canvasObj: {
      type: Object,
      default: () => {}
    },
    zoomSize: {
      type: Number,
      default: 0.5
    },
    stageW: {
      type: Number,
      default: 0
    },
    stageH: {
      type: Number,
      default: 0
    },
    offSetx: {
      type: Number,
      default: 0
    },
    offSety: {
      type: Number,
      default: 0
    },
    nodeList: {
      type: Array,
      default: () => []
    },
    eWidth:{
      type:Number,
      default:320
    },
     eHeight:{
      type:Number,
      default:180
    }
  },
  data() {
    return {
     
      startX: 0,
      startY: 0,
      offx: 0,
      offy: 0,
      canmove: false,
      subOffset:20
    }
  },
  computed: {
    getMaxArea() {
      const MaxW = this.canvasObj.width * 1.5
      const MaxH = this.canvasObj.height * 1.5
      return { MaxW, MaxH }
    },
    ratio() {
      const Wr=this.getMaxArea.MaxW / this.eWidth
      const Hr=this.getMaxArea.MaxH / this.eHeight
      return (Wr > Hr ? Wr : Hr)
    },
    parentNodes(){
      return this.nodeList.filter(n => n.pid===null)
    },
    subNodeStyle() {
      return function(node) {
        return node.active
          ? ` width:${node.w / this.ratio}px;height:${node.h /
              this.ratio}px;left:${node.x / this.ratio+this.subOffset}px;top:${node.y /
              this.ratio+this.subOffset}px; background:rgba(246,6,6 ,0.5)`
          : ` width:${node.w / this.ratio}px;height:${node.h /
              this.ratio}px;left:${node.x / this.ratio+this.subOffset}px;top:${node.y /
              this.ratio+this.subOffset}px; `
      }
    },
    screenStyle() {
      return ` width:${this.stageW / this.zoomSize / this.ratio}px;height:${this.stageH /
        this.zoomSize /
        this.ratio}px;left:${-this.offSetx /
        this.zoomSize /
        this.ratio+this.subOffset}px;top:${-this.offSety / this.ratio / this.zoomSize+this.subOffset}px `
    },
    ecanvas() {
      return ` width:${this.canvasObj.width / this.ratio}px;height:${this
        .canvasObj.height / this.ratio}px; top:${this.subOffset}px;left:${this.subOffset}px`
    }
  },

  methods: {
    screenDragstart(e) {
      this.startX = e.clientX
      this.startY = e.clientY
      this.canmove = true
    },
    screenDrag(e) {
      if (!this.canmove) return
      const dx = e.clientX - this.startX
      const dy = e.clientY - this.startY
      this.offx += dx
      this.offy += dy
      this.startX = e.clientX
      this.startY = e.clientY
      this.$emit(
        'changeView',
        parseInt(-this.offx * this.ratio),
        parseInt(-this.offy * this.ratio)
      )
      console.log(
        parseInt(-this.offx * this.ratio),
        parseInt(-this.offy * this.ratio)
      )
    },
    screenDragend(e) {
      this.canmove = false
    }
  },
  created() {}
}
</script>

<style lang="less" scoped>
@import '../../assets/styles/base.less';
.eagle-eye {
  position: relative;
  position: absolute;
  background: rgba(0, 0, 0, 0.5);
  border-radius: 4px;
  bottom: 0.4rem;
  left: 0.4rem;
  z-index: 999;
  pointer-events: auto;
  cursor: pointer;
  overflow: hidden;
  .screen {
    position: absolute;
    width: 10px;
    height: 20px;
    border: 2px red inset;
    box-sizing: border-box;
    border-radius: 4px;
  }
  .e_canvas {
    position: absolute;
   
    border: @border_Data_bottom;
    box-sizing: border-box;
    border-radius: 0px;
  }
  .subnode {
    position: absolute;
    background: rgba(255, 255, 255, 0.2);
  }
}
</style>