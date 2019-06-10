<template>
 <header>
   <div class="logo"></div>
   <h1>增强分析可视化</h1>
   <h2 @click.stop="logOut">admin</h2>
   <div class="photo">
     <img :src="headSrc" alt="头像" width="100%" height="100%">
   </div>
  </header>
</template>

<script>
export default {
  name: 'header',
  props: {
    headSrc: {
      type: String,
      default: require('images/ico_head.png')
    }
  },

  methods: {
   
  }
}

</script>

<style lang="less" scoped>
header{
  width: 100%;
  height: 0.65rem;
  background: #ffffff;
  position: relative;
  .logo{
    float: left;
    background: url(~images/logo_znv.png) no-repeat center center;
    width: 2.23rem;
    height: 0.65rem;
    background-size:80% 80%;
    margin-left: 0.2rem;
  }
  h1{
    line-height: 0.65rem;
    font:bolder 0.24rem/0.65rem "微软雅黑";
    float: left;
    margin-left: 0.15rem;
    color: #272a37;

  }
  .photo{
    float: right;
    width: 0.38rem;
    height: 0.38rem;
    border-radius: 50%;
    margin-top:0.135rem;
    margin-right: 0.2rem;
    overflow: hidden;
    text-align: center;
    .img{
      text-align: center;
    }
  }
  h2{
    line-height: 0.65rem;
    font: 0.16rem/0.65rem "微软雅黑";
    float: right;
    margin-right: 0.8rem;
    color: #404040;
  }
}
</style>
