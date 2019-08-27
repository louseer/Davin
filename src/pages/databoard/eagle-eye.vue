<template>
  <div class='eagle-eye' @mousedown.stop></div>
</template>

<script>
  export default {
    mounted () {
       window.onresize = () => {
      return (() => {
      console.log('行不行', '')
        
      })()
    }
  }
  }

</script>

<style lang="less" scoped>
.eagle-eye{
  width: 3.2rem;
  height: 1.8rem;
  position:absolute;
  background: rgba(0,0,0,0.5);
  border-radius:4px;
  bottom: 0.4rem;
  left: 0.4rem;
  z-index: 999;
  pointer-events: auto;
  cursor: pointer;
}

</style>