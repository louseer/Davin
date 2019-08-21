<template>
  <div>
    <div class="header">
      <ol class="mainlogo"></ol>
      <ol class="titlename">
        <i class="iconfont icon-ico_db_maintit" style="font-size:0.18rem"></i>
        - {{maintit}}
      </ol>
      <ol class="toolsbar">
        <li v-for="(btn,bindex) in toptools " :key="bindex">
          <Dbutton :btn="btn"></Dbutton>
        </li>
      </ol>
    </div>
  </div>
</template>

<script>
import Dbutton from '../../components/button.vue'

export default {
  components:{Dbutton},
  props: {
    maintit: {
      type: String,
      default: ''
    },
    toptools:{
      type:Array,
      default:()=>[]
    }
  },
}
</script>

<style lang="less" scoped>
@import '../../assets/styles/base.less';
 .header {
    width: 100%;
    height: 0.48rem;
    background: url(../../../public/images/bg_db_topbar.png) no-repeat left top;
    border-bottom: 1px black solid;
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-between;
    background-size: 100% 100%;
    .mainlogo {
      background: url(../../../public/images/img_logo.png) no-repeat center
        center;
      margin-left: 0.28rem;
      width: 1.8rem;
      height: 100%;
    }
    .titlename {
      font: @Font_zn16;
      color: @icon_DataC_main;
      line-height: 0.48rem;
      height: 100%;
    }
    .toolsbar {
      height: 100%;

      margin-right: 0.4rem;

      display: flex;
      flex-flow: row nowrap;
      li {
        width: 0.26rem;
        height: 100%;
        line-height: 0.49rem;
        color: @icon_DataC_main;
        margin-right: 0.2rem;
        font-size: 0.20rem;
        :hover{
        color: @Font_mainC_white;
        }
        
      }
    }
  }
</style>