<template>
  <div class="thumbnail_bg">
    <i class="iconfont" :class="`icon-ico_db_laycom_${nodeEltype}`"></i>
  </div>
</template>

<script>
export default {
  props: {
    nodeEltype: {
      type: String,
      default: 'normal'
    }
  }
}
</script>

<style lang="less" scoped>
@import '../assets/styles/base.less';
.thumbnail_bg {
  width: 0.42rem;
  height: 0.28rem;
  background: @bg_Data_thumbnail;
  border: @border_Data_thumbnail;
  //color: @icon_DataC_sub;
  text-align: center;
  cursor: pointer;
   line-height: 0.28rem;
   font-size: 0.22rem;
  i{  
    line-height: 0.28rem;
    font-size: 0.22rem;
    color: @icon_DataC_main;
    &:hover{
 color:@Font_mainC_white;
    }
  }
  &:hover {
    border: @border_Data_thumbnail;
   
  }
}
</style>