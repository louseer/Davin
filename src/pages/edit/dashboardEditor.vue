<!-- dashboard编辑页 -->
<template>
  <div class='edit-page'>
    <div class='side-bar-left'>
      <button @click='addNewNode'>new chart</button>
    </div>
    <div class='stage' ref='stage' @drop = 'handleDrop'>
      <Dashboard :id={id} mode='edit'></Dashboard>
    </div>
    <div class='side-bar-right'></div> 
  </div>
</template>

<script>
//import {组件名称} from '组件路径';
import Dashboard from './dashboard/dashboard.vue'
export default {
  components: {Dashboard},
  data() {
    return {
      id:5
    };
  },
  computed: {},
  watch: {},
  methods: {
    handleDrop (e) {

      e.dataTransfer.dropEffect = 'move';
    },

    addNewNode () {

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
.edit-page {
  display:flex;
  width:100%;
  height: 800px;
  .side-bar-left {
    width:200px;
    background-color: #ccc;
  }
  .stage {
    flex: 1;
    width:auto;
    background-color: #eee;
    padding:20px;
  }
  .side-bar-right {
    width:350px;
    border:1px solid #ccc;
  }
}
</style>