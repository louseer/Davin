<!-- chart -->
<template>
  <div class='chart-wrapper' >
    <div class='chart-header' v-if='showName'>
      {{name}}
    </div>
    <div class='chart-body'>
      <component :is="chart" :config='config' ></component>
    </div>
  </div>
</template>

<script>
//import {组件名称} from '组件路径';
//import NChart from "./js/nchart.js";
import { getchartmock } from '@/api/api.js';
import VChart from './vchart/vchart.vue'
import CChart from './customChart/cchart.vue'


const echartsTypes = [
  'pie','polar','line','bar','horizontalbar','line2y','doughnut','linebar','scatter','funnel','polar','radar'
]
export default {
  props:{
    config:{
      type:Object,
      defalut: () => {}
    },
    showName:{
      type:Boolean,
      defalut: false
    }
  },
  components: {
    VChart,
    CChart
  },
  data() {
    return {
    };
  },
  watch:{
    // config:{
    //   handler:function(v){
    //     console.log('dchart监听到config变化',v)
    //     this.theconfig = v
    //   },
    //   deep:true
    // }
  },
  computed: {
    id () {  
      return this.config.id;
    },
    type () {
      return this.config.type;
    },
    name () {
      return this.config.name;
    },
    chart () {
      if(echartsTypes.includes(this.type)){
        return 'VChart';
      }else{
        return 'CChart';
      }
    }
  },

  methods: {
  },

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
    width:100%;
    height: 100%;
    margin:0 auto;
    overflow: hidden;
  }
}
</style>