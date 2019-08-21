<template>
  <div>
    <div v-if="previewLine" class="previewLine" :style="pstyle"></div>
    <div v-for="(line,index) in lineList" :key="index" class="previewLine" :style="lstyle(line)"></div>
  </div>
</template>

<script>
export default {
  props: {
    offSet: {
      type: Number,
      default: 0.5
    },
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
        ? `top:${this.previewLine.pos + this.offSet}px;left:0`
        : `left:${this.previewLine.pos + this.offSet}px;top:0`
    },
    lstyle() {
      return function(obj) {
        return obj.type === 'xline'
          ? `top:${obj.pos + this.offSet}px;left:0`
          : `left:${obj.pos + this.offSet}px;top:0`
      }
    }
  }
}
</script>

<style lang="less" scoped>
.previewLine {
  position: absolute;
  height: 100%;
  width: 0px;
  border-left: 1px yellowgreen dotted;

  left: 300px;
  z-index: 999999;
}
</style>