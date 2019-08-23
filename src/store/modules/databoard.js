import { EDIT_MODE,VIEW_MODE,ELEMENT_SCREEN,ELEMENT_MULTI,ELEMENT_NODE } from "../constants"
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
    //记录当前大屏ID
    setDBID (state,id) {
      state.databoardID = id
    },
    //记录当前大屏设置
    setDataboard (state,data) {
      console.log("接口请求完毕")
      state.databoard = data
    },
  
    //记录当前激活node
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
      state.databoard = objDeepMerge(state.databoard,setting)
      console.log(state.databoard)
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
        commit('setDataboard',rsp.data)
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
    updateDataboard({commit},setting){
      commit('_updateDB',setting)
      console.log("updateDataboard request api")
    }
  }
}