<template>
  <div class="ruler-room">
    <div class="hidebutton">
      <Dbutton :btn="btn" @click="hideline"></Dbutton>
    </div>
    <ruler
      :h="h"
      :w="w"
      type="xRuler"
      @previewLine="previewLine"
      @addLine="addLine"
      :offSetx="offSetx"
      :offSety="offSety"
      :zoomSize="zoomSize"
    />
    <ruler
      :h="h"
      :w="w"
      type="yRuler"
      @previewLine="previewLine"
      @addLine="addLine"
      :offSetx="offSetx"
      :offSety="offSety"
      :zoomSize="zoomSize"
    />
  </div>
</template>

<script>
import ruler from './ruler.vue'
import Dbutton from '../../components/button.vue'
export default {
  components: {
    ruler,
    Dbutton
  },
  props: {
    zoomSize: {
      type: Number,
      default: 0.5
    },
    offSetx: {
      type: Number,
      default: 50
    },
    offSety: {
      type: Number,
      default: 50
    }
  },
  data() {
    return {
      btn: {
        name: '隐藏',
        icon: 'icon-ico_db_visiable',
        event: this.hideline,
        type: 'icon'
      }
    }
  },
  methods: {
    addLine(pos, type) {
      this.$emit('addLine', pos, type)
    },
    previewLine(pos, type) {
      this.$emit('previewLine', pos, type)
    },
    hideline() {
      this.btn.icon === 'icon-ico_db_visiable'
        ? this.$set(this.btn, 'icon', 'icon-ico_db_eye')
        : this.$set(this.btn, 'icon', 'icon-ico_db_visiable')
      this.$emit('hideline')
    }
  }
}
</script>

<style lang="less" scoped>
.ruler-room {
  position: absolute;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 999;
}
.hidebutton {
  width: 0.2rem;
  height: 0.2rem;
  line-height: 0.2rem;
  color: #b7babe;
  font-size: 12px;
  pointer-events: auto;
  z-index: 9999;
  position: absolute;
  cursor: pointer;
  background: url(~/images/btn_hideline.png) #383b3f no-repeat center center;
}
</style>