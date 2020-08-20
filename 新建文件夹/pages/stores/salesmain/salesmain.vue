<template>
	<view class="">
		<view class="salesmain" v-if="iscollect == false">
			<view class="top"><topback :type="'two'" :topback="'销售单结算'" :iscenter="true" :istext="'投诉'" :iswhite="true" :nums="headnum" @change="tobacks"></topback></view>
			<view class="tabs"><tabbar :tabbarlist="tabbarlist" :type="0" @change="tonav" :startindex="showindex"></tabbar></view>
			<!-- 基本信息 -->
			<view class="basicinfo" v-if="showindex == 0">
				<view class="logos" v-if="origin == 'purchase'">
					<image class="icon" src="../../../static/images/kfb.png" mode=""></image>
					<view class="shopnames">按实际的号省道哈市打死好的奥省的安徽的熬好的奥</view>
					<image class="toright" src="../../../static/images/icon_shangla@2x.png" mode=""></image>
				</view>

				<view class="infos">
					<view class="name">{{ infos.orderDriverUserName }}：{{ infos.orderDriverUserPhone }}</view>
					<view class="address">
						<view class="addreli" v-if="infos.orderDriverUserAddress">地址：{{ infos.orderDriverUserAddress }}</view>
						<view class="addreli" v-else>地址：暂无地址</view>
					</view>
				</view>
				<view class="goodslist">
					<view class="listbox">
						<view class="saleli" v-for="(item, index) in infos.orderGoodsList" :key="index">
							<view class="mains">
								<view class="m-left"><image :src="product + item.orderGoodsImage" mode=""></image></view>
								<view class="m-right">
									<view class="goodsname">{{ item.orderGoodsName }}</view>
									<view class="type-sale">
										<text class="type">编号：{{ item.orderGoodsCode }}</text>
									</view>
									<view class="price-account">
										<text class="carnum">数量：{{ item.purchaseQuantity }}</text>
										<text class="prices">￥{{ item.goodsCommodityPrice }}</text>
									</view>
								</view>
							</view>
						</view>
					</view>
				</view>
				<view class="logistics" v-if="orderStatus == 2">
					<view class="iptbox">
						<view class="text">配送方式</view>
						<view class="input" v-if="infos.orderLogisticsType == 1">商家配送</view>
						<view class="input" v-if="infos.orderLogisticsType == 2">物流公司配送</view>
					</view>
					<view class="iptbox">
						<view class="text">物流公司/配送员</view>
						<view class="input">
							<text>{{ infos.orderLogisticsCompanyName }}</text>
							/
							<text>{{ infos.orderDriverUserName }}</text>
						</view>
					</view>
					<view class="iptbox last">
						<view class="text">物流单号/配送员手机号</view>
						<view class="input">
							<text>{{ infos.orderLogisticsNumber }}</text>
							/
							<text>{{ infos.orderDriverUserPhone }}</text>
						</view>
					</view>
				</view>
				<view class="tobtn" v-if="orderStatus == 2">
					<view class="btnitem" @click="toacount">添加收款</view>
					<view class="btnitem" v-if="origin == 'purchase'">取消订单</view>
				</view>
			</view>
			<!-- 结算信息 -->
			<view class="accountinfo" v-if="showindex == 1">
				<view class="infos">
					<view class="allprice item">
						<text>商品总额</text>
						<text>￥{{ infos.orderTotalAmount }}</text>
					</view>
					<!-- <view class="allprice item">
						<text>运费</text>
						<text>￥{{}}</text>
					</view> -->
					<view class="allprice item">
						<text>优惠金额</text>
						<text>￥{{ infos.orderDiscountAmount }}</text>
					</view>
					<view class="allprice item">
						<text>当前待付金额</text>
						<text>￥{{ infos.orderAmountsPayable }}</text>
					</view>
					<view class="allprice item">
						<text>已付金额</text>
						<text>￥{{ infos.orderAmountPaid }}</text>
					</view>

					<view class="allprice item">
						<text>合计应付</text>
						<text>￥{{ infos.orderTotalAmount - infos.orderDiscountAmount - infos.orderAmountPaid }}</text>
					</view>
				</view>

				<view class="goodslist" v-if="origin != 'purchase'">
					<view class="listbox">
						<view class="saleli" v-for="(item, index) in saleli" :key="index">
							<view class="s-top">
								<text class="time">{{ item.transactionHour }}</text>
								<text class="wx" v-if="item.payType == 1">微信支付</text>
								<text class="zfb" v-if="item.payType == 2">支付宝</text>
								<text class="wx" v-if="item.payType == 3">云闪付</text>
								<text class="zfb" v-if="item.payType == 4">银行支付</text>
								<text class="wx" v-if="item.payType == 5">现金支付</text>
								<text class="zfb" v-if="item.payType == 6">其他方式</text>
							</view>
							<view class="mains">
								<view class="m-left">
									<image src="../../../static/images/img_weixiu.png" mode=""></image>
									<!-- <image :src="product + infos.orderStoreAvatar" mode=""></image> -->
								</view>
								<view class="m-right">
									<view class="goodsname">{{ item.storeUserName }}</view>
									<view class="type-sale">
										<text class="type">{{ item.remark }}</text>
									</view>
									<view class="price-account">
										<text class="price">￥{{ item.amount }}</text>
									</view>
								</view>
							</view>
						</view>
					</view>
				</view>
				<view class="tobtn" v-if="orderStatus == 2">
					<view class="btnitem" @click="toacount">添加收款</view>
					<view class="btnitem" v-if="origin == 'purchase'">取消订单</view>
				</view>
			</view>
		</view>

		<view class="tocollection" v-else><collect :infos="infos" @change="close"></collect></view>
	</view>
