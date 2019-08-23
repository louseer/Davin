<!-- dashboard编辑页 -->
<template>
  <div class="edit-page">
    <Eheader :maintit="maintit" :toptools="toptools" />
    <div class="content">
      <div class="setbar">
        <Setbar :editType='editType'></Setbar>
        
        <div v-if='editType === ELEMENT_MULTI'>
          <button
            v-for="(btn,index) in  aglinList"
            :key="index"
            style="float:left"
            @click="$refs.stage.nodeAlign(btn.type)"
          >{{btn.name}}</button>
          <button 
            style="float:left" 
            v-if="multiple.length>=2" 
            @click="$refs.stage.nodeAlign('Hline')"
          >水平联排</button>
          <button 
            style="float:left" 
            v-if="multiple.length>=2"
            @click="$refs.stage.nodeAlign('Vline')"
          >垂直联排</button>
          <button
            style="float:left"
            v-if="multiple.length>=3"
            @click="$refs.stage.multipleNodesAlign('VerticalAverage')"
          >垂直均分</button>
          <button
            style="float:left"
            v-if="multiple.length>=3"
            @click="$refs.stage.multipleNodesAlign('HorizontalAverage')"
          >水平均分</button>
        </div>
        
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
              @changeClick="changeClick"
              @contentClick="contentClick"
            />
          </div>
        </Dtab>
      </div>
      <div class="rightbar">
        <Stage 
          @nodelistChange="nodechange" 
          @zoomChange="zoomChange" 
          @nodeClick='selectOneNode'
          @selectNodes='selectNodes' 
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
import { ELEMENT_SCREEN,ELEMENT_NODE,ELEMENT_MULTI } from "@/store/constants"


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
      ELEMENT_NODE,
      ELEMENT_MULTI,
      aglinList: [
        { type: 'top', name: '顶对齐' },
        { type: 'right', name: '右对齐' },
        { type: 'bottom', name: '底对齐' },
        { type: 'left', name: '左对齐' },
        { type: 'HCenter', name: '垂直居中' },
        { type: 'VCenter', name: '水平居中' }
      ],
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
          active: true
        },
        {
          name: '组件',
          id: 2,
          active: false
        }
      ],
      typetree: [
        {
          name: 'charts',
          title: '图表',
          active: true,
          id: '1',
          children: [
            {
              type: 'bar',
              title: '基础柱状图',
              version: 1,
              w:430,
              h:320,
              id: '1-1'
            },
            {
              type: 'horizontalbar',
              title: '横向柱状图',
              version: 1,
              w:430,
              h:320,
              id: '1-10'
            },
            {
              type: 'pie',
              title: '基础饼状图',
              version: 1,
              w:430,
              h:320,
              id: '1-2'
            },
            {
              type: 'line',
              title: '基础折线图',
              version: 1,
              w:430,
              h:320,
              id: '1-3'
            },
            {
              type: 'line2y',
              title: '双Y轴折线图',
              version: 1,
              w:430,
              h:320,
              id: '1-11'
            },
            {
              type: 'doughnut',
              title: '基础环图',
              version: 1,
              w:430,
              h:320,
              id: '1-4'
            },
            {
              type: 'linebar',
              title: '混合-线柱混搭',
              version: 1,
              w:430,
              h:320,
              id: '1-5'
            },
            {
              type: 'scatter',
              title: '基础散点图',
              w:430,
              h:320,
              version: 1,
              id: '1-6'
            },
            {
              type: 'funnel',
              title: '基础漏斗图',
              w:430,
              h:320,
              version: 1,
              id: '1-7'
            },
            // {
            //   type: 'characters',
            //   title: '基础字符云',
            //   version: 1,
            //   id: '1-8'
            // },
            {
              type: 'polar',
              title: '极坐标双数值轴',
              w:430,
              h:320,
              version: 1,
              id: '1-12'
            },
            {
              type: 'radar',
              title: '基础雷达图',
              w:430,
              h:320,
              version: 1,
              id: '1-9'
            }
          ]
        },
        // {
        //   name: 'table',
        //   title: '表格',
        //   active: false,
        //   id: '2',
        //   children: [
        //     {
        //       type: 'basetable',
        //       title: '基础表格',
        //       w:530,
        //       h:320,
        //       version: 1,
        //       id: '2-1'
        //     }
        //   ]
        // },
        // {
        //   name: 'media',
        //   title: '媒体',
        //   active: false,
        //   id: '3',
        //   children: [
        //     {
        //       type: 'vedio',
        //       title: '视频',
        //       version: 1,
        //       w:430,
        //       h:320,
        //       id: '3-1'
        //     },
        //     {
        //       type: 'image',
        //       title: '图片',
        //       w:430,
        //       h:320,
        //       version: 1,
        //       id: '3-2'
        //     }
        //   ]
        // },
        {
          name: 'text',
          title: '文本',
          active: false,
          id: '4',
          children: [
            {
              type: 'title',
              title: '标题',
              w:200,
              h:40,
              version: 1,
              text:'自定义标题',
              fontSize:20, //临时代码
              id: '4-1'
            },
            // {
            //   type: 'text',
            //   title: '文本',
            //   version: 1,
            //   id: '4-2'
            // }
          ]
        },
        // {
        //   name: 'relationship',
        //   title: '关系网络',
        //   active: false,
        //   id: '5',
        //   children: [
        //     {
        //       type: 'relationship',
        //       title: '关系网络',
        //       version: 1,
        //       id: '5-1'
        //     }
        //   ]
        // },
         {
          name: 'material',
          title: '素材',
          active: false,
          id: '6',
          children: [
            {
              type: 'decorate',
              title: '装饰',
              version: 1,
              id: '6-1'
            }
          ]
        },
        // {
        //   name: 'other',
        //   title: '其他',
        //   active: false,
        //   id: '7',
        //   children: [
        //     {
        //       type: 'time',
        //       title: '时间选择器',
        //       version: 1,
        //       id: '7-1'
        //     }
        //   ]
        // },
        // {
        //   name: 'UE',
        //   title: '交互',
        //   active: false,
        //   id: '8',
        //   children: [
        //     {
        //       type: 'slide',
        //       title: '轮播页面',
        //       version: 1,
        //       id: '8-1'
        //     }
        //   ]
        // }
      ]
    }
  },

  computed: {
    ...mapState('databoard',{
      mode:state => state.mode,
      databoard:state => state.databoard,
      editNode:state => state.editNode,
      editChart:state => state.editChart,
      editType:state => state.editType,

    }),
    ...mapGetters ('databoard',[
      'isEditing'
    ]),
    multiple(){
      if(this.$refs.stage){
        return this.$refs.stage.multiple
      }
    },
    maintit(){
      return this.databoard ? this.databoard.name : ''
    }
  },

  methods: {
    ...mapMutations('databoard',[
      'openEditMode',
      'setEditType',
      'setEditNode',
      'setEditChart',
      'setDBID'
    ]),
    ...mapActions('databoard',[
      'queryDataboard'
    ]),
    multipleNodesAlign(type) {
      this.$refs.stage.domCavase.multipleNodesAlign(type)
    },
    nodeAlign(type) {
      this.$refs.stage.domCavase.nodesAlign(type)
    },
    selectOneNode(nodes) {
      const length = nodes.length;
      if(length === 1){
        this.setEditType(ELEMENT_NODE)
        this.setEditNode(nodes[0])
        this.setEditChart(nodes[0].chart)
      }
    },
    selectNodes(nodes){
      const length = nodes.length;
      if( 2 <= length){
        this.setEditType(ELEMENT_MULTI)
      }
    },
    getEditType(){

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
    this.setDBID(id)
    this.openEditMode()
    this.queryDataboard()
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
      height: 100%;
      z-index: 999;
    }
  }
}
</style>