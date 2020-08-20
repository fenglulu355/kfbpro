<template>
	<view class="addgoods">
		<view class="headertop">
			<view class="bg isbgs" v-show="isShow"></view>
			<topback :topback="'工单'" :type="'one'" :isleft="true" :isbule="false" :isaddpic="true" @change="topchange"></topback>
			<view class="selectbox">
				<view class="pop" v-if="ispop">
					<view class="addnew" :class="issel == 0 ? 'sel' : ''" @click="ptcg">发起平台采购</view>
					<view class="fzgl" :class="issel == 1 ? 'sel' : ''" @click="xxcg">发起线下采购</view>
					<view class="addnew" :class="issel == 2 ? 'sel' : ''" @click="addressgl">收获地址管理</view>
				</view>
				<view class="tabs"><tabbar :tabbarlist="mtabbarlist" :type="0" :startindex="showindex" @change="tonav"></tabbar></view>
			</view>
		</view>
		<view class="content">
			<!-- tabbar -->
			<view class="goodsinfo" v-if="hackReset">
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
		</view>
	</view>
</template>

<script>
import { mapState, mapMutations } from 'vuex';
import topback from '../../../components/topback/topback.vue';
import tabbar from '../../../components/tabbar/tabbar.vue';
import goodsitem from '../../../components/goodsitem/goodsitem';
import Select from '../../../components/Select/Select.vue';
export default {
	data() {
		return {
			hackReset: true,
			pageNum: 1, //页码
			orderStatus: '', //订单状态
			orderNodeStatus: '', //子订单状态
			searchKeywords: '', //搜索关键字
			pselidx: null,
			ispop: false,
			issel: 0,
			showindex: 0,
			tabbarlist: ['平台采购', '线下采购'],
			mtabbarlist: ['全部', '进行中', '未结清', '已结清', '已作废'],
			isShow: false,
			goodsinfo: [],
			orderli: [],
			authorization: '',
			storeId: ''
		};
	},
	onLoad() {
		console.log('load');
		uni.getStorage({
			key: 'shopid',
			success: res => {
				this.storeId = res.data;
			}
		});
		uni.getStorage({
			key: 'atrztion',
			success: res => {
				this.authorization = res.data;
			}
		});
	},
	created() {
		console.log(this.authorization, 'q');
		this.requstlist(this.pageNum, this.orderStatus, this.orderNodeStatus, this.searchKeywords);
	},
	onReachBottom() {
		this.pageNum = this.pageNum + 1;
		this.requstlist(this.pageNum, this.orderStatus, this.orderNodeStatus, this.searchKeywords);
	},
	methods: {
		...mapMutations(['SET_ORDERINFO']),
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
		// 请求数据
		requstlist(pageNum, orderStatus, orderNodeStatus, searchKeywords) {
			console.log(pageNum);
			let data = {
				storeId: this.storeId, //门店ID
				orderAddBeginTimeStr: '',
				orderAddEndTimeStr: '',
				orderStatus: orderStatus, //订单状态  1进行中 2已完成 3 已作废
				orderNodeStatus: orderNodeStatus, //订单子状态-1未结清-2 已结清
				searchKeywords: searchKeywords,
				driverId: '',
				pageNum: pageNum,
				pageSize: 10
			};
			console.log(data);
			this.$request('/order/store/order/withPagingList', data, 'post', this.authorization).then(res => {
				res.datas.forEach(res => {
					this.orderli.push(res);
				});

				console.log(this.orderli, 'a');
			});
		},
		topchange(val) {
			console.log(val);
			if (val == 'showpop') {
				this.ispop = !this.ispop;
			} else if (val == 'back') {
				uni.switchTab({
					url:'../../stores/Shome/Shome'
				})
			}
		},
		// 去结算
		tocollection(item) {
			this.SET_ORDERINFO(item);
			uni.navigateTo({
				url: '../collection/collection?orderid=' + item.orderId
			});
		},

		// 取消订单
		cancalorder(item) {
			var that = this;
			console.log(item);
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
							that.authorization,
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
							// 取消订单刷新当前页面有问题
							// that.hackReset=false;
							// that.$nextTick(res=>{
							// 	that.hackReset=true
							// })
						});
					} else if (res.cancel) {
						return;
					}
				}
			});
		},
		showpel(index) {
			if (this.pselidx != index) {
				this.pselidx = index;
			} else {
				this.pselidx = null;
			}
		},
		ptcg() {
			console.log(1);
			this.issel = 0;
			uni.navigateTo({
				url: '../../stores/addgoods/addgoods?from=' + 'purchase'
			});
		},
		xxcg() {
			this.issel = 1;
			// uni.navigateTo({
			// 	url: '../goodsgroup/goodsgroup'
			// });
		},
		addressgl() {
			this.issel = 2;
			uni.navigateTo({
				url: '../ordermain/ordermain'
			});
		},
		toinventory() {
			uni.navigateTo({
				url: '../inventory/inventory'
			});
		},
		// 去详情
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
							'../ordermain/ordermain?orderStatus=' +
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
		},
		// 切换tab
		tonav(e) {
			this.showindex = e;
			console.log(e);
			this.orderli = [];
			this.pageNum = 1;
			// 全部
			if (e == 0) {
				this.orderStatus = '';
				this.orderNodeStatus = '';
				this.requstlist(this.pageNum, this.orderStatus, this.orderNodeStatus, this.searchKeywords);
			}
			// 进行中
			else if (e == 1) {
				this.orderStatus = 1;
				this.requstlist(this.pageNum, this.orderStatus, this.orderNodeStatus, this.searchKeywords);
			}
			// 未结清
			else if (e == 2) {
				this.orderStatus = 2;
				this.orderNodeStatus = 1;
				this.requstlist(this.pageNum, this.orderStatus, this.orderNodeStatus, this.searchKeywords);
			}
			// 已结清
			else if (e == 3) {
				this.orderStatus = 2;
				this.orderNodeStatus = 2;
				this.requstlist(this.pageNum, this.orderStatus, this.orderNodeStatus, this.searchKeywords);
			}
			// 已作废
			else if (e == 4) {
				this.orderStatus = 3;
				this.orderNodeStatus = '';
				this.requstlist(this.pageNum, this.orderStatus, this.orderNodeStatus, this.searchKeywords);
			}
		}
	},

	components: {
		topback,
		tabbar,
		goodsitem,
		Select
	}
};
</script>

<style lang="less" scoped>
.addgoods {
	width: 100%;
	background: #fafafa;
	position: relative;

	.add {
		position: fixed;
		right: 20rpx;
		bottom: 20%;

		image {
			width: 138rpx;
			height: 138rpx;
		}
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
		box-sizing: border-box;
		padding: 0 15rpx;
		// height: 100rpx;
		background: #ffffff;
	}
}

.content {
	box-sizing: border-box;
	padding: 160rpx 30rpx 30rpx 30rpx;

	.salelist {
		width: 100%;
	}
}

.btns {
	width: 100%;
	display: flex;
	justify-content: flex-end;
	box-sizing: border-box;
	padding: 40rpx 0;

	.item {
		width: 200rpx;
		height: 60rpx;
		background: #2d8cf0;
		border-radius: 5rpx;
		color: #ffffff;
		font-size: 32rpx;
		text-align: center;
		line-height: 60rpx;
	}

	.cancle {
		background: #e23a3a;
	}
}

.isbgs {
	background: rgba(0, 0, 0, 0.5);
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
</style>
