import { EDIT_MODE,VIEW_MODE,ELEMENT_RFORM,ELEMENT_GRID } from "../constants"
import { getFormData, updateLayoutReq } from '@/api/api.js'
export default {
  namespaced: true,
  state: {
    mode:VIEW_MODE,
    formID:'',
    rform:null,
    activeGrid:null,
    activeChart:null,
    layout:[],
    editType:ELEMENT_RFORM
  },
  getters: {
    modifyTarget (state) {
      if(state.editType === ELEMENT_GRID){
        return {
          type:state.editType,
          setting: state.activeGrid
        }
      }else{
        return {
          type:state.editType,
          setting: state.form
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
    //记录当前报表设置
    setRFormConfig (state,fromData) {
      console.log("接口请求完毕")
      state.rform = fromData
    },
    //记录当前grid list
    setLayout (state,layout) {
      state.layout = layout
    },
    //记录当前激活grid/chart
    setActiveGrid (state,grid) {
      state.activeGrid = grid
    },
    setActiveChart (state,chart) {
      state.activeChart = chart
    },
    setEditType(state,type){
      state.editType = type
    },
    updateGrid(state,setting){
      const gridi = setting.i
      const index = state.layout.findIndex(element => {
        return element.i === gridi
      });
      state.layout[index] = Object.assign(state.layout[index],setting);
      state.layout = [...state.layout]
    },
    updateChart(state,setting){
      const chartid = setting.id
      const index = state.layout.findIndex(element => {
        return element.chart.id === chartid
      });
      state.layout[index].chart = setting;
      state.layout = [...state.layout]
    },
    updateRForm(state,setting){
      console.log(setting)
    }
  },
  actions: {
    queryFormData({state,commit}){
      getFormData(state.formID).then(rsp => {
        const {layout,...form} = rsp.data;
        commit('setRFormConfig',form)
        commit('setLayout',layout)
      })
    },
    clickGrid({state,commit},grid){
      const {chart,...rest} = grid
      commit('setActiveChart',chart)
      commit('setActiveGrid',rest)
      commit('setEditType',ELEMENT_GRID)
    },
    clickRForm({state,commit}){
      commit('setActiveChart',null)
      commit('setActiveGrid',null)
      commit('setEditType',ELEMENT_RFORM)
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