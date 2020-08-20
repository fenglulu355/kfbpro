<template>
	<view class="Shome">
		<view class="bg">
			<image src="../../../static/images/banner.png" mode=""></image>
			<view class="pathlist">
				<view class="pathli" v-for="(item, index) in pathlist" :key="index" @click="topath(item)">
					<!-- <navigator class="topath" :url="item.path"> -->
					<image :src="item.icon" mode=""></image>
					<view class="name">{{ item.name }}</view>
					<!-- </navigator> -->
				</view>
			</view>
		</view>
		<view class="swiperbox">
			<swiper class="swiper" :indicator-dots="true" :autoplay="true" :interval="2000" :duration="500">
				<swiper-item class="swiper-item "><image src="../../../static/images/banner.png" mode=""></image></swiper-item>
				<swiper-item><image src="../../../static/images/banner.png" mode=""></image></swiper-item>
				<swiper-item><image src="../../../static/images/banner.png" mode=""></image></swiper-item>
			</swiper>
		</view>
		<view class="content">
			<view class="tolist">
				<view
					class="tl-left tolistbox"
					style="background: url(../../../static/images/car_gongdan.png);
				background-position: center;
				background-size: cover;
				background-repeat: no-repeat;"
				>
					<view class="title">工单</view>
					<view class="handle">
						您有
						<text>{{ orderinfos.haveInHandOrderNumber }}</text>
						个工单正在进行中
					</view>

					<view class="tomore">查看 ></view>
				</view>
				<view class="tl-right ">
					<view
						class="tolistbox"
						style="background: url(../../../static/images/card_shangping.png);
				background-position: center;
				background-size: cover;
				background-repeat: no-repeat;"
					>
						<view class="title">库存</view>
						<view class="handle">
							您有
							<text>{{ orderinfos.noAddedPriceProductsNumber }}</text>
							个商品未添加售价
						</view>
						<view class="tomore">去添加 ></view>
					</view>
					<view
						class="tolistbox"
						style="background: url(../../../static/images/card_caigou.png);
				background-position: center;
				background-size: cover;
				background-repeat: no-repeat;"
					>
						<view class="title">采购</view>
						<view class="handle">
							您有
							<text>{{ orderinfos.purchaseOrderOpenQuantity }}</text>
							个商品未添加售价
						</view>
						<view class="tomore">去结清 ></view>
					</view>
				</view>
			</view>
			<view class="recommend">
				<view class="rtitle">
					<view class="blue"></view>
					<text>推荐商品</text>
				</view>
				<view class="goodslist">
					<view class="goodsli" v-for="(item, index) in goodsinfo" :key="index"><goodsitem :goodsinfo="item" :types="0"></goodsitem></view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
import goodsitem from '../../../components/goodsitem/goodsitem';
export default {
	data() {
		return {
			pageNum: 1, //页码
			goodsinfo: [],
			pathlist: [
				{
					icon: '../../../static/images/icon_kehu.png',
					name: '客户管理',
					path: 'customer'
				},
				{
					icon: '../../../static/images/icon_xiaoshou.png',
					name: '销售管理',
					path: 'sales-mng'
				},
				{
					icon: '../../../static/images/icon_caiwu.png',
					name: '财务统计',
					path: 'finance'
				},
				{
					icon: '../../../static/images/icon_gongying.png',
					name: '供应管理',
					path: 'supply'
				},

				{
					icon: '../../../static/images/icon_tuihuo.png',
					name: '退货管理',
					path: 'returngoods'
				},
				{
					icon: '../../../static/images/icon_mendian.png',
					name: '门店设置',
					path: 'shopset'
				},
				{
					icon: '../../../static/images/icon_fuwu.png',
					name: '服务管理',
					path: 'service'
				},
				{
					icon: '../../../static/images/icon_tousu.png',
					name: '投诉建议',
					path: 'complaint'
				}
			],
			orderinfos: []
		};
	},
	components: {
		goodsitem
	},
	onLoad() {
		this.storeId = uni.getStorageSync('shopid');
		this.authorization = uni.getStorageSync('atrztion');
		let data = {
			storeId: this.storeId,
			pageNum: 1
		};
		this.requstlist(data);
		this.requstorderinfo();
	},
	onReachBottom() {
		console.log('触底');
		this.pageNum = this.pageNum + 1;
		let data = {
			storeId: this.storeId,
			pageNum: this.pageNum,
			pageSize:10
		};
		this.requstlist(data);
	},
	methods: {
		// 请求门店工单统计
		requstorderinfo() {
			this.$request('/organization/store/h5/index/' + this.storeId, '', 'get', this.authorization, 'application/json').then(res => {
				this.orderinfos = res.datas;
			});
		},
		// 门店工单数量统计
		requstlist(data) {
			this.$request('/goods/store/goods/withPagingList',
			 data, 'post', this.authorization).then(res => {
				res.datas.forEach(res => {
					this.goodsinfo.push(res);
				});
				// console.log(this.goodsinfo, 'a');
			});
		},
		//跳转
		topath(item){
			console.log(item);
			uni.navigateTo({
				url:`../${item.path}/${item.path}?from=`+item.path
			})
		}
	}
};
</script>

