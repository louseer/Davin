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
      console.log('updateNode',obj)
    }
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {
  
  },
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {
  
  },
  beforeCreate() {}, //生命周期 - 创建之前
  beforeMount() {}, //生命周期 - 挂载之前
  beforeUpdate() {}, //生命周期 - 更新之前
  updated() {
    console.log()
  }, //生命周期 - 更新之后
  beforeDestroy() {}, //生命周期 - 销毁之前
  destroyed() {}, //生命周期 - 销毁完成
  activated() {}, //如果页面有keep-alive缓存功能，这个函数会触发
}
</script>
<style lang='less' scoped>
//@import url(); 引入公共css类

</style>