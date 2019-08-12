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
                <Dbutton :btn="bbtn" />
              </b>
            </div>
            <Dtree :data="treenode" :renderContent="renderContent" style="margin-top:0.1rem" />
          </div>
          <div slot="tab2">组件的组件</div>
        </Dtab>
        <LeftBottom :leftBottomtools="leftBottomtools"></LeftBottom>
      </div>
      <div class="rightbar">
        <Stage @nodelistChange="nodechange" ref="stage"></Stage>
      </div>
    </div>
  </div>
</template>

<script>
import Dswitch from '../../components/switch.vue'
import Dbutton from '../../components/button.vue'
import Dtree from '../../components/edit-tree.vue'
import Dtab from '../../components/tabmenu.vue'
import Stage from './index.vue'
import Eheader from './edit-header.vue'
import LeftBottom from './leftbottom.vue'
import { nodeListToTree, ordlistToTree } from '../../utils/format'
import thumbnail from '../../components/thumbnail.vue'

export default {
  components: {
    Eheader,
    Stage,
    Dbutton,
    Dtab,
    Dswitch,
    LeftBottom,
    Dtree,
    thumbnail
  },
  data() {
    return {
      maintit: '春风隧道(V1.0)',
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
      let nodetree = [...val].map(n =>
        Object.assign(n, { label: `${n.type}-${n.zindex}` })
      )
      this.treenode = nodeListToTree(nodetree)
      // console.log('画布变化', nodeListToTree(nodetree))
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
    },
    renderContent(h, { node, data, store }) {
      console.log('tag', node)
      if (data.type === 'element') {
        return h(
          'span',
          {
            style: {
              display: 'inline-block',
              width: '100%',
              height: '100%',
              position: 'relative'
            },
            on:{
              click:()=>{
               this.$refs.stage.choiceNodeById(data.id)
              }
            }
            
          },
          [
            h('thumbnail', {
              props: {
                nodeEltype: data.elType
              },
              style: {
                margin: '0.06rem 0.1rem',
                float: 'left'
              }
            }),
            h(
              'span',
              {
                style: {
                  float: 'left',
                  color: data.active ? '#f60606' : '',
                  fontSize: '0.12rem',
                  lineHeight: '0.36rem',
                  width: '50%',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap'
                }
              },

              data.name
            ),
            h(
              'div',
              {
                style: {
                  position: 'absolute',
                  right: '0',
                  width: '0.5rem',

                  height: '0.36rem',
                  color: data.active ? '#f60606' : '',
                  fontSize: '0.12rem',
                  lineHeight: '0.36rem'
                }
              },
              [
                h('i', {
                  class: data.hide ? ['iconfont', 'icon-ico_db_visiable'] : [],
                  style: {
                    float: 'left',
                    fontSize: '0.16rem',
                    lineHeight: '0.36rem',
                    background: '#313438'
                  },
                   on: {
                    click: () => {
                      console.log('中华显影王', '')
                      this.$refs.stage.unhideNode(data.id)
                    }
                  }
                }),
                h('i', {
                  class: data.disable ? ['iconfont', 'icon-ico_db_lock'] : [],
                  style: {
                    float: 'left',
                    fontSize: '0.16rem',
                    lineHeight: '0.36rem',
                    background: '#313438'
                  },
                  on: {
                    click: () => {
                      console.log('中华解锁王', '')
                      this.$refs.stage.unlockNode(data.id)
                    }
                  }
                })
              ]
            )
          ]
        )
      }

      if (data.type === 'group') {
        return h(
          'div',
          {
            style: {
              overflow: 'hidden',
              float: 'left'
            },
             on:{
              click:()=>{
               this.$refs.stage.choiceNodeById(data.id)
              }
            }
          },

          [
            h('i', {
              class: node.expanded
                ? ['icon-ico_db_laytreef_open ', 'iconfont']
                : ['icon-ico_db_laytreef_close ', 'iconfont'],
              style: {
                display: 'inline-block',
                float: 'left',
                margin: '0.08rem',
                fontSize: '0.2rem',
                color: '#d4e1ee'
              }
            }),
            h(
              'span',
              {
                style: {
                  display: 'inline-block',
                  float: 'left',

                  fontSize: '0.12rem',
                  lineHeight: '0.36rem',
                  color: data.active ? '#f60606' : '#d4e1ee'
                }
              },
              data.name
            ),
            h(
              'div',
              {
                style: {
                  position: 'absolute',
                  right: '0',
                  width: '0.5rem',

                  height: '0.36rem',
                  color: data.active ? '#f60606' : '',
                  fontSize: '0.12rem',
                  lineHeight: '0.36rem'
                }
              },
              [
                h('i', {
                  class: data.hide ? ['iconfont', 'icon-ico_db_visiable'] : [],
                  style: {
                    float: 'left',
                    fontSize: '0.16rem',
                    lineHeight: '0.36rem',
                    background: '#313438'
                  },
                  on: {
                    click: () => {
                      console.log('中华显影王', '')
                      this.$refs.stage.unhideNode(data.id)
                    }
                  }
                }),
                h('i', {
                  class: data.disable ? ['iconfont', 'icon-ico_db_lock'] : [],
                  style: {
                    float: 'left',
                    fontSize: '0.16rem',
                    lineHeight: '0.36rem',
                    background: '#313438'
                  },
                  on: {
                    click: () => {
                      console.log('中华解锁王', '')
                      this.$refs.stage.unlockNode(data.id)
                    }
                  }
                })
              ]
            )
          ]
        )
      }
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
      position: relative;
      overflow: hidden;

      .laysetbar {
        height: 0.3rem;
        background: @bg_Data_left;
        border-bottom: @border_Data_main;
        border-top: @border_Data_main;
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
      width: 2rem;
      background: @bg_Data_left;
      right: 0;
      height: 100%;
      z-index: 999999;
    }
  }
}
</style>