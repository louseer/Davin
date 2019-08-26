<!--  -->
<template>
  <div class='cover-setting'>
    <el-button-group class='btn-wrapper'>
      <el-button v-for='(btn,index) in btns'  class='btn.className' @click="handleClick(btn.event)">{{btn.text}}</el-button>
    </el-button-group>
    <div class='img-wrapper'>
      <img :src='imgsrc' class='cover-img' v-if='imgsrc'></div>
    </div>
  </div>
</template>

<script>
export default {
  model: {
    prop: 'imgsrc',
    event: 'change'
  },
  props:{
    btns:Array,
    imgsrc:String
  },
  components: {},
  data() {
    return {}
  },
  methods: {
    handleClick(emitTag){
      if(emitTag){
        this.$emit('click-btn',emitTag)
      }
    }
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {
    console.log(this.imgsrc)
  },
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {
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
//@import url(); 引入公共css类
.btn-wrapper{
  width:100%;
  .cover-btn{
    width:50%;
  }
}

.img-wrapper{
  margin-top:10px;
  width:100%;
  height:1rem;
  border:1px dashed #b9b6b6;
  box-sizing: border-box;
  .cover-img {
    margin:0 auto;
    width: 100%;
    height:100%;
  }
}
</style>