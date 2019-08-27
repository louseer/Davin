<template>
  <div class="leftbottombar">
          <b v-for="(bbtn,bbindex) in  leftBottomtools" :key="bbindex">
            <Dbutton :btn="bbtn" />
          </b>
        </div>
</template>

<script>
import Dbutton from '../../components/button.vue'
  export default {
    components:{Dbutton},
    props: {
      leftBottomtools: {
        type: Array,
        default: ()=>[]
      },
    },
  }
</script>

<style lang="less" scoped>
@import '../../assets/styles/base.less';
.leftbottombar {
        height: 0.3rem;
        background: @bg_Data_leftbottom;
        position: absolute;
        bottom: 0;
        width: 100%;
      
        b {
          font-size: 0.16rem;
          display: block;
          height: 100%;
          width: 25%;
          text-align: center;
          color: @icon_DataC_main;
          float: left;
          line-height: 0.3rem;
          :hover {
            color: @Font_mainC_white;
          }
        }
      }
</style>