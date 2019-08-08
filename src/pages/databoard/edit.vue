<!-- dashboard编辑页 -->
<template>
  <div class="edit-page">
    <Eheader :maintit="maintit" :toptools="toptools" />
    <div class="content">
      <div class="setbar"></div>
      <div class="leftbar">
        <!-- tab Slot1 && Slot2 -->
        <div class="tabbar">
          <div class="tabtop">
            <div class="tabbtn">
              <b></b>
              <b></b>
            </div>
            <!-- switch  -->
            <div class="switch_btn">
              <i></i>
            </div>
            <!-- switch end  -->
          </div>

          <div class="tabcontent">
            <slot></slot>
          </div>
          <!-- tab end -->
        </div>
        <div class="leftbottombar">
          <b v-for="(bbtn,bbindex) in  leftBottomtools" :key="bbindex">
            <Dbutton :btn="bbtn" />
          </b>
        </div>
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
import Dbutton from '../../components/button.vue'
import Stage from './index.vue'
import Eheader from './edit-header.vue'

export default {
  components: { Eheader, Stage, Dbutton },
  data() {
    return {
      maintit: '春风隧道(V1.0)',
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
      ]
    }
  },
  computed: {},
  watch: {},
  methods: {
    nodechange(val) {
      console.log('画布变化', val)
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
    background: teal;
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-between;
    position: relative;
    .leftbar {
      width: 2rem;
      background: @bg_Data_left;
      border-right: @border_Data_sub;
      .tabbar {
        width: 100%;
        background: yellowgreen;
        height: calc(100% - 0.3rem);
        display: flex;
        flex-flow: column nowrap;
        .tabtop {
          display: flex;
          flex-flow: row nowrap;
          .tabbtn {
            width: calc(100% - 0.08rem);
            height: 0.36rem;
            display: flex;
            flex-flow: row nowrap;
            justify-content: space-between;
            b {
              display: block;
              width: 50%;
              height: 100%;
              background: #272a2e;
              border-left: @border_Data_main;
              cursor: pointer;
              :last-child {
                border-left: 0;
              }
            }
          }
          .switch_btn {
            width: 0.08rem;
            float: right;
            background: @icon_DataC_dark;
            height: 0.36rem;
            position: relative;
            i {
              width: 100%;
              height: 0.08rem;
              position: absolute;
              background: @icon_DataC_red;
              cursor: pointer;
            }
          }
        }
        .tabcontent {
          background: teal;
          height: calc(100% - 0.36rem);
          width: 100%;
        }
      }
      .leftbottombar {
        height: 0.3rem;
        background: @bg_Data_leftbottom;
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