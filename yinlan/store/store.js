import Vue from 'vue'
import Vuex from 'vuex'
import XRequest from '../units/request.js'

Vue.use(Vuex)
export default new Vuex.Store({
	namespaced: true,
	state: {
		bottomNav: [{
				title: '学习',
				width: '25rpx',
				icon: '../../static/images/icon_16.png',
				selectIcon: '../../static/images/icon_16.png',
				type: 'ord',
				select: true,
				url: '../../pages/index/index'
			},
			{
				title: '班级',
				width: '30rpx',
				icon: '../../static/images/icon_22.png',
				selectIcon: '../../static/images/icon_16.png',
				type: 'ord',
				select: false,
				url: '../../pages/class/class'
			},
			{
				title: '免费领',
				icon: '../../static/images/icon_13.png',
				selectIcon: '../../static/images/icon_16.png',
				type: 'custom',
				select: false,
				url: '../../pages/index/index'
			},
			{
				title: '发现',
				color: '#9b9b9b',
				width: '34rpx',
				icon: '../../static/images/icon_25.png',
				selectIcon: '../../static/images/icon_16.png',
				type: 'ord',
				select: false,
				url: '../../pages/find/find'
			},
			{
				title: '我的',
				width: '24rpx',
				icon: '../../static/images/icon_19.png',
				selectIcon: '../../static/images/icon_16.png',
				type: 'ord',
				select: false,
				url: '../../pages/my/my'
			}
		]
	},
	mutations: {
		setBottomNav(state, e) {
			let arr = state.bottomNav;
			for (let i in arr) {
				arr[i].select = false;
			}
			arr[e].select = true;
			state.bottomNav = arr;
			uni.reLaunch({
				url: arr[e].url
			});
		}
	},
	actions: {
		testRequest(){
			XRequest.myRequest(
				'get',
				'/request', 
				{
					text: 'uni.request'
				},
				(res) => {
					console.log(res);
				},
				(res) => {
					console.log(res);
				},
				(res) => {
					console.log(res);
				}
			);
		}

	}
})
