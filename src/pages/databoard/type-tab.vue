<template>
  <div class="type_tab">
    <div class="leftbtn" :style="`height:${height}px`">
      <ol
        v-for="(type,tindex) in typetree"
        :key="tindex"
        :title="type.title"
        :style="btnStyle(type)"
        @click="changeClick(type)"
      >
        <em v-if="type.active"></em>
      </ol>
    </div>
    <div v-for="(type,tindex) in typetree">
      <div v-if="type.active" class="rightcontent" :style="`height:${height}px`">
        <template v-if="listType === 'thumbnail' ">
          <ol v-for="(subtype,sindex) in type.children" draggable @click="contentClick(subtype)" @dragstart="contentdrag($event,subtype)">
            <h1>
              <Thumbnail :nodeEltype="subtype.type" />
            </h1>
            <span>{{subtype.title}}</span>
          </ol>
        </template>
        <template v-else>
          <span
            class="line"
            v-for="(subtype,sindex) in type.children"
            @click="contentClick(subtype)"
            @dragstart="contentdrag(subtype)"
          ><i :class="`iconfont icon-ico_db_laycom_${subtype.type}`"></i>{{subtype.title}}</span>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
import Thumbnail from '../../components/thumbnail.vue'
export default {
  components: { Thumbnail },
  props: {
    listType: {
      type: String,
      default: 'thumbnail'
    },
    typetree: {
      type: Array,
      default: () => []
    },
    height: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      thetypetree: this.typetree
    }
  },
  methods: {
    contentdrag(e,item){ 
      e.dataTransfer.setData("item",JSON.stringify(item))
     
    },
    contentClick(item) {
    
      this.$emit('contentClick', item)
    },
    changeClick(item) {
      this.thetypetree.forEach(n => {
        n.id === item.id ? (n.active = true) : (n.active = false)
      })
      //this.$emit('changeClick', this.thetypetree)
    }
  },
  computed: {
    btnStyle() {
      return function(item) {
        return item.active
          ? `background: url('./images/icon_type_${item.name}_active.png') #313438 no-repeat center center;`
          : `background: url('./images/icon_type_${item.name}.png') no-repeat center center;`
      }
    }
  }
}
</script>

<style lang="less" scoped>
@import '../../assets/styles/base.less';
.type_tab {
  width: 100%;
  overflow: hidden;
  position: relative;
  display: flex;
  flex-flow: row nowrap;
  justify-content: flex-start;

  .leftbtn {
    position: relative;
    display: flex;
    width: 0.36rem;
    background: @bg_Data_leftbottom;
    height: 100%;
    justify-content: flex-start;
    flex-flow: column nowrap;
    border-right: @border_Data_main;

    ol {
      width: 0.36rem;
      height: 0.36rem;
      cursor: pointer;
      em {
        width: 2px;
        height: 100%;
        display: block;
        background: @icon_DataC_red;
      }
    }
  }
  .rightcontent {
    width: 100%;

    position: relative;
    overflow: hidden;
    ol {
      width: 0.8rem;
      float: left;
      overflow: hidden;
      padding-bottom: 0.1rem;
      cursor: pointer;
      &:hover {
        background: @bg_Data_lefthover;
      }
      h1 {
        margin: 0.08rem 0.18rem;
        float: left;
      }
      span {
        float: left;
        width: 100%;
        font: @Font_zn12;
        color: @Font_DataC_main;
        text-align: center;
      }
    }
    .line {
      cursor: pointer;
      font: @Font_zn12;
      width: 1.6rem;
      height: 0.36rem;
      display: block;
      color: @Font_DataC_main;
      line-height: 0.36rem;
      text-indent: 0.1rem;
      i{
        float:left;
        margin-right: 0.08rem;
       font-size: 0.16rem;
       line-height: 0.36rem;
      }
      &:hover {
        background: @bg_Data_lefthover;
      }
    }
  }
}
</style>