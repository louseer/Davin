import { EDIT_MODE,VIEW_MODE,ELEMENT_RFORM,ELEMENT_GRID } from "../constants"
import { getFormData, updateLayoutReq } from '@/api/api.js'
export default {
  namespaced: true,
  state: {
    mode:VIEW_MODE,
    formID:'',
    form:null,
    activeGrid:null,
    layout:[]
  },
  getters: {
    modifyTarget (state) {
      if(state.activeGrid){
        return {
          type:ELEMENT_GRID,
          target: state.activeGrid
        }
      }else{
        return {
          type:ELEMENT_RFORM,
          target: state.form
        }
      }
    },
    isEditing(state) {
      return state.mode === EDIT_MODE
    }
  },
  mutations: {
    //设置为编辑模式
    openEditMode (state) {
      state.mode = EDIT_MODE
    },
    //记录当前报表ID
    setRFormID (state,id) {
      state.formID = id
    },
    //记录当前报表完整数据
    setRForm (state,fromData) {
      state.form = fromData
    },
    //记录当前grid list
    setLayout (state,layout) {
      state.layout = layout
    },
    //记录当前激活grid/chart
    setActiveGrid (state,grid) {
      state.activeGrid = grid
    },
    //取消激活grid/chart
    cancelActiveGrid (state) {
      state.activeGrid = null
    },
  },
  actions: {
    queryFormData({state,commit}){
      getFormData(state.formID).then(rsp => {
        commit('setRForm',rsp.data)
        commit('setLayout',rsp.data.layout)
      })
    },
    updateLayout({commit},newLayout){
      console.log("~~~updateLayout request api~~~")
      const params = {
        layout:newLayout
      }
      commit('setLayout',newLayout)
      // updateLayoutReq(params).then(rsp => {
      //   commit('setLayout',newLayout)
      // }).catch(e=>{
        
      // })
    }
  }
}