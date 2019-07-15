<template>
  <div class="node" :id="node.id" :style="style">
    
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
       return (this.node.active ? `left:${this.node.x}px;border:3px black solid` : `left:${this.node.x}px`)
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