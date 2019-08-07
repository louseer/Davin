<!-- form Editor -->
<template>
  <div class='form-wrapper' ref='formWrapper'>
    <grid-layout
      :layout.sync="layout"
      :col-num="12"
      :row-height="30"
      :is-draggable="editing"
      :is-resizable="editing"
      :is-mirrored="false"
      :vertical-compact="true"
      :margin="[marginTB, marginLR]"
      :use-css-transforms="false"
      @layout-updated="layoutUpdatedEvent"
      @click.native="clickGridLayout()">
      <grid-item v-for="(item,index) in layout"  class='griditem' :class="{'active-border':item.i === activeGridID}"
        :key = 'index'
        :x="item.x"
        :y="item.y"
        :w="item.w"
        :h="item.h"
        :i="item.i"
        @resize="resizeEvent"
        @move="moveEvent"
        @click.native="clickGridItem(item, $event)">
          <d-chart 
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
import DChart from 'pages/common/dynamicChart/dynamicChart.vue'
import { EDIT_MODE } from "@/store/constants"
import { mapState, mapActions, mapMutations,mapGetter } from 'vuex'

export default {
  components: {
    GridLayout: VueGridLayout.GridLayout,
    GridItem: VueGridLayout.GridItem,
    DChart
  },
  props:{
    layout:{
      tpye:Object,
      default:null
    },
    editing: {
      type:Boolean,
      default:false
    }
  },
  data() {
    return {
      isMounted:false,
      marginTB:15,
      marginLR:15,
      activeGridID: ''
    };
  },
  computed: {

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
    clickGridLayout(event){
      if(!this.editing){
        return;
      }
      this.activeGridID =  "";
      this.cancelActiveGrid();
    },

    clickGridItem(item,event) {
      if(!this.editing){
        return;
      }
      event = event || window.event;
      if (event && event.stopPropagation) {
          event.stopPropagation();
      } else {
          event.cancelBubble = true;
      }
      this.activeGridID = item.i
      this.setActiveGrid(item)
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
    ...mapMutations('form',[
      'setActiveGrid',
      'cancelActiveGrid'
    ]),
    ...mapActions('form',[
      'updateLayout'
    ])
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {
    
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