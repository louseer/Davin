<!--  -->
<template>
  <v-chart :options="options" :autoresize='true' v-if='options'/>
</template>

<script>
//import {组件名称} from '组件路径';
import ECharts from 'vue-echarts'


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
      options:''
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
    getData () {
      getChartData(this.apiUrl).then(rsp => {
      if(rsp.status == 0){
          this.chartData = rsp.data;
          this.refreshData();
        }
      }).catch(e => {

      })
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