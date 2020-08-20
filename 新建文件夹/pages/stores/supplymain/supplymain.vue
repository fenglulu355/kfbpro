<template>
	<view class="cusmain">
		<view class="top"><topback :type="'two'" :topback="'供应商详情页'" :iscenter="true" :iswhite="true" @change="toback"></topback></view>
		<!-- 头部信息 -->
		<view
			class="headinfo"
			style="background: url(../../../static/images/bg.png);
				background-position: center;
				background-size: cover;
				background-repeat: no-repeat;"
		>
			<image v-if="supplymain.supplierAvatar" :src="userhead + supplymain.supplierAvatar" mode=""></image>
			<image v-else src="https://kfbnet2019.obs.cn-north-1.myhuaweicloud.com/userAvatar/userAvatar.jpg" mode=""></image>
			<view class="infos">
				<view class="title">{{ supplymain.supplierName }}</view>
				<view class="name-tle">
					<text class="name">{{ supplymain.supplierContacts }}</text>
					<text class="tel">{{ supplymain.supplierContactsPhone }}</text>
				</view>
				<view class="price">
					地址：
					<text>{{ supplymain.supplierProvinceName }}{{ supplymain.supplierCityName }}{{ supplymain.supplierCountyName }}{{ supplymain.supplierDetailedAddress }}</text>
				</view>
			</view>
		</view>
		<tabbar v-if="orgin==0" :tabbarlist="tabbarlist" :type="0" @change="tonav" :startindex="showindex"></tabbar>
		<tabbar v-if="orgin==1" :tabbarlist="saletab" :type="0" @change="xtonav" :startindex="showindex"></tabbar>
		<view class="pcontent">
			<!-- 销售 -->
			<view class="sales">
				<view class="salelist" v-if="saleli.length == 0"><text class="nodata">暂无数据</text></view>
				<view class="salelist" v-else>
					<view class="saleli" v-for="(item, index) in saleli" :key="index">
						<goodsitem :goodsinfo="item" :types="4"></goodsitem>
						<view class="btnbox">
							<view class="canle item" v-if="item.orderStatus == 1 || item.orderStatus == 2" @click="cancleorder(item)">取消订单</view>
							<view class="blue item" v-if="item.orderStatus == 3" @click="reseve(item)">确认收货</view>
							<view class="blue item" v-if="item.orderStatus == 4" @click="returngoods(item)">发起退货</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		<view class="addcus" @click="toadd">发起线上采购</view>
		<confirms :title="'取消订单'" :isshow="iscancle" @change="canclenote"></confirms>
	</view>
</template>

<script>
import topback from '../../../components/topback/topback.vue';
import { mapState, mapMutations } from 'vuex';
import caritem from '../../../components/listvertical/listvertical.vue';
import goodsitem from '../../../components/goodsitem/goodsitem';
import tabbar from '../../../components/tabbar/tabbar.vue';
import confirms from '../../../components/confirmbox/confirmbox.vue';