</template>

<script>
import topback from '../../../components/topback/topback.vue';
import tabbar from '../../../components/tabbar/tabbar.vue';
import collect from './addcolletion.vue';
export default {
	data() {
		return {
			origin: '',
			headnum: { text: '', num: '' },
			tabbarlist: ['基本信息', '结算信息'],
			showindex: 0,
			infos: [],
			saleli: [],
			storeId: '',
			atrztion: '',
			orderId: '',
			orderStatus: '',
			iscollect: false
		};
	},
	onLoad(options) {
		this.origin = options.from;
		this.storeId = uni.getStorageSync('shopid');
		this.atrztion = uni.getStorageSync('atrztion');
		this.orderId = options.orderId;
		this.orderStatus = options.orderStatus;
		console.log(options);
		this.request(this.orderId);
		var that =this
		setTimeout(function() {
			if (that.infos.orderStatus == 2) {
				that.headnum.text = '未结清';
				that.headnum.num = that.infos.orderCode;
			} else if (that.infos.orderStatus == 1) {
				that.headnum.text = '已结清';
				that.headnum.num = that.infos.orderCode;
			} else if (that.infos.orderStatus == 3) {
				that.headnum.text = '已作废';
				that.headnum.num = that.infos.orderCode;
			}
		}, 200);
	},
	methods: {
		tobacks(e) {
			console.log(e);
			if (e == 'back') {
				uni.navigateBack()
			}
		},
		tonav(index) {
			this.showindex = index;
			console.log(index, 'index');
		},
		//去收款
		toacount() {
			console.log(this.infos);
			this.iscollect = true;
		},
		close(e) {
			console.log(e);
			this.iscollect = e;
		},
		request(orderid) {
			console.log(1);
			var that = this;
			this.$request('/order/store/sale/order/' + orderid, '', 'post', this.atrztion, 'application/json').then(res => {
				console.log(222);
				console.log(res);
				this.infos = res.datas;
				this.saleli = res.datas.orderIncomeExpendLog;

				console.log(this.infos,'this.infos');
			});
		}
	},
	components: { topback, tabbar, collect }
};
</script>

