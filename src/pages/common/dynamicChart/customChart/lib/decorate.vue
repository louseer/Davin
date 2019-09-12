<!--  -->
<template>
  <div class='decorate' ></div>
</template>

<script>
//import {组件名称} from '组件路径';

export default {
  components: {},
  inject: ["nodePro"],
 
  data() {
    return {
     proWith:{}
    };
  },
  computed: {},
  watch: {},
  methods: {
  
  }
}
</script>
<style lang='less' scoped>

.decorate{
  width: 100%;
  background: linear-gradient(#272b2d, #15191c);
  height: 100%;
  border: 1px #3e4245 solid;
  box-sizing: border-box;
}

</style>