<template>
	<view class="cusmain">
		<view class="top"><topback :type="'two'" :topback="'客户详情页'" :iscenter="true" :iswhite="true" :istext="'删除'"></topback></view>
		<!-- 头部信息 -->
		<view
			class="headinfo"
			style="background: url(../../../static/images/bg.png);
				background-position: center;
				background-size: cover;
				background-repeat: no-repeat;"
			>
			<image :src="userhead + driverinfo.driverAvatar" mode=""></image>
			<view class="infos">
				<view class="title">{{ driverinfo.driverName }}</view>
				<view class="name-tle">
					<text class="name">{{ driverinfo.driverUserContacts }}</text>
					<text class="tel">{{ driverinfo.driverPhone }}</text>
				</view>
				<!-- <view class="price">
					余额：
					<text>-500.00</text>
				</view> -->
			</view>
			<view class="edit" @click="topage('editinfo')">
				编辑
				<text>></text>
			</view>
		</view>
		<view class="pcontent">
			<!-- tabbar -->
			<tabbar :tabbarlist="tabbarlist" :type="0" @change="tonav" :startindex="showindex"></tabbar>
			<!-- 车辆 -->
			<view class="carlist" v-if="showindex == 0">
				<view class="carli" v-for="(item, index) in cuslist" :key="index">
					<image :src="carpic + item.carModelsNameTwo + '.png'" mode=""></image>
					<view class="i-left">
						<view class="shopname">{{ item.carModelsName }}</view>
						<view class="carinfo">
							<text class="carnum">{{ item.carName }}</text>
							<text class="km">{{ item.carLastMaintenanceMileage }} KM</text>
						</view>
					</view>
				</view>
				<view class="tobtn">
					<view class="add box" @click="topage('addcar')">新增车辆</view>
					<view class="collection box">统一收款</view>
					<view class="reduction box">减免条款</view>
				</view>
			</view>
			<!-- 工单 -->
			<view class="goodsinfo" v-if="showindex == 1">
				<tabbar :tabbarlist="mintab" :type="1" @change="mtonav" :startindex="mshowindex"></tabbar>
				<view class="orderlist">
					<view class="orderli" v-for="(item, index) in orderli" :key="index">
						<view class="o-top" @click="tomain(item, index)">
							<text class="time">{{ item.orderAddTimeStr }}</text>
							<text class="type" v-if="item.orderStatus == 1">进行中</text>
							<text class="type" v-if="item.orderStatus == 3">已作废</text>
							<text class="type" v-if="item.orderStatus == 2 && item.orderNodeStatus == 1">未结清</text>
							<text class="type" v-if="item.orderStatus == 2 && item.orderNodeStatus == 2">已结清</text>
						</view>
						<view class="o-center">
							<view class="pic" @click="tomain(item, index)"><image src="../../../static/images/img_weixiu.png" mode=""></image></view>
							<view class="oc-center">
								<view class="name">
									<text class="names" @click="tomain(item, index)">{{ item.driverUserName }}</text>
									<image @click="makecll(item.orderContactsPhone)" src="../../../static/images/otel.png" mode=""></image>
								</view>
								<view class="carnum" @click="tomain(item, index)">{{ item.driverUerCarPlateNumber }}</view>
								<view class="incomes">
									<view class="income" @click="tomain(item, index)">
										预计收入
										<text class="text">￥{{ item.orderAmountsPayable }}</text>
									</view>
									<view class="toopen" @click="showpel(index)">
										<text v-html="pselidx == index ? '收起' : '展开'"></text>
										<text>></text>
									</view>
								</view>

								<view class="pricemain" :class="index == pselidx ? 'psle' : ''" @click="tomain(item, index)">
									<view class="priceli">
										<text>配件金额</text>
										<text>¥{{ item.orderReplacementParts.detailStageAmount }}</text>
									</view>
									<view class="priceli">
										<text>服务金额</text>
										<text>¥{{ item.orderServiceItems.detailStageAmount }}</text>
									</view>
									<view class="priceli">
										<text>优惠金额</text>
										<text>¥{{ item.orderDiscountAmount }}</text>
									</view>
									<view class="priceli">
										<text>待收金额</text>
										<text>¥{{ item.orderTotalAmount - item.orderDiscountAmount - item.orderAmountPaid }}</text>
										<!-- <text>¥{{ item.orderAmountsPayable }}</text> -->
									</view>
								</view>
							</view>
						</view>
						<view class="o-bot">
							<view class="cancle" v-if="item.orderStatus == 1" @click="cancalorder(item)">取消订单</view>
							<view class="accounts" @click="tocollection(item)" v-if="item.orderStatus == 1">结算</view>
						</view>
					</view>
				</view>
			</view>
			<!-- 销售 -->
			<view class="sales" v-if="showindex == 2">
				<tabbar :tabbarlist="saletab" :type="1" @change="salestonav" :startindex="salesmindex"></tabbar>
				<view class="salelist">
					<view class="saleli"
					 v-for="(item, index) in saleli" 
					 :key="index">
					 <goodsitem :goodsinfo="item" 
					 :types="1"></goodsitem>
					 </view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
