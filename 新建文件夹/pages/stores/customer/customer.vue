<template>
	<view class="customer">
		<view class="headertop"><topback :topback="'客户'" :type="'one'" :isleft="true" :isbule="true" :isaddpic="false" @change="topchange"></topback></view>
		<view class="cuslist">
			<view class="cusli" v-for="(item, index) in cuslist" :key="index" @click="tocuritem(index, item)"><cusitem :curinfo="item" :type="'order'"></cusitem></view>
		</view>
		<view class="addcus" v-if="origin != 'order'">新增客户</view>
	</view>
</template>

<script>
import cusitem from '../../../components/listvertical/listvertical.vue';
import topback from '../../../components/topback/topback.vue';
import { mapState, mapMutations } from 'vuex';
export default {
	data() {
		return {
			cuslist: [],
			searchKeywords: '',
			origin: '',
			copyorder: []
		};
	},
	onLoad(val) {
		if (val.from == 'order') {
			this.origin = 'order';
			if (!this.orderinfo) {
				uni.showToast({
					icon: 'none',
					title: '暂无数据，请重新选择'
				});
				setTimeout(function() {
					uni.navigateTo({
						url: '../../order/ordermain/ordermain'
					});
				}, 800);
			} else {
				let data = {
					storeId: uni.getStorageSync('shopid'),
					searchKeywords: this.searchKeywords,
					pageNum: 1,
					pageSize: 10
				};
				this.requst(data);
				this.copyorder = this.orderinfo;
			}
		} else if (val.from == 'customer') {
			this.origin = 'customer';
			console.log(1);
			let data = {
				storeId: uni.getStorageSync('shopid'),
				searchKeywords: this.searchKeywords,
				pageNum: 1,
				pageSize: 10
			};
			this.requst(data);
		}
	},
	computed: {
		...mapState(['orderinfo'])
	},
	methods: {
		...mapMutations(['SET_ORDERINFO']),
		topchange(e) {
			console.log(e);
			if (e == 'back') {
				if (this.origin == 'customer') {
					uni.switchTab({
						url: '../Shome/Shome'
					});
				}
			}
		},
		// 请求客户
		requst(data) {
			this.$request('/organization/driver/user/withPagingList', data, 'post', uni.getStorageSync('atrztion'), '').then(res => {
				console.log(res);
				this.cuslist = res.datas;
				this.SET_ORDERINFO();
			});
		},
		tocuritem(index, item) {
			var that = this;
			console.log(index, item, 'e');
			console.log(that.copyorder, 'copyorder');
			if (this.origin == 'order') {
				let data = {
					orderId: this.copyorder.orderId,
					storeId: this.copyorder.storeId,
					driverUserPhone: item.driverPhone,
					driverUserName: item.driverName,
					orderContactsPerson: item.driverUserContacts,
					driverAvatar: item.driverAvatar
				};
				this.addcus(data);
			}else if(this.origin=='customer'){
				console.log(1);
				uni.navigateTo({
					url:'../cusmain/cusmain?driverId='+item.driverId
				})
			}
		},
		addcus(data) {
			this.$request('/order/store/order/driver/update', data, 'put', uni.getStorageSync('atrztion'), 'application/json').then(res => {
				console.log(res);
				if (res.kfbCode == '200') {
					uni.showToast({
						title: '添加成功'
					});
					setTimeout(function() {
						uni.navigateTo({
							url: '../../order/ordermain/ordermain'
						});
					}, 500);
				}
			});
		}
	},
	components: {
		cusitem,
		topback
	}
};
</script>

<style lang="less" scoped>
.customer {
	width: 100%;
	box-sizing: border-box;
	padding-top: 100rpx;
	.headertop {
		background: #2d8cf0;
		position: fixed;
		width: 100%;
		height: 100rpx;
		z-index: 111;
		top: 0;
		left: 0;
	}
	.cuslist {
		width: 100%;
		box-sizing: border-box;
		padding: 20rpx 20rpx;
		.cusli {
			box-sizing: border-box;
			padding: 15rpx 0rpx;
			background: #ffffff;
			border-bottom: 1rpx solid #e5e5e5;
		}
	}
	.addcus {
		width: 80%;
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
}
</style>
