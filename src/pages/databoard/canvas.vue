<template>
  <div class="canvas" ref="canvas" id="canvas" :style="style">
    <component v-if='config.background' class='bgImg' :is='BgImg'></component>
    <!-- <StylebgImg></StylebgImg> -->
    <slot></slot>
  </div>
</template>

<script>
import styled from 'vue-styled-components';

export default {
  props: {
    canvasConfig: {
      type: Object,
      default: ()=>{}
    },
  },
  data() {
    return {
      config: this.canvasConfig
    }
  },
  watch: {
    canvasConfig:{
      handler:function (val) {
        console.log('CANVASCHANGE', '')
        this.config=val
      },
       deep:true
    }
   
  },
computed: { 
  BgImg(){
    const {imgSouce,systemImg,uploadImg,imgBlur,imgOpacity,imgRepeat} = this.config.background;
    const imgSrc =  imgSouce === 0 ?"":(imgSouce === 1 ? systemImg:uploadImg);
    let bgimgStr = '';
    const opacity = imgOpacity / 100;
    if(imgSrc){
      bgimgStr =  `background-image:url(${imgSrc}); opacity: ${opacity};`
      switch(imgRepeat){
        case 0: //拉伸铺满
          bgimgStr += 'background-size:100% 100%; background-repeat: no-repeat;'
          break;
        case 1:
          bgimgStr += 'background-size:100% auto; background-repeat:repeat-y;'
          break;
        case 2:
          bgimgStr += 'background-size:auto 100%; background-repeat:repeat-x;'
          break;
        case 3:
          bgimgStr += 'background-repeat: repeat;'
        default:;
      }
      
      if(imgBlur){
        bgimgStr += `
        ::after{
          content: "";
          width:100%;
          height:100%;
          position: absolute;
          left:0;
          top:0;
          background: inherit;
          filter: blur(${imgBlur}px); 
          -webkit-filter: blur(${imgBlur}px);
          -moz-filter: blur(${imgBlur}px);
          -o-filter: blur(${imgBlur}px);
          -ms-filter: blur(${imgBlur}px);
          opacity: ${opacity};
        }`
      }
    }
    return styled.div`${bgimgStr}`
  },
  style(){
    const bgcolor = this.config.background ? this.config.background.bgcolor : '#464a4e'
    return `
        width:${this.config.width}px;
        height:${this.config.height}px;
        transform:scale(${this.config.zoomSize});
        transform-origin: 0 0; 
        top:${this.config.offset}px;
        left:${this.config.offset}px;
        background:${bgcolor};
      `
  }
},
methods: {
  
},
}
</script>

<style lang="less" scoped>
.canvas {
  position: absolute;
 border-radius: 8px;
 box-shadow: 0px 0px 50px rgba(0,0,0,0.2);
  background: #464a4e;
  .bgImg{
    width:100%;
    height:100%;
    float: left;
  }
}
</style>