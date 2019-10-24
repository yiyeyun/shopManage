import Vue from 'vue'
import App from './App.vue'
import router from './router/index'
import 'normalize.css/normalize.css'
import '@/assets/style/index.css'
import 'viewerjs/dist/viewer.css'
import './utils/md5'
import Element from 'element-ui'
import Viewer from 'v-viewer'

import 'element-ui/lib/theme-chalk/index.css'
Vue.use(Element)
Vue.use(Viewer)
Viewer.setDefaults({
  zIndexInline: 9999
})

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