<style lang="less" scoped>
.iptbox {
	border-bottom: 1rpx solid #e5e5e5;
	display: flex;
	justify-content: space-between;
	align-items: center;
	box-sizing: border-box;
	padding: 37rpx 0rpx;
	.text {
		font-size: 28rpx;
		text {
			color: #e23a3a;
		}
	}
	input,
	.input {
		font-size: 26rpx;
		color: #999999;
		text-align: right;
	}
}
.last {
	border: none;
}
.logistics {
	background: #ffffff;
	box-sizing: border-box;
	padding: 30rpx 30rpx;
	margin-top: 30rpx;
}
.salesmain {
	width: 100%;
	background: #fafafa;
	position: relative;
	box-sizing: border-box;
	// padding-top: 100rpx;
	position: absolute;
	top: 0;
	left: 0;
	.top {
		width: 100%;
		height: 350rpx;
		background: #4d9df2;
	}
	.tabs {
		background: #ffffff;
	}
	.basicinfo {
		width: 100%;
		font-size: 28rpx;
		color: #666666;
		box-sizing: border-box;
		padding-bottom: 200rpx;
		.addreli {
			color: #999999;
		}
		.infos {
			line-height: 55rpx;
			box-sizing: border-box;
			padding: 20rpx 30rpx;
		}
	}
	.logos {
		background: #ffffff;
		width: 100%;
		display: flex;
		justify-content: flex-start;
		align-items: center;
		box-sizing: border-box;
		padding: 20rpx 30rpx;
		position: relative;
		.icon {
			width: 80rpx;
			height: 80rpx;
		}
		.shopnames {
			width: 60%;
			padding-left: 20rpx;
			overflow: hidden;
			text-overflow: ellipsis;
			white-space: nowrap;
		}
		.toright {
			width: 12rpx;
			height: 21rpx;
			position: absolute;
			right: 30rpx;
			top: 50%;
			transform: translateY(-50%);
		}
	}
	.accountinfo {
		width: 100%;

		.infos {
			width: 100%;
			box-sizing: border-box;
			padding: 30rpx 30rpx;
			.item {
				box-sizing: border-box;
				padding: 20rpx 0rpx;
				display: flex;
				justify-content: space-between;
				color: #666666;
				font-size: 28rpx;
				line-height: 50rpx;
			}
		}
		.goodslist {
			box-sizing: border-box;
			padding-bottom: 150rpx;
			.s-top {
				width: 100%;
				display: flex;
				justify-content: space-between;
				font-size: 26rpx;
				color: #67c23a;
				border-bottom: 1rpx solid #e5e5e5;
				box-sizing: border-box;
				padding: 0 0 10rpx 0;
				.time {
					font-size: 24rpx;
					color: #666666;
				}
				.zfb {
					color: #2d8cf0;
				}
			}
			.mains {
				box-sizing: border-box;
				padding-top: 20rpx;
			}
		}
	}
	.goodslist {
		width: 100%;
		background: #ffffff;
		box-sizing: border-box;
		padding: 30rpx 30rpx;
		.saleli {
			box-sizing: border-box;
			padding: 25rpx 15rpx;
			.mains {
				width: 100%;
				display: flex;
				justify-content: space-between;
				.m-left {
					width: 30%;
					image {
						width: 150rpx;
						height: 150rpx;
					}
				}
				.m-right {
					width: 69%;
					.goodsname {
						font-size: 32rpx;
						font-weight: 500;
						color: #333333;
					}
					.type-sale {
						display: flex;
						justify-content: space-between;
						align-items: center;
						color: #666666;
						box-sizing: border-box;
						padding: 10rpx 0 15rpx 0;
						.type {
							width: 60%;
							font-size: 26rpx;
							text-overflow: ellipsis;
							overflow: hidden;
							white-space: nowrap;
						}
						.sale {
							font-size: 24rpx;
						}
					}
					.num-stock {
						display: flex;
						justify-content: space-between;
						align-items: center;
						color: #666666;
						font-size: 24rpx;
					}
					.price-account {
						box-sizing: border-box;
						padding-top: 10rpx;
						font-size: 32rpx;
						display: flex;
						justify-content: space-between;
						align-items: center;
						.price {
							color: #e23a3a;
							font-weight: 500;
						}
						.prices {
							color: #2d8cf0;
							font-weight: 500;
						}
						.carnum {
							font-size: 24rpx;
							color: #999999;
						}
						.accout {
							// background: #007AFF;
							width: 40%;
							display: flex;
							justify-content: space-between;
							align-items: center;
						}
					}
				}
			}
		}
	}

	.tobtn {
		width: 100%;
		display: flex;
		justify-content: flex-end;
		background: #ffffff;
		box-sizing: border-box;
		padding: 30rpx 30rpx;
		// margin-top: 50rpx;
		position: fixed;
		bottom: 0rpx;
		left: 0;
		.btnitem {
			margin-left: 30rpx;
			width: 30%;
			height: 60rpx;
			background: #e23a3a;
			text-align: center;
			line-height: 60rpx;
			font-size: 24rpx;
			color: #ffffff;
		}
	}
}
</style>
