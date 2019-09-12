<!-- dashboard编辑页 -->
<template>
  <div class="edit-page">
    <Eheader :maintit="maintit" :toptools="toptools" />
    <div class="content">
      <div class="setbar">
        <Setbar 
          :editType='editType' 
          :editNode='editNode'
          :editChart='editChart'
          :editGroup='editGroup'
          :databoard='databoard'
          :nodeNum='rootNodesLen'
          @btnClick='setBarBtnClick' 
          @updateGroup='updateGroup'
          @updateDataboard='updateDataboard'
          @updateChart='updateChart'
          @updateNode='updateNode'
        />
      </div>
      <div class="leftbar">
        <Dtab :tabs="leftTab">
          <Dswitch slot="tabsloat" :state="showMmore" @switchChange="switchChange" />
          <div slot="tab1">
            <div class="laysetbar">
              <b v-for="(bbtn,bbindex) in  laysets" :key="bbindex">
                <Dbutton :btn="bbtn" />
              </b>
            </div>
            <LayerTree
              :listType="listType"
              :treenode="treenode"
              @treeNodeClick="treeNodeClick"
              @unhideNode="unhideNode"
              @unlockNode="unlockNode"
            />
            <LeftBottom :leftBottomtools="leftBottomtools"></LeftBottom>
          </div>
          <div slot="tab2" slot-scope="tab">
            <TypeTab
              :height="tab.height"
              :listType="listType"
              :typetree="typetree"
              @contentClick="contentClick"
            />
          </div>
        </Dtab>
      </div>
      <div class="rightbar">
        <Stage 
          :databoardID = 'databoardID'
          @nodelistChange="nodechange" 
          @zoomChange="zoomChange"
          @switchEditPanel='switchEditPanel'
          @updateNodeSetting = 'updateNodeSetting'
          @initDataboard= 'initDataboard'
          ref="stage" 
        ></Stage>
        <ZoomSetter :zoomSize="zoom" @changeSize="changeSize" />
      </div>
    </div>
  </div>
</template>

<script>
import ZoomSetter from './zoom-setter.vue'
import Dswitch from '../../components/switch.vue'
import Dbutton from '../../components/button.vue'
import Dtab from '../../components/tabmenu.vue'
import Stage from './index.vue'
import Eheader from './edit-header.vue'
import LeftBottom from './leftbottom.vue'
import { nodeListToTree, ordlistToTree } from '../../utils/format'
import thumbnail from '../../components/thumbnail.vue'
import LayerTree from './layer-tree.vue'
import TypeTab from './type-tab'
import { getuuid } from '@/utils/index'
import DForm from '../common/dynamicForm/dynamicForm.vue'
import Setbar from './setbar.vue'

import { mapState, mapGetters, mapMutations, mapActions } from 'vuex'
import { ELEMENT_SCREEN,NODE_ELEMENT,NODE_MULTI,NODE_GROUP } from "@/store/constants"
import { objDeepMerge } from '@/utils/index.js'

