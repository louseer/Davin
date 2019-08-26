<template>
  <div>
    <div v-if="previewLine" class="previewLine" :style="pstyle">
      <div class="block">{{previewLine.pos}}</div>
    </div>
    <div
      v-for="(line,index) in lineList"
      :key="line.id"
      class="guideline"
      :draggable="dragble"
      :style="lstyle(line)"
      @dragstart.stop="linedragstart($event,line)"
      @drag.stop="linedrag($event,line)"
      @dragend.stop="linedrag($event,line)"
      @mousedown.stop="canDrag"
    >
      <div
        class="block"       
        :style="bstyle"
      >{{parseInt(line.pos)}}</div>
    </div>
  </div>
</template>

<script>
import { debuglog } from 'util'
export default {
  props: {
    offSet: {
      type: Number,
      default: 50
    },
    lineList: {
      type: Array,
      default: () => []
    },
    previewLine: {
      type: Object,
      default: () => {}
    },
    zoomSize: {
      type: Number,
      default: 0.5
    }
  },
  // watch: {
  //   lineList(newValue, oldValue) {
  //     console.log(newValue.map(l=>l.id))
  //   }
  // },
  data() {
    return {
      theline: this.previewLine,
      startX: 0,
      startY: 0,
      theList: this.lineList,
      dragble: false
    }
  },

  computed: {
    pstyle() {
      return this.previewLine.type === 'xline'
        ? `top:${this.previewLine.pos * this.zoomSize +
            this.offSet}px;left:0.2rem;width:100%;height:0px; `
        : `left:${this.previewLine.pos * this.zoomSize +
            this.offSet}px;top:0.2rem;height:100%;width:0px;`
    },
    bstyle() {},
    lstyle() {
      return function(line) {
        return line.type === 'xline'
          ? `top:${line.pos * this.zoomSize +
              this.offSet}px;left:0.2rem;width:100%;height:0px;`
          : `left:${line.pos * this.zoomSize +
              this.offSet}px;top:0.2rem;height:100%;width:0px;`
      }
    }
  },
  methods: {
    canDrag() {
      this.dragble = true
    },
    removeLine(line) {
      this.$emit('removeLine', line.id)
    },
    linedragstart(e, line) {
   
      const event = e || window.event
      this.startX = event.clientX
      this.startY = event.clientY
    },
    linedrag(e, line) {
      console.log(line.id)
      if (e.clientX === 0) return
      const event = e || window.event
      const _x = (event.clientX - this.startX) / this.zoomSize
      const _y = (event.clientY - this.startY) / this.zoomSize
      if (line.pos + _y < (-this.offSet + 20) / this.zoomSize) {
        this.removeLine(line)
        this.dragble = false
        return
      } else {
        if (line.type === 'xline') {
          this.$emit('moveline', line.id, line.pos + _y)
        } else {
          this.$emit('moveline', line.id, line.pos + _x)
        }
      }

      this.startX = event.clientX
      this.startY = event.clientY
    }
  }
}
</script>

<style lang="less" scoped>
@import '../../assets/styles/base.less';
.previewLine {
  position: absolute;

  border-left: @border_Data_dottedline;
  border-top: @border_Data_dottedline;
  z-index: 999999;
}
.guideline {
  position: absolute;
  cursor: w-resize;
  border-left: @border_Data_line;
  border-top: @border_Data_line;
  z-index: 999999;
}
.block {
  position: absolute;
  display: block;
  padding: 0 0.05rem;
  border: @border_Data_line;
  height: 0.2rem;
  background: @bg_Data_red20;
  color: #ffffff;
  font: @Font_en12;
  line-height: 0.2rem;
  box-sizing: border-box;
  border-left: 0;
  border-top: 0;
  cursor: pointer;
}
</style>