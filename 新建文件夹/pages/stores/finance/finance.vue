<template>
	<view class="service">
		<view class="headertop">
			<!-- <view class="bg isbgs" v-show="isShow"></view> -->
			<topback :topback="'财务'" :type="'one'" :isleft="true" :isbule="false" :isaddpic="true" @change="tobacks"></topback>
			<view class="selectbox">
				<view class="pop" v-if="ispop">
					<view class="addnew" :class="issel == 0 ? 'sel' : ''" @click="ptcg">发起平台采购</view>
					<view class="fzgl" :class="issel == 1 ? 'sel' : ''" @click="xxcg">发起线下采购</view>
					<view class="addnew" :class="issel == 2 ? 'sel' : ''" @click="addressgl">收获地址管理</view>
				</view>
				<view class="tabs"><tabbar :startindex="showindex" :tabbarlist="tabbarlist" :type="0" @change="tonav"></tabbar></view>
			</view>
		</view>
		<view class="content" v-if="showindex == 0">
			<view class="selectboxt" @click="showcurbox">
				{{ selettitle }}
				<image src="../../../static/images/icon_xiala@2x.png" mode=""></image>
			</view>
			<view class="datas">
				<view class="time" @click="tochangedata">
					<text>{{ year }}年{{ month }}月</text>
					<image src="../../../static/images/icon_xiala@2x.png" mode=""></image>
				</view>
				<view class="income">
					<text v-if="groupByType[0]">收入￥{{groupByType[0].amount}}</text>
					<text v-if="groupByType[1]">支出￥{{groupByType[1].amount}}</text>
				</view>
			</view>
			<view class="cuslist" v-if="cuslist.length == 0"><text class="nodata">暂无数据</text></view>
			<view class="cuslist" v-else>
				<view class="cusli" v-for="(item, index) in cuslist" :key="index" @click="tomain(item, index)">
					<image
						v-if="item.incomeExpendTypeValue == 2 || item.incomeExpendTypeValue == 7 || item.incomeExpendTypeValue == 4"
						src="../../../static/images/icon_shouru.png"
						mode=""
					></image>
					<image v-if="item.incomeExpendTypeValue == 1" src="../../../static/images/icon_tuikuan.png" mode=""></image>
					<image
						v-if="item.incomeExpendTypeValue == 10 || item.incomeExpendTypeValue == 5 || item.incomeExpendTypeValue == 12"
						src="../../../static/images/icon_zhichu2.png"
						mode=""
					></image>
					<image
						v-if="item.incomeExpendTypeValue == 0 || item.incomeExpendTypeValue == 13 || item.incomeExpendTypeValue == 6"
						src="../../../static/images/icon_shouru2.png"
						mode=""
					></image>
					<view class="c-left">
						<view class="name">
							<text>{{ item.incomeExpendType }}</text>
							<text v-if="item.incomeExpendTypeValue == 2 || item.incomeExpendTypeValue == 7 || item.incomeExpendTypeValue == 4|| item.incomeExpendTypeValue == 6" class="gs">
								+{{ item.incomeExpendAmount }}
							</text>
							<text v-if="item.incomeExpendTypeValue == 1" class="xs">+{{ item.incomeExpendAmount }}</text>
							<text v-if="item.incomeExpendTypeValue == 10 || item.incomeExpendTypeValue == 5 || item.incomeExpendTypeValue == 12" class="xz">
								+{{ item.incomeExpendAmount }}
							</text>
							<text v-if="item.incomeExpendTypeValue == 0 || item.incomeExpendTypeValue == 13 " class="gs">
								-{{ item.incomeExpendAmount }}
							</text>
						</view>
						<view class="time">{{ item.incomeExpendTransactionHour }}</view>
					</view>
				</view>
			</view>
			<view class="curpop" v-show="iscurpop">
				<view class="bg" @click="iscurpop = false"></view>
				<view class="popbox">
					<view class="popli" :class="inall ? 'sel' : 'gay'" @click="alltype">全部类型</view>
					<view class="title">支出</view>
					<view class="incomepop ">
						<view class="item" v-for="(item, index) in expendtype" :key="index" @click="changeexpendsel(index, item)" :class="exptypeindex == index ? 'sel' : 'gay'">
							{{ item.dictNameZh }}
						</view>
					</view>
					<view class="title">收入</view>
					<view class="incomepop">
						<view class="item" v-for="(item, index) in incometype" :key="index" @click="changeincomsel(index, item)" :class="inctypeindex == index ? 'sel' : 'gay'">
							{{ item.dictNameZh }}
						</view>
					</view>
				</view>
			</view>
		</view>
		<view class="content" v-if="showindex == 1">
			<view class="selectboxt" @click="iszdpop = true">
				{{ zdttitle }}
				<image src="../../../static/images/icon_xiala@2x.png" mode=""></image>
			</view>
			<view class="datas">
				<view class="time" @click="tochangedata">
					<text>{{ year }}年{{ month }}月</text>
					<image src="../../../static/images/icon_xiala@2x.png" mode=""></image>
				</view>
				<view class="income">
					<text v-if="groupByType[2]">总额￥{{groupByType[2].amount}}</text>
				</view>
			</view>
			<view class="cuslist" v-if="zdlist.length == 0"><text class="nodata">暂无数据</text></view>
			<view class="cuslist" v-else>
				<view class="cusli" v-for="(item, index) in zdlist" :key="index" @click="tozdmain(item, index)">
					<image v-if="zdindex == 1" :src="userhead + item.supplierAvatar" mode=""></image>
					<image v-if="zdindex == 0" :src="userhead + item.driverAvatar" mode=""></image>
					<view class="c-left">
						<view class="name">
							<text v-if="zdindex == 0">{{ item.driverName }}</text>
							<text v-if="zdindex == 1">{{ item.supplierName }}</text>
							<text class="xs">欠款 {{ item.accountBalance }}</text>
							<!-- <text v-if="item.type == 1" class="xs">欠款 {{ item.price }}</text> -->
						</view>
						<view class="time">{{ item.updateTimeStr }}</view>
					</view>
				</view>
			</view>
			<view class="curpop zd" v-show="iszdpop">
				<view class="bg" @click="iszdpop = false"></view>
				<view class="popbox">
					<view class="incomepop ">
						<view class="item" v-for="(item, index) in zdtype" :key="index" @click="changezdsel(index, item)" :class="zdindex == index ? 'sel' : 'gay'">
							{{ item }}
						</view>
					</view>
				</view>
			</view>
		</view>
		<minpopup size="height" :show="show1" @close="close"><minpicker :endTime="endTime" :startTime="startTimes" @cancel="cancel" @sure="sure"></minpicker></minpopup>
	</view>
