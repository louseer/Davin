<!-- number-inputs -->
<template>
  <div class='input-numbers'>
    <div class='numbers-cell' v-for='(n,index) in numbers' :key='index'>
      <el-input-number
        class='d-number-input'
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
    unit:{
      type:String,
      default:''
    },
    min:{
      type:Array,
      default:()=>{
        return [0,0]
      }
    },
    max:{
      type:Array,
      default:()=>{
        return []
      }
    },
    step:{
      type:Array,
      default:()=>{
        return []
      }
    },
    value:{
      type:Array,
      default:()=>{
        return []
      }
    },
    valueWithUnit:{
      type:Boolean,
      default:false
    }
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
        if(this.valueWithUnit && 'string' === typeof(element)){
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
        numbers[i] = this.valueWithUnit ? `${numbers[i]}${this.unit}` : numbers[i]
      }
      this.$emit('input',numbers)
    }
  }
}
</script>
<style lang='less' scoped>
//@import url(); 引入公共css类
.numbers-cell{
  float: left;
  margin-right:5px;
  .d-number-input{
    width:65px;
  }
  .unit{
    padding-left:3px;
  }
}

</style>