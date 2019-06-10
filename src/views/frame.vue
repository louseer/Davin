<!-- 框架页：上下结构 -->
<template>
  <div class='page'>
    <loading></loading>
    <router-view name='page-header'></router-view>
    <router-view name='page-body'></router-view>
  </div>
</template>

<script>
//import {组件名称} from '组件路径';
import AHeader from 'views/header'
import loading from 'views/loading'
export default {
  components: {
    AHeader,
    loading
  },
  data() {
    return {
    
    };
  },
  computed: {},
  watch: {},
  methods: {
  
  }
}
</script>
<style lang='less' scoped>
//@import url(); 引入公共css类

</style>