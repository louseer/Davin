<!-- dashboard -->
<template>
  <div class='wrapper' ref='wrapper'>
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
      wrapper:null,
      configer:null,
      wrapperCW:0,
      wrapperCH:0,
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
      _h = this.wrapperCW / r;
      if(_h <= this.wrapperCH){
        this.displayWidth = this.wrapperCW;
        this.displayHeight = parseInt(_h);
      }else{
        this.displayWidth = parseInt(this.wrapperCH * r);
        this.displayHeight = this.wrapperCH
      }
      this.scale = this.displayWidth / this.configer.width;
      this.canShowNode = true;
    }
  },
  created() {
    
    this.configer = new Configer();
  },
  mounted() {
    this.wrapper = this.$refs.wrapper;
    this.wrapperCW = this.wrapper.clientWidth;
    this.wrapperCH = this.wrapper.clientHeight;
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
.wrapper{
  width:100%;
  height:100%;
}

</style>