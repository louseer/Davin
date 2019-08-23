<!--  -->
<template>
  <div ref='d-root'>
    <div class='img-select' @click='handleClick'>
      <img v-if="imgsrc" :src='imgsrc' height="100%" />
    </div>
    <el-dialog :title="title" :visible.sync="dialogVisible" class='select-dialog' :modal-append-to-body='false'>
      <div class="slideimg">
        <li v-for="(item,index) in list" :key="index" @click="imgClick(item,index)" :class="{'selected':selected === index}">
            <img :src="item.url" width="100%" height="100%" class='img-item'/>
        </li>
      </div>
    </el-dialog>
  </div>
  
</template>

<script>
//import {组件名称} from '组件路径';

export default {
  name:'d-img-select',
  components:{},
  props:{
    title:{
      type:String,
      default:"选择图片"
    },
    list:{
      type:Array,
      default:()=>{
        return [{url:'/mock/bgImages/bgimg1.png'}]
      }
    }
  },
  data() {
    return {
      dialogVisible:false,
      selected:'',
      imgsrc:this.value
    };
  },
  methods: {
    imgClick(item,index){
      if(this.imgsrc === item.url){
        return;
      }
      console.log(item,index)
      this.selected = index
      this.imgsrc = item.url
      this.dialogVisible = false
      this.$emit('input',this.imgsrc)
    },
    handleClick () {
      this.dialogVisible = true
    }
  }
}
</script>
<style lang='less' scoped>
//@import url(); 引入公共css类
.img-select{
  width:100%;
  height:1rem;
  border:1px dashed #efefef;
  box-sizing: border-box;
  .img-item {
    margin:0 auto;
  }
}
.select-dialog{
  z-index:3000;
}
.slideimg {
  margin-top: 0.2rem;
  display: flex;
  justify-content: space-between;
  flex-flow: row nowrap;
  align-items: center;
  li {   
    list-style: none;
    width: 1rem;
    height: 0.8rem;
    border: 1px #eeeeee solid;
    cursor: pointer;
    &:hover {
      opacity: 0.5;
    }
    &.selected{
      border:2px solid #DB7093
    }
  }
}
</style>