export default {
	data() {
		return {
			iscancle: false,
			showindex: 0,
			mshowindex: 0,
			salesmindex: 0,
			tabbarlist: ['全部', '待确认', '待发货', '已发货', '已完成', '已取消'],
			saletab: ['全部', '未结清', '已结清'],
			orderli: [
				{ time: '2+54684', type: '进行中', name: '政府', carnum: 'sdasda', income: '5465' },
				{ time: '2+54684', type: '进行中', name: '政府', carnum: 'sdasda', income: '5465' }
			],
			saleli: [],
			orgin: '',
			storeId: '',
			authorization: '',
			pageNum: 1,
			orderStatus: '',
			orderId: ''
		};
	},
	components: { topback, confirms, caritem, goodsitem, tabbar },
	onLoad(val) {
		this.orgin = val.type;
		this.storeId = uni.getStorageSync('shopid');
		this.authorization = uni.getStorageSync('atrztion');
		console.log(this.supplymain, 'a');
		if (this.supplymain.length == 0) {
			uni.showToast({
				icon: 'none',
				title: '暂无数据'
			});
			setTimeout(function() {
				uni.navigateTo({
					url: '../supply/supply'
				});
			}, 200);
		} else {
			if (this.orgin == 0) {
				let data = {
					storeId: this.storeId,
					type: 1,
					pageNum: 1,
					pageSize: 10,
					supplierId: this.supplymain.supplierId,
					orderStatus: this.orderStatus
				};
				this.requstptlist(data);
			} else {
				let data = {
					storeId: this.storeId,
					type: 1,
					pageNum: 1,
					pageSize: 10,
					orderStatus: this.orderStatus
				};
				this.requstlist(data);
			}
		}
	},
	computed: {
		...mapState(['supplymain'])
	},
	methods: {
		toback(e) {
			console.log(e);
			if (e == 'back') {
				uni.navigateTo({
					url: '../supply/supply'
				});
			}
		},
		requstptlist(data) {
			console.log(data);
			this.$request('/order/store/purchase/order/withPagingList', data, 'post', this.authorization).then(res => {
				console.log(res.datas, 'a');
				res.datas.forEach(res => {
					this.saleli.push(res);
				});
			});
		},
		requstlist(data) {
			console.log(data);
			this.$request('/order/store/private/purchase/order/info', data, 'post', this.authorization).then(res => {
				console.log(res.datas, 'a');
				res.datas.forEach(res => {
					this.saleli.push(res);
				});
			});
		},
		toadd() {
			// uni.navigateTo({
			// 	url: '../addsupply/addsupply'
			// });
		},
		// 取消订单
		cancleorder(item) {
			this.iscancle = true;
			this.orderId = item.orderId;
		},
		canclenote(e, a) {
			console.log(e, a);
			if (a == 'cancle') {
				this.iscancle = false;
			} else {
				console.log(1);
				if (e == 0) {
					uni.showToast({
						icon: 'none',
						title: '请输入取消理由'
					});
				} else {
					let data = {
						orderId: this.orderId,
						storeId: this.storeId,
						cancelledReasons: e
					};
					this.iscancle = false;
					this.sendcancle(data);
				}
			}
		},
		sendcancle(data) {
			this.$request('/order/store/purchase/order/cancelled/update', data, 'put', this.authorization, 'application/json').then(res => {
				console.log(res.datas, 'a');
				if (res.kfbCode == 200) {
					uni.showToast({
						title: '取消成功'
					});
					this.tonav(0);
				} else {
					uni.showToast({
						icon: 'none',
						title: res.kfbCode + res.kfbErrorMsg
					});
				}
			});
		},
		// 确认收货
		reseve(item) {
			console.log(item);
			uni.showModal({
				title: '确认收货',
				content: '是否确认收货',
				success: function(res) {
					if (res.confirm) {
						if (this.orgin == 0) {
							let data = {
								orderId: item.orderId,
								storeId: this.storeId
							};
							this.onlinesh(data);
						}
					} else if (res.cancel) {
						uni.showToast({
							icon: 'none',
							title: '取消操作'
						});
					}
				}
			});
		},
		returngoods(item) {
			console.log(item);
			uni.navigateTo({
				url: '../returngoodsmain/returngoodsmain'
			});
		},
		// 确认线上收货
		onlinesh(data) {
			this.$request('/order/store/order/completed/update', data, 'put', this.authorization, 'application/json').then(res => {
				console.log(res.datas, 'a');
				if (res.kfbCode == 200) {
					uni.showToast({
						title: '收货成功'
					});
					this.tonav(0);
				} else {
					uni.showToast({
						icon: 'none',
						title: res.kfbCode + res.kfbErrorMsg
					});
				}
			});
		},
		xtonav(index){
			this.showindex=index
		},
		tonav(index) {
			this.showindex = index;
			console.log(index, 'index');
			this.saleli = [];
			if (index == 0) {
				this.orderStatus = '';
			} else if (index == 1) {
				this.orderStatus = 1;
			} else if (index == 2) {
				this.orderStatus = 2;
			} else if (index == 3) {
				this.orderStatus = 3;
			} else if (index == 4) {
				this.orderStatus = 4;
			} else if (index == 5) {
				this.orderStatus = 5;
			}
			let data = {
				storeId: this.storeId,
				type: 1,
				pageNum: 1,
				pageSize: 10,
				supplierId: this.supplymain.supplierId,
				orderStatus: this.orderStatus
			};
			this.requstptlist(data);
		},
		salestonav(index) {
			this.salesmindex = index;
			console.log(index, 'index');
		}
	}
};
</script>

