<!--  -->
<template>
  <div>
    <div class='img-select' @click='handleClick'>
      <img v-if="imgsrc" :src='imgsrc' height="100%" />
    </div>
  </div>
  
</template>

<script>
//import {组件名称} from '组件路径';

export default {
  name:'d-img-select',
  components: {},
  data() {
    return {
      imgsrc:''
    };
  },
  computed: {},
  watch: {},
  methods: {
    handleClick () {
      this.$alert('这是一段内容', '选择系统图片', {
        confirmButtonText: '确定',
        callback: action => {
          this.$message({
            type: 'info',
            message: `action: ${ action }`
          });
        }
      });
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
.img-select{
  width:100%;
  height:1rem;
  border:1px dashed #efefef;
  border-radius: 5px;
  img {
    margin:0 auto;
  }
}

</style>