import topback from '../../../components/topback/topback.vue';
import tabbar from '4../../../components/tabbar/tabbar.vue';
import caritem from '../../../components/listvertical/listvertical.vue';
import goodsitem from '../../../components/goodsitem/goodsitem';
import { mapState, mapMutations } from 'vuex';
export default {
	data() {
		return {
			showindex: 0,
			mshowindex: 0,
			salesmindex: 0,
			driverinfo: [],
			tabbarlist: ['车辆', '工单', '销售'],
			mintab: ['全部', '进行中', '未结清', '已结清', '已作废'],
			saletab: ['全部', '未结清', '已结清','已作废'],
			orderli: [],
			saleli: [],
			cuslist: [],
			driverId: '',
			storeId: '',
			pageNum: 1,
			orderpageNum: 1,
			salepageNum: 1,
			atrztion: '',
			pselidx: null,
			orderStatus: '',
			orderNodeStatus: '',
			saleorderStatus: ''
		};
	},
	components: { topback, tabbar, caritem, goodsitem },
	onLoad(val) {
		this.driverId = val.driverId;
		this.storeId = uni.getStorageSync('shopid');
		this.atrztion = uni.getStorageSync('atrztion');
		let data = {
				driverUserId: this.driverId,
				storeId: this.storeId
			},
			cardata = {
				pageNum: 1,
				pageSize: 10
			},
			orderdata = {
				storeId: this.storeId, //门店ID
				driverId: this.driverId,
				pageNum: 1,
				pageSize: 10
			};
		this.requestinfo(data);
		this.requestcarinfo();
		this.requestorderinfo(orderdata);
		this.requestseleinfo(orderdata);
	},
	onReachBottom() {
		if (this.showindex == 0) {
			this.pageNum = this.pageNum + 1;
			let orderdata = {
				pageNum: this.pageNum,
				pageSize: 10
			};
			this.requestcarinfo(orderdata);
		} else if (this.showindex == 1) {
			this.orderpageNum = this.orderpageNum + 1;
			let orderdata = {
				storeId: this.storeId, //门店ID
				driverId: this.driverId,
				pageNum: this.orderpageNum,
				orderStatus: this.orderStatus,
				orderNodeStatus: this.orderNodeStatus,
				pageSize: 10
			};
			this.requestorderinfo(orderdata);
		} else if (this.showindex == 2) {
			this.salepageNum = this.salepageNum + 1;
			let orderdata = {
				storeId: this.storeId, //门店ID
				driverId: this.driverId,
				pageNum: this.salepageNum,
				orderStatus: this.saleorderStatus,
				pageSize: 10
			};
			this.requestseleinfo(orderdata);
		}
	},
	methods: {
		...mapMutations(['SET_ORDERINFO']),
		topage(url) {
			console.log(url);
			uni.navigateTo({
				url: `../${url}/${url}?driverId=` + this.driverId
			});
		},
		// 请求司机信息
		requestinfo(data) {
			this.$request('/organization/driver/user/store/info', data, 'post', this.atrztion, '').then(res => {
				this.driverinfo = res.datas;
				console.log(this.driverinfo);
				// this.SET_ORDERINFO();
			});
		},
		// 查询司机车辆信息
		requestcarinfo(data) {
			this.$request('/organization/admin/driver/user/car/withPagingList?driverId=' + this.driverId, data, 'get', this.atrztion, 'application/json').then(res => {
				res.datas.forEach(res => {
					this.cuslist.push(res);
				});

				console.log(res.datas, 'aaaaaaaaaaaaaaa');
			});
		},
		// 查询司机对应工单信息
		requestorderinfo(data) {
			this.$request('/order/store/order/withPagingList', data, 'post', this.atrztion).then(res => {
				res.datas.forEach(res => {
					this.orderli.push(res);
				});
				console.log(this.orderli, 'a');
			});
		},
		// 查询司机销售信息
		requestseleinfo(data) {
			this.$request('/order/store/sale/order/withPagingList', data, 'post', this.atrztion).then(res => {
				res.datas.forEach(res => {
					this.saleli.push(res);
				});
				console.log(this.saleli, 'saleli');
			});
		},
		tonav(index) {
			this.showindex = index;
			console.log(index, 'index');
		},
		mtonav(e) {
			this.mshowindex = e;
			this.orderli = [];
			this.orderpageNum = 1;
			// 全部
			if (e == 0) {
				this.orderStatus = '';
				this.orderNodeStatus = '';
			}
			// 进行中
			else if (e == 1) {
				this.orderStatus = 1;
				this.orderNodeStatus = '';
			}
			// 未结清
			else if (e == 2) {
				this.orderStatus = 2;
				this.orderNodeStatus = 1;
			}
			// 已结清
			else if (e == 3) {
				this.orderStatus = 2;
				this.orderNodeStatus = 2;
			}
			// 已作废
			else if (e == 4) {
				this.orderStatus = 3;
				this.orderNodeStatus = '';
			}
			let orderdata = {
				storeId: this.storeId, //门店ID
				driverId: this.driverId,
				pageNum: this.orderpageNum,
				orderStatus: this.orderStatus,
				orderNodeStatus: this.orderNodeStatus
			};
			this.requestorderinfo(orderdata);
		},
		// 销售切换
		salestonav(e) {
			this.salesmindex = e;
			console.log(e, 'index');
			this.saleli = [];
			this.salepageNum = 1;
			// 全部
			if (e == 0) {
				this.saleorderStatus = '';
			}
			// 未结清
			else if (e == 1) {
				this.saleorderStatus = 2;
			}
			// 已结清
			else if (e == 2) {
				this.saleorderStatus = 1;
			}else if (e == 3) {
				this.saleorderStatus = 3;
			}
			let orderdata = {
				storeId: this.storeId, //门店ID
				driverId: this.driverId,
				pageNum: this.salepageNum,
				orderStatus: this.saleorderStatus
			};
			this.requestseleinfo(orderdata);
		},
		// 去结算
		tocollection(item) {
			this.SET_ORDERINFO(item);
			uni.navigateTo({
				url: '../../order/collection/collection?orderid=' + item.orderId
			});
		},
		// 取消订单
		cancalorder(item) {
			var that = this;
			uni.showModal({
				title: '提示',
				content: '您确定要取消订单吗？',
				success: function(res) {
					if (res.confirm) {
						console.log('用户点击确定');
						that.$request(
							'/order/store/order/delete',
							{
								orderId: item.orderId
							},
							'DELETE',
							that.atrztion,
							'application/json'
						).then(res => {
							console.log(res);
							if (res.kfbCode == 200) {
								uni.showToast({
									title: '取消成功'
								});
							} else {
								uni.showToast({
									icon: 'none',
									title: res.kfbCode + res.datas
								});
							}
							
							// 取消并刷新
							that.mtonav(0);
						});
					} else if (res.cancel) {
						return;
					}
				}
			});
		},
		// 展开
		showpel(index) {
			if (this.pselidx != index) {
				this.pselidx = index;
			} else {
				this.pselidx = null;
			}
		},
		// 调起电话
		makecll(tel) {
			uni.makePhoneCall({
				phoneNumber: tel,
				// 成功回调
				success: res => {
					console.log('调用成功!');
				},
				// 失败回调
				fail: res => {
					console.log('调用失败!');
				}
			});
		},
		// 去工单详情
		tomain(item, index) {
			console.log(item);
			uni.setStorage({
				key: 'ordermaininfo',
				data: {
					orderStatus: item.orderStatus,
					orderNodeStatus: item.orderNodeStatus,
					orderId: item.orderId,
					orderCode: item.orderCode
				},
				success() {
					uni.navigateTo({
						url:
							'../../ordermain/ordermain?orderStatus=' +
							item.orderStatus +
							'&orderNodeStatus=' +
							item.orderNodeStatus +
							'&orderid=' +
							item.orderId +
							'&orderCode=' +
							item.orderCode
					});
				},
				fail() {
					uni.showToast({
						title: '请重新操作'
					});
				}
			});
		}
	}
};
</script>

