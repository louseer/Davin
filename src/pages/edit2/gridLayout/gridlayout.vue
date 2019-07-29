<!-- form Editor -->
<template>
  <div class='form-wrapper' ref='formWrapper'>
    <grid-layout
      :layout.sync="layout"
      :col-num="12"
      :row-height="30"
      :is-draggable="isEditing"
      :is-resizable="isEditing"
      :is-mirrored="false"
      :vertical-compact="true"
      :margin="[marginTB, marginLR]"
      :use-css-transforms="false"
      @layout-updated="layoutUpdatedEvent"
    >
      <grid-item v-for="(item,index) in layout"  class='griditem' :class="{'active-border':item.i === activeGrid}"
        :key = 'index'
        :x="item.x"
        :y="item.y"
        :w="item.w"
        :h="item.h"
        :i="item.i"
        @resize="resizeEvent"
        @move="moveEvent"
        @click.native="clickEvent(item.i)">
          <chart 
            v-if='item.chart && isMounted' 
            :config='item.chart'
          />
      </grid-item>
    </grid-layout>
  </div>
</template>

<script>
//import {组件名称} from '组件路径';
import VueGridLayout from 'vue-grid-layout'
import Chart from '../chart/chart.vue'
import { mapActions, mapState, mapMutations } from 'vuex'
import { EDIT_MODE } from "@/store/constants"

export default {
  components: {
    GridLayout: VueGridLayout.GridLayout,
    GridItem: VueGridLayout.GridItem,
    Chart
  },
  data() {
    return {
      isMounted:false,
      marginTB:15,
      marginLR:15
    };
  },
  computed: {
    ...mapState({
      'formID': state => state.form.formID,
      'form':state => state.form.form,
      'layout':state => state.form.layout,
      'mode':state => state.form.mode,
      'activeGrid':state => state.form.activeGrid
    }),
    isEditing () {
      return this.mode === EDIT_MODE;
    }
  },
  watch: {},
  methods: {
    // layoutCreatedEvent(newLayout){
    //   console.log("Created layout: ", newLayout)
    // },
    // layoutBeforeMountEvent(newLayout) {
    //   console.log("beforeMount layout: ", newLayout)
    // },
    // layoutMountedEvent(newLayout){
    //   console.log("Mounted layout: ", newLayout)
    // },
    // layoutReadyEvent(newLayout){
    //   console.log("Ready layout: ", newLayout)
    // },
    layoutUpdatedEvent(newLayout) {
      this.updateLayout(newLayout)
    },
    clickEvent(i) {
      i = i || '';
      this.setActiveGrid(i)
    },
    moveEvent(i, newX, newY) {
      this.setActiveGrid(i)
        console.log("MOVE i=" + i + ", X=" + newX + ", Y=" + newY);
    },
    resizeEvent(i, newH, newW, newHPx, newWPx) {
      this.setActiveGrid(i)
        console.log("RESIZE i=" + i + ", H=" + newH + ", W=" + newW + ", H(px)=" + newHPx + ", W(px)=" + newWPx);
    },
    movedEvent(i, newX, newY) {
        console.log("MOVED i=" + i + ", X=" + newX + ", Y=" + newY);
    },
    resizedEvent(i, newH, newW, newHPx, newWPx) {
        console.log("RESIZED i=" + i + ", H=" + newH + ", W=" + newW + ", H(px)=" + newHPx + ", W(px)=" + newWPx);
    },
    ...mapMutations([
      'setActiveGrid'
    ]),
    ...mapActions([
      'queryFormData',
      'updateLayout'
    ])
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {
    this.queryFormData()
  },
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {
   this.isMounted = true
  }
}
</script>
<style lang='less' scoped>
//@import url(); 引入公共css类
.form-wrapper{
  width:100%;
  height:100%;
  background-color: antiquewhite;
  .griditem{
    background-color: #fff;
  }
  .active-border {
    border:1px solid #6495ED;
  }
}

</style>