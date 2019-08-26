<!--  -->
<template>
  <div class='set-bar'>
    <div class='canvas-set' v-if='editType===ELEMENT_SCREEN'>
      <div class='top'>
        大屏设置
      </div>
      <div class='form-wrapper'>
        <DForm 
        type='databoard'
        key='databoard'  
        :setting='databoard' 
        @update='updateDataboard' 
        @intercept-canvas='interceptCavas'
        @upload-caver='uploadCaver'
        />
      </div>
    </div>
    <div class='single-node-set' v-if='editType===ELEMENT_NODE'>
      <div class='top'>

      </div>
      <div class='form-wrapper'>
        <DForm type='node' :setting='editNode' @update='updateNode' key='node'/>
        <DForm :type='editChart.type' :setting='editChart' @update='updateChart' key='chart'/>
      </div>
    </div>
    <div class='single-group-set' >
      <div class='top'>
        组内设置
      </div>
      <div class='form-wrapper' >
        
      </div>
    </div>
    <div class='multi-node-set' v-if='editType === ELEMENT_MULTI'>
      <div class='top'>
        排列布局
      </div>
      <div class='form-wrapper'>
        
      </div>
    </div>
    
  </div>
</template>

<script>
//import {组件名称} from '组件路径';
import { ELEMENT_SCREEN,ELEMENT_NODE,ELEMENT_MULTI } from "@/store/constants"
import { mapState, mapActions } from 'vuex'
import DForm from '../common/dynamicForm/dynamicForm.vue'
import html2canvas from 'html2canvas';

export default {
  components: {
    DForm
  },
  props:{

  },
  data() {
    return {
      ELEMENT_SCREEN,
      ELEMENT_NODE,
      ELEMENT_MULTI,
    };
  },
  computed: {
    ...mapState('databoard',{
      mode:state => state.mode,
      databoard:state => state.databoard,
      editNode:state => state.editNode,
      editChart:state => state.editChart,
      editType:state => state.editType,
    })
  },
  watch: {},
  methods: {
    ...mapActions('databoard',[
      'queryDataboard',
      'updateNode',
      'updateChart',
      'updateDataboard'
    ]),
    interceptCavas(){
      const canvas = document.querySelector("#canvas");
      html2canvas(document.querySelector("#canvas")).then(canvas => {
          document.body.appendChild(canvas)
          var dataURL  = canvas.toDataURL('image/png');
          this.updateDataboard({"thumbnail":dataURL})
      });
      return;
    },
    uploadCaver(){
      console.log('uploadCaver')
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
<style>
@import '~@/assets/styles/dark-element-ui.css';
</style>
<style lang='less' scoped>
//@import url(); 引入公共css类
@import '~@/assets/styles/base.less';

.set-bar{
  width:100%;
  height:100%;
  overflow-y: scroll;
  .top{
    height:26px;
    background-color:#393c41;
    font-size:.14rem;
    line-height: 26px;
    color: @Font_DataC_main;
    text-align: center;
  }
  .form-wrapper{
    padding:.2rem;
    /deep/ .el-radio{
          margin-right: 10px;
    }
    /deep/ .el-radio__label{
      padding-left: 5px;
    }
  }
  
}
</style>

