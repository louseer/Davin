<template>
  <div>
    <div v-if="previewLine" class="previewLine" :style="pstyle"></div>
    <div @mouseup.prevent @mouseover.prevent v-for="(line,index) in lineList" :key="index" class="guideline" :style="lstyle(line)">
      <div class="block" @dblclick="removeLine(line)">{{line.pos}}</div>
    </div>
  </div>
</template>

<script>
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
  data() {
    return {
      theline: this.previewLine
    }
  },
  watch: {
    lineList: {
      handler: function(val) {
        console.log('#$E%IOEFJPDOJKF', val)
      },
      deep: true
    }
  },
  computed: {
    pstyle() {
      return this.previewLine.type === 'xline'
        ? `top:${this.previewLine.pos * this.zoomSize +
            this.offSet}px;left:0;width:100%;height:0px; `
        : `left:${this.previewLine.pos * this.zoomSize +
            this.offSet}px;top:0;height:100%;width:0px;`
    },
    lstyle() {
      return function(line) {
        return line.type === 'xline'
          ? `top:${line.pos * this.zoomSize +
              this.offSet}px;left:0;width:100%;height:0px;`
          : `left:${line.pos * this.zoomSize +
              this.offSet}px;top:0;height:100%;width:0px;`
      }
    }
  },
  methods: {
    removeLine(line) {
      this.$emit('removeLine', line.id)
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

  border-left: @border_Data_line;
  border-top: @border_Data_line;

  z-index: 999999;
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
}
</style>