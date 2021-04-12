import Vue from 'vue'
import App from './App.vue'
// import './registerServiceWorker'
// import './sw'
import '../public/css/global.css'
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



if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/service-worker.js').then(registration => {
      console.log('SW registered: ', registration);
    }).catch(registrationError => {
      console.log('SW registration failed: ', registrationError);
    });
  });
}

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
