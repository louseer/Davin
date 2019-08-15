<template>
  <div class="slide_bar">
    <Dbutton class="btn" :btn="reduceBtn" />
    <div class="slide_bg" :style="`width:${w}px`">
      <i :style="ps" draggable @dragstart="dragstartHandler" @drag="dragHandler" @dragend="dragendHandler"  ></i>
    </div>
    <Dbutton class="btn" :btn="plusBtn" />
  </div>
   <!-- -->
</template>

<script>
import Dbutton from './button.vue'
import { debuglog } from 'util'
export default {
  components: {
    Dbutton
  },
  props: {
    max: {
      type: Number,
      default: 0
    },
    min: {
      type: Number,
      default: 0
    },
    value: {
      type: Number,
      default: 0
    },
    hasButton: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    blockValue() {
      return (this.max - this.min) / 10
    },
    ratio() {
      return (this.w-6) / (this.max - this.min)
    },
    ps() {
      return `left:${this.ratio * (this.value - this.min)}px`
    }
  },

  data() {
    return {
      plusBtn: {
        name: '增加',
        icon: 'icon-ico_db_plus',
        event: this.plus,
        type: 'icon'
      },
      reduceBtn: {
        name: '减少',
        icon: 'icon-ico_db_reduce',
        event: this.reduce,
        type: 'icon'
      },
      newValue: this.value,
      sx:0,
      ex:0,
    }
  },
  methods: {
    dragstartHandler(e){
      this.sx=e.clientX;    
    },
    dragendHandler(e){
 this.newValue += ((e.clientX-this.sx)/this.ratio)
      this.sx=e.clientX
       this.$emit('changHandler', this.newValue)
    },
    dragHandler(e){
      console.log('eeeee', e)
      this.newValue += ((e.clientX-this.sx)/this.ratio)
      this.sx=e.clientX
       this.$emit('changHandler', this.newValue)
    },
    plus() {
      this.value < this.max ? (this.newValue = this.blockValue + this.value) : (this.newValue = this.max)
      this.$emit('changHandler', this.newValue)
    },
    reduce() {
      this.value > this.min ? (this.newValue = this.value-this.blockValue) : (this.newValue =this.min)
      this.$emit('changHandler', this.newValue)
    }
  }
}
</script>

<style lang="less" scoped>
@import '../assets/styles/base.less';
.slide_bar {
  display: flex;
  flex-flow: row nowrap;
  line-height: 0.3rem;
  color: @icon_DataC_sub;
  justify-content: flex-start;
  align-items: center;

  .slide_bg {
    width: 0.6rem;
    background: @bg_Data_darkst;
    height: 0.06rem;
    position: relative;
    margin: 0 0.1rem;
    i {
      display: block;
      width: 6px;
      height: 6px;
      background: @icon_DataC_red;
      position: absolute;
      cursor: pointer;
      top: 0;
      left: 0;
    }
  }
}
.btn {
  line-height: 0.3rem;
  font-size: 0.16rem;
  &:hover {
    color: @icon_DataC_main;
  }
}
</style>