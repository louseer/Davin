<template>
  <div class="switch_btn">
        <i @click="changeHandler" :class="state ? '' :'off' "></i>
  </div>
</template>

<script>
  export default {
    props: {
      state: {
        type: Boolean,
        default: true
      },
    },
    data() {
      return {
        dstate: this.state
      }
    },
    methods: {
      changeHandler() {
        this.dstate=!this.dstate
        this.$emit('switchChange',this.dstate)
      }
    },
  }
</script>

<style lang="less" scoped>
@import '../assets/styles/base.less';
.switch_btn {
            width: 0.08rem;
            float: right;
            background: @icon_DataC_dark;
            height: 0.36rem;
            position: relative;
            i {
              width: 100%;
              height: 0.08rem;
              position: absolute;
              background: @icon_DataC_red;
              cursor: pointer;
            }
            .off{
              bottom:0
            }
          }
</style>