<!-- chart -->
<template>
  <div class='location-layer' :style='initStyle' draggable='!config.isLocked && draggable' ref='locationLayer' @dragstart = 'handleDragstart' @drag='handleDrag' @dragend='handleDragend'>
    <div class='zoom-layer'></div>
    <Chart :config = 'config' />
  </div>
</template>

<script>
//import {组件名称} from '组件路径';
import Chart from '../chart/chart.vue';

export default {
  props:{
    config: {
      type:Object
    },
    scale: {
      type:Number,
      default:1
    },
    draggable: {
      type:Boolean,
      default: false
    }
  },
  components: {Chart},
  data () {
    return {
      displayW:parseInt(this.config.width * this.scale),
      displayH:parseInt(this.config.height * this.scale),
      displayT:parseInt(this.config.top * this.scale),
      displayL:parseInt(this.config.left * this.scale),
      zIndex:this.config.zIndex
    }
    
  },
  computed: {
    initStyle () {
      return {
        'width':`${this.displayW}px`,
        'height':`${this.displayH}px`,
        'left':`${this.displayL}px`,
        'top':`${this.displayT}px`,
        'z-index': this.zIndex
      }
    }
  },
  watch: {
  },
  methods: {
    handleDragstart (event) {
      var e = event || window.event;
      e.dataTransfer.effectAllowed = 'move';
      this._dx = e.clientX - this.locationDom.offsetLeft
      this._dy = e.clientY - this.locationDom.offsetTop
    },
    handleDrag (event){
      var e = event || window.event;
      this.displayT = e.clientY - this._dy;
      this.displayL = e.clientX - this._dx
      //this.locationDom.style.left = `${(e.clientX - this._dx)}px`;
      //this.locationDom.style.top = `${(e.clientY - this._dy)}px`;
    },
    handleDragend (event) {
      var e = event || window.event;
      this.displayT = e.clientY - this._dy;
      this.displayL = e.clientX - this._dx
    }
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {
  },
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {
    this.locationDom = this.$refs.locationLayer;
    //this.init();
  },
  beforeCreate() {}, //生命周期 - 创建之前
  beforeMount() {}, //生命周期 - 挂载之前
  beforeUpdate() {}, //生命周期 - 更新之前
  updated() {
  }, //生命周期 - 更新之后
  beforeDestroy() {}, //生命周期 - 销毁之前
  destroyed() {}, //生命周期 - 销毁完成
  activated() {}, //如果页面有keep-alive缓存功能，这个函数会触发
}
</script>
<style lang='less' scoped>
//@import url(); 引入公共css类
.selected {
  border:2px solid rgb(0, 153, 255) 
}
.location-layer {
  position: absolute;
  background-color:#ccc;
  .zoom-layer {
    width: 100%;
    height: 100%;
    position: absolute;
    &:hover{
      .selected()
    }
  }
  .chart{
    width: calc(100% - 10px);
    height: calc(100% - 10px);
    margin: 5px;
  }
}

</style>