<style lang="less" scoped>
.pricemain {
	display: none;
	width: 100%;

	.priceli {
		display: flex;
		justify-content: space-between;
		color: #b7b7b7;
		font-size: 26rpx;
		box-sizing: border-box;
		margin-top: 20rpx;
	}
}

.psle {
	display: block;
}
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
.pcontent {
	width: 100%;
	box-sizing: border-box;
	padding: 0 30rpx;
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
.carlist {
	width: 100%;
	box-sizing: border-box;
	padding: 20rpx 0rpx;
	.carli {
		box-sizing: border-box;
		padding: 15rpx 0rpx;
		background: #ffffff;
		width: 100%;
		height: 150rpx;
		display: flex;
		justify-content: space-between;
		margin: 30rpx 0;
		background: #ffffff;
		border-radius: 5px;
		box-shadow: 0px 4px 8px 0px #fafafa;
		image {
			width: 100rpx;
			height: 100rpx;
			border-radius: 50%;
		}
		.i-left {
			width: 82%;
			.shopname {
				font-size: 32rpx;
				color: #333333;
			}
			.names {
				.tel {
					padding-left: 20rpx;
				}
			}
			.adress {
				width: 100%;
				display: flex;
				justify-content: space-between;
				.text {
					width: 13%;
				}
				.main {
					width: 85%;
				}
			}
			.carinfo {
				display: flex;
				justify-content: space-between;
				font-size: 28rpx;
				color: #666666;
				text {
					width: 45%;
				}
			}
		}
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
.goodsinfo {
	box-sizing: border-box;
	padding: 30rpx 0;
	.orderlist {
		width: 100%;
		box-sizing: border-box;
		padding-top: 15rpx;
		.orderli {
			background: #ffffff;
			box-sizing: border-box;
			margin: 15rpx 0;
			padding: 30rpx 10rpx;
			color: #666666;
			.o-top {
				width: 100%;
				font-size: 24rpx;
				display: flex;
				justify-content: space-between;
				box-sizing: border-box;
				padding-bottom: 20rpx;
				border-bottom: 1rpx solid #e5e5e5;
			}
			.o-center {
				box-sizing: border-box;
				padding: 30rpx 0;
				display: flex;
				justify-content: space-between;
				.pic {
					width: 150rpx;
					height: 150rpx;
					image {
						width: 150rpx;
						height: 150rpx;
					}
				}
				.oc-center {
					width: 100%;
					box-sizing: border-box;
					padding-left: 30rpx;
					image {
						width: 50rpx;
						height: 50rpx;
					}
					.name,
					.incomes {
						display: flex;
						justify-content: space-between;
					}
					.name {
						font-size: 32rpx;
						font-weight: 500;
						color: #333333;
					}
					.carnum {
						color: #666666;
						font-size: 26rpx;
						line-height: 60rpx;
					}
					.incomes {
						font-size: 28rpx;
						font-weight: 500;
						.text {
							color: #e23a3a;
							box-sizing: border-box;
							padding-left: 20rpx;
						}
					}
					.toopen {
						color: #b7b7b7;
						font-size: 24rpx;
					}
				}
			}
			.o-bot {
				width: 100%;
				display: flex;
				justify-content: flex-end;
				view {
					width: 30%;
					height: 60rpx;
					line-height: 60rpx;
					background: #cccccc;
					font-size: 32rpx;
					text-align: center;
					margin-left: 20rpx;
					color: #ffffff;
					border-radius: 5rpx;
				}
				.accounts {
					background: #2d8cf0;
				}
			}
		}
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
		width: 60%;
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
			font-size: 30rpx;
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
