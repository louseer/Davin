<template>
  <div>
    <div 
      class="btn"
      :title="btn.name"
      v-if='!btn.hide'
    >
      <i 
        v-if="btn.icon" 
        class="iconfont"  
        :class="btn.icon" 
        @click="btn.event"
      ></i>
      <slot/>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      btn: {
        type: Object,
        default: ()=>{}
      },
    }
  }
</script>

<style lang="less" scoped>
.btn{
  cursor: pointer;
}
</style>