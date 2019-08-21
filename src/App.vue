<template>
  <router-view/>
</template>
<script>
export default {
  name: 'App',
  mounted () {
    window.onresize = () => { }//this.$bus.$emit('resizeChart') 
  }
}
</script>

<style lang='less' scoped>
@import '~styles/reset.css';
</style>