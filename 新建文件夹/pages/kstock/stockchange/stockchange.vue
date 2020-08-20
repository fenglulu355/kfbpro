<template>
	<view class="cusmain">
		<view class="top"><topback :type="'two'" :topback="'库存变更记录'" :iscenter="true" :iswhite="true" @change="tobacks"></topback></view>
		<tabbar :tabbarlist="tabbarlist" :startindex="showindex" :type="0" @change="tonav"></tabbar>

		<!-- 头部信息 -->

		<view class="cuslist">
			<view class="cusli" v-for="(item, index) in list" :key="index" @click="tozdmain(item, index)">
				<image v-if="item.type == 1" src="../../../static/images/icon_chuku@2x.png" mode=""></image>
				<image v-if="item.type == 2" src="../../../static/images/icon_caigou@2x.png" mode=""></image>
				<view class="c-left">
					<view class="c-top flex">
						<text class="typename">{{ item.orderOperationModeName }}</text>
						<text class="num">{{ item.orderCode }}</text>
					</view>
					<view class="c-center flex">
						<text class="name">{{ item.orderResponsible }}</text>
						<text v-if="item.type == 1" class="green">- {{ item.orderNumber }}</text>
						<text v-if="item.type == 2" class="red">+ {{ item.orderNumber }}</text>
					</view>
					<view class="c-bot flex">
						<text class="note">备注：{{ item.orderRemark }}</text>
						<text class="time">{{ item.orderAddTimeStr }}</text>
					</view>
					<!-- <view class="name">
						<text>{{ item.name }}</text>
						<text v-if="item.type == 0" class="xz">- {{ item.price }}</text>
						<text v-if="item.type == 1" class="xs">+ {{ item.price }}</text>
					</view>
					<view class="time">{{ item.time }}</view> -->
				</view>
			</view>
		</view>
	</view>
</template>

<script>
import topback from '../../../components/topback/topback.vue';
import tabbar from '../../../components/tabbar/tabbar.vue';

export default {
	data() {
		return {
			tabbarlist: ['全部', '出库', '入库'],
			showindex: 0,
			list: [],
			storeId: '',
			authorization: '',
			storeGoodsId: '',
			selectType: '',
			pageNum: 1
		};
	},
	onLoad(val) {
		this.storeId = uni.getStorageSync('shopid');
		this.authorization = uni.getStorageSync('atrztion');
		this.storeGoodsId = val.storeGoodsId;
		let data = {
			storeGoodsId: this.storeGoodsId,
			selectType: this.selectType,
			pageNum: this.pageNum,
			pageSize: 10
		};
		this.request(data);
	},
	components: { topback, tabbar },
	onReachBottom() {
		console.log('触底');
		this.pageNum = this.pageNum + 1;
		let data = {
			storeGoodsId: this.storeGoodsId,
			selectType: this.selectType,
			pageNum: this.pageNum,
			pageSize: 10
		};
		this.request(data);
	},
	methods: {
		tobacks(e) {
			console.log(e);
			if (e == 'back') {
				uni.navigateBack();
			}
		},
		request(data) {
			this.$request('/goods/store/goods/log', data, 'post', this.authorization).then(res => {
				// this.infos = res.datas;
				res.datas.forEach(res => {
					this.list.push(res);
				});
				console.log(res.datas);
			});
		},
		tozdmain(item, index) {},
		tonav(val) {
			this.showindex = val;
			(this.pageNum = 1), (this.list = []);
			console.log(this.showindex);
			if (val == 0) {
				this.selectType = '';
			} else if (val == 1) {
				this.selectType = 1;
			} else if (val == 2) {
				this.selectType = 2;
			}

			let data = {
				storeGoodsId: this.storeGoodsId,
				selectType: this.selectType,
				pageNum: this.pageNum,
				pageSize: 10
			};
			this.request(data);
		}
	}
};
</script>

<style lang="less" scoped>
.cusmain {
	width: 100%;
	background: #fafafa;
	position: relative;
	box-sizing: border-box;
	padding-top: 120rpx;
	.top {
		width: 100%;
		height: 100rpx;
		background: #2d8cf0;
		position: fixed;
		top: 0;
		left: 0;
		z-index: 1111111;
	}
}

.cuslist {
	width: 100%;
	box-sizing: border-box;
	padding: 30rpx 20rpx;
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
			.flex {
				display: flex;
				justify-content: space-between;
				// align-items: center;
				color: #999999;
			}
			.c-top {
				justify-content: flex-start;

				.typename {
					font-size: 32rpx;
					color: #333333;
				}
				.num {
					font-size: 24rpx;
					color: #999999;
					box-sizing: border-box;
					padding-left: 30rpx;
				}
			}

			.c-center {
				box-sizing: border-box;
				padding: 10rpx 0;
				font-size: 28rpx;
				.name {
					font-size: 26rpx;
				}
				.green {
					color: #67c23a;
				}
				.red {
					color: #e23a3a;
				}
			}
			.c-bot {
				width: 100%;
				.note {
					width: 60%;
					// background: #4cd964;
					font-size: 20rpx;
					text-overflow: -o-ellipsis-lastline;
					overflow: hidden;
					text-overflow: ellipsis;
					display: -webkit-box;
					-webkit-line-clamp: 3;
					line-clamp: 3;
					-webkit-box-orient: vertical;
				}
				.time {
					width: 47%;
					font-size: 24rpx;
				}
			}
			// .name {
			// 	font-size: 32rpx;
			// 	color: #333333;
			// 	display: flex;
			// 	line-height: 60rpx;
			// 	justify-content: space-between;
			// 	.gs {
			// 		color: #e23a3a;
			// 	}
			// 	.xs,
			// 	.xt {
			// 		color: #ffa928;
			// 	}

			// 	.xz {
			// 		color: #67c23a;
			// 	}
			// }
			// .time {
			// 	font-size: 24rpx;
			// 	color: #999999;
			// }
		}
		.c-right {
			width: 20%;
			font-size: 28rpx;
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
		width: 140rpx;
		height: 140rpx;
		border-radius: 50%;
	}
	.notice {
		font-size: 20rpx;
		box-sizing: border-box;
		padding-top: 20rpx;
	}
	.infos {
		width: 75%;
		box-sizing: border-box;
		// padding-left: 20rpx;
		align-self: center;
		.title {
			font-size: 32rpx;
			box-sizing: border-box;
			padding-top: 80rpx;
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
}
</style>
