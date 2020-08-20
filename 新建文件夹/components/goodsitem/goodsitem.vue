<template>
	<view class="goods">
		<view class="main" v-if="types == 0">
			<image :src="product + goodsinfo.goodsImage" mode=""></image>
			<view class="name">{{ goodsinfo.goodsName }}</view>
			<view class="onum">{{ goodsinfo.goodsCode }}</view>
			<view class="price-num">
				<text class="price">￥{{ goodsinfo.storeGoodsSalePrice }}</text>
				<text class="sales ">月销:{{ goodsinfo.storeGoodsTotalSales }}</text>
			</view>
		</view>
		<view class="main othermain" v-if="types == 1">
			<view class="m-top">
				<image class="kfb" src="../../static/images/kfb.png" mode=""></image>
				<view class="mt-info">
					<view class="shopname">
						<text class="name">{{ goodsinfo.orderStoreName }}</text>
						<image src="../../static/images/icon_shangla@2x.png" mode=""></image>
						<text class="type" v-if="goodsinfo.orderStatus == 2">未结清</text>
						<text class="type" v-if="goodsinfo.orderStatus == 1">已结清</text>
						<text class="type" v-if="goodsinfo.orderStatus == 3">已作废</text>
					</view>

					<view class="address">地址:{{ goodsinfo.storeAddress }}</view>
				</view>
			</view>
			<view class="mt-center">
				<view class="noaccount box" v-if="goodsinfo.orderStatus == 2">
					<scroll-view class="scroll-view" scroll-x="true">
						<block class="picbox" v-for="(items, index) in goodsinfo.orderDetail" :key="index"><image :src="product + items.orderGoodsImage" mode=""></image></block>
					</scroll-view>
					<view class="opcity"></view>
					<view class="pricebox">
						<view class="price">￥{{ goodsinfo.orderTotalAmount }}</view>
						<view class="nums">共{{ goodsinfo.orderDetail.length }}件</view>
					</view>
				</view>
				<view class="hasaccount box" v-if="goodsinfo.orderStatus == 1 || goodsinfo.orderStatus == 3">
					<view class="picbox">
						<image :src="product + goodsinfo.orderDetail[0].orderGoodsImage" mode=""></image>
						<view class="infos">
							<view class="goodsname">{{ goodsinfo.orderDetail[0].orderGoodsName }}</view>
							<view class="goodsnum">{{ goodsinfo.orderDetail[0].orderGoodsCode }}</view>
						</view>
					</view>
					<view class="pricebox">
						<view class="price">￥{{ goodsinfo.orderTotalAmount }}</view>
						<view class="nums">共{{ goodsinfo.orderDetail.length }}件</view>
					</view>
				</view>
			</view>
		</view>

		<view class="mains" v-if="types == 2">
			<view class="m-left"><image :src="goodsinfo.img" mode=""></image></view>
			<view class="m-right">
				<view class="goodsname">{{ goodsinfo.goodsname }}</view>
				<view class="type-sale">
					<text class="type">{{ goodsinfo.goodstype }}</text>
					<text class="sale">月售：{{ goodsinfo.sale }}</text>
				</view>
				<view class="num-stock">
					<text class="num">{{ goodsinfo.goodsnum }}</text>
					<text class="stock">库存：{{ goodsinfo.stock }}</text>
				</view>
				<view class="price-account">
					<text class="price">￥{{ goodsinfo.price }}</text>
					<!-- <view class="accout">
						<button @click="decrement(item, index)" :disabled="goodsinfo.stock <= 1">-</button>
						{{ goodsinfo.cart_num }}
						<button @click="increment(item, index)" :disabled="goodsinfo.stock >= goodsinfo.goods_number">+</button>
					</view> -->
				</view>
			</view>
		</view>
		<view class="main othermain" v-if="types == 3">
			<view class="m-top">
				<image class="kfb" src="../../static/images/kfb.png" mode=""></image>
				<view class="mt-info">
					<view class="shopname">
						<text class="name">{{ goodsinfo.shopname }}</text>
						<image src="../../static/images/icon_shangla@2x.png" mode=""></image>
						<text class="type" v-if="goodsinfo.type == 0">待确认</text>
						<text class="type" v-if="goodsinfo.type == 1">已取消</text>
						<text class="type" v-if="goodsinfo.type == 2">已完成</text>
					</view>

					<view class="address">地址:{{ goodsinfo.address }}</view>
				</view>
			</view>
			<view class="mt-center">
				<view class="noaccount box" v-if="goodsinfo.type == 0 || goodsinfo.type == 2">
					<view class="picbox">
						<image src="../../static/logo.png" mode=""></image>
						<image src="../../static/logo.png" mode=""></image>
						<image src="../../static/logo.png" mode=""></image>
					</view>
					<view class="pricebox">
						<view class="price">￥{{ goodsinfo.price }}</view>
						<view class="nums">共{{ goodsinfo.nums }}件</view>
					</view>
				</view>

				<view class="hasaccount box" v-if="goodsinfo.type == 1">
					<view class="picbox">
						<image src="../../static/logo.png" mode=""></image>
						<view class="infos">
							<view class="goodsname">{{ goodsinfo.goodsname }}</view>
							<view class="goodsnum">{{ goodsinfo.goodsnum }}</view>
						</view>
					</view>
					<view class="pricebox">
						<view class="price">￥{{ goodsinfo.price }}</view>
						<view class="nums">共{{ goodsinfo.nums }}件</view>
					</view>
				</view>
				<view class="tobtn" v-if="goodsinfo.type == 2"><view class="btnitem" @click="canclerg">取消退货</view></view>
			</view>
		</view>
		<view class="main othermain" v-if="types == 4">
			<view class="m-top">
				<image class="kfb" :src="userhead + goodsinfo.orderSaleAvatar" mode=""></image>
				<view class="mt-info">
					<view class="shopname">
						<text class="name">{{ goodsinfo.orderSaleName }}</text>
						<image src="../../static/images/icon_shangla@2x.png" mode=""></image>
						<text class="type" v-if="goodsinfo.orderStatus == 1">待确认</text>
						<text class="type" v-if="goodsinfo.orderStatus == 2">已发货</text>
						<text class="type" v-if="goodsinfo.orderStatus == 5">已取消</text>
						<text class="type" v-if="goodsinfo.orderStatus == 3">待收货</text>
						<text class="type" v-if="goodsinfo.orderStatus == 4">已完成</text>
					</view>

					<view class="attr" v-if="goodsinfo.attr">
						<view class="attritem" v-for="(item, index) in goodsinfo.attr" :key="index">{{ item }}</view>
					</view>
					<view class="address" v-else>订单编号：{{ goodsinfo.orderCode }}</view>
				</view>
			</view>
			<view class="mt-center">
				<view class="noaccount box">
					<scroll-view class="scroll-view" scroll-x="true">
						<block class="picbox" v-for="(items, index) in goodsinfo.orderDetail" :key="index"><image :src="product + items.detailGoodsImage" mode=""></image></block>
					</scroll-view>
					<view class="pricebox">
						<view class="price">￥{{ goodsinfo.orderTotalAmount }}</view>
						<view class="nums">共{{ goodsinfo.orderDetail.length }}种</view>
					</view>
				</view>
			</view>
		</view>

		<view class="main othermain" v-if="types == 5">
			<view class="m-top">
				<image class="kfb" src="../../static/images/kfb.png" mode=""></image>
				<view class="mt-info">
					<view class="shopname">
						<text class="name">{{ goodsinfo.shopname }}</text>
						<image src="../../static/images/icon_shangla@2x.png" mode=""></image>
						<text class="type" v-if="goodsinfo.type == 0">待确认</text>
						<text class="type" v-if="goodsinfo.type == 1">已结清</text>
					</view>

					<view class="address">地址:{{ goodsinfo.address }}</view>
				</view>
			</view>
			<view class="mt-center">
				<view class="noaccount box" v-if="goodsinfo.type == 0 || goodsinfo.type == 2">
					<view class="picbox">
						<image src="../../static/logo.png" mode=""></image>
						<image src="../../static/logo.png" mode=""></image>
						<image src="../../static/logo.png" mode=""></image>
					</view>
					<view class="pricebox">
						<view class="price">￥{{ goodsinfo.price }}</view>
						<view class="nums">共{{ goodsinfo.nums }}件</view>
					</view>
				</view>

				<view class="hasaccount box" v-if="goodsinfo.type == 1">
					<view class="picbox">
						<image src="../../static/logo.png" mode=""></image>
						<view class="infos">
							<view class="goodsname">{{ goodsinfo.goodsname }}</view>
							<view class="goodsnum">{{ goodsinfo.goodsnum }}</view>
						</view>
					</view>
					<view class="pricebox">
						<view class="price">￥{{ goodsinfo.price }}</view>
						<view class="nums">共{{ goodsinfo.nums }}件</view>
					</view>
				</view>
				<view class="btns" v-if="goodsinfo.type == 0"><view class="item" @click="canclerg">添加收款</view></view>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {};
	},
	props: {
		goodsinfo: {
			type: Object
		},
		types: {
			type: Number,
			default: 0
		}
	},
	methods: {
		canclerg() {
			this.$emit('cancle', this.goodsinfo);
		}
	},
	created() {
		console.log(this.goodsinfo, this.types);
	}
};
</script>

