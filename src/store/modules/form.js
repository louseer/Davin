import { EDIT_MODE,VIEW_MODE } from "../constants"
import { getFormData, updateLayoutReq } from '@/api/api.js'
export default {
  state: {
    mode:VIEW_MODE,
    formID:'',
    form:null,
    activeGrid:'',
    layout:[]
  },
  getters: {

  },
  mutations: {
    openEditMode (state) {
      state.mode = EDIT_MODE
    },
    setFormID (state,id) {
      state.formID = id
    },
    setForm (state,fromData) {
      state.form = fromData
    },
    setLayout (state,layout) {
      state.layout = layout
    },
    setActiveGrid (state,id) {
      state.activeGrid = id
    }
  },
  actions: {
    queryFormData({state,commit}){
      getFormData(state.formID).then(rsp => {
        commit('setForm',rsp.data)
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