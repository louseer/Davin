<!--  -->
<template>
  <div class='set-bar' :class="{'opend':opend,'shrink':!opend}">
    <div class='canvas-set' v-if='editType===ELEMENT_SCREEN'>
      <div class='top'>
        <h3>大屏设置</h3>
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
      <form 
        v-show='false' 
        id="upload-form" 
        action="https://jsonplaceholder.typicode.com/posts/" 
        method="post" 
        enctype="multipart/form-data"
      >
  　　　<input
          type="file" 
          id="caver-upload" 
          name="upload"
          @change="uploadCaverChange"
        />
      </form>
    </div>
    <div class='single-node-set' v-if='editType===NODE_ELEMENT'>
      <div class='top'>
        <h3>{{editNode.name}}</h3>
        <h4 class='sub-title'>V{{editChart.version}} | {{chartTitle}}</h4>
      </div>
      <div class='form-wrapper'>
        <nodeConfigForm 
          :name='editNode.name'
          :id='editNode.id'
          :x ='editNode.x'
          :y ='editNode.y'
          :w ='editNode.w'
          :h ='editNode.h'
          :key='editNode.id'
          @update='updateNode'
        />
        <DForm :type='editChart.type' :setting='editChart' @update='updateChart' key='chart'/>
      </div>
    </div>
    <div class='single-group-set' v-if='editType === NODE_GROUP'>
      <div class='top'>
        <h3>组内设置</h3>
      </div>
      <div class='form-wrapper' >
        <DForm type='group' :setting='editGroup' @update='updateGroup' key='node'/>
      </div>
    </div>
    <div class='multi-node-set' v-if='editType === NODE_MULTI'>
      <div class='top'>
        <h3>排列布局</h3>
      </div>
      <div class='form-wrapper'>
        <el-form label-width="0.8rem" label-position='left' size='mini'>
          <el-form-item label="排列" >
            <DButton 
              v-for="(btn,index) in  aglinList"
              :key="index"
              :btn = "btn"
              class='aglinBtn'
              v-if="!btn.hide"
            ></DButton>
          </el-form-item>
          <el-form-item label="分布" >
            <DButton 
              v-for="(btn,index) in  layoutList"
              :key="index"
              :btn = "btn"
              class='aglinBtn'
              v-if="!btn.hide"
            ></DButton>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
//import {组件名称} from '组件路径';
import { ELEMENT_SCREEN,NODE_ELEMENT,NODE_MULTI,NODE_GROUP } from "@/store/constants"
import { mapState, mapActions } from 'vuex'
import DForm from '../common/dynamicForm/dynamicForm.vue'
import DButton from '@/components/button.vue'
import nodeConfigForm from '@/components/node-config-form.vue'
import html2canvas from 'html2canvas';

