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
    >
      <div class="select-mask" v-if="rnode.active">
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
      </div>{{node.type === 'group' ? `Group index-${node.zindex}`: `Node index-${node.zindex}`}}
          <ul>
            <li>w:{{node.w}}</li>
            <li>h:{{node.h}}</li>
            <li>x:{{node.x}}</li>
            <li>y:{{node.y}}</li>
          </ul>     
    </div>
  </div>
</template>

<script>
export default {
  name: 'Node',
  props: {
    node: {
      type: Object,
      default: () => {}
    },
    

  },
  watch: {
    node:{
      handler:function (val) {       
        this.rnode=val
      },
      deep:true
    }
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
      this.candrage = true
      this.$emit('nodeMousedown', this.rnode)
    },
    nodeClick(e) {
      this.$emit('nodeClick', this.rnode)
    }
  }
}
</script>

<style lang="less" scoped>
.node-room {
  position: absolute;
  color: #616161;
  font: 30px/100%;
}
.node {
  position: absolute;
  background: #7d7d7d;
  border: 1px darkgray solid;
}
.group {
  position: absolute;
  //  background: rgba(255, 0, 0, 0.2);

  border: 1px #ffffff dashed;
}
.select-mask {
  width: 100%;
  height: 100%;
 cursor: move;
  background: rgba(77, 211, 248, 0.2);
  position: absolute;
  border: 1px #41acca dotted;
  i {
    width: 10px;
    height: 10px;
    border: 3px #4dd3f8 solid;
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