<template>
  <div class="canvas" ref="canvas" id="canvas" :style="style ">
   
    <slot></slot>
  </div>
</template>

<script>
export default {
  props: {
    canvasConfig: {
      type: Object,
      default: ()=>{}
    },
  },
computed: {
  style(){
     return `width:1920px;height:1080px;transform: translate3d(0,0,-1920px);transform-origin: 0 0; `
  }
},
}
</script>

<style lang="less" scoped>
.canvas {
  position: absolute;
  width: 500px;
  height: 500px;
  background: #a0a0a0;
  top: 50px;
  left: 50px;
  
}
</style>