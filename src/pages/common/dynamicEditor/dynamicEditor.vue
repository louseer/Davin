<!--  -->
<template>
  <div class='side-bar-right'>
    <el-form ref="editForm"  label-width="1rem" v-if='form' >
      <form-item :options='form.options'></form-item>
    </el-form>
  </div> 
</template>

<script>
//import {组件名称} from '组件路径';
import { mapGetters } from 'vuex'

import { DynamicForm } from './dynamicForm/index.js'
import  formItem from './dynamicForm/formItem.vue'
export default {
  components: {
    formItem
  },
  props:{
    type:{
      type:String,
      default:''
    },
    setting:{
      type:Object,
      default:null
    }
  },
  data() {
    return {
      options:null,
      handlers:null,
      form:null,
      
    };
  },
  computed: {

  },
  watch: {
    type () {
      this.importConfig();
    },
    setting:{
      handler:function(){
        this.form && this.form.setOriginSetting(this.setting)
      },
      deep:true
    }
  },
  methods: {
    //载入各项表单的配置
    importConfig () {
      if(!this.type){
        return;
      }
      // type = type || this.type;
      import(`./dynamicForm/lib/${this.type}.js`).then((module) => {
        let editor = module.default;
        this.form = new DynamicForm(editor.options,editor.handlers,this.setting);
        console.log(this.form)
      }).catch(e=>{
        console.log(`动态表单加载./dynamicForm/lib/${this.type}.js失败`)
        console.log(e)
      })
    }
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {
    this.importConfig()
  },
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {

  },
  beforeCreate() {}, //生命周期 - 创建之前
  beforeMount() {}, //生命周期 - 挂载之前
  beforeUpdate() {}, //生命周期 - 更新之前
  updated() {
    console.log("update",this.type,this.setting)
  }, //生命周期 - 更新之后
  beforeDestroy() {}, //生命周期 - 销毁之前
  destroyed() {}, //生命周期 - 销毁完成
  activated() {}, //如果页面有keep-alive缓存功能，这个函数会触发
}
</script>
<style lang='less' scoped>
//@import url(); 引入公共css类

</style>