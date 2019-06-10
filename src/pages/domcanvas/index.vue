<template>
  <div>
    <h1>画布在下方⬇</h1>
    <div class="stage">
      <div class="canvas"></div>
    </div>
  </div>
</template>

<script>
  export default {
    
  }
</script>

<style scoped lang='less'>
.stage{
  width: 100%;
  height: 800px;
  background: darkgray;
  position: absolute;
  .canvas{
    width: 90%;
    height: 90%;
    background: gray;
    margin: auto
  }
}
</style>