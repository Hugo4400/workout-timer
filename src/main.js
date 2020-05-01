import Vue from 'vue'
import App from './App.vue'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faPlay, faPlus, faMinus, faPause, faRedoAlt } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'


Vue.component('font-awesome-icon', FontAwesomeIcon)
library.add(faPlay, faPlus, faMinus, faPause, faRedoAlt)


Vue.config.productionTip = false


new Vue({
  render: h => h(App)
}).$mount('#app')
