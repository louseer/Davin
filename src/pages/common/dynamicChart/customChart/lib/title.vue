<!--  -->
<template>
  <div class='custom-title' :style="{'fontSize':fontSize,'color':color,'fontWeight':fontWeight,'fontFamliy':fontFamliy}">
    <h1>{{text}}</h1>
  </div>
</template>

<script>
//import {组件名称} from '组件路径';

export default {
  name:'custom-title',
  props:{
    config:{
      type:Object,
      default:() => {}
    }
  },
  data() {
    return {
      style:''
    };
  },
  computed:{
    text(){
      return this.config.text || '自定义标题'
    },
    fontSize() {
      return this.config.fontSize + 'px' || 20+'px'
    },
    color() {
      return this.config.color || "#8AB7CB"
    },
    fontWeight () {
      return this.config.fontWeight || '700'
    },
    fontFamliy () {
      return this.config.fontWeight || '微软雅黑'
    }
  },
  watch:{
    config:{
      handler:function (val){
        this.style = {
          fontSize:this.config.fontSize + 'px' || 20+'px',//parseInt(this.config.fontSize*this.zoom)+'px' || parseInt(20*this.zoom)+'px',
          color:val.color || "#8AB7CB",
          fontWeight:val.fontWeight || '700',
          fontFamliy: val.fontWeight || '微软雅黑',
        }
        console.log(this.style)
      },
      deep:true
    }
  },
  created(){
    this.style = {
        fontSize:this.config.fontSize + 'px' || 20+'px',//parseInt(this.config.fontSize*this.zoom)+'px' || parseInt(20*this.zoom)+'px',
        color:this.config.color || "#8AB7CB",
        fontWeight:this.config.fontWeight || '700',
        fontFamliy: this.config.fontWeight || '微软雅黑',
      }
  }
}
</script>
<style lang='less' scoped>
//@import url(); 引入公共css类
.custom-title{
  width:auto
}
</style>