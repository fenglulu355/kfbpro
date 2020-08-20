import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)


const files = require.context('./modules', false, /\.js$/);
const modules = {};


files.keys().forEach(key => {
	modules[key.replace(/(\.\/|\.js)/g, '')] = files(key).default
});

const store = new Vuex.Store({
	state: {
		barheight: '',
		authorization: '',
		shopid: '',
		orderinfo: '',
		serverlist: [],
		pjlist: [],
		saleinfos: [], //新增销售单的订单相关信息
		salegoods: [],
		saledrivers: [],
		fncitem: [], //选择的某个收支
		zditem: [],
		supplymain: [],
		editserver:[],//选择要修改的某个服务
	},
	mutations: {
		// 选择要修改的某个服务
		SET_EDITSERVER: function(state, e) {
			state.editserver = e
		},
		// 选择要查看的某个供应商详情
		SET_SUPPLYMAIN: function(state, e) {
			state.supplymain = e
		},
		// 选择要查看的某个账单详情
		SET_ZDITEM: function(state, e) {
			state.zditem = e
		},
		// 选择要查看的某个收支详情
		SET_FNCITEM: function(state, e) {
			state.fncitem = e
		},
		// 新增销售单商品
		SET_SALEGOODS: function(state, e) {
			state.salegoods = e
		},
		// 新增销售单司机信息
		SET_SALEDRIVERS: function(state, e) {
			state.saledrivers = e
		},
		// 新增销售单
		SET_SALEINFOS: function(state, e) {
			state.saleinfos = e
		},
		// 设置authorization
		SET_AUTHORIZATION: function(state, e) {
			state.authorization = e
		},
		// 设置shopid
		SET_SHOPID: function(state, e) {
			state.shopid = e
		},
		// 设置服务列表
		SET_SERVERLIST: function(state, e) {
			if (typeof e == 'number') {
				state.serverlist.splice(e, 1)
			} else
			if (e == 'clean') {
				state.serverlist = []
			} else if (typeof e == 'object') {
				if (state.serverlist.length == 0) {
					state.serverlist.push(e)
				} else {
					let status = state.serverlist.some(item =>
						item.itemId === e.itemId);
					if (status == false) {
						state.serverlist.push(e)
					} else {
						uni.showToast({
							icon: 'none',
							title: '已存在'
						})

					}
				}
			}
		},
		// 设置配件
		SET_PJLIST: function(state, e) {
			if (typeof e == 'number') {
				state.pjlist.splice(e, 1)
			} else
			if (e == 'clean') {
				console.log(e);
				state.pjlist = []
			} else if (typeof e == 'object') {
				if (state.pjlist.length == 0) {
					state.pjlist.push(e)
				} else {
					let status = state.pjlist.some(item =>
						item.itemId === e.itemId);
					if (status == false) {
						state.pjlist.push(e)
					} else {
						uni.showToast({
							icon: 'none',
							title: '已存在'
						})

					}
				}
			}
		},

		// 设置根据id请求的工单详情
		SET_ORDERINFO: function(state, e) {
			state.orderinfo = e
		},



		setbarheight: function(state, e) {
			uni.getSystemInfo({
				success: (res) => {
					console.log(res, 'res');
					state.barheight = res.statusBarHeight
					alert(res.statusBarHeight)
				}
			})
		}

	},
	actions: {},
	modules,
	// getters
})
export default store
