import Vue from 'vue'
import App from './App.vue'
import '../public/css/global.css'

import './registerServiceWorker'
// import './sw.js'
// import './service-worker'

import router from './router'
import {
  Button,
  message,
  Select,
  Slider,
  Input,
  Row,
  Col,
  Switch
} from 'ant-design-vue';

Vue.config.productionTip = false
Vue.use(Button);
Vue.use(Select);
Vue.use(Slider);
Vue.use(Input);
Vue.use(Row);
Vue.use(Col);
Vue.use(Switch)

// Vue.use(RedoOutlined)



Vue.prototype.$message = message;



new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
