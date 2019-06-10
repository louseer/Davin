import Vuex from 'vuex'
import Vue from 'vue'
import getters from './getters'
import user from './modules/user'

Vue.use(Vuex)
const myStore = new Vuex.Store({
  modules: {
    user,
    pagemap,
    dialog,
    pages
  },
  getters
})

export default myStore
