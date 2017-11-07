// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import globalURL from "../static/util/DataInterface"
import request from "../static/util/request"

Vue.config.productionTip = false;
/*配置接口路径*/
window.globalURL=globalURL;

/*ajax请求*/
window.request=request;

/*注册全局监听vue实例*/
window.bus=new Vue();
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
