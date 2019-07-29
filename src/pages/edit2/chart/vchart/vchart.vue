<!--  -->
<template>
  <v-chart :options="options" :autoresize='true' v-if='options'/>
</template>

<script>
//import {组件名称} from '组件路径';
import ECharts from 'vue-echarts'
// import 'echarts/lib/chart/line'
// import 'echarts/lib/component/polar'
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
  computed: {
    type () {  
      return this.config.type;
    },
    apiUrl () {
      return this.config.data.apiUrl;
    },
    // options () {
    //   if(this.ready){
    //     return this.instance.options
    //   }else{
    //     return {}
    //   }
    // }
  },
  data () {
    // let data = []
    // for (let i = 0; i <= 360; i++) {
    //     let t = i / 180 * Math.PI
    //     let r = Math.sin(2 * t) * Math.cos(2 * t)
    //     data.push([r, i])
    // }
    // console.log(this.instance)
    // return {
    //   polar:{
    //     legend: {
    //       data: ['line']
    //     },
    //     polar: {
    //       center: ['50%', '54%']
    //     },
    //     tooltip: {
    //       trigger: 'axis',
    //       axisPointer: {
    //         type: 'cross'
    //       }
    //     },
    //     angleAxis: {
    //       type: 'value',
    //       startAngle: 0
    //     },
    //     radiusAxis: {
    //       min: 0
    //     },
    //     series: [
    //       {
    //         coordinateSystem: 'polar',
    //         name: 'line',
    //         type: 'line',
    //         showSymbol: false,
    //         data: data
    //       }
    //     ],
    //     animationDuration: 2000
    //   }
    // }
    return {
      instance:null,
      chartData:null,
      options:'',
      ready:false
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