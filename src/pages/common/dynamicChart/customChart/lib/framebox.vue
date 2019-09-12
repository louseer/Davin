<!--  -->
<template>
  <div class='decorate-frame' :class='typeclass'></div>
</template>

<script>
//import {组件名称} from '组件路径';

export default {
  name:'custom-frame',
  props:{
    options:{
      type:Object,
      default:() => {}
    }
  },
  data() {
    return {
      style:''
    };
  },
  computed:{
    typeclass(){
      return 'frame'+this.options.type
    }
  }
}
</script>
<style lang='less' scoped>

.decorate-frame{
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  &.frame1 {
    border-style: solid; 
    border-width: 32px 37px; 
    border-image: url(~images/frame/frame1.png) 32 37 stretch; 
    background: none;
  }
}

</style>