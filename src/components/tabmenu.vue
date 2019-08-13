<template>
  <div class="tabbar">
    <div class="tabtop">
      <div class="tabbtn">
        <b v-for="(tab,tindex) in ntabs" @click="changetab(tab)" :class="tab.active ? 'tabon' : ''">{{tab.name}}</b>
      </div>
      <!-- switch  -->
      <slot name="tabsloat"></slot>
     
      <!-- switch end  -->
    </div>

    <div class="tabcontent" >
      <div v-for="(tab,index) in ntabs">
      <div v-show="tab.active">
        <slot :name="`tab${tab.id}`"></slot>
      </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  props: {
    tabs: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      ntabs: this.tabs
    }
  },
  methods: {
    changetab(tab) {
      this.ntabs.forEach(n=>{
        n.id === tab.id ? n.active = true :n.active = false
      })
       
    }
  }
}
</script>

<style lang="less" scoped>
@import '../assets/styles/base.less';
    .tabbar {
        width: 100%;
        background: yellowgreen;
        height: calc(100% - 0.3rem);
        display: flex;
        flex-flow: column nowrap;
        .tabtop {
          display: flex;
          flex-flow: row nowrap;
           border-bottom: @border_Data_main;
          .tabbtn {
            width: calc(100% - 0.08rem);
            height: 0.36rem;
            display: flex;
            flex-flow: row nowrap;
            justify-content: space-between;
            b {
              display: block;
              width: 50%;
              height: 100%;
              background: #272a2e;
              border-left: @border_Data_main;
              cursor: pointer;
              font: @Font_zn14;
              text-align: center;
              color:@Font_DataC_sub;
              line-height: 0.36rem;
              :last-child {
                border-left: 0;
              }
            }
            .tabon{
              color:@Font_DataC_main;
              background:@bg_Data_left;
            }
          }
          
        }
        .tabcontent {
          background: @bg_Data_left;
          height: calc(100% - 0.36rem);
          width: 100%;
          overflow-y: auto;
        }
      }
</style>