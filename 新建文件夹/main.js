import Vue from 'vue'
import App from './App'

//引入vuex
import store from './store'
//把vuex定义成全局组件
Vue.prototype.$store = store


import XRequest  from './libs/netRequest.js';
Vue.prototype.$request  = XRequest 
Vue.prototype.$baseUrl = 'https://testmd.carszone.cn';
Vue.prototype.$picUrl = 'https://kfbnet2019.obs.cn-north-1.myhuaweicloud.com';
Vue.config.productionTip = false

App.mpType = 'app'


// 图片路径
const BASICURL = "https://kfbnet2019.obs.cn-north-1.myhuaweicloud.com/";
// 车型图片路径
Vue.prototype.carpic = "https://kfbnet2019.obs.cn-north-1.myhuaweicloud.com/brandImage/";
// 汽车行驶证
Vue.prototype.driver = "https://kfbnet2019.obs.cn-north-1.myhuaweicloud.com/vehicleLicense/";
// 用户头像
Vue.prototype.userhead =  "https://kfbnet2019.obs.cn-north-1.myhuaweicloud.com/userAvatar/";
// 营业执照
Vue.prototype.yyzz =  "https://kfbnet2019.obs.cn-north-1.myhuaweicloud.com/businessLicence/";
// 产品图片
Vue.prototype.product =  "https://kfbnet2019.obs.cn-north-1.myhuaweicloud.com/productPicture/";
// 故障图片
Vue.prototype.fautpic =  "https://kfbnet2019.obs.cn-north-1.myhuaweicloud.com/orderFaultImage/";






//获取不同机型的头部高度
Vue.prototype.isBarHeight999 = function() {
	return new Promise((resolve, reject) => {
		var that = this
		var isTemp = {}
		uni.getSystemInfo({
			success(res) {
				let totalTopHeight = 80
				if (res.model.indexOf('iPhone X') !== -1) {
					totalTopHeight = 88
				} else if (res.model.indexOf('iphone') !== -1) {
					totalTopHeight = 80
				}
				isTemp['statusBarHeight'] = res.statusBarHeight
				isTemp['titleBarHeight'] = totalTopHeight - res.statusBarHeight
				isTemp['allHeight'] = totalTopHeight
				resolve(isTemp)
			},
			fail(e) {
				reject(e)
			}
		})
	})
}




import "./static/icofont/iconfont.css";
const app = new Vue({
	...App,
	//挂载
	store
})
app.$mount()
