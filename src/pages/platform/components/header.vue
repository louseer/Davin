<template>
  <div class="header">
      <div class="logo">
        达芬奇增强型分析平台
      </div>
      <ul class="btn_group">
        <li v-for="(item,index) in btnList" :key="index" :class="[ index===0?'active':'' ]">{{item.name}}</li>
      </ul>
      <div class="user">
        <img :src="imgSrc" alt="">
        <span>admin</span>
      </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        btnList: [
          {name:'项目通道'},
          {name:'新建'},
          {name:'数据集'}
        ],
        imgSrc:require("../../../assets/images/photo.png")
      }
    },
  }
</script>

<style lang="less" scoped>
@import '../../../assets/styles/base.less';
.header{
  width: 100%;
  height: 0.7rem;
  background: #ffffff;
  overflow: hidden;
  .logo{
    float: left;
    height: 0.7rem;
    background: url(../../../assets/images/logo.png) no-repeat 0.25rem center;
    padding-left:1.05rem;
    color: #666666;
    font:bold 0.18rem/0.7rem  "微软雅黑"; 
  }
  .btn_group{
    float: left;
    overflow: hidden;
    color: #999999;
    font: 0.16rem/0.32rem "微软雅黑";
    margin-left:0.8rem;
    margin-top:0.19rem; 
    li{
      float: left;
      padding: 0 0.2rem;
      height: 0.32rem;
      &.active{
        background-color: #e62129;
        color: #ffffff;
        border-radius: 16px;
      }
    } 
  }
  .user{
    float: right;
    margin-right: 0.7rem;
    margin-top:0.1rem; 
    span{
      margin-left: 0.1rem;
      color: #333333;
      font:0.16rem/0.16rem  "微软雅黑";
    }
  }
}
</style>