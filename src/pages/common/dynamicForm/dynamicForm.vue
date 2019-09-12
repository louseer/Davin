<!--  -->
<template>
  <div class='dynamic-form'>
    <el-form label-width="0.8rem" v-if='form' :label-position='labelPosition' :size='size'>
      <form-item :options='form.options' @popevent='popevent'></form-item>
    </el-form>
  </div> 
</template>

<script>
import { mapGetters } from 'vuex'

import { DynamicForm } from './core/index.js'
import  formItem from './core/formItem.vue'
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
    },
    size:{
      type:String,
      default:'mini'
    },
    labelPosition:{
      type:String,
      default:'left'
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
    setting(){
      this.form && this.form.setSetting(this.setting)
    }
    // setting:{
    //   handler:function(){
    //     console.log("dynamicForm 检测到新的setting",this.setting)
    //     this.form && this.form.setSetting(this.setting)
    //   },
    //   deep:true
    // }
  },
  methods: {
    //上抛表单数据更新
    commitUpdate(newSetting){
      this.$emit('update',newSetting)
    },
    //载入各项表单的配置
    importConfig () {
      if(!this.type){
        return;
      }
      import(`./lib/${this.type}.js`).then((module) => {
        let editor = module.default;
        this.form = new DynamicForm(editor.options,editor.handlers,this.setting,this.commitUpdate);
      }).catch(e=>{
        console.log(e)
      })
    },
    //上抛自定义事件
    popevent(emitTag){
      this.$emit(emitTag)
    }
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {
    this.importConfig()
  }
}
</script>
<style lang='less' scoped>
//@import url(); 引入公共css类

</style>