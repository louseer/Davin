<template>
  <div>


  </div>
</template>

<script>
import Dbutton from './button.vue'
export default {
  components: {
    Dbutton,
  },
  props: {
    max: {
      type: Number,
      default: 0
    },
     min: {
      type: Number,
      default: 0
    },
     value: {
      type: Number,
      default: 0
    },
     hasButton:{
        type:Boolean,
        default:false,
      }
  },
  
  data() {
    return {
      plusBtn: {
        name: '增加',
        icon: 'icon-ico_db_plus',
        event: this.plus,
        type: 'icon'
      },
      reduceBtn: {
        name: '减少',
        icon: 'icon-ico_db_reduce',
        event: this.reduce,
        type: 'icon'
      }
    }
  }
}
</script>

<style lang="less" scoped>
@import '../assets/styles/base.less';
</style>