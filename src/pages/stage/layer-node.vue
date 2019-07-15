<template>
  <div class="node" :id="node.id" :style="style" @mousedown.stop="" @click="node.click($event)" >
    
  </div>
</template>

<script>
  export default {
    props: {
      node: {
        type: Object,
        default: ()=>{}
      },
    },
   computed: {
     style() {
       return  `left:${this.node.x}px;top:${this.node.y}px;width:${this.node.w}px;height:${this.node.h}px`
     }
   },
    
  }
</script>

<style lang="less" scoped>
.node{
  position: absolute;
  width: 30px;
  height: 40px;
  background: green;
  border: 2px darkgoldenrod solid

}
</style>