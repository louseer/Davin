import Vue from 'vue'
import './plugins/axios'
import App from './App.vue'
import router from './router'
import store from './store'
import './plugins/element.js'
import '@/assets/styles/base.less'
import base from '@/mixins/base'
import '@/assets/iconfont/iconfont.css'
import 'element-ui/lib/theme-chalk/index.css'
import thumbnail from './components/thumbnail.vue'
Vue.component('thumbnail', thumbnail)
Vue.mixin(base)

document.oncontextmenu = () => {
  self.event.returnValue = false
}
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
