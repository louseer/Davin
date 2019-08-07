<!--  -->
<template>
  <div class='chart-container' ref='container'></div>
</template>

<script>
//import {组件名称} from '组件路径';
import echarts from 'echarts';
// import theme from '../theme.json' //引入主题
// ECharts.registerTheme('ovilia-green', theme); //引入主题
import { getChartData } from '@/api/api.js'

export default {
  components: {
   
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
      observer: null,
      recordOldValue: { // 记录下旧的宽高数据，避免重复触发回调函数
        width: '0',
        height: '0'
      },
      instance:null,
      container:null,
      chartData:null,
      options:null
    }
  },
  computed: {
    type () {  
      return this.config.type;
    },
    apiUrl () {
      return this.config.data.apiUrl;
    },
    width () {
      console.log("width")
      return getComputedStyle(this.container).getPropertyValue('width')
    },
    height () {
      console.log("height")
      return getComputedStyle(this.container).getPropertyValue('width')
    }
  },
  methods: {
    initChart () {
      import(`./lib/${this.type}.js`).then((module) => {
        let chart = module.default;
        this.instance = new chart(this.container,this.config);
        this.refreshData();
      }).catch(e=>{
        console.log(e)
        console.log("加载实例js失败")
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
    },
    refreshData () {
      if(!this.instance || !this.chartData){
        return;
      }
      this.instance.setData( this.chartData );
      let options =  JSON.parse(JSON.stringify( this.instance.options))
      this.options = options
    },
    mutationCallback (mutationList, observer) {

    }
  },
  created () {
    this.getData();
  },
  mounted() {
    this.container = this.$refs.container
    console.log("mounted")
    console.log(this.container)
    let MutationObserver = window.MutationObserver || window.WebKitMutationObserver || window.MozMutationObserver
    this.observer = new MutationObserver((mutationList) => {
      console.log("jinlaile")
      console.log(mutationList)
      let width = getComputedStyle(this.container).getPropertyValue('width')
      let height = getComputedStyle(this.container).getPropertyValue('height')
      console.log(width,height)
      if(width === this.recordOldValue.width && height === this.recordOldValue.height) return
      this.recordOldValue = {
        width,
        height
      }
      console.log(this.recordOldValue)
    });
    this.observer.observe(this.container, {
      attributes: true,
      attributeFilter: ['style'],
      attributeOldValue: true
    })
    this.initChart();
  },
  beforeDestroyed() {
      if(this.observer) {
        this.observer.disconnect()
        this.observer.takeRecords()
        this.observer = null
      } 
	}
}
</script>
<style lang='less' scoped>
//@import url(); 引入公共css类
.chart-container {
  width: 100%;
  height: 100%;
}
.echarts {
  width: 100%;
  height: 100%;
}
</style>