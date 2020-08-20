<template>
	<view class="order">
		<view class="top"><topback :topback="'确认退货单'" :iscenter="true"></topback></view>

		<view class="shopbox">
			<image class="head" src="../../../static/images/kfb.png" mode=""></image>

			<text class="name">安顿好大宋i的号省道u收到会大幅改善肤色方式</text>
			<image class="icon" src="../../../static/images/icon_shangla@2x.png" mode=""></image>
		</view>

		<view class="accountlist">
			<view class="topinfo">
				<view class="allprice">
					<text class="ap">商品总价：{{ totalPrice | showPrice }}</text>
					<text class="toclean" @click="toclean">清空购物单</text>
				</view>
			</view>
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
								<text class="price">￥{{ item.price }}</text>
								<view class="accout">
									<view @click="decrement(item, index)">-</view>
									{{ item.cart_num }}
									<view @click="increment(item, index)" :disabled="item.cart_num >= item.stock">+</view>
								</view>
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>

		<view class="tobtn"><view class="btnitem" @click="ispop = true">提交</view></view>
		<view class="pop" v-if="ispop">
			<view class="popbox">
				<view class="title">退货原因</view>
				<textarea class="textarea" value="" placeholder="请填写退货原因" />
				<view class="btn">
					<text class="send" @click="tosend">确定</text>
					<text class="cancle" @click="ispop = false">取消</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
import topback from '../../../components/topback/topback.vue';
import listvertical from '../../../components/listvertical/listvertical.vue';
export default {
	data() {
		return {
			ispop: false,
			curinfo: {
				icon: '../../../static/logo.png',
				title: '十点十分我问',
				name: '士大夫阿斯顿',
				tel: '3216548978'
			},
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
	computed: {
		totalPrice() {
			return this.saleli.reduce((previousValue, item) => previousValue + item.cart_num * item.price, 0);
		}
	},
	methods: {
		decrement(item, index) {
			item.cart_num--;
		},
		// 数量+
		increment(item, index) {
			item.cart_num++;
			console.log(this.goodsinfo);
		},
		tosend() {
			this.ispop = false;
		}
	},
	filters: {
		showPrice(price) {
			return '￥' + price.toFixed(2);
		}
	},
	components: { topback, listvertical }
};
</script>

<style lang="less" scoped>
.order {
	width: 100%;
	background: #fafafa;
	position: relative;
	box-sizing: border-box;
	padding-top: 100rpx;
	.top {
		width: 100%;
		height: 100rpx;
		background: #2d8cf0;
		position: fixed;
		top: 0;
		left: 0;
		z-index: 1111;
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
	.addcus {
		background: #ffffff;
		box-sizing: border-box;
		margin: 30rpx 0;
		text-align: center;
		padding: 30rpx 0;

		image {
			width: 55rpx;
			height: 55rpx;
		}
		.text {
			color: #333333;
			font-size: 24rpx;
			box-sizing: border-box;
			padding-top: 20rpx;
		}
	}
	.accountlist {
		width: 100%;
		box-sizing: border-box;
		padding: 0 30rpx;
		.topinfo {
			background: #ffffff;
			width: 100%;
			box-sizing: border-box;
			padding: 30rpx 30rpx;
			border-bottom: 1rpx solid #e5e5e5;
			.allprice {
				display: flex;
				justify-content: space-between;
				align-items: center;
				font-size: 32rpx;
				color: #999999;
			}
			.ap {
				color: #2d8cf0;
				font-size: 32rpx;
			}
		}
		.listbox {
			background: #ffffff;
			box-sizing: border-box;
			padding: 0rpx 15rpx;
		}
		.saleli {
			box-sizing: border-box;
			padding: 25rpx 15rpx;
			background: #ffffff;
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
			background: #2d8cf0;
			text-align: center;
			line-height: 60rpx;
			font-size: 24rpx;
			color: #ffffff;
		}
	}
	.pop {
		background: rgba(0, 0, 0, 0.5);
		width: 100%;
		position: fixed;
		top: 0;
		left: 0;
		z-index: 111111111111111111;
		.popbox {
			width: 70%;
			background: #ffffff;
			margin: 500rpx auto;
			box-sizing: border-box;
			padding: 20rpx 20rpx 0 20rpx;
			.title {
				font-size: 36rpx;
				font-weight: 500;
				color: #333333;
				text-align: center;
			}
			.textarea {
				width: 100%;
				background: #f7f7f7;
				border-radius: 5px;
				margin: 20rpx 0;
				box-sizing: border-box;
				font-size: 30rpx;
				padding: 10rpx 10rpx;
			}
			.btn {
				display: flex;
				justify-content: space-between;
				align-items: center;
				border-top: 1rpx solid #e5e5e5;
				text {
					width: 49%;
					text-align: center;
					font-size: 32rpx;
					color: #999999;
					height: 80rpx;
					line-height: 80rpx;
				}
				.cancle {
					border-left: 1rpx solid #e5e5e5;
					color: #2d8cf0;
				}
			}
		}
	}
}
</style>
