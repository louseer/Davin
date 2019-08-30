<!--  -->
<template>
  <div>
    <template v-for='(item,key) in items'>
      <el-form-item 
      :label="item.name" 
      v-if="item.type !== itemType.NOVIEW && item.type !== itemType.GROUP && item.type !== itemType.LIST" 
      v-show='!item.hide'
      >
        <el-button-group class='btn-wrapper' v-if="item.type === itemType.BUTTON_GROUP">
          <el-button v-for='(btn,index) in item.list'  :key='index' class='btn.className' @click="handleClick(btn.event,index)">{{btn.text}}</el-button>
        </el-button-group>
        <el-input 
          v-model="item.value" 
          v-if="item.type === itemType.INPUT"
        ></el-input>
        <el-input 
          v-model="item.value" 
          type='textarea' 
          v-if="item.type === itemType.TEXTAREA"
        ></el-input>
        <el-select  
          v-if="item.type === itemType.SELECT" 
          v-model="item.value" 
          placeholder="请选择"
        >
          <el-option
            v-for="item in item.options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
        <el-switch
          v-if="item.type === itemType.SWITCH"
          v-model="item.value"
          active-color="#13ce66"
          inactive-color="#ccc">
        </el-switch>
        <el-input-number
          v-if="item.type === itemType.INPUTNUMBER"
          v-model="item.value" 
          controls-position="right" 
          :min="item.min" 
          :max="item.max"
          :key='key'
        ></el-input-number>
        <el-radio-group
          v-if="item.type === itemType.RADIO" 
          v-model="item.value"
        >
          <el-radio v-for="r in item.options" :label="r.value" :key='r.value'>{{r.label}}</el-radio>
        </el-radio-group>
         <el-slider 
          v-if="item.type === itemType.SLIDER" 
          v-model="item.value" 
          :min='item.min' 
          :max='item.max' 
          :step='item.step'
        ></el-slider>
        <el-color-picker
          v-if="item.type === itemType.COLORPICKER" 
          v-model="item.value"
          show-alpha
          :predefine="item.predefine"
        >
        </el-color-picker>
        <el-upload
          v-if="item.type === itemType.IMGUPLOAD" 
          action="https://jsonplaceholder.typicode.com/posts/"
          list-type="picture-card"
          accept="image/png, image/jpeg"
          :limit=1
        >
        <i class="el-icon-plus"></i>
        </el-upload>
        <d-input-numbers
          v-if="item.type === itemType.INPUTNUMBERS"
          v-model="item.value"
          :min='item.min'
          :max='item.max'
          :step='item.step'
          :unit='item.unit'
        > 
        </d-input-numbers>
        <d-img-select
          v-if="item.type === itemType.IMGSELECT"
          :title='item.name'
          v-model="item.value"
        ></d-img-select>
        <d-cover-setting  
          v-if="item.type === itemType.COVER" 
          v-model="item.value"
          :imgsrc ="item.value"
          :btns='item.btns'
          @click-btn='popevent'
        ></d-cover-setting>
      </el-form-item>
      <el-collapse v-if="item.type === itemType.GROUP && !item.noview" class='collapse'>
        <el-collapse-item :title="item.name" >
          <form-item :options='item.children'></form-item>
        </el-collapse-item>
      </el-collapse>
      <template v-if="item.type === itemType.GROUP  && item.noview">
        <form-item :options='item.children'></form-item>
      </template>
      <template v-if="item.type === itemType.LIST  && item.children">
        <form-item :options='item.children'></form-item>
      </template> 
    </template>
  </div>
  
</template>

<script>
//注：该组件内的element组件均只写了少许设置。如果增加设置，可在配置文件增加elementOpt 字段，并在这边自行映射;
import { OPTIONTYPE } from "./constants.js"
import DImgSelect from "components/img-select.vue"
import DCoverSetting from "components/cover-setting.vue"
import DInputNumbers from "components/input-numbers.vue"

export default {
  name:"form-item",
  components:{
    DImgSelect,
    DCoverSetting,
    DInputNumbers
  },
  props:{
    options:[Object,Array]
  },
  data() {
    return {
     items:this.options,
     itemType:OPTIONTYPE
    }
  },
  // watch:{
  //   options:{
  //     handler:function (val) {
  //       console.log("FormItem 检测到新的options",this.setting)
  //       this.items = val
  //     },
  //     deep:true
  //   }
  // },
  methods:{
    popevent(emitTag){
      console.log("formItem emit TAG:",emitTag)
      this.$emit('popevent',emitTag)
    }
  },
  created(){
    
  }
}
</script>
<style lang='less' scoped>
//@import url(); 引入公共css类
.collapse{
  margin-bottom:18px;
}
</style>