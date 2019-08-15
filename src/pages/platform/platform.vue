// 平台首页
<template>
  <div class="wrap">
    <new-header></new-header>
    <div class="main">
      <div class="left_bar">
        <left-menu></left-menu>
      </div>
      <div class="right_bar">
        <screen-mod></screen-mod>
      </div>
    </div>
  </div>
</template>

<script>
import newHeader from './components/header.vue';
import leftMenu from './components/leftMenu.vue';
import screenMod from './components/screen_mod.vue';
  export default {
    name:'platform',
    components: {
      newHeader,
      leftMenu,
      screenMod
    },
  }
</script>

<style lang="less" scoped>
.wrap{
  width: 100%;height: 100%;overflow: hidden;background-color: #f3f1f2;display: flex;flex-flow: column nowrap;
  .main{
     width: 100%; height: calc(100% - 0.7rem); display: flex;flex-flow: row nowrap;justify-content: space-between;position: relative;
    .left_bar{
      width: 2.5rem;background: #e8373e;position: relative;
    }
     .right_bar {
      width: calc(100% - 2.5rem);height: 100%;position: relative;box-sizing: border-box;padding-left:0.2rem; 
    }
  }
}
</style>