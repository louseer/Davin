<!-- chart -->
<template>
  <div class='chart-wrapper' ref='chartwrapper'>
    <div class='chart-header'>
      {{title}}
    </div>
    <div class='chart-body'>
      <component :is="chart" :config='config'></component>
    </div>
  </div>
</template>

<script>
//import {组件名称} from '组件路径';
//import NChart from "./js/nchart.js";
import { getchartmock } from '@/api/api.js';
import VChart from './vchart/vchart.vue'
import EChart from './echart/echart.vue'

const echartsTypes = [
  'pie','polar','line'
]
export default {
  props:{
    "config":{
      type:Object,
      defalut: () => {}
    }
  },
  components: {
    VChart,
    EChart
  },
  data() {
    return {
      //isMounted:false,
    };
  },
  computed: {
    id () {  
      return this.config.id;
    },
    type () {
      return this.config.type;
    },
    title () {
      return this.config.title;
    },
    chart () {
      if(echartsTypes.includes(this.type)){
        return 'VChart';
      }else{
        return 'VChart';
      }
    }
    
  },
  watch: {

  },
  methods: {
    resize() {

    }
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {
  },
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {
    //this.isMounted = true
  },

  beforeCreate() {}, //生命周期 - 创建之前
  beforeMount() {}, //生命周期 - 挂载之前
  beforeUpdate() {}, //生命周期 - 更新之前
  updated() {
    console.log('chart UPDATED')
  }, //生命周期 - 更新之后
  beforeDestroy() {}, //生命周期 - 销毁之前
  destroyed() {}, //生命周期 - 销毁完成
  activated() {}, //如果页面有keep-alive缓存功能，这个函数会触发
}
</script>
<style lang='less' scoped>
.chart-wrapper {
  width:100%;
  height:100%;
  .chart-header {
    font-size:.18rem;
    line-height: 2;
    padding-left:.2rem;
    color:	#708090
  }
  .chart-body {
    width:calc(100% - 0.4rem);
    height: calc(100% - 0.55rem);
    margin:0 auto;
    overflow: hidden;
  }
}
</style>