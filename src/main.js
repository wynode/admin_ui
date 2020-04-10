// import 'element-ui/lib/theme-chalk/index.css'
import '@/assets/style/elementui.scss'
import '@/assets/style/index.scss'
import '@/utils/importSVG'

import Vue from 'vue'
import authPlugin from '@what-a-faka/vue-authplugin'
import Txcel from '@what-a-faka/txcel'
import { sync } from 'vuex-router-sync'
import ElementUI from 'element-ui'
import EffectForm from '@/components/EffectForm'
import Dialog from '@/components/dialog'
import DecodeImage from '@/components/DecodeImage'
import DecodeImageList from '@/components/DecodeImageList'
import { USER_INFO } from './config'
import App from './App.vue'
import routers from './routers'
import stores from './stores'
import plugins from './plugins'

Vue.config.productionTip = false
Vue.use(ElementUI)
Vue.use(Txcel)
Vue.use(plugins)
Vue.use(EffectForm)
Vue.use(DecodeImage)
Vue.use(DecodeImageList)
Vue.component(DecodeImage.name, DecodeImage)
Vue.component(DecodeImageList.name, DecodeImageList)
sync(stores, routers)

function getAuthCode() {
  let info = localStorage.getItem(USER_INFO)
  if (!info) {
    return []
  }
  info = JSON.parse(info)
  return info.perms || []
}
Vue.use(authPlugin, {
  authCode: getAuthCode(),
})
Vue.use(Dialog)

new Vue({
  router: routers,
  store: stores,
  render: (h) => h(App),
}).$mount('#app')