</template>

<script>
import cusitem from '../../../components/listvertical/listvertical.vue';
import topback from '../../../components/topback/topback.vue';
import Select from '../../../components/Select/Select.vue';
import tabbar from '../../../components/tabbar/tabbar.vue';
import minpicker from '../../../components/min-picker/min-picker.vue';
import minpopup from '../../../components/min-picker/min-popup.vue';
	import {
		mapState,
		mapMutations
	} from 'vuex';
export default {
	data() {
		return {
			show1: false,
			ispop: false,
			iscurpop: false,
			iszdpop: false,
			tabbarlist: ['收入/支出', '账单'],
			inall: true,
			inctypeindex: null,
			exptypeindex: null,
			showindex: 0,
			selindex: 0,
			startTimes: [2010, 6, 1],
			endTime: 2046,
			selettitle: '全部交易类型',
			zdttitle: '客户账单',
			zdtype: ['客户账单', '供应商账单'],
			zdindex: 0,
			select: ['全部', '条件一', '条件一', '条件一', '条件一', '条件一', '条件一'],
			incometype: [],
			expendtype: [],
			zdlist: [],
			cuslist: [],
			storeId: '',
			atrztion: '',
			searchKeywords: '',
			year: '',
			mouth: '',
			pageNum: 1,
			searchKeywords: '',
			beginTimeStr: '',
			endTimeStr: '',
			incomeExpendType: '',
			selectType: '',
			zclist: [],
			srlist: [],
			groupByType:[]//收支总额
		};
	},
	onLoad() {
		this.storeId = uni.getStorageSync('shopid');
		this.atrztion = uni.getStorageSync('atrztion');
		this.requesttype();
		var date = new Date();
		this.year = date.getFullYear();
		this.month = date.getMonth() + 1;
		console.log(this.year, this.month);
		let data = {
				storeId: this.storeId,
				pageNum: this.pageNum,
				pageSize: 10,
				beginTimeStr: this.year + `-0` + this.month + `-` + `01`,
				endTimeStr: this.year + `-0` + this.month + `-` + `31`
			},
			zddata = {
				storeId: this.storeId,
				pageNum: this.pageNum,
				pageSize: 10,
				orderBeginTimeStr: this.year + `-0` + this.month + `-` + `01`,
				orderEndTimeStr: this.year + `-0` + this.month + `-` + `31`
			};
		this.requstlist(data);
		this.requstzd(zddata);
	},
	onReachBottom() {
		console.log('触底');
		this.pageNum = this.pageNum + 1;
		this.commonrequst();
	},
	computed: {
		// totalincome() {
		// 	return this.i.reduce((previousValue, item) => previousValue + item.cart_num * item.storeGoodsSalePrice, 0);
		// }
	},
	methods: {
		...mapMutations(['SET_FNCITEM','SET_ZDITEM']),
		tobacks(e, type) {
			console.log(e, type);
			if (e == 'back') {
				uni.switchTab({
					url: '../Shome/Shome'
				});
			} else if (type == 'search') {
				this.pageNum=1
				this.searchKeywords = e;
				this.cuslist = [];
				this.zdlist = [];
				this.commonrequst();
			}else if(e=='showpop'){
				console.log(1);
				uni.navigateTo({
					url:'../addincome/addincome'
				})
			}
		},
		requesttype() {
			this.$request('/system/dict/withoutPagingList?treeCode=INCOME_EXPEND_TYPE', '', 'get', this.atrztion).then(res => {
				let arr = res.datas;
				arr.forEach(res => {
					if (res.dictNameZh.indexOf('支出') != -1) {
						console.log(1);
						this.expendtype.push(res);
					} else if (res.dictNameZh.indexOf('减免') != -1) {
						this.expendtype.push(res);
					} else if (res.dictNameZh.indexOf('收入') != -1) {
						this.incometype.push(res);
					}
				});
				console.log(arr);
			});
		},
		requstlist(data) {
			this.$request('/organization/store/income/expend/withPagingList', data, 'post', this.atrztion).then(res => {
				let arr = res.datas;
				arr.forEach(res => {
					this.cuslist.push(res);
				});
				this.groupByType=res.additionalParameters.groupByType
				console.log( res);
			});
		},
		requstzd(data) {
			this.$request('/organization/store/income/expend/driver/user/info', data, 'post', this.atrztion).then(res => {
				let arr = res.datas;
				arr.forEach(res => {
					this.zdlist.push(res);
				});
				console.log(arr, 'arr');
			});
		},
		requstgyszd(data) {
			this.$request('/organization/store/income/expend/supplier/info', data, 'post', this.atrztion).then(res => {
				let arr = res.datas;
				arr.forEach(res => {
					this.zdlist.push(res);
				});
				console.log(arr, 'arr');
			});
		},
		showcurbox() {
			this.iscurpop = true;
		},
		tochangedata() {
			this.show1 = true;
		},
		commonrequst() {
			if (this.showindex == 0) {
				let data = {
					storeId: this.storeId,
					pageNum: this.pageNum,
					pageSize: 10,
					beginTimeStr: this.year + `-0` + this.month + `-` + `01`,
					endTimeStr: this.year + `-0` + this.month + `-` + `31`,
					searchKeywords: this.searchKeywords,
					incomeExpendType: this.incomeExpendType,
					selectType: this.selectType
				};
				this.requstlist(data);
			} else {
				if (this.zdindex == 0) {
					let zddata = {
						storeId: this.storeId,
						pageNum: this.pageNum,
						pageSize: 10,
						orderBeginTimeStr: this.year + `-0` + this.month + `-` + `01`,
						orderEndTimeStr: this.year + `-0` + this.month + `-` + `31`,
						searchKeywords: this.searchKeywords
					};
					this.requstzd(zddata);
				} else {
					let zddata = {
						storeId: this.storeId,
						pageNum: this.pageNum,
						pageSize: 10,
						orderBeginTimeStr: this.year + `-0` + this.month + `-` + `01`,
						orderEndTimeStr: this.year + `-0` + this.month + `-` + `31`,
						searchKeywords: this.searchKeywords
					};
					this.requstgyszd(zddata);
				}
			}
		},
		// 取消事件
		cancel() {
			this.show1 = false;
		},
		// 确认年月
		sure(e) {
			console.log(e, 'a');
			this.year = e.a;
			this.month = e.b;
			this.pageNum = 1;
			this.searchKeywords = '';
			setTimeout(function() {
				this.show1 = false;
			}, 500);
			if (this.showindex == 0) {
				this.cuslist = [];
				let data = {
					storeId: this.storeId,
					pageNum: this.pageNum,
					pageSize: 10,
					beginTimeStr: this.year + `-0` + this.month + `-` + `01`,
					endTimeStr: this.year + `-0` + this.month + `-` + `31`,
					searchKeywords: this.searchKeywords,
					incomeExpendType: this.incomeExpendType,
					selectType: this.selectType
				};
				console.log(data);
				this.requstlist(data);
			} else {
				if (this.zdindex == 0) {
					this.zdlist = [];
					let zddata = {
						storeId: this.storeId,
						pageNum: this.pageNum,
						pageSize: 10,
						orderBeginTimeStr: this.year + `-0` + this.month + `-` + `01`,
						orderEndTimeStr: this.year + `-0` + this.month + `-` + `31`,
						searchKeywords: this.searchKeywords
					};
					this.requstzd(zddata);
				} else {
					this.zdlist = [];
					let zddata = {
						storeId: this.storeId,
						pageNum: this.pageNum,
						pageSize: 10,
						orderBeginTimeStr: this.year + `-0` + this.month + `-` + `01`,
						orderEndTimeStr: this.year + `-0` + this.month + `-` + `31`,
						searchKeywords: this.searchKeywords
					};
					this.requstgyszd(zddata);
				}
			}

			// 输出 { year: 2020,month: 3,day: 23}
		},
		// picker显示
		showPop() {
			this.show = true;
		},
		// 关闭picker
		close() {
			this.show = false;
		},

		tomain(item, index) {
			console.log(item);
			if(item.incomeExpendTypeValue=='6'){
				uni.showToast({
					icon: 'none',
					title: '其他收入无详情'
				});
			}else{
				this.SET_FNCITEM(item)
				setTimeout(function() {
					uni.navigateTo({
						url: '../incmain/incmain'
					});
				}, 200);
			}
			
		},
		tozdmain(item, index) {
			console.log(item);
			this.SET_ZDITEM(item)
			console.log(this.zdindex);
			if(this.zdindex==0){
				uni.navigateTo({
					url: '../billmain/billmain?type=0'
				});
			}else{
				uni.navigateTo({
					url: '../billmain/billmain?type=1'
				});
			}
			
		
		},
		// 账单选择类型
		changezdsel(index, item) {
			console.log(item);
			this.zdindex = index;
			this.zdlist = [];
			this.pageNum = 1;
			if (index == 0) {
				let zddata = {
					storeId: this.storeId,
					pageNum: this.pageNum,
					pageSize: 10,
					orderBeginTimeStr: this.year + `-0` + this.month + `-` + `01`,
					orderEndTimeStr: this.year + `-0` + this.month + `-` + `31`,
					searchKeywords: this.searchKeywords
				};
				this.requstzd(zddata);
			} else {
				let zddata = {
					storeId: this.storeId,
					pageNum: this.pageNum,
					pageSize: 10,
					orderBeginTimeStr: this.year + `-0` + this.month + `-` + `01`,
					orderEndTimeStr: this.year + `-0` + this.month + `-` + `31`,
					searchKeywords: this.searchKeywords
				};
				this.requstgyszd(zddata);
			}
			var that = this;
			setTimeout(function() {
				that.iszdpop = false;
			}, 200);
		},
		// 选择全部类型
		alltype() {
			this.inall = true;
			this.exptypeindex = null;
			this.inctypeindex = null;
			this.cuslist = [];
			this.pageNum = 1;
			this.selettitle = '全部交易类型';
			this.incomeExpendType = '';
			let data = {
				storeId: this.storeId,
				pageNum: 1,
				pageSize: 10,
				beginTimeStr: this.year + `-0` + this.month + `-` + `01`,
				endTimeStr: this.year + `-0` + this.month + `-` + `31`,
				searchKeywords: this.searchKeywords,
				incomeExpendType: this.incomeExpendType,
				selectType: this.selectType
			};
			this.requstlist(data);
			var that = this;
			setTimeout(function() {
				that.iscurpop = false;
			}, 200);
		},
		//选择支出
		changeexpendsel(index, item) {
			console.log(item);
			this.selettitle = item.dictNameZh;
			this.inall = false;
			this.exptypeindex = index;
			this.inctypeindex = null;
			this.selectType = 2;
			this.cuslist = [];
			this.pageNum = 1;
			this.incomeExpendType = item.dictValue;
			let data = {
				storeId: this.storeId,
				pageNum: this.pageNum,
				pageSize: 10,
				beginTimeStr: this.beginTimeStr,
				endTimeStr: this.endTimeStr,
				searchKeywords: this.searchKeywords,
				incomeExpendType: this.incomeExpendType,
				selectType: this.selectType
			};
			this.requstlist(data);
			var that = this;
			setTimeout(function() {
				that.iscurpop = false;
			}, 200);
		},
		// 选择收入
		changeincomsel(index, item) {
			console.log(item);
			this.inall = false;
			this.inctypeindex = index;
			this.exptypeindex = null;
			this.selectType = 1;
			this.pageNum = 1;
			this.selettitle = item.dictNameZh;
			this.cuslist = [];
			this.incomeExpendType = item.dictValue;
			let data = {
				storeId: this.storeId,
				pageNum: this.pageNum,
				pageSize: 10,
				beginTimeStr: this.year + `-0` + this.month + `-` + `01`,
				endTimeStr: this.year + `-0` + this.month + `-` + `31`,
				searchKeywords: this.searchKeywords,
				incomeExpendType: this.incomeExpendType,
				selectType: this.selectType
			};
			this.requstlist(data);
			var that = this;
			setTimeout(function() {
				that.iscurpop = false;
			}, 200);
		},
		tocuritem(index, item) {
			console.log(index, item, 'e');
			uni.navigateTo({
				url: '../cusmain/cusmain'
			});
		},
		edit(val) {
			console.log(val, 'edit');
			uni.navigateTo({
				url: '../editserv/editserv'
			});
		},
		del(val) {
			console.log(val, 'del');
		},
		getSelect(val) {
			console.log(val);
		},
		togroup() {
			uni.navigateTo({
				url: '../editservgroup/editservgroup'
			});
		},
		tonav(val) {
			this.showindex = val;
			this.pageNum = 1;
			console.log(this.showindex);
		}
	},
	components: {
		cusitem,
		topback,
		Select,
		tabbar,
		minpopup,
		minpicker
	}
};
</script>

