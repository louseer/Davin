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
      options:'',
      simple:null
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
  methods: {
    refreshData () {
      if(!this.instance || !this.chartData){
        return;
      }
      this.instance.setData( this.chartData );
      let options =  JSON.parse(JSON.stringify( this.instance.options))
      this.options = options
    },
    getInstance () {
      import(`./lib/${this.type}.js`).then((module) => {
        let chart = module.default;
        this.instance = new chart(this.config);
        this.refreshData();
      }).catch(e=>{
        console.log(`加载./lib/${this.type}.js失败`)
        console.log(e)
      })
    },
    getSimple () {
      getChartTemp(this.type,this.version).then((val) => {
        this.simple = val
      })
    },
    getData () {
      getChartData(this.apiUrl).then(rsp => {
      if(rsp.status == 0){
          this.chartData = rsp.data
          this.refreshData();
        }
      }).catch(e => {

      })
    }
  },
  watch:{
    options(v){
      console.log("chart options update",v)
    }
  },
  created () {
    this.getData();
    this.getInstance();
  },
  mounted() {

  },
}
</script>
<style lang='less' scoped>
//@import url(); 引入公共css类

.echarts {
  width: 100%;
  height: 100%;
}
</style>