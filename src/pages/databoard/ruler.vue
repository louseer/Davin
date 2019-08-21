<template>
  <canvas class="ruler_room" ref="ruler"></canvas>
</template>

<script>
export default {
  props: {
    // rW: {
    //   type: Number,
    //   default: 1920
    // },
    // rH: {
    //   type: Number,
    //   default: 1080
    // },
    offSet: {
      type: Number,
      default: 50
    },
    zoomSize: {
      type: Number,
      default: 0.5
    }
  },
  computed: {
    cW() {
      return this.$parent.$el.clientWidth
    },
    cH() {
      return this.$parent.$el.clientHeight
    }
  },
  watch: {
    zoomSize: {
      handler(val) {
        this.drawRuler()
      }
    },
    deep: true
  },
  mounted() {
    this.drawRuler()
    this.$nextTick(() => {
      window.onresize = () => {
        this.drawRuler()
      }
    })
  },
  methods: {
    drawRuler() {
      const canvas = this.$refs.ruler
      console.log('tag', this.$parent)
      canvas.width = this.$parent.$el.clientWidth
      canvas.height = this.$parent.$el.clientHeight
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
      ctx.fillRect(20, 0, this.cW, 20)
     // ctx.fillRect(0, 0, 20, this.cH)
      ctx.fillStyle = '#383b3f'
     // ctx.fillRect(0, 0, 20, 20)
    },
    drawline(ctx) {
      // let blocks = this.cW > this.cH ? ((this.cW /this.zoomSize)-this.offSet) : ((this.cH /this.zoomSize)-this.offSet)
      let blocks =
        this.cW > this.cH
          ? (this.cW - this.offSet) / this.zoomSize
          : (this.cH - this.offSet) / this.zoomSize
      let zBetween = 5

      console.log('tag', zBetween)
      for (let i = 0; i < blocks; i++) {
        ctx.fillStyle = '#63666a'
        ctx.fillRect(i * zBetween + this.offSet, 16, 1, 4)
      //  ctx.fillRect(16, i * zBetween + this.offSet, 4, 1)
        if (i % 10 === 0) {
          ctx.fillStyle = '#63666a'
          ctx.fillRect(i * zBetween + this.offSet, 2, 1, 18)
         // ctx.fillRect(2, i * zBetween + this.offSet, 18, 1)
          ctx.fillStyle = '#b7babe'
          ctx.font = ' 12px Arial'
          ctx.fillText(
            `${parseInt((i * zBetween) / this.zoomSize)}`,
            parseInt(i * zBetween + this.offSet + 2),
            14
          )
        //   ctx.translate(20, 0)
        //  // ctx.scale(-1, 1)
        //   ctx.rotate((-270 * Math.PI) / 180)

        //   ctx.fillText(
        //     `${parseInt((i * zBetween) / this.zoomSize)}`,
        //     parseInt(i * zBetween + this.offSet + 2),
        //     14, 
        //   )

        //   ctx.setTransform(1, 0, 0, 1, 0, 0)
        }
      }
    }
  }
}
</script>

<style lang="less" scoped>
.ruler_room {
  width: 100%;
  height: 100%;
}
</style>