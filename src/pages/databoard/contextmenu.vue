<template>
  <div class="contextmenu" :style="pstyle">
    <ul>
      <li
        class="flist"
        v-for="(list,lindex) in Menu"
        @mouseover="listMouseover(list)"
        @mouseleave="listMouseleave(list)"
        @click="list.event"
      >
        <span>{{list.name}}</span>
        <i v-if="list.hasOwnProperty('children')" class="iconfont icon-ico_db_arrow arrow"></i>
        <ul
          class="submenu"
          v-if="list.hasOwnProperty('children') && list.active"
          :style="`top:${lindex*31}px`"
        >
          <li v-for="(sublist,sindex) in list.children" @click="sublist.event">{{sublist.name}}</li>
        </ul>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    rightMenu: {
      type: Array,
      default: () => []
    },
    position: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      Menu: ''
    }
  },
  computed: {
    pstyle() {
      return `left:${this.position.x}px;top:${this.position.y}px`
    }
  },
  methods: {
    listMouseover(item) {
      item.active = true
    },
    listMouseleave(item) {
      item.active = false
    }
  },
  created() {
    this.Menu = this.rightMenu.map(n => {
      return { ...n, active: false }
    })
  }
}
</script>

<style lang="less" scoped>
@import '../../assets/styles/base.less';
.contextmenu {
  width: 1.5rem;
  position: relative;
  background: @bg_Data_left;
  position: absolute;
  z-index: 999999;
  color: @Font_DataC_main;
  font: @Font_zn12;
  border-radius: 4px;
  box-sizing: border-box;

  ul {
    width: 100%;
    .flist {
      width: 100%;
      height: 0.3rem;
      font: @Font_zn12;
      border-bottom: @border_Data_sub;
      line-height: 0.3rem;
      text-indent: 0.1rem;
      cursor: pointer;
      &:hover {
        background: @bg_Data_lefthover;
        color: @Font_mainC_white;
      }
    }
    .submenu {
      width: 1.5rem;
      background: @bg_Data_left;
      position: absolute;
      right: -1.5rem;
      top: 0;
      li {
        width: 100%;
        height: 0.3rem;
        font: @Font_zn12;
        border-bottom: @border_Data_sub;
        line-height: 0.3rem;
        text-indent: 0.1rem;
        cursor: pointer;
        &:hover {
          background: @bg_Data_lefthover;
          color: @Font_mainC_white;
        }
      }
    }
    :last-child {
      border: 0;
    }

    .arrow {
      float: right;
      margin-right: 0.2rem;
      font-size: 6px;
    }
  }
}
</style>