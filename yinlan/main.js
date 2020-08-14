import Vue from 'vue'
import App from './App'
import store from 'store/store.js'
import XRequest from 'units/request.js'

Vue.config.productionTip = false;
Vue.prototype.XRequest = XRequest;
Vue.prototype.baseUrl = XRequest.baseUrl;
// https://yinlang.ac57.top
App.mpType = 'app'

const app = new Vue({
    ...App,
	store
})
app.$mount()
