<template>
  <div class="ruler-room">
     <div class="hidebutton"><Dbutton :btn="btn"  @click="hideline"></Dbutton></div>
    <ruler type="xRuler" @previewLine="previewLine" @addLine="addLine" :zoomSize="zoomSize" /> 
    <ruler type="yRuler" @previewLine="previewLine" @addLine="addLine" :zoomSize="zoomSize" />
  </div>
</template>

<script>
import ruler from './ruler.vue'
import Dbutton from '../../components/button.vue'
export default {
  components: {
    ruler,Dbutton
  },
  props: {
    zoomSize: {
      type: Number,
      default: 0.5
    }
  },
  data() {
    return {
      btn:{
          name: '隐藏',
          icon: 'icon-ico_db_visiable',
          event: this.hideline,
          type: 'icon'
        }
    }
  },
  methods: {
    addLine(pos, type) {
      this.$emit('addLine', pos, type)
    },
    previewLine(pos, type) {
      this.$emit('previewLine', pos, type)
    },
    hideline(){
      this.btn.icon === 'icon-ico_db_visiable' ? this.$set(this.btn,"icon",'icon-ico_db_eye') :this.$set(this.btn,"icon",'icon-ico_db_visiable')
      this.$emit('hideline')
    }
  }
}
</script>

<style lang="less" scoped>
.ruler-room{
  
  width: 100%;
  height: 100%;
}
.hidebutton{
  width: 0.2rem;
  height: 0.2rem;
  line-height: 0.2rem;
  color:#b7babe;
  font-size: 12px;
  
  z-index: 999999;
 position: absolute;
 cursor: pointer;
 background: url(~/images/btn_hideline.png)#383b3f no-repeat center center;
}
</style>