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
    snapshot:[]
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