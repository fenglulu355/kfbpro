<template>
	<view class="salesmng">
		<view class="headertop">
			<topback :topback="'销售'" :type="'one'" :isleft="true" :isbule="false" :isaddpic="false" @change="tobacks"></topback>
			<view class="selectbox">
				<view class="tabs"><tabbar :tabbarlist="tabbarlist" :type="0" @change="tonav" :startindex="showindex"></tabbar></view>
			</view>
		</view>

		<view class="content">
			<!-- tabbar -->
			<view class="salelist">
				<view class="saleli" v-for="(item, index) in saleli" :key="index" @click="tomain(item, index)"><goodsitem :goodsinfo="item" :types="1"></goodsitem></view>
			</view>
		</view>
		<view class="add"><image src="../../../static/images/icon_add@2x.png" @click="toaddgoods" mode=""></image></view>
	</view>
</template>

<script>
import topback from '../../../components/topback/topback.vue';
import tabbar from '../../../components/tabbar/tabbar.vue';
import goodsitem from '../../../components/goodsitem/goodsitem';

export default {
	data() {
		return {
			showindex: 0,
			tabbarlist: ['全部', '未结清', '已结清', '已作废'],
			saleli: [],
			storeId: '',
			atrztion: '',
			origin: '',
			salepageNum: 1,
			saleorderStatus: '',
			searchKeywords:''
		};
	},
	onLoad(val) {
		this.storeId = uni.getStorageSync('shopid');
		this.atrztion = uni.getStorageSync('atrztion');
		this.origin = val.from;
		let data = {
			storeId: this.storeId,
			salepageNum: 1
		};
		this.requstlist(data);
	},
	onReachBottom() {
		console.log('触底');
		this.salepageNum = this.salepageNum + 1;
		let data = {
			storeId: this.storeId,
			pageNum: this.salepageNum,
			pageSize: 10,
			searchKeywords:this.searchKeywords,
			orderStatus:this.saleorderStatus
		};
		this.requstlist(data);
	},
	methods: {
		tobacks(e,type) {
			console.log(e,type);
			if (e == 'back') {
				uni.switchTab({
					url:'../Shome/Shome'
				})
			}else if(type=='search'){
				this.searchKeywords=e
				this.saleli = [];
				console.log(1);
				let data = {
					storeId: this.storeId,
					pageNum: 1,
					pageSize: 10,
					searchKeywords:this.searchKeywords,
					orderStatus:this.saleorderStatus
				};
				this.requstlist(data);
			}
		}, 
		tonav(e) {
			this.showindex = e;
			console.log(e, 'index');
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
			} else if (e == 3) {
				this.saleorderStatus = 3;
			}
			let orderdata = {
				storeId: this.storeId, //门店ID
				pageNum: this.salepageNum,
				orderStatus: this.saleorderStatus,
				searchKeywords:this.searchKeywords
			};
			this.requstlist(orderdata);
		},
		requstlist(data) {
			this.$request('/order/store/sale/order/withPagingList', data, 'post', this.atrztion).then(res => {
				res.datas.forEach(res => {
					this.saleli.push(res);
				});
				console.log(res, 'a');
			});
		},
		toaddgoods() {
			uni.navigateTo({
				url: '../addgoods/addgoods?from=' + 'sales'
			});
		},
		tomain(item, index) {
			console.log(item);
			uni.navigateTo({
				url: '../salesmain/salesmain?orderId=' + item.orderId + '&orderStatus=' + item.orderStatus + '&orderCode=' + item.orderCode
			});
		}
	},
	components: { topback, tabbar, goodsitem }
};
</script>

<style lang="less" scoped>
.salesmng {
	width: 100%;
	background: #fafafa;
	position: relative;
	box-sizing: border-box;
	padding-top: 80rpx;
	.add {
		position: fixed;
		right: 20rpx;
		bottom: 20%;
		image {
			width: 138rpx;
			height: 138rpx;
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
}
.content {
	box-sizing: border-box;
	padding: 120rpx 30rpx 30rpx 30rpx;
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
</style>