<style lang="less" scoped>
.Shome {
	width: 100%;
	height: 100%;

	image {
		width: 100%;
		height: 100%;
	}

	.bg {
		width: 100%;
		height: 340rpx;
		position: relative;

		.pathlist {
			background: #ffffff;
			border-radius: 5px 5px 0px 0px;
			box-shadow: 0px 4px 6px 0px rgba(250, 250, 250, 0.6);
			position: absolute;
			top: 260rpx;
			left: 50%;
			transform: translateX(-50%);
			width: calc(100% - 60rpx);
			display: flex;
			justify-content: space-between;
			flex-wrap: wrap;
			text-align: center;
			box-sizing: border-box;
			padding: 20rpx 0;

			.pathli {
				width: 25%;
				box-sizing: border-box;
				padding: 10rpx 0;
				font-size: 24rpx;
				line-height: 33rpx;
				color: #999999;
				.topath {
					font-size: 24rpx;
					line-height: 33rpx;
					color: #999999;
				}

				image {
					width: 68rpx;
					height: 68rpx;
				}
			}
		}
	}

	.swiperbox {
		width: calc(100% - 60rpx);
		margin: 0 auto;
		// height: 100%;
		background: #007aff;
		margin-top: 250rpx;

		image {
			width: 100%;
			height: 100%;
		}
	}

	.content {
		box-sizing: border-box;
		padding: 20rpx 30rpx;
	}

	.title {
		font-weight: 500;
		font-size: 30rpx;
		box-sizing: border-box;
		padding-bottom: 10rpx;
		color: #333333;
	}

	.tolist {
		width: 100%;
		display: flex;
		justify-content: space-between;

		.tl-right,
		.tl-left {
			width: 49%;
		}

		.tolistbox {
			border-radius: 20rpx;
			background: #c8c7cc;
			box-sizing: border-box;
			padding: 20rpx 20rpx;
			margin-bottom: 10rpx;

			.handle {
				font-size: 24rpx;
				color: #666666;

				text {
					color: #e23a3a;
				}
			}

			.tomore {
				box-sizing: border-box;
				margin-top: 20rpx;
				font-size: 22rpx;
				border: 1rpx solid #2d8cf0;
				color: #2d8cf0;
				width: 45%;
				text-align: center;
				height: 40rpx;
				line-height: 40rpx;
				border-radius: 10rpx;
			}
		}
	}

	.recommend {
		width: 100%;

		.rtitle {
			width: 100%;
			height: 100%;
			font-size: 36rpx;
			font-weight: 500;
			position: relative;
			display: flex;
			justify-content: flex-start;
			align-items: center;

			.blue {
				width: 4rpx;
				height: 24rpx;
				background: #007aff;
				margin-right: 10rpx;
			}
		}

		.goodslist {
			width: 100%;
			display: flex;
			justify-content: space-between;
			flex-wrap: wrap;

			.goodsli {
				background: #ffffff;
				width: 48%;
				box-sizing: border-box;
				padding: 15rpx 15rpx;
				margin: 15rpx 0;
			}
		}
	}
}
</style>
