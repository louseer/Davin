<!-- form Editor -->
<template>
  <div class='form-edit-page'>
    <div class='top-nav'>
      <button @click='addChart("line")'>new line</button>
    </div>
    <div>form title</div>
    <div class = 'edit-body'>
      <div class='page-left'>
        <grid-layout :layout='layout' :editing='isEditing'></grid-layout>
      </div>
      <div class='page-right'>
        <DForm :type='type' :setting='setting'/>
      </div>
    </div>
  </div>
</template>

<script>
//import {组件名称} from '组件路径';
import GridLayout from './components/gridlayout.vue'
import DForm from '../common/dynamicForm/dynamicForm.vue'
import { mapState, mapGetters, mapMutations, mapActions } from 'vuex'


export default {
  components: {
    GridLayout,
    DForm
  },
  data() {
    return {
    };
  },
  computed: {
    ...mapState('form',{
      'layout':state => state.layout,
    }),
    ...mapGetters ('form',[
      'isEditing',
      'modifyTarget'
    ]),
    type() {
      return this.modifyTarget.type
    },
    setting () {
      return this.modifyTarget.setting
    }
  },
  watch: {},
  methods: {
    ...mapMutations('form',[
      'setRFormID',
      'openEditMode'
    ]),
    ...mapActions('form',[
      'queryFormData'
    ]),
    addChart(type){

    }
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {
    this.openEditMode()
    this.setRFormID(this.$route.params.id)
    this.queryFormData()
    
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
  .edit-body {
    display: flex;
    .page-left {
      flex-grow: 1;
    }
    .page-right {
      width:4rem;
    }
  }
}

</style>