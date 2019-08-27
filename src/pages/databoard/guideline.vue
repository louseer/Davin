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
      @dblclick="removeLine(line)"
      @dragstart.stop="linedragstart($event,line)"
      @drag.stop="linedrag($event,line)"
      @dragend.stop="linedrag($event,line)"
      @mousedown.stop="canDrag"
    >
      <div class="block">{{parseInt(line.pos)}}</div>
    </div>
  </div>
</template>

<script>
import { debuglog } from 'util'
export default {
  props: {
    offSetx: {
      type: Number,
      default: 50
    },
    offSety: {
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
            this.offSety}px;left:0.2rem;width:100%;height:0px; `
        : `left:${this.previewLine.pos * this.zoomSize +
            this.offSetx}px;top:0.2rem;height:100%;width:0px;`
    },

    lstyle() {
      return function(line) {
        return line.type === 'xline'
          ? `top:${line.pos * this.zoomSize +
              this
                .offSety}px;left:0.2rem; cursor: n-resize;width:100%;height:0px;`
          : `left:${line.pos * this.zoomSize +
              this.offSetx}px;top:0.2rem;height:100%;width:0px;cursor: w-resize`
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

      if (line.type === 'xline') {
        if (line.pos + _y < (-this.offSety + 20) / this.zoomSize) {
          this.removeLine(line)
          this.dragble = false
          return
        }
        this.$emit('moveline', line.id, line.pos + _y)
      } else {
        if (line.pos + _x < (-this.offSetx + 20) / this.zoomSize) {
          this.removeLine(line)
          this.dragble = false
          return
        }
        this.$emit('moveline', line.id, line.pos + _x)
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
  z-index: 997;
}
.guideline {
  position: absolute;
  pointer-events: auto;
  border-left: @border_Data_line;
  border-top: @border_Data_line;
  z-index: 997;
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