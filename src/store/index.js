import Vuex from 'vuex'
import Vue from 'vue'
import getters from './getters'
import user from './modules/user'
import form from './modules/form'

Vue.use(Vuex)
const myStore = new Vuex.Store({
  modules: {
    user,
    form
  },
  state:{
    'loading': false
  },
  mutations: {
    showLoading(state,status){
      state.loading = status
    }
  },
  getters
})

export default myStore