export default {
  components: {
    ZoomSetter,
    Eheader,
    Stage,
    Dbutton,
    Dtab,
    Dswitch,
    LeftBottom,
    thumbnail,
    LayerTree,
    TypeTab,
    DForm,
    Setbar
  },
  data() {
    return {
      ELEMENT_SCREEN,
      NODE_ELEMENT,
      NODE_MULTI,
      NODE_GROUP,
      editType:ELEMENT_SCREEN,
      editNode:null,
      editChart:null,
      editGroup:null,
      databoard:null,
      databoardID:'',
      rootNodesLen:0,
      zoom:0.5,
      showMmore: true,
      treenode: [],
      toptools: [
        {
          name: '发布',
          icon: 'icon-ico_db_public',
          event: this.public,
          type: 'icon'
        },
        {
          name: '预览',
          icon: 'icon-ico_db_view',
          event: this.view,
          type: 'icon'
        },
        {
          name: '保存',
          icon: 'icon-ico_db_save',
          event: this.save,
          type: 'icon'
        },
        {
          name: '退出',
          icon: 'icon-ico_db_back',
          event: this.quit,
          type: 'icon'
        }
      ],
      laysets: [
        {
          name: '上移一层',
          icon: 'icon-ico_db_layup',
          event: this.layUp,
          type: 'icon'
        },
        {
          name: '下移一层',
          icon: 'icon-ico_db_laydown',
          event: this.layDown,
          type: 'icon'
        },
        {
          name: '置于顶层',
          icon: 'icon-ico_db_laytop',
          event: this.layTop,
          type: 'icon'
        },
        {
          name: '置于底层',
          icon: 'icon-ico_db_laybottom',
          event: this.layBottom,
          type: 'icon'
        }
      ],
      leftBottomtools: [
        {
          name: '编组',
          icon: 'icon-ico_db_folder',
          event: this.toggleGrop,
          type: 'icon'
        },
        {
          name: '删除',
          icon: 'icon-ico_db_delete',
          event: this.layDelete,
          type: 'icon'
        },
        {
          name: '锁定',
          icon: 'icon-ico_db_lock',
          event: this.lock,
          type: 'icon'
        },
        {
          name: '隐藏',
          icon: 'icon-ico_db_visiable',
          event: this.hide,
          type: 'icon'
        }
      ],
      listType: 'thumbnail',
      leftTab: [
        {
          name: '图层',
          id: 1,
          active: false
        },
        {
          name: '组件',
          id: 2,
          active: true
        }
      ]
    }
  },

  computed: {
    ...mapState('databoard',{
      mode:state => state.mode,
      typetree:state => state.typetree
    }),
    ...mapGetters ('databoard',[
      'isEditing'
    ]),
    multiple(){
      if(this.$refs.stage){
        return this.$refs.stage.multiple
      }
    },
    activeNodes(){
      return this.$refs.stage && this.$refs.stage.domCavase ? this.$refs.stage.domCavase.selectNodes : []
    },
    maintit(){
      return this.databoard ? this.databoard.name : ''
    }
  },
  methods: {
    ...mapMutations('databoard',[
      'openEditMode',
    ]),
    initDataboard(obj){
      this.databoard = obj
    },
    updateDataboard(setting){
      this.databoard = objDeepMerge(this.databoard,setting)
    },
    updateChart(setting){
      this.editChart = objDeepMerge(this.editChart,setting)
      this.editNode.chart = Object.assign({},this.editChart) //????
    },
    updateNode(setting){
      this.editNode = objDeepMerge(this.editNode,setting)
    },
    updateGroup(setting){
      this.$refs.stage.configGroup(setting,this.editGroup)
    },
    setBarBtnClick(handler,param){
      if(handler && this[handler]){
        this[handler](param);
      }
    },
    multipleNodesAlign(type) {
      this.$refs.stage.domCavase.multipleNodesAlign(type)
    },
    nodeAlign(type) {
      this.$refs.stage.domCavase.nodesAlign(type)
    },
    updateNodeSetting(){
      let rootNodes = this.activeNodes.filter(n => {
        return n.pid === null
      })
      if(this.rootNodesLen === 1){
        if(rootNodes[0].type==='element'){
          this.initEditNode(rootNodes[0])
        }else if(rootNodes[0].type==='group'){
          this.editGroup = rootNodes[0]
        }
      }
    },
    switchEditPanel(){ //TODO:考虑可以将这一层直接放在setbar组件中去？
      if(this.activeNodes.length === 0){
        this.editType = ELEMENT_SCREEN;
        return;
      }
      let rootNodes = this.activeNodes.filter(n => {
        return n.pid === null
      })
      this.rootNodesLen = rootNodes.length;
      if(this.rootNodesLen === 1){
        if(rootNodes[0].type==='element'){
          this.editType = NODE_ELEMENT
          this.editNode = rootNodes[0]
          this.editChart = rootNodes[0].chart
        }else if(rootNodes[0].type==='group'){
          this.editType = NODE_GROUP
          this.editGroup = rootNodes[0]
        }
      }else{
        this.editType = NODE_MULTI
      }
    },
    changeSize(val) {
      this.$refs.stage.setZoom(val)
    },
    zoomChange(val) {
      this.zoom = val
    },
    contentClick(item) {
      const id = getuuid()
      const chart = {
        id,
        type: item.type,
        name: item.title,
        version: item.version,
        text: item.text, //临时代码
        fontSize: item.fontSize //临时代码
      }
      const obj={
        w:item.w || 200,
        h:item.h || 200,
        x:50,
        y:50,
        elType:item.type,
        name:item.title,
        chart
      }
      this.$refs.stage.addNode(obj)
    },
    changeClick(items) {
      this.typetree = items
    },
    layUp() {
      console.log('上一层')
      this.$refs.stage.upLayer()
    },
    layDown() {
      console.log('下一层')
      this.$refs.stage.downLayer()
    },
    layTop() {
      console.log('顶层')
      this.$refs.stage.toTopLayer()
    },
    layBottom() {
      console.log('底层')
      this.$refs.stage.toBottomLayer()
    },

    switchChange(val) {
      val ? (this.listType = 'thumbnail') : (this.listType = 'list')
      this.showMmore = val
      console.log('开关', val)
    },
    nodechange(val) {
      let nodetree = [...val].map(n =>
        Object.assign(n, { label: `${n.type}-${n.zindex}` })
      )
      this.treenode = nodeListToTree(nodetree)
    },
    hide() {
      console.log('隐藏图层')
      this.$refs.stage.hideNode()
    },
    lock() {
      console.log('锁定图层')
      this.$refs.stage.lockNode()
    },
    layDelete() {
      console.log('删除图层')
      this.$refs.stage.deleteNode()
    },
    toggleGrop() {
      console.log('编组')
      this.$refs.stage.toggleGrop()
    },
    public() {
      console.log('发布')
    },
    view() {
      console.log('预览')
    },
    save() {
      console.log('保存')
      this.$refs.stage.getNodeLlist(list=>{
          window.localStorage.setItem('saveNode',JSON.stringify(list))
      })
     
    },
    quit() {
      console.log('退出')
      this.$router.push('/platform')
    },
    treeNodeClick(nodeId) {
      this.$refs.stage.choiceNodeById(nodeId)
      this.switchEditPanel()
    },
    unhideNode(nodeId) {
      this.$refs.stage.unhideNode(nodeId)
    },
    unlockNode(nodeId) {
      this.$refs.stage.unlockNode(nodeId)
    }
  },
  created(){
    const id = this.$route.params.id  || getuuid();
    //理论上都会有值。新建在进来之前已经获取到ID。可以放在前一个页面上直接设置vuex值。
    this.databoardID = id
    this.openEditMode()
  }
}
</script>
<style lang='less' scoped>
@import url('~@/assets/styles/base.less');
button {
  border: 1px white solid;
  font: 12px/1 '微软雅黑';
  padding: 5px;
  border-radius: 4px;
  margin-right: 2px;
  cursor: pointer;
  margin:10px 0 0 10px;
  &:hover {
    background: darkgray;
    color: #ffffff;
  }
}
.edit-page {
  width: 100%;
  height: 100%;
  overflow: hidden;
  background: #272a2e;
  display: flex;
  flex-flow: column nowrap;

  .content {
    background: burlywood;
    width: 100%;
    height: calc(100% - 0.5rem);

    display: flex;
    flex-flow: row nowrap;
    justify-content: space-between;
    position: relative;
    .leftbar {
      width: 2rem;
      background: @bg_Data_left;
      border-right: @border_Data_main;
      position: relative;
      overflow: hidden;

      .laysetbar {
        height: 0.3rem;
        background: @bg_Data_left;
        border-bottom: @border_Data_main;

        overflow: hidden;

        b {
          font-size: 0.16rem;
          display: block;
          height: 100%;
          width: 25%;
          text-align: center;
          color: @icon_DataC_main;
          float: left;
          line-height: 0.3rem;
          :hover {
            color: @Font_mainC_white;
          }
        }
      }
    }
    .rightbar {
      background: #272a2e;
      width: calc(100% - 2rem);
      height: 100%;
      position: relative;
    }
    .setbar {
      position: absolute;
      width: 3rem;
      background: @bg_Data_left;
      right: 0;
      top: 25px;
      height: 100%;
      z-index: 999;
    }
  }
}
</style>