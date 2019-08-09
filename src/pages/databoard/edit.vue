<!-- dashboard编辑页 -->
<template>
  <div class="edit-page">
    <Eheader :maintit="maintit" :toptools="toptools" />
    <div class="content">
      <div class="setbar"></div>
      <div class="leftbar">
        <Dtab :tabs="leftTab">
          <Dswitch slot="tabsloat" :state="showMmore" @switchChange="switchChange" />

          <div slot="tab1">
            <div class="laysetbar">
              <b v-for="(bbtn,bbindex) in  laysets" :key="bbindex">
                <Dbutton :btn="bbtn"  />
              </b>
              <el-tree :data='treenode'/>
            </div>
          </div>
          <div slot="tab2">组件的组件</div>
        </Dtab>
        <LeftBottom :leftBottomtools="leftBottomtools"></LeftBottom>
      </div>
      <div class="rightbar">
        <Stage @nodechange="nodechange" ref="stage"></Stage>
      </div>
    </div>
  </div>
</template>

<script>
// import Domcanvas from './domcanvas/domcanvas.vue'
// import Layer from './layer/layer.vue'
// import Editor from './editor/editor.vue'
import Dswitch from '../../components/switch.vue'
import Dbutton from '../../components/button.vue'
import Dtab from '../../components/tabmenu.vue'
import Stage from './index.vue'
import Eheader from './edit-header.vue'
import LeftBottom from './leftbottom.vue'
import { nodeListToTree } from '../../utils/format'


export default {
  components: { Eheader, Stage, Dbutton, Dtab, Dswitch, LeftBottom },
  data() {
    return {
      maintit: '春风隧道(V1.0)',
      showMmore: true,
      treenode:'',
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
          event: this.toGroup,
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
      ]
    }
  },
  computed: {},
  watch: {},
  methods: {
    layUp() {
      console.log('上一层')
      this.$refs.stage.upLayer()
    },
    layDown() {
      console.log('下一层。。。方法未写')
      this.$refs.stage.deleteNode()
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
      this.showMmore = val
      console.log('开关', val)
    },
    nodechange(val) {
      let nodetree = [...val.nodeList]
      this.treenode=nodeListToTree(nodetree)
      console.log('画布变化', nodeListToTree(nodetree))
    },
    hide() {
      console.log('隐藏图层')
    },
    lock() {
      console.log('锁定图层')
    },
    layDelete() {
      console.log('删除图层')
      this.$refs.stage.deleteNode()
    },
    toGroup() {
      console.log('编组')
      this.$refs.stage.toGroup()
    },
    public() {
      console.log('发布')
    },
    view() {
      console.log('预览')
    },
    save() {
      console.log('保存')
    },
    quit() {
      console.log('退出')
    }
  }
}
</script>
<style lang='less' scoped>
@import '../../assets/styles/base.less';

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
      border-right: @border_Data_sub;

      .laysetbar {
        height: 0.3rem;
        background: @bg_Data_left;
        border-bottom: @border_Data_main;
        border-top: @border_Data_main;
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
      width: 2rem;
      background: @bg_Data_left;
      right: 0;
      height: 100%;
      z-index: 999999;
    }
  }
}
</style>