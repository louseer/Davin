<!--  -->
<template>
  <div>
    <template v-for='(item,key) in items'>
      <el-form-item :label="item.name" v-if="item.type !== itemType.NOVIEW && item.type !== itemType.GROUP && item.type !== itemType.LIST" v-show='!item.hide'>
        <el-input 
          v-model="item.value" 
          v-if="item.type === itemType.INPUT"
          size="mini"
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
          size="mini"
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
          size="mini"
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
          input-size='mini'
          show-input
        ></el-slider>
        <el-color-picker
          v-if="item.type === itemType.COLORPICKER" 
          v-model="item.value"
          show-alpha
          :predefine="item.predefine"
          size="mini"
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
        <d-img-select
          v-if="item.type === itemType.IMGSELECT"
          :title='item.name'
          v-model="item.value"
        ></d-img-select>
      </el-form-item>
      <el-collapse v-if="item.type === itemType.GROUP && !item.noview">
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
//import {组件名称} from '组件路径';
import { OPTIONTYPE } from "./constants.js"
import DImgSelect from "components/img-select.vue"
export default {
  name:"form-item",
  components:{
    DImgSelect
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
  created(){
    
  }
}
</script>
<style lang='less' scoped>
//@import url(); 引入公共css类

</style>