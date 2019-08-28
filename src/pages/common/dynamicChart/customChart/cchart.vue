<!--  -->
<template>
  <div class='cutomize-chart'>
    <component :is="chart" :config='theconfig' ></component>
  </div>
</template>

<script>
//import {组件名称} from '组件路径';
import customTitle from './lib/title.vue'
import customDecorate from './lib/decorate.vue'

export default {
  props:{
    config:{
      type:Object,
      defalut: () => {}
    }
  },
  components: {
    customTitle
  },
  data() {
    return {
      theconfig:this.config
    };
  },
  computed: {
    chart() {
      switch(this.config.type){
        case 'title':
          return customTitle
          break;
        case 'decorate':
          return customDecorate
          break;
        default:
      }
    }
  },
  watch: {},
  methods: {
  
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {
  
  },
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {
  
  },
  beforeCreate() {}, //生命周期 - 创建之前
  beforeMount() {}, //生命周期 - 挂载之前
  beforeUpdate() {}, //生命周期 - 更新之前
  updated() {}, //生命周期 - 更新之后
  beforeDestroy() {}, //生命周期 - 销毁之前
  destroyed() {}, //生命周期 - 销毁完成
  activated() {}, //如果页面有keep-alive缓存功能，这个函数会触发
}
</script>
<style lang='less' scoped>
//@import url(); 引入公共css类
.cutomize-chart{
  height: 100%;
}
</style>