<style lang="less">
.tobtn {
	width: 100%;
	display: flex;
	justify-content: flex-end;
	background: #ffffff;
	box-sizing: border-box;
	padding: 30rpx 30rpx;
	// margin-top: 50rpx;
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
.attr {
	width: 100%;
	box-sizing: border-box;
	padding: 10rpx 0;
	.attritem {
		display: inline-block;
		margin-right: 20rpx;
		width: 110rpx;
		height: 40rpx;
		border: 1rpx solid #2e8df1;
		border-radius: 5rpx;
		font-size: 24rpx;
		color: #2e8df1;
		text-align: center;
		line-height: 40rpx;
	}
}
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
			.price {
				color: #e23a3a;
				font-weight: 500;
			}
		}
	}
}
.goods {
	width: 100%;

	image {
		width: 100%;
		height: 260rpx;
	}

	.name {
		font-size: 28rpx;
		color: #282828;
	}
	.onum {
		font-size: 24rpx;
		color: #666666;
		line-height: 43rpx;
	}

	.price-num {
		font-size: 28rpx;
		display: flex;
		justify-content: space-between;
		color: #666666;
		box-sizing: border-box;
		padding: 5rpx 0;
		.price {
			color: #e23a3a;
		}
	}
}
.othermain {
	width: 100%;
	.toreturn {
		background: #e23a3a;
		width: 200rpx;
		height: 60rpx;
		text-align: center;
		line-height: 60rpx;
		font-size: 32rpx;
		color: #ffffff;
	}
	.m-top {
		width: 100%;
		display: flex;
		justify-content: space-between;
		.kfb {
			width: 95rpx;
			height: 95rpx;
		}
		.mt-info {
			width: 100%;
			box-sizing: border-box;
			padding-left: 20rpx;
			.shopname {
				width: 100%;
				display: flex;
				justify-content: space-between;
				align-items: center;
				.name {
					width: 70%;
					font-size: 32rpx;
					font-weight: 500;
					overflow: hidden;
					white-space: nowrap;
					text-overflow: ellipsis;
					line-height: 50rpx;
				}
				image {
					width: 11rpx;
					height: 22rpx;
				}
				.type {
					font-size: 26rpx;
					color: #b7b7b7;
				}
			}
			.address {
				width: 100%;
				overflow: hidden;
				white-space: nowrap;
				text-overflow: ellipsis;
				color: #999999;
				font-size: 26rpx;
			}
		}
	}
	.mt-center {
		width: 100%;
		box-sizing: border-box;
		padding-top: 10rpx;
		.box {
			display: flex;
			justify-content: space-between;
		}
		.picbox {
			width: 70%;
		}
		.noaccount {
			width: 100%;
			// background: #007aff;
			position: relative;
			.scroll-view {
				width: 85%;
				// background: #4cd964;
				height: 200rpx;
				white-space: nowrap;
				box-sizing: border-box;
				padding: 20rpx;
				image {
					display: inline-block;
					width: 150rpx;
					height: 150rpx;
					margin: 0 20rpx;
				}
			}
			.opcity {
				width: 100rpx;
				height: 200rpx;
				background: linear-gradient(to right, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.8));
				position: absolute;
				top: 0;
				right: 15%;
			}
			.picbox {
				background: #808080;
				// width: 100%;
				white-space: nowrap;

				// display: flex;
				// justify-content: space-between;

				image {
					width: 150rpx;
					height: 150rpx;
				}
			}
		}
		.hasaccount {
			.picbox {
				width: 70%;
				display: flex;
				justify-content: space-between;
				image {
					width: 32%;
					height: 150rpx;
				}
				.infos {
					width: 65%;
					font-size: 26rpx;
					color: #666666;
					.goodsnum {
						font-size: 24rpx;
						box-sizing: border-box;
						padding-top: 20rpx;
					}
				}
			}
		}
		.pricebox {
			width: 29%;
			text-align: right;
			.price {
				font-size: 32rpx;
				color: #333333;
			}
			.nums {
				box-sizing: border-box;
				padding-top: 30rpx;
				font-size: 24rpx;
				color: #999999;
			}
		}
	}
}
</style>
