<!--  -->
<template>
  <div class='cover-setting'>
    <el-button-group class='btn-wrapper'>
      <el-button v-for='(btn,index) in btns' class='cover-btn' :key='index' :class='btn.className' @click="handleClick(btn.event)">{{btn.text}}</el-button>
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
  }
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