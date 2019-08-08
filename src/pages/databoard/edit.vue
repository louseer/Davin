<!-- dashboard编辑页 -->
<template>
  <div class="edit-page">
    <Eheader :maintit="maintit" :toptools="toptools" />
    <div class="content">
      <div class="setbar"></div>
      <div class="leftbar"></div>
      <div class="rightbar">
        <Stage></Stage>
      </div>
    </div>
  </div>
</template>

<script>
// import Domcanvas from './domcanvas/domcanvas.vue'
// import Layer from './layer/layer.vue'
// import Editor from './editor/editor.vue'
import Stage from './index.vue'
import Eheader from './edit-header.vue'

export default {
  components: { Eheader, Stage },
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
      ]
    }
  },
  computed: {},
  watch: {},
  methods: {
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
      background: darkcyan;
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
      background: yellowgreen;
      right: 0;
      height: 100%;
      z-index: 999999;
    }
  }
}
</style>