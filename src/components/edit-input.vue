<template>
  <div class="edinput">
    <el-input :placeholder="placeholder" :autofocus='autofocus' v-model="currentValue" @input="handleModelInput" @blur='handleModelBlur'></el-input>
  </div>
</template>

<script>
export default {
  props: {
    value:{
      type:[String,Number],
      default:''
    },
    placeholder:{
      type:String,
      default:'请输入搜索内容'
    },
    autofocus:{
      type:Boolean,
      default:false
    }
  },
  data() {
    return {
      currentValue: this.value
    }
  },
  methods: {
    handleModelInput() {
      this.$emit('input', this.currentValue)
    },
    handleModelBlur() {
      this.$emit('blur', this.currentValue)
    }
  },
  watch: {
    value(newValue) {
      this.currentValue = newValue
    }
  }
}
</script>

<style lang="less" >
.edinput {
  .el-input {
    position: relative;
    font-size: 14px;
    display: inline-block;
    width: 100%;
   
    box-sizing: border-box;
  }
  .el-input__inner {
    -webkit-appearance: none;
    background-color: #212326;
    background-image: none;
    border-radius: 2px !important;
    border: 1px solid #212326;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    color: #606266;
    display: inline-block;
    font-size: inherit;
    height: 0.26rem !important;
    line-height: 40px;
    outline: 0;
    padding: 0 0.1rem;
    -webkit-transition: border-color .2s cubic-bezier(.645,.045,.355,1);
    transition: border-color .2s cubic-bezier(.645,.045,.355,1);
    width: 100%;
}
}
</style>
