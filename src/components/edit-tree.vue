<template>
  <div class="dtree">
    <el-tree
      :data="data"
      node-key="id"
      :expand-on-click-node="false"
      :render-content="renderContent"
      default-expand-all
      :indent='8'
      empty-text=''
    ></el-tree>
  </div>
</template>

<script>
export default {
  props: {
    data: {
      type: Array,
      default: () => []
    },
    renderContent: {
      type: Function,
      default: () => {}
    }
  }
}
</script>

<style lang="less" >
@import '../assets/styles/base.less';
.dtree {
  .el-tree {
    .el-tree__empty-block{
      display: none;
    }
    width: 100%;
    .el-checkbox__inner{
      background: red !important;
      border: 0 !important;
    }
    .el-checkbox__inner::after{
      display: none
    }
    .el-tree-node__content {
      display: -webkit-box;
      display: -ms-flexbox;
      display: flex;
      background: @bg_Data_left !important;
      -webkit-box-align: center;
      -ms-flex-align: center;
      align-items: center;
      height: 0.40rem;
      cursor: pointer;
      color: @icon_DataC_main !important;
      &:hover{
        background: @bg_Data_lefthover !important;
        color: @Font_mainC_white !important;
      }
    }
  }
}
</style>