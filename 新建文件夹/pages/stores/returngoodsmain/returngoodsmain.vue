<template>
	<view class="salesmain">
		<view class="top"><topback :topback="'退货单详情'" :iscenter="true" :nums="headnum"></topback></view>
		<view class="shopbox">
			<image class="head" src="../../../static/images/kfb.png" mode=""></image>

			<text class="name">安顿好大宋i的号省道u收到会大幅改善肤色方式</text>
			<image class="icon" src="../../../static/images/icon_shangla@2x.png" mode=""></image>
		</view>
		<view class="basicinfo">
			<view class="goodslist">
				<view class="listbox">
					<view class="saleli" v-for="(item, index) in saleli" :key="index">
						<view class="mains">
							<view class="m-left"><image :src="item.img" mode=""></image></view>
							<view class="m-right">
								<view class="goodsname">{{ item.goodsname }}</view>
								<view class="type-sale">
									<text class="type">{{ item.goodsnum }}</text>
								</view>
								<view class="price-account">
									<text class="carnum">数量：{{ item.cart_num }}</text>
									<text class="prices">￥{{ item.price }}</text>
								</view>
							</view>
						</view>
					</view>
				</view>
			</view>
			<view class="iptmain">
				<view class="iptbox">
					<view class="text">退货商品总额</view>
					<view class="input">#548</view>
				</view>
				<view class="iptbox">
					<view class="text">退款金额</view>
					<view class="input">#548</view>
				</view>
				<view class="iptbox last">
					<view class="text">原订单待付减免金额</view>
					<view class="input">#548</view>
				</view>
				<view class="iptbox last" v-if="type == 1">
					<view class="text">取消原因</view>
					<view class="input">点错了</view>
				</view>
				<view class="iptbox last" v-if="type == 3">
					<view class="text">拒绝原因</view>
					<view class="input">我想拒绝</view>
				</view>
			</view>
			<view class="bots">
				<view class="tobtn" v-if="type == 0"><view class="btnitem">添加收款</view></view>
				<!-- 2已完成 -->
				<view class="accountinfo" v-if="type == 2 || type == 1 || type == 3">
					<view class="goodslist">
						<view class="listbox">
							<view class="saleli">
								<view class="s-top">
									<text class="time">2020-05-06 15:34</text>
									<text class="zfb">支付宝</text>
									<text class="wx">微信支付</text>
								</view>
								<view class="mains">
									<view class="m-left"><image :src="saleli[0].img" mode=""></image></view>
									<view class="m-right">
										<view class="goodsname">{{ saleli[0].goodsname }}</view>
										<view class="type-sale">
											<text class="type">{{ saleli[0].goodsnum }}</text>
										</view>
										<view class="price-account">
											<text class="price">￥{{ saleli[0].price }}</text>
										</view>
									</view>
								</view>
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
import topback from '../../../components/topback/topback.vue';
import tabbar from '4../../../components/tabbar/tabbar.vue';

export default {
	data() {
		return {
			type: null,
			headnum: { text: '待销售商确认', num: '65+99874' },
			tabbarlist: ['基本信息', '结算信息'],
			showindex: 1,
			saleli: [
				{
					goodstype: '哦阿斯蒂芬今晚i吉尔菲我就二分',
					goodsname: '佛寺饥饿反',
					goodsnum: 'aisjhfdia',
					price: 2,
					sale: '15',
					stock: '54',
					img: '../../../static/logo.png',
					cart_num: 1
				},
				{
					goodstype: '哦阿斯蒂芬今晚i吉尔菲我就二分',
					goodsname: '佛寺饥饿反',
					goodsnum: 'aisjhfdia',
					price: 1,
					sale: '15',
					stock: '54',
					img: '../../../static/logo.png',
					cart_num: 1
				},
				{
					goodstype: '哦阿斯蒂芬今晚i吉尔菲我就二分',
					goodsname: '佛寺饥饿反',
					goodsnum: 'aisjhfdia',
					price: 2,
					sale: '15',
					stock: '54',
					img: '../../../static/logo.png',
					cart_num: 1
				},
				{
					goodstype: '哦阿斯蒂芬今晚i吉尔菲我就二分',
					goodsname: '佛寺饥饿反',
					goodsnum: 'aisjhfdia',
					price: 1,
					sale: '15',
					stock: '54',
					img: '../../../static/logo.png',
					cart_num: 1
				}
			]
		};
	},
	onLoad: function(option) {
		//opthin为object类型，会序列化上页面传递的参数
		this.type = option.type;
		if (this.type == 0) {
			this.headnum.text = '待销售商确认';
		} else if (this.type == 2) {
			this.headnum.text = '已完成';
		} else if (this.type == 1) {
			this.headnum.text = '已取消';
		} else if (this.type == 3) {
			this.headnum.text = '被拒绝';
		}
		console.log(option.type, 'a'); //打印出上页面传递的参数
	},
	methods: {
		tonav(index) {
			this.showindex = index;
			console.log(index, 'index');
		}
	},
	components: { topback, tabbar }
};
</script>

<style lang="less" scoped>
.salesmain {
	width: 100%;
	background: #fafafa;
	position: relative;
	box-sizing: border-box;
	// padding-top: 100rpx;
	.top {
		width: 100%;
		// height: 100rpx;
		background: #4d9df2;
		// position: fixed;
		// top: 0;
		// left: 0;
	}
	.tabs {
		background: #ffffff;
	}
	.shopbox {
		width: 100%;
		background: #ffffff;
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin: 30rpx 0;
		box-sizing: border-box;
		padding: 30rpx 30rpx;
		.head {
			width: 80rpx;
			height: 80rpx;
		}
		.name {
			width: 80%;
			font-size: 32rpx;
			color: #333333;
			white-space: nowrap;
			overflow: hidden;
			text-overflow: ellipsis;
		}
		.icon {
			width: 11rpx;
			height: 21rpx;
		}
	}
	.iptmain {
		margin: 30rpx 0;
		box-sizing: border-box;
		padding: 0rpx 30rpx;
	}
	.iptbox {
		background: #ffffff;
		border-bottom: 1rpx solid #e5e5e5;
		display: flex;
		justify-content: space-between;
		align-items: center;
		box-sizing: border-box;
		padding: 37rpx 15rpx;
		.text {
			font-size: 28rpx;
			text {
				color: #e23a3a;
			}
		}
		.input {
			font-size: 26rpx;
			color: #999999;
			text-align: right;
		}
	}
	.last {
		border: none;
	}
	.basicinfo {
		width: 100%;
		font-size: 28rpx;
		color: #666666;
		.addreli {
			color: #999999;
		}
		.infos {
			line-height: 55rpx;
			box-sizing: border-box;
			padding: 20rpx 30rpx;
		}
	}
	.accountinfo {
		width: 100%;

		.infos {
			width: 100%;
			box-sizing: border-box;
			padding: 30rpx 30rpx;
			.item {
				display: flex;
				justify-content: space-between;
				color: #666666;
				font-size: 28rpx;
				line-height: 50rpx;
			}
		}
		.goodslist {
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
		margin-top: 50rpx;
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
