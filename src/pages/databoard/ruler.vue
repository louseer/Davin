<template>
  <canvas
    class="ruler_room"
    ref="ruler"
    @mouseover.stop="rulerOn($event)"
    @mousemove.stop="rulerOn($event)"
    @mouseleave.stop="rulerLeave"
    @mousedown="addline"
  ></canvas>
</template>

<script>
export default {
  props: {
    type: {
      type: String,
      default: 'Ruler'
    },
    offSetx: {
      type: Number,
      default: 50
    },
    offSety: {
      type: Number,
      default: 50
    },
    zoomSize: {
      type: Number,
      default: 0.5
    }
  },
  computed: {
    typeStyle() {
      return this.type === 'xRuler'
        ? `width:100%; height:20px`
        : `height:100%; width:20px`
    }
  },
  watch: {
    w(val) {
      this.drawRuler()
    },
    h(val) {
      this.drawRuler()
    },
    zoomSize: {
      handler(val) {
        this.drawRuler()
      }
    },
    deep: true
  },
  mounted() {
    this.drawRuler()
  },
  methods: {
    addline(e) {
      this.clearEventBubble(e)
      const event = e || window.event
      const theX = parseInt(
        (event.clientX -
          this.GetPosition(this.$refs.ruler).left -
          this.offSetx) /
          this.zoomSize
      )
      const theY = parseInt(
        (event.clientY -
          this.GetPosition(this.$refs.ruler).top -
          this.offSety) /
          this.zoomSize
      )
      if (this.type === 'xRuler') {
        this.$emit('addLine', theX, this.type)
      } else {
        this.$emit('addLine', theY, this.type)
      }
    },
    rulerLeave() {
      this.$emit('previewLine', false, null)
    },
    rulerOn(e) {
      this.clearEventBubble(e)
      const event = e || window.event
      const theX = parseInt(
        (event.clientX -
          this.GetPosition(this.$refs.ruler).left -
          this.offSetx) /
          this.zoomSize
      )
      const theY = parseInt(
        (event.clientY -
          this.GetPosition(this.$refs.ruler).top -
          this.offSety) /
          this.zoomSize
      )
      if (this.type === 'xRuler') {
        this.$emit('previewLine', theX, this.type)
      } else {
        this.$emit('previewLine', theY, this.type)
      }
    },
    GetPosition(obj) {
      let left = 0
      let top = 0
      while (obj.offsetParent) {
        left += obj.offsetLeft
        top += obj.offsetTop
        obj = obj.offsetParent
      }
      return { left, top }
    },
    clearEventBubble(e) {
      if (e.stopPropagation) e.stopPropagation()
      else e.cancelBubble = true
      if (e.preventDefault) e.preventDefault()
      else e.returnValue = false
    },
    drawRuler() {
      const canvas = this.$refs.ruler
      if (this.type === 'xRuler') {
        canvas.width = this.$parent.$el.clientWidth
        canvas.height = 20
      } else {
        canvas.width = 20
        canvas.height = this.$parent.$el.clientHeight
      }

      const ctx = canvas.getContext('2d')
      this.drawBg(ctx)
      this.drawline(ctx)
      canvas.onmousemove = e => {
        this.drawPosition(e)
      }
    },
    drawPosition(e, ctx) {
      const x = e.clientX
    },
    drawBg(ctx) {
      ctx.fillStyle = '#44474b'
      if (this.type === 'xRuler') {
        ctx.fillRect(20, 0, this.$parent.$el.clientWidth, 20)
      } else {
        ctx.fillRect(0, 20, 20, this.$parent.$el.clientHeight)
      }
    },
    drawline(ctx) {
      let blocksx =
        (this.$parent.$el.clientWidth - this.offSetx) / this.zoomSize

      let blocksy =
        (this.$parent.$el.clientHeight - this.offSety) / this.zoomSize
      let zBetween = 5

      if (this.type === 'xRuler') {
        for (let i = -Math.abs(this.offSetx); i < blocksx; i++) {
          ctx.fillStyle = '#63666a'
          ctx.fillRect(i * zBetween + this.offSetx, 16, 1, 4)
          //  ctx.fillRect(16, i * zBetween + this.offSet, 4, 1)
          if (i % 10 === 0) {
            ctx.fillStyle = '#63666a'
            ctx.fillRect(i * zBetween + this.offSetx, 2, 1, 18)
            // ctx.fillRect(2, i * zBetween + this.offSet, 18, 1)
            ctx.fillStyle = '#b7babe'
            ctx.font = ' 12px Arial'
            ctx.fillText(
              `${parseInt((i * zBetween) / this.zoomSize)}`,
              parseInt(i * zBetween + this.offSetx + 2),
              14
            )
          }
        }
      } else {
        for (let i = -Math.abs(this.offSety); i < blocksy; i++) {
          ctx.fillStyle = '#63666a'
          ctx.fillRect(16, i * zBetween + this.offSety, 4, 1)

          if (i % 10 === 0) {
            ctx.fillStyle = '#63666a'
            ctx.fillRect(2, i * zBetween + this.offSety, 18, 1)
            ctx.fillStyle = '#b7babe'
            ctx.font = ' 12px Arial'
            ctx.fillText(
              `${parseInt((i * zBetween) / this.zoomSize)}`,
              0,
              parseInt(i * zBetween + this.offSety + 18)
            )
          }
        }
      }
    }
  }
}
</script>

<style lang="less" scoped>
.ruler_room {
  position: absolute;
  top: 0;
  pointer-events: auto;
}
</style>