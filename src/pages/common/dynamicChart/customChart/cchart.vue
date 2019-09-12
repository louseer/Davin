<!--  -->
<template>
  <div class='cutomize-chart'>
    <component :is="chart" :options='options' :data='chartData' v-if='options'></component>
  </div>
</template>

<script>
//import {组件名称} from '组件路径';
import customTitle from './lib/title.vue'
import customDecorate from './lib/decorate.vue'
import { getChartTemp } from '@/chart-simples/index.js'
import { objDeepMerge } from '@/utils/index.js'
const noDataCharts = ['title','decorate']
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
      chartData:null,
      simple:null,
      options:null
    };
  },
  computed: {
    type() {
      return this.config.type
    },
    nodata() {
      return noDataCharts.includes(this.config.type)
    },
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
    },
    version() {
      return this.config.version
    },
    apiUrl () {
      return this.config.data && this.config.data.apiUrl || `/sampledata/${this.type}.json`;
    }
  },
  watch: {
    config(options){
      this.combineConfig(options)
    }
  },
  methods: {
    combineConfig(config){
      // if(this.options === null){
      //   this.options = config.options
      //   return
      // }
      this.options = objDeepMerge(this.options,config.options)
    },
    initOptions(){
      const obj = objDeepMerge(this.simple,this.config.chart)
      this.options = obj
    },
    getSimple () {
      getChartTemp(this.type,this.version).then((val) => {
        this.simple = val
        this.initOptions();
      }).catch(e=>{
        console.log(`加载${this.version}版本${this.type}图opitions失败`)
        console.log(e)
      })
    },
    getData () {
      if(this.nodata){
         return;
      }
      getChartData(this.apiUrl).then(rsp => {
      if(rsp.status == 0){
          this.chartData = rsp.data
          this.initOptions();
        }
      }).catch(e => {
        console.log(`加载ID为${this.config.id}图表的数据失败`)
        console.log(e)
      })
    }
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {
    this.getData();
    this.getSimple();
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