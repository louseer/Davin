<!-- number-inputs -->
<template>
  <div class='input-numbers'>
    <div class='numbers-cell' v-for='(n,index) in numbers' :key='index'>
      <el-input-number
        :value="numbers[index]" 
        controls-position="right" 
        :min="min[index]" 
        :max="max[index]"
        @change="(newval)=>{changeHandle(newval,index)}"
      ></el-input-number>
      <span class='unit'>{{unit}}</span>
    </div>
  </div>
</template>

<script>
//import {组件名称} from '组件路径';

export default {
  model: {
    prop: 'value',
    event: 'input'
  },
  props:{
    unit:String,
    min:Array,
    max:Array,
    step:Array,
    value:Array
  },
  components: {},
  data() {
    return {
    };
  },
  computed:{
    numbers(){
      let numbers = []
      this.value.forEach(element => {
        if(this.unit && 'string' === typeof(element)){
          element = element.replace(this.unit,'')
        }
        element = parseFloat(element)
        numbers.push(element)
      })
      return numbers
    }
  },
  methods: {
    changeHandle(newval,index){
      let numbers = [...this.numbers]
      numbers[index] = newval;
      for(let i =0; i< numbers.length;i++){
        numbers[i] = this.unit ? `${numbers[i]}${this.unit}` : `${numbers[i]}`
      }
      this.$emit('input',numbers)
    }
  }
}
</script>
<style lang='less' scoped>
//@import url(); 引入公共css类

</style>