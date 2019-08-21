import Vuex from 'vuex'
import Vue from 'vue'
import getters from './getters'
import user from './modules/user'
import form from './modules/form'
import databoard from './modules/databoard'
import transform from './modules/transform'

Vue.use(Vuex)
const myStore = new Vuex.Store({
  modules: {
    user,
    form,
    databoard,
    // transform
  },
  state:{
    'loading': false
  },
  mutations: {
    showLoading(state,status){
      state.loading = status
    },
    globaltest(state,str){
      console.log(str)
    }
  },
  getters
})

export default myStore
