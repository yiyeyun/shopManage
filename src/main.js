import Vue from 'vue'
import App from './App.vue'
import router from './router/index'
import 'normalize.css/normalize.css'
import '@/assets/style/index.css'
import './utils/md5'
import Element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(Element)

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