<style lang="less" scoped>
.service {
	width: 100%;
	box-sizing: border-box;
	padding-top: 350rpx;
	.selectboxt {
		width: 100%;
		height: 100rpx;
		background: #ffffff;
		line-height: 100rpx;
		position: fixed;
		top: 200rpx;
		left: 0;
		z-index: 1111111;
		font-size: 32rpx;
		color: #666666;
		text-align: center;
		image {
			width: 21rpx;
			height: 12rpx;
			padding-left: 20rpx;
		}
	}
	.headertop {
		background: #ffffff;
		position: fixed;
		width: 100%;
		z-index: 111;
		top: 0;
		left: 0;
		.bg {
			position: absolute;
			top: 0;
			z-index: 111;
			width: 100%;
			height: 200rpx;
		}
		.selectbox {
			margin-top: 100rpx;
			background: #ffffff;
			width: 100%;
			height: 100rpx;
			display: flex;
			justify-content: space-between;
			align-items: center;
			position: relative;
			.pop {
				width: 30%;
				background: #ffffff;
				position: absolute;
				top: -10rpx;
				right: 40rpx;
				z-index: 11111111111111111;
				font-size: 28rpx;

				view {
					text-align: center;
					line-height: 60rpx;
				}
				.sel {
					color: #2d8cf0;
				}
			}
		}
		.tabs {
			width: 100%;
			// height: 100rpx;
			background: #ffffff;
		}
	}
	.content {
		// background: #007aff;
	}
	.datas {
		width: 100%;
		box-sizing: border-box;
		padding: 0 30rpx;
		.time {
			font-size: 32rpx;
			color: #333333;
			image {
				padding-left: 20rpx;
				width: 21rpx;
				height: 12rpx;
				position: relative;
				bottom: 2rpx;
			}
		}
		.income {
			color: #666666;
			font-size: 28rpx;
			box-sizing: border-box;
			padding-top: 20rpx;
			text {
				margin-right: 20rpx;
			}
		}
	}
	.curpop {
		position: fixed;
		bottom: 0;
		left: 0;
		width: 100%;
		z-index: 11111111111;
		height: 10000rpx;
		.bg {
			background: rgba(0, 0, 0, 0.5);
			width: 100%;
			height: 10000rpx;
		}
		.popbox {
			position: absolute;
			bottom: 0;
			background: #ffffff;
			width: 100%;
			box-sizing: border-box;
			padding: 30rpx 30rpx;
			border-radius: 16px 16px 0px 0px;
			max-height: 800rpx;
			overflow-y: scroll;
			.popli {
				width: 300rpx;
				height: 100rpx;
				border-radius: 5px;
				text-align: center;
				line-height: 100rpx;
				font-size: 32rpx;

				margin-bottom: 20rpx;
			}
			.title {
				font-size: 30rpx;
				color: #666666;
			}
			.incomepop {
				box-sizing: border-box;
				padding-top: 20rpx;
				display: flex;
				align-items: center;
				flex-wrap: wrap;
				.item {
					padding: 0 18rpx;
					height: 98rpx;
					border-radius: 5px;
					text-align: center;
					line-height: 98rpx;
					font-size: 32rpx;

					margin: 0 20rpx 20rpx 0;
				}
			}
		}
		.gay {
			background: #e5e5e5;
			color: #666666;
		}
		.sel {
			transition: background-color 0.3s ease;
			background: #2d8cf0;
			color: #ffffff;
		}
	}
	.zd {
		.popbox {
			min-height: 350rpx;
			.incomepop {
				display: flexbox;
				justify-content: space-between;
				align-items: center;
				box-sizing: border-box;
				padding-top: 100rpx;
				.item {
					width: 40%;
				}
			}
		}
	}
	.cuslist {
		width: 100%;
		box-sizing: border-box;
		padding: 30rpx 20rpx;
		.nodata {
			display: inline-block;
			width: 100%;
			font-size: 32rpx;
			text-align: center;
			box-sizing: border-box;
			padding-top: 150rpx;
		}
		.cusli {
			background: #ffffff;
			display: flex;
			justify-content: space-between;
			align-items: center;
			image {
				width: 105rpx;
				height: 100rpx;
			}
			.c-left {
				width: 83%;
				border-bottom: 1rpx solid #e5e5e5;
				box-sizing: border-box;
				padding: 30rpx 0;
				.name {
					font-size: 32rpx;
					color: #333333;
					display: flex;
					line-height: 60rpx;
					justify-content: space-between;
					.gs {
						color: #e23a3a;
					}
					.xs,
					.xt {
						color: #ffa928;
					}

					.xz {
						color: #67c23a;
					}
				}
				.time {
					font-size: 24rpx;
					color: #999999;
				}
			}
			.c-right {
				width: 20%;
				font-size: 28rpx;
			}
		}
	}
}
</style>
