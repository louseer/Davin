<template>
  <div>
    <div class="tit">
      我的大屏
    </div>
    <div class="screen_content"> 
      <div class="mod" v-for="(item,index) in screenList" :key="index" >
        <div class="thumbnail" :style="{backgroundImage: 'url('+ item.img +')'}" ></div>
        <h5>{{item.name}}</h5>
        <p>{{item.time}}</p>
        <ul class="btn_group">
          <li v-for="(item,index) in btnGroup" :key="index" :class="item.type">

          </li>
        </ul>
      </div>
    </div>
    <div class="add">
      <div class="btn_add" @click="createScreen"></div>
      <h6>创建新的大屏</h6>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        screenList: [
          {img:require("../../../assets/images/screen_1.png"),name:"PEIM V1.03",time:"2019年11月12日 17：00"},
          {img:require("../../../assets/images/screen_2.png"),name:"PEIM V1.03",time:"2019年11月12日 17：00"}
        ],
        btnGroup:[
          {type:"copy"},
          {type:"preview"},
          {type:"set"},
          {type:"publish"}
        ]
      }
    },
    methods: {
      createScreen() {
        console.log('+++')
      }
    },
  }
</script>

<style lang="less" scoped>
.tit{
  height: 0.56rem;
  font:bold 0.16rem/0.56rem "微软雅黑";
  color:#666666;
}
.screen_content{
  float: left;
  overflow: hidden;
  .mod{
    float: left;
    width: 3.1rem;
    height: 3rem;
    background: #ffffff;
    border-radius: 8px;
    margin-right: 0.2rem;
    overflow: hidden;
    text-align: center;
    .thumbnail{
      width: 100%;
      height: 1.73rem;
      background-size: 100%;
     
    }
    h5{
      font:bold 0.16rem/1 Arial;
      color: #333333;
      margin-top:0.2rem;
    }
    p{
      color: #999999;
      font:0.16rem/1 "微软雅黑";
       margin-top:0.2rem;
    }
  }
}
.add{
  float: left;
    width: 3.1rem;
    height: 3rem;
    background: #ffffff;
    border-radius: 8px;
    margin-right: 0.2rem;
    overflow: hidden;
    text-align: center;
    .btn_add{
      width: 1.39rem;
      height: 1.39rem;
      background: url(../../../assets/images/btn_add.png) no-repeat;
      margin: 0 auto;
      margin-top: 0.7rem;
      cursor: pointer;
    }
    h6{
       color: #666666;
      font:0.16rem/1 "微软雅黑";
       margin-top:0.46rem;
    }
}
.btn_group{
  display: flex;
  justify-content: space-around;
  margin-top: 0.2rem;
  li{
    width: 20px;
    height: 20px;
    cursor: pointer;
    &.copy{
      background: url(../../../assets/images/btn_copy.png) no-repeat center center;
    }
       &.preview{
      background: url(../../../assets/images/btn_preview.png) no-repeat center center;
    }
       &.set{
      background: url(../../../assets/images/btn_set.png) no-repeat center center;
    }
       &.publish{
      background: url(../../../assets/images/btn_publish.png) no-repeat center center;
    }
  }
}

</style>