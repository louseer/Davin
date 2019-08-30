<!--  -->
<template>
  <v-chart :options="options" :autoresize='true' v-if='options' :theme='theme'/>
</template>

<script>
//import {组件名称} from '组件路径';
import 'echarts/lib/chart/effectScatter'
import 'echarts/lib/component/tooltip'
import 'echarts/lib/component/polar'
import 'echarts/lib/component/geo'
import 'echarts/lib/component/legend'
import 'echarts/lib/component/title'
import 'echarts/lib/component/visualMap'
import 'echarts/lib/component/dataset'
import 'echarts/map/js/world'
import 'zrender/lib/svg/svg'

// import theme from '../theme.json' //引入主题
// ECharts.registerTheme('ovilia-green', theme); //引入主题
import { getChartData } from '@/api/api.js'
import { getChartTemp } from '@/chart-simples/index.js'
import oviliaGreen from '@/chart-themes/ovilia-green.json'
import ECharts from 'vue-echarts'
ECharts.registerTheme('ovilia-green', oviliaGreen)

export default {
  components: {
    'v-chart': ECharts
  },
  props:{
    config:{
      type:Object,
      default: () => {}
    },
    theme:{
      type:String,
      default: 'ovilia-green'
    }
  },
  data () {
    return {
      instance:null,
      chartData:null,
      simple:null,
      options:null
    }
  },
  computed: {
    type () {
      return this.config.type;
    },
    version() {
      return this.config.version
    },
    apiUrl () {
      return this.config.data && this.config.data.apiUrl || `/sampledata/${this.type}.json`;
    }
  },
  watch:{
    config(v){
      console.log("vchart 监听是啥发送啊")
      this.combineConfig(v.options)
    }
  },
  methods: {
    // refreshData () {
    //   if(!this.instance || !this.chartData){
    //     return;
    //   }
    //   this.instance.setData( this.chartData );
    //   let options =  JSON.parse(JSON.stringify( this.instance.options))
    //   this.options = options
    // },
    initOpitions(){
      if(!this.instance || !this.chartData || !this.simple){
        return;
      }
      this.instance.initOpitions(this.simple)
      this.instance.setData(this.chartData)
      console.log("this.instance.options",this.instance.options)
      this.options = this.instance.options
    },
    combineConfig(options){
      this.instance.combineConfig(options)
      this.options = this.instance.options
      console.log("update options",this.options)
    },
    initInstance () {
      import(`./lib/${this.type}.js`).then((module) => {
        let chart = module.default;
        this.instance = new chart(this.config);
        this.initOpitions();
      }).catch(e=>{
        console.log(`加载./lib/${this.type}.js失败`)
        console.log(e)
      })
    },
    getSimple () {
      getChartTemp(this.type,this.version).then((val) => {
        this.simple = val
         this.initOpitions();
      }).catch(e=>{
        console.log(`加载${this.version}版本${this.type}图opitions失败`)
        console.log(e)
      })
    },
    getData () {
      getChartData(this.apiUrl).then(rsp => {
      if(rsp.status == 0){
          this.chartData = rsp.data
          this.initOpitions();
        }
      }).catch(e => {
        console.log(`加载ID为${this.config.id}图表的数据失败`)
        console.log(e)
      })
    }
  },
  created () {
    this.getData();
    this.getSimple();
    this.initInstance();
  },
  mounted() {

  },
  updated(){
  }
}
</script>
<style lang='less' scoped>
//@import url(); 引入公共css类

.echarts {
  width: 100%;
  height: 100%;
}
</style>