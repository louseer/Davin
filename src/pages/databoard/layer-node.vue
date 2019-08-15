<template>
  <div class="node-room">
    <div
      @mousedown.stop="nodeMousedown($event) "
      :draggable="candrage"
      @dragover="dragover"
      @dragstart="dragStart($event)"
      :class="rnode.type === 'element' ? 'node' : 'group'"
      :id="rnode.id"
      :style="style"
      @drag.stop="nodeDrag($event)"
      @click.stop="nodeClick($event)"
      @drop.stop="nodeDrop"
      @dragenter="dragenter"
      v-show='!rnode.hide'
    >
      <div class="select-mask" v-if="rnode.active && !rnode.disable">
        <i
          v-for="(p,pindex) in Control"
          :class="p.name"
           @click.stop
          draggable
          @dragover.prevent
          @drop.prevent
          @dragend.prevent
          @mousedown="resizeMousedown"
          @drag.stop="resizeNode(p.event,$event)"
          :style="p.type==='circle'? ' border-radius: 50% 50%;':''"
        ></i>
      </div>
          <!-- <ul>
            {{node.type === 'group' ? `Group index-${node.zindex}`: `Node index-${node.zindex}`}}
            <li>w:{{node.w}}</li>
            <li>h:{{node.h}}</li>
            <li>x:{{node.x}}</li>
            <li>y:{{node.y}}</li>
            <li>id:{{node.id}}</li>
             <li>type:{{node.elType}}</li>
            <li>{{node.disable ? 'lock' :''}}</li>
          </ul>      -->
        <d-chart :config='node.chart' v-if='node.chart'/>
    </div>
  </div>
</template>

<script>
import DChart from 'pages/common/dynamicChart/dynamicChart.vue'
export default {
  name: 'Node',
  components:{
    DChart
  },
  props: {
    node: {
      type: Object,
      default: () => {}
    },
  },
  watch: {
    node:{
      handler:function (val) {       
        this.rnode=val;
        console.log(val)
      },
      deep:true
    },
  
  },
  data() {
    return {
      candrage: false,
      dx: 0,
      dy: 0,
      rnode: this.node,
      Control: [
        {
          name: 'lt',
          type: 'circle',
          event: 'lt'
        },
        {
          name: 'mt',
          type: 'rect',
          event: 'mt'
        },
        {
          name: 'rt',
          type: 'circle',
          event: 'rt'
        },
        {
          name: 'ml',
          type: 'rect',
          event: 'ml'
        },
        {
          name: 'mr',
          type: 'rect',
          event: 'mr'
        },
        {
          name: 'lb',
          type: 'circle',
          event: 'lb'
        },
        {
          name: 'mb',
          type: 'rect',
          event: 'mb'
        },
        {
          name: 'rb',
          type: 'circle',
          event: 'rb'
        }
      ]
    }
  },

  computed: {
    style() {
      return `z-index:${this.rnode.zindex};transform-origin:0 0;transform:translate(${this.rnode.x}px,${this.rnode.y}px);width:${this.rnode.w}px;height:${this.rnode.h}px`
    }
  },

  methods: {
    dragenter(e) {
      e.preventDefault()
    },
    dragover(e) {
      e.preventDefault()
    },
    dragStart(e) {
      e.target.style.opacity = '0'
      this.candrage = false
      var e = event || window.event
      e.dataTransfer.effectAllowed = 'move'
      this.$emit('nodeDragStart', e)
    },
    resizeMousedown(e) {
      this.candrage = false      
     this.$emit('nodeResizeMousedown', e, this.rnode)
    },
    resizeNode(type, e) {
      this.$emit('nodeResizeNode',type, e, this.rnode)
    },
    nodeDrop(e) {
      this.candrage = false
      this.$emit('nodeDrop', this.rnode)
    },
    nodeDrag(e) {
      e.target.style.opacity = '1'
      e.preventDefault()
      this.$emit('nodeDrag', e, this.node)
    },
    nodeMousedown(e) {
     this.rnode.disable? this.candrage = false :this.candrage=true
     !this.rnode.disable &&  this.$emit('nodeMousedown', this.rnode)
    },
    nodeClick(e) {
      this.$emit('nodeClick', this.rnode)
    }
  }
}
</script>

<style lang="less" scoped>
@import '../../assets/styles/base.less';
.node-room {
  position: absolute;
  color: #179f10;
  font: 30px/100%;
}
.node {
  position: absolute;
  
  
  cursor: pointer;
}
.group {
  position: absolute;
  //  background: rgba(255, 0, 0, 0.2);
  cursor: pointer;
  border: 1px #ffffff dashed;
}
.select-mask {
  width: 100%;
  height: 100%;
 cursor: move;
  background: @bg_Data_red20;
  position: absolute;
  z-index: 999;
  border: @border_Data_red50;
  i {
    width: 10px;
    height: 10px;
    border: @border_Data_redPoint;
    display: block;
    position: absolute;
  }
  .lt {
    left: -5px;
    top: -5px;
    cursor: nw-resize;
  }
  .mt {
    left: 50%;
    margin-left: -5px;
    top: -5px;
     cursor: n-resize;
  }
  .rt {
    right: -5px;
    top: -5px;
     cursor: ne-resize;
  }
  .ml {
    top: 50%;
    margin-top: -5px;

    left: -5px;
     cursor: w-resize;
  }
  .mr {
    top: 50%;
    margin-top: -5px;
    right: -5px;
     cursor: e-resize;
  }
  .lb {
    bottom: -5px;
    left: -5px;
     cursor: sw-resize;
  }
  .mb {
    left: 50%;
    margin-left: -5px;
    bottom: -5px;
     cursor: s-resize;
  }
  .rb {
    right: -5px;
    bottom: -5px;
     cursor: se-resize;
  }
}
</style>