<!-- dashboard -->
<template>
  <div class='container' ref='container'>
    <div class='dashboard' :style='style' ref='dashboard'>
      <div class='background-img'></div>
      <div class='node-box' v-if='canShowNode'>
        <Node v-for='(chart,index) in configer.charts' :key='index'  :config='chart' :scale='scale' :draggable="mode === 'edit'"/>
      </div>
    </div>
    <div class='scal-bar'></div> 
  </div>
  
</template>

<script>
import Configer from './dashboardConfiger.js'
import Node from '../node/node.vue'

export default {
  props:['id','mode'],
  components: {
    Node 
  },
  data() {
    return {
      container:null,
      configer:null,
      containerCW:0,
      containerCH:0,
      displayWidth:0,
      displayHeight:0,
      scale:1,
      canShowNode:false
    };
  },
  computed: {
    style () {
      return  {width:`${this.displayWidth}px`,height:`${this.displayHeight}px`,background:this.configer.background} 
    }
  },
  watch: {},
  methods: {
    selfAdaption () {
      let _h = 0;
      let r = this.configer.width / this.configer.height;
      _h = this.containerCW / r;
      if(_h <= this.containerCH){
        this.displayWidth = this.containerCW;
        this.displayHeight = parseInt(_h);
      }else{
        this.displayWidth = parseInt(this.containerCH * r);
        this.displayHeight = this.containerCH
      }
      this.scale = this.displayWidth / this.configer.width;
      this.canShowNode = true;
    }
  },
  created() {
    this.configer = new Configer();
  },
  mounted() {
    this.container = this.$refs.container;
    this.containerCW = this.container.clientWidth;
    this.containerCH = this.container.clientHeight;
    this.selfAdaption();

   
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
.container{
  width:100%;
  height:100%;
}

</style>