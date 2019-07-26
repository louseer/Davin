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
  data() {
    return {
      config: this.canvasConfig
    }
  },
  watch: {
    canvasConfig:{
      handler:function (val) {
        console.log('CANVASCHANGE', '')
        this.config=val
      },
       deep:true
    }
   
  },
computed: {
  style(){
     return `width:${this.config.width}px;height:${this.config.height}px; transform:scale(${this.config.zoomSize});transform-origin: 0 0; top:${this.config.offset}px ; left:${this.config.offset}px `
  }
},
methods: {
  
},
}
</script>

<style lang="less" scoped>
.canvas {
  position: absolute;
 border-radius: 8px;
 box-shadow: 0px 0px 50px rgba(0,0,0,0.2);
  background: #bfbfbf;
 
  
}
</style>