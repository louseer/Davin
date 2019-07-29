<!--  -->
<template>
  <v-chart :options="options" :autoresize='true' v-if='options'/>
</template>

<script>
//import {组件名称} from '组件路径';
import ECharts from 'vue-echarts'
import 'echarts/lib/chart/line'
import 'echarts/lib/component/polar'
// import theme from '../theme.json' //引入主题
// ECharts.registerTheme('ovilia-green', theme); //引入主题
import { getChartData } from '@/api/api.js'

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

    }
  },
  data () {
    return {
      instance:null,
      chartData:null,
      options:'',
      ready:false
    }
  },
  computed: {
    type () {  
      return this.config.type;
    },
    apiUrl () {
      return this.config.data.apiUrl;
    }
  },
  watch: {
    instance () {
      this.refreshData();
    },
    chartData () {
      this.refreshData();
    }
  },
  methods: {
    refreshData () {
      if(!this.instance || !this.chartData){
        return;
      }
      this.instance.setData( this.chartData );
      let options =  JSON.parse(JSON.stringify( this.instance.options))
      this.ready = true;
      this.options = options
    },
    getInstance () {
      import(`./${this.type}.js`).then((module) => {
        let chart = module.default;
        this.instance = new chart(this.config);
      }).catch(e=>{
        console.log("加载实例js失败")
      })
    },
    getData () {
      getChartData(this.apiUrl).then(rsp => {
      if(rsp.status == 0){
          this.chartData = rsp.data;
        }
      }).catch(e => {

      })
    }
  },
  created () {
    this.getInstance();
    this.getData();
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