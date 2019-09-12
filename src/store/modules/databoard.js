import Vue from 'vue'
import { EDIT_MODE,VIEW_MODE,ELEMENT_SCREEN} from "../constants"
import { getDataBoardData, updateLayoutReq } from '@/api/api.js'
import { objDeepMerge } from '@/utils/index.js'
export default {
  namespaced: true,
  state: {
    zoom:1,
    mode:VIEW_MODE,
    databoardID:'',
    databoard:null,
    editNode:null,
    editChart:null,
    editGroup:null,
    editType:ELEMENT_SCREEN,
    step:-1,
    snapshot:[],//操作快照
    typetree: [
      {
        name: 'charts',
        title: '图表',
        active: true,
        id: '1',
        children: [
          {
            type: 'bar',
            title: '基础柱状图',
            version: 1,
            w:430,
            h:320,
            id: '1-1'
          },
          {
            type: 'horizontalbar',
            title: '横向柱状图',
            version: 1,
            w:430,
            h:320,
            id: '1-10'
          },
          {
            type: 'pie',
            title: '基础饼状图',
            version: 1,
            w:430,
            h:320,
            id: '1-2'
          },
          {
            type: 'line',
            title: '基础折线图',
            version: 1,
            w:430,
            h:320,
            id: '1-3'
          },
          {
            type: 'line2y',
            title: '双Y轴折线图',
            version: 1,
            w:430,
            h:320,
            id: '1-11'
          },
          {
            type: 'doughnut',
            title: '基础环图',
            version: 1,
            w:430,
            h:320,
            id: '1-4'
          },
          {
            type: 'linebar',
            title: '混合-线柱混搭',
            version: 1,
            w:430,
            h:320,
            id: '1-5'
          },
          {
            type: 'scatter',
            title: '基础散点图',
            w:430,
            h:320,
            version: 1,
            id: '1-6'
          },
          {
            type: 'funnel',
            title: '基础漏斗图',
            w:430,
            h:320,
            version: 1,
            id: '1-7'
          },
          // {
          //   type: 'characters',
          //   title: '基础字符云',
          //   version: 1,
          //   id: '1-8'
          // },
          {
            type: 'polar',
            title: '极坐标双数值轴',
            w:430,
            h:320,
            version: 1,
            id: '1-12'
          },
          {
            type: 'radar',
            title: '基础雷达图',
            w:430,
            h:320,
            version: 1,
            id: '1-9'
          }
        ]
      },
      // {
      //   name: 'table',
      //   title: '表格',
      //   active: false,
      //   id: '2',
      //   children: [
      //     {
      //       type: 'basetable',
      //       title: '基础表格',
      //       w:530,
      //       h:320,
      //       version: 1,
      //       id: '2-1'
      //     }
      //   ]
      // },
      // {
      //   name: 'media',
      //   title: '媒体',
      //   active: false,
      //   id: '3',
      //   children: [
      //     {
      //       type: 'vedio',
      //       title: '视频',
      //       version: 1,
      //       w:430,
      //       h:320,
      //       id: '3-1'
      //     },
      //     {
      //       type: 'image',
      //       title: '图片',
      //       w:430,
      //       h:320,
      //       version: 1,
      //       id: '3-2'
      //     }
      //   ]
      // },
      {
        name: 'text',
        title: '文本',
        active: false,
        id: '4',
        children: [
          {
            type: 'title',
            title: '标题',
            w:200,
            h:40,
            version: 1,
            // text:'自定义标题',
            // fontSize:20, //临时代码
            id: '4-1'
          },
          // {
          //   type: 'text',
          //   title: '文本',
          //   version: 1,
          //   id: '4-2'
          // }
        ]
      },
      // {
      //   name: 'relationship',
      //   title: '关系网络',
      //   active: false,
      //   id: '5',
      //   children: [
      //     {
      //       type: 'relationship',
      //       title: '关系网络',
      //       version: 1,
      //       id: '5-1'
      //     }
      //   ]
      // },
       {
        name: 'material',
        title: '素材',
        active: false,
        id: '6',
        children: [
          {
            type: 'decorate',
            title: '装饰',
            w:430,
            h:320,
            version: 1,
            id: '6-1'
          }
        ]
      },
      // {
      //   name: 'other',
      //   title: '其他',
      //   active: false,
      //   id: '7',
      //   children: [
      //     {
      //       type: 'time',
      //       title: '时间选择器',
      //       version: 1,
      //       id: '7-1'
      //     }
      //   ]
      // },
      // {
      //   name: 'UE',
      //   title: '交互',
      //   active: false,
      //   id: '8',
      //   children: [
      //     {
      //       type: 'slide',
      //       title: '轮播页面',
      //       version: 1,
      //       id: '8-1'
      //     }
      //   ]
      // }
    ]
  },
  getters: {
    isEditing(state) {
      return state.mode === EDIT_MODE
    }
  },
  mutations: {
    setZoom(state,val){
      state.zoom = val
    },
    //设置为编辑模式
    openEditMode (state) {
      state.mode = EDIT_MODE
    },
    //记录当前大屏ID
    setDBID (state,id) {
      state.databoardID = id
    },
    //记录当前大屏初始设置
    initDataboard (state,data) {
      console.log("设置大屏对象",data)
      state.databoard = data
    },
  
    //记录当前激活node
    initEditNode (state,node) {
      state.editNode = node
    },
    initEditChart (state,chart) {
      console.log(chart)
      state.editChart = chart
    },
    initEditGroup(state,group){
      state.editGroup = group
    },
    setEditType(state,type){
      state.editType = type
    },
    _updateDB(state,setting){
      state.databoard = objDeepMerge(state.databoard,setting)
      console.log("更新大屏对象",state.databoard)
    },
    _updateGroup(state,setting){
      state.editGroup = objDeepMerge(state.editGroup,setting)
    },
    _updateNode(state,setting){
      state.editNode = objDeepMerge(state.editNode,setting)
    },
    _updateChart(state,setting){
      state.editChart = objDeepMerge(state.editChart,setting)
      state.editNode.chart = Object.assign({},state.editChart)
    }
  },
  actions: {
    queryDataboard({state,commit}){
      getDataBoardData(state.setDBID).then(rsp => {
        commit('initDataboard',rsp.data)
      })
    },
    updateNode({commit},setting){
      commit('_updateNode',setting)
      console.log("updateNode request api")
    },
    updateChart({commit},setting){
      commit('_updateChart',setting)
      console.log("updateChart request api")
    },
    updateGroup({commit},setting){
      commit('_updateGroup',setting)
      console.log("updateChart request api")
    },
    updateDataboard({commit},setting){
      commit('_updateDB',setting)
      console.log("updateDataboard request api")
    }
  }
}