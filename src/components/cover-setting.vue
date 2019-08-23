<!--  -->
<template>
  <div class='cover-setting'>
    <el-button-group class='btn-wrapper'>
      <el-button class='cover-btn' @click="interceptCavas">截取画布</el-button>
      <el-button class='cover-btn' @click="uploadCaver">上传图片</el-button>
    </el-button-group>
    <div class='img-wrapper'>
      <img :src='imgsrc' class='cover-img'></div>
    </div>
  </div>
 
</template>

<script>
//import {组件名称} from '组件路径';
import { mapState, mapActions } from 'vuex'
export default {
  components: {},
  data() {
    return {
      imgsrc:this.value 
    };
  },
  computed: {
    ...mapState('databoard',{
      databoard:state => state.databoard,
    })
  },
  watch: {},
  methods: {
    ...mapActions('databoard',[
      'updateDataboard'
    ]),
    interceptCavas(){
      this.$emit('interceptCavas')
    },
    uploadCaver(){
      this.$emit('uploadCaver')
    }
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {
  
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
  }
}
</style>