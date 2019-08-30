<template>
  <div>
    <div class="btn" v-if="!btn.hide" :title="btn.name"><i v-if="btn.type === 'icon' " class="iconfont"  :class="btn.icon ? btn.icon : ''" @click="btn.event"></i><slot/></div>
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