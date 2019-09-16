<!-- node config form -->
<template>
  <div class='node-config-form'>
    <DForm type='node' :setting='setting' @update='updateNode' key='node'/>
  </div>
</template>

<script>
//import {组件名称} from '组件路径';
import DForm from 'pages/common/dynamicForm/dynamicForm.vue'
export default {
  props:{
    id:String,
    name:String,
    x:Number,
    y:Number,
    w:Number,
    h:Number
  },
  components: {
    DForm
  },
  data() {
    return {
    
    };
  },
  computed: {
    setting() {
      return {
        name:this.name,
        size:[this.w,this.h],
        location:[this.x,this.y]
      }
    }
  },
  watch: {},
  methods: {
    updateNode(setting){
      let obj={
        id:this.id,
        name:setting.name,
        w:setting.size[0],
        h:setting.size[1],
        x:setting.location[0],
        y:setting.location[1],
      }
      this.$emit('update',obj)
    }
  }
}
</script>
<style lang='less' scoped>
//@import url(); 引入公共css类

</style>