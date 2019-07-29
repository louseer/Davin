<!-- form Editor -->
<template>
  <div class='form-edit-page'>
    <div class='top-nav'>
      <button>new</button>
    </div>
    <div>form title</div>
    <grid-layout></grid-layout>
  </div>
</template>

<script>
//import {组件名称} from '组件路径';
import GridLayout from './gridLayout/gridlayout.vue'
import { mapMutations } from 'vuex';

export default {
  components: {
    GridLayout
  },
  data() {
    return {
    };
  },
  computed: {

  },
  watch: {},
  methods: {
    ...mapMutations([
      'setFormID',
      'openEditMode'
    ])
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {
    this.openEditMode()
    this.setFormID(this.$route.params.id)
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
.form-edit-page{
  width:100%;
  height:100%;
}

</style>