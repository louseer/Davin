<!--  -->
<template>
  <div class='dynamic-form'>
    <el-form label-width="0.8rem" v-if='form' >
      <form-item :options='form.options'></form-item>
    </el-form>
  </div> 
</template>

<script>
//import {组件名称} from '组件路径';
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
        console.log('dform获得更新setting',this.setting)
        this.form && this.form.setOriginSetting(this.setting)
      },
      deep:true
    }
  },
  methods: {
    commitUpdate(newSetting){
      this.$emit('update',newSetting)
    },
    //载入各项表单的配置
    importConfig () {
      if(!this.type){
        return;
      }
      // type = type || this.type;
      import(`./lib/${this.type}.js`).then((module) => {
        let editor = module.default;
        this.form = new DynamicForm(editor.options,editor.handlers,this.setting,this.commitUpdate);
        console.log('载入配置项获得from实例',this.form)
      }).catch(e=>{
        console.log(`动态表单加载./lib/${this.type}.js失败`)
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
    console.log("切换为",this.type,this.setting)
  }, //生命周期 - 更新之后
  beforeDestroy() {}, //生命周期 - 销毁之前
  destroyed() {}, //生命周期 - 销毁完成
  activated() {}, //如果页面有keep-alive缓存功能，这个函数会触发
}
</script>
<style lang='less' scoped>
//@import url(); 引入公共css类

</style>