<style lang="less" scoped>
.cusmain {
	width: 100%;
	height: 100%;
	position: relative;
	.top {
		width: 100%;
		position: absolute;
		top: 0;
	}
}
.nodata {
	display: inline-block;
	width: 100%;
	font-size: 32rpx;
	text-align: center;
	box-sizing: border-box;
	padding-top: 150rpx;
}
.pcontent {
	width: 100%;
	box-sizing: border-box;
	padding: 0 30rpx;
	// background: #007AFF;
	border-radius: 5rpx;
	// position: absolute;
	// left: 0;

	// top: 300rpx;
}
.addcus {
	width: calc(100% - 60rpx);
	height: 100rpx;
	background: #2d8cf0;
	text-align: center;
	line-height: 100rpx;
	color: #ffffff;
	position: fixed;
	bottom: 20rpx;
	left: 50%;
	transform: translateX(-50%);
	box-shadow: 0px 4px 6px 0px rgba(250, 250, 250, 0.6);
}
.tobtn {
	width: 100%;
	box-sizing: border-box;
	padding: 0 30rpx;
	position: fixed;
	bottom: 20rpx;
	left: 50%;
	transform: translateX(-50%);
	display: flex;
	justify-content: space-between;
	.box {
		width: 30%;
		height: 80rpx;
		line-height: 80rpx;
		color: #ffffff;
		font-size: 32rpx;
		text-align: center;
	}
	.add {
		background: #2d8cf0;
	}
	.collection {
		background: #e23a3a;
	}
	.reduction {
		background: #999999;
	}
}

.sales {
	box-sizing: border-box;
	padding: 30rpx 0;
	.salelist {
		width: 100%;
		.saleli {
			box-sizing: border-box;
			padding: 25rpx 15rpx;
			background: #ffffff;
			margin: 25rpx 0;
		}
	}
}
.btnbox {
	box-sizing: border-box;
	padding-bottom: 20rpx;
	display: flex;
	justify-content: flex-end;
	.item {
		width: 200rpx;
		height: 60rpx;
		background: #e23a3a;
		border-radius: 5rpx;
		font-size: 32rpx;
		color: #ffffff;
		text-align: center;
		line-height: 60rpx;
	}
	.blue {
		background: #2d8cf0;
	}
}
.headinfo {
	width: 100%;
	height: 400rpx;
	display: flex;
	justify-content: space-between;
	align-items: center;
	box-sizing: border-box;
	padding: 50rpx 30rpx;
	color: #ffffff;
	image {
		width: 118rpx;
		height: 118rpx;
		border-radius: 50%;
	}
	.infos {
		width: 80%;
		box-sizing: border-box;
		padding-left: 20rpx;
		align-self: center;
		.title {
			font-size: 32rpx;
			box-sizing: border-box;
			padding-top: 20rpx;
		}
		.name-tle {
			box-sizing: border-box;
			padding-top: 20rpx;
			font-size: 28rpx;
		}

		.tel {
			font-size: 28rpx;
			box-sizing: border-box;
			padding-left: 20rpx;
		}
		.price {
			font-size: 24rpx;
			box-sizing: border-box;
			padding-top: 30rpx;
		}
	}
	.edit {
		align-self: center;
		font-size: 28rpx;
		text {
			box-sizing: border-box;
			padding-left: 20rpx;
		}
	}
}
</style>