export default {
  components: {
    DForm,
    DButton,
    nodeConfigForm
  },
  props:{
    editType:{
      type:String,
      default:ELEMENT_SCREEN
    },
    nodeNum:{
      type:Number,
      default:0
    }
  },
  data() {
    return {
      ELEMENT_SCREEN,
      NODE_ELEMENT,
      NODE_MULTI,
      NODE_GROUP,
      opend:true,
      aglinList: [
        { 
          type: 'top', 
          name: '顶对齐',
          event: ()=>{ this.nodeAlign('top') },
          icon: 'icon-ico_al_top'
        },
        { 
          type: 'right', 
          name: '右对齐',
          event: ()=>{ this.nodeAlign('right') },
          icon: 'icon-ico_al_right'
        },
        { 
          type: 'bottom',
          name: '底对齐',
          event: ()=>{ this.nodeAlign('bottom') },
          icon: 'icon-ico_al_bottom'
        },
        { 
          type: 'left',
          name: '左对齐',
          event: ()=>{ this.nodeAlign('left') },
          icon: 'icon-ico_al_left'
        },
        { 
          type: 'HCenter',
          name: '水平居中',
          event: ()=>{ this.nodeAlign('VCenter') },
          icon: 'icon-ico_al_Hcenter' 
        },
        { 
          type: 'VCenter',
          name: '垂直居中',
          event: ()=>{ this.nodeAlign('HCenter') },
          icon: 'icon-ico_al_Vcenter'
        }
      ]
    }
  },
  computed: {
    ...mapState('databoard',{
      mode:state => state.mode,
      databoard:state => state.databoard,
      editNode:state => state.editNode,
      editChart:state => state.editChart,
      editGroup:state => state.editGroup,
      typetree:state => state.typetree
    }),
    layoutList(){
      return [
        { 
          type: 'Hline',
          name: '水平联排',
          event: ()=>{ this.nodeAlign('Hline') },
          icon: 'icon-ico_al_Hline' 
        },
        { 
          type: 'Vline',
          name: '垂直联排',
          event: ()=>{ this.nodeAlign('Vline') },
          icon: 'icon-ico_al_Vline'
        },
        { 
          name: '水平均分',
          event: ()=>{ this.multipleNodesAlign('HorizontalAverage') },
          icon: 'icon-ico_al_HorizontalAverage',
          hide: this.nodeNum < 3 
        },
        {
          name: '垂直均分',
          event: ()=>{ this.multipleNodesAlign('VerticalAverage') },
          icon: 'icon-ico_al_VerticalAverage',
          hide: this.nodeNum < 3 
        }
      ]
    },
    chartTitle(){
      if(!this.editChart || !this.typetree){
        return ''
      }
      let category,chart
      category = this.typetree.find((e) => {
        chart = e.children.find((e) => {
          return e.type === this.editChart.type
        })
        return !!chart
      })
      return `${category.title}-${chart.title}`
    }
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
          var dataURL  = canvas.toDataURL('image/png');
          this.updateDataboard({"thumbnail":dataURL})
      });
      return;
    },
    uploadCaver(){
      var uploader = document.querySelector("#caver-upload");
      uploader.click();
      console.log('uploadCaver')
    },
    uploadCaverChange(e){
      const files = e.target.files
      if (!files) return
      const file = files[0];
      const windowURL = window.URL || window.webkitURL
      file.url = windowURL.createObjectURL(file)
      this.updateDataboard({"thumbnail":file.url})
    },
    nodeAlign(type){
      this.$emit('btnClick','nodeAlign',type)
    },
    multipleNodesAlign(type){
      this.$emit('btnClick','multipleNodesAlign',type)
    },
    resizeGroupChild(w,h,node){
      const zW = w / node.w
      const zH = h / node.h
      n.w = n.w * zW
      n.h = n.h * zH
      n.x = node.x - (n.x - node.x) * zW
      n.y = node.y - (n.y - node.y) * zH
    },
    reLocationNode(cx,cy,node){
      node.x += cx
      node.y += cy
      if(node.children && node.children.length > 0){
        node.children.forEach(element => {
          this.locationGroupChild(cx,cy,element)
        }) 
      }
    },
    opacityNode(opacity,node){
      node.opacity = opacity
      if(node.children && node.children.length > 0){
        node.children.forEach(element => {
          this.opacityNode(opacity,element)
        }) 
      }
    },
    updateGroup(setting){
      this.$emit("updateGroup",setting)
    }
  }
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
    height:auto;
    background-color:#393c41;
    padding:8px 20px;
    h3{
      font-size:.14rem;
      line-height: .14rem;
      color: @Font_DataC_main;
      margin-bottom:5px;
    }
    .sub-title{
      font-size:.12rem;
      line-height: .12rem;
      color: @Font_DataC_main;
    }
  }
  .form-wrapper{
    padding:.2rem;
    /deep/ .el-radio{
          margin-right: 10px;
    }
    /deep/ .el-radio__label{
      padding-left: 5px;
    }
    /deep/ .unit {
      color:@icon_DataC_main;
    }
    .aglinBtn{
      width:24px;
      height:24px;
      background-color: #393c41;
      text-align: center;
      line-height: 24px;
      border-radius: 3px;
      float: left;
      margin:0 10px 5px 0;
      color:@icon_DataC_main;
      :hover{
        color:@Font_mainC_white;
      }
    }
  }
}

</style>

