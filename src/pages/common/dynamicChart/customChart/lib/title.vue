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
    options:{
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
      return this.options.text
    },
    fontSize() {
      return this.options.fontSize + 'px'
    },
    color() {
      return this.options.color
    },
    fontWeight () {
      return this.options.fontWeight
    },
    fontFamliy () {
      return this.options.fontWeight
    }
  },
  // watch:{
  //   config:{
  //     handler:function (val){
  //       this.style = {
  //         fontSize:this.options.fontSize + 'px' || 20+'px',//parseInt(this.options.fontSize*this.zoom)+'px' || parseInt(20*this.zoom)+'px',
  //         color:val.color || "#8AB7CB",
  //         fontWeight:val.fontWeight || '700',
  //         fontFamliy: val.fontWeight || '微软雅黑',
  //       }
  //       console.log(this.style)
  //     },
  //     deep:true
  //   }
  // },
  created(){
    // this.style = {
    //   fontSize:this.options.fontSize + 'px' || 20+'px',//parseInt(this.options.fontSize*this.zoom)+'px' || parseInt(20*this.zoom)+'px',
    //   color:this.options.color || "#8AB7CB",
    //   fontWeight:this.options.fontWeight || '700',
    //   fontFamliy: this.options.fontWeight || '微软雅黑',
    // }
  },
  updated(){
    console.log(this.options)
  }

}
</script>
<style lang='less' scoped>
//@import url(); 引入公共css类
.custom-title{
  width:auto
}
</style>