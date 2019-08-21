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
        <DForm v-if='editType===ELEMENT_RFORM':type='ELEMENT_RFORM' :setting='rform' @update='updateRForm'/>
        <div v-if='editType===ELEMENT_GRID'>
          <DForm :type='ELEMENT_GRID' :setting='activeGrid' @update='updateGrid'/>
          <DForm :type='chartType' :setting='activeChart' @update='updateChart'/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
//import {组件名称} from '组件路径';
import GridLayout from './components/gridlayout.vue'
import DForm from '../common/dynamicForm/dynamicForm.vue'
import { mapState, mapGetters, mapMutations, mapActions } from 'vuex'
import { ELEMENT_RFORM,ELEMENT_GRID,ELEMENT_SCREEN,ELEMENT_NODE } from "@/store/constants"

export default {
  components: {
    GridLayout,
    DForm
  },
  data() {
    return {
      ELEMENT_RFORM,
      ELEMENT_GRID,
      ELEMENT_SCREEN,
      ELEMENT_NODE
    };
  },
  computed: {
    ...mapState('form',{
      'layout':state => state.layout,
      'activeChart':state => state.activeChart,
      'activeGrid':state => state.activeGrid,
      'rform':state => state.rform,
      'editType':state => state.editType
    }),
    ...mapGetters ('form',[
      'isEditing'
    ]),
    chartType(){
      return this.activeChart ? this.activeChart.type : ''
    }
  },
  watch: {},
  methods: {
    ...mapMutations('form',[
      'setRFormID',
      'openEditMode',
      'updateGrid',
      'updateChart',
      'updateRForm'
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