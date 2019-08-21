import { EDIT_MODE,VIEW_MODE,ELEMENT_SCREEN,ELEMENT_MULTI,ELEMENT_NODE } from "../constants"
import { getFormData, updateLayoutReq } from '@/api/api.js'
export default {
  namespaced: true,
  state: {
    zoom:1,
    mode:VIEW_MODE,
    databoardID:'',
    databoard:null,
    editNode:null,
    editChart:null,
    editType:ELEMENT_SCREEN
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
    //记录当前报表ID
    setDBID (state,id) {
      state.databoardID = id
    },
    //记录当前报表设置
    setDataboard (state,data) {
      console.log("接口请求完毕")
      state.databoard = data
    },
  
    //记录当前激活grid/chart
    setEditNode (state,node) {
      console.log("setEditNodesetEditNodesetEditNode",node)
      state.editNode = node
    },
    setEditChart (state,chart) {
      console.log(chart)
      state.editChart = chart
    },
    setEditType(state,type){
      state.editType = type
    },
    _updateDB(state,setting){
      state.databoard = Object.assign(state.databoard,setting)
    },
    _updateNode(state,setting){
      state.editNode = Object.assign(state.editNode,setting)
    },
    _updateChart(state,setting){
      state.editChart = Object.assign(state.editChart,setting)
    }
  },
  actions: {
    queryDataboard({state,commit}){
     
    },
    updateNode({commit},setting){
      commit('_updateNode',setting)
      console.log("updateNode request api",setting)
    },
    updateChart({commit},setting){
      commit('_updateChart',setting)
      console.log("updateChart request api",setting)
    },
    updateDataboard({commit},setting){
      commit('_updateDB',setting)
      console.log("updateDataboard request api",setting)
    }
  }
}