<template>
  <div class='zoom_setter'>
    <span class='zoom_number'>{{zoomPst}}</span>
  <slide-bar></slide-bar>
  </div>
</template>

<script>
import SlideBar from '../../components/slidbar.vue'

  export default {
    components: {
      SlideBar
    },
    props: {
      zoomSize: {
        type: Number,
        default: 0,
      },
     
    },
    computed: {
      zoomPst() {
        return parseInt(this.zoomSize.toFixed(2)*100) + '%'
      }
    },
 
  }
</script>

<style lang="less" scoped>
@import '../../assets/styles/base.less';
.zoom_setter{
  width: 100%;
  background: @bg_Data_bottom;
  height: 0.3rem;
  position: absolute;
  bottom: 0;
  border-top:@border_Data_bottom;
  overflow: hidden;
.zoom_number{
  float: left;
  margin: 0 0.1rem;
  font:@Font_en12;
  line-height: 0.3rem;
  color:@Font_DataC_main;
}
}
</style>