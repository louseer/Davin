<template>
  <div>
    <div class="top_btn">
      <div class="btn_circle"></div>
      <div class="btn_menu"></div>
    </div>
    <div class="menu">
      <h5>应用组合</h5>
      <ul>
        <li v-for="(item,index) in menuList" :key="index" :class="[ index===0?'active':'' ]">{{item.name}}</li>
      </ul>
      <h5>管理中心</h5>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      menuList: [
        {name:'可视化大屏'},
        {name:'可视化报表'},
        {name:'数据探索'},
        {name:'分析推理'},
        {name:'多维仿真'},
      ]
    }
  },
};
</script>

<style lang="less" scoped>
.top_btn {
  height: 0.63rem;
  padding: 0 0.2rem;
  display: flex;
  align-items: center;
  justify-content: space-between;

  .btn_circle {
    background: url(../../../assets/images/btn_circle.png) no-repeat;
    width: 21px;
    height: 21px;
    cursor: pointer;
  }
  .btn_menu {
    background: url(../../../assets/images/btn_menu.png) no-repeat;
    width: 34px;
    height: 29px;
    cursor: pointer;
  } 
}
.menu{
    color: #ffffff;
    font-size: 0.16rem;
     position: relative;
     width: 100%;
     left: 6px;
    h5{
      font-size: 0.14rem;
      font-weight: bold;
      text-indent: 12px;
      height: 0.56rem;
      line-height: 0.56rem;
    }
    ul{
      li{
        height: 0.56rem;
        line-height: 0.56rem;
        text-indent: 0.26rem;
        cursor: pointer;
        &.active{
          background-color: #ffffff;
          border-right:6px solid #e8373e; 
          color: #e8373e;
          box-sizing: border-box;
          box-shadow: 0 3px 5px #c32e34;
      }
      }
      
    }
  }
</style>