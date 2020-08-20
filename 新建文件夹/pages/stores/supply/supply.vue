<template>
	<view class="customer">
		<view class="headertop">
			<topback :topback="'供应'" :type="'one'" :isleft="true" :isbule="true" :isaddpic="true" @change="toback"></topback>
			<view class="selectbox">
				<view class="tabs"><tabbar :tabbarlist="tabbarlist" :type="0" @change="tonav" :startindex="showindex"></tabbar></view>
			</view>
		</view>
		<view class="cuslist">
			<view class="cusli" v-for="(item, index) in cuslist" :key="index" @click="tocuritem(index, item)">
				<view class="label">平台供应商</view>
				<cusitem :curinfo="item" :type="'supply'"></cusitem>
			</view>
		</view>
		<view class="addcus" @click="toadd">新增线下供应商</view>
	</view>
</template>

<script>
import cusitem from '../../../components/listvertical/listvertical.vue';
import topback from '../../../components/topback/topback.vue';
import tabbar from '../../../components/tabbar/tabbar.vue';
import { mapMutations } from 'vuex';
export default {
	data() {
		return {
			tabbarlist: ['平台供应商', '线下供应商'],
			showindex: 0,
			cuslist: [],
			authorization: '',
			storeId: '',
			pageNum: 1
		};
	},
	onLoad() {
		console.log('load');
		this.storeId = uni.getStorageSync('shopid');
		this.authorization = uni.getStorageSync('atrztion');
	},
	created() {
		console.log(this.authorization, 'q');
		let data = {
			storeId: this.storeId,
			searchKeywords: '',
			type: 1,
			pageNum: this.pageNum,
			pageSize: 10
		};
		this.requstptlist(data);
	},
	onReachBottom() {
		console.log('触底');
		this.pageNum = this.pageNum + 1;
		if (this.showindex == 0) {
			let data = {
				storeId: this.storeId,
				searchKeywords: '',
				pageNum: this.pageNum,
				pageSize: 10
			};
			this.requstptlist(data);
		} else {
			let data = {
				storeId: this.storeId,
				searchKeywords: '',
				pageNum: this.pageNum,
				pageSize: 10
			};
			this.requstlist(data);
		}
		// this.commonrequst();
	},
	methods: {
		...mapMutations(['SET_SUPPLYMAIN']),
		toback(e) {
			console.log(e);
			if (e == 'back') {
				uni.switchTab({
					url: '../Shome/Shome'
				})
			}
				
		},
		requstptlist(data) {
			console.log(data);
			this.$request('/organization/supplier/sale/find/by/store', data, 'post', this.authorization).then(res => {
				console.log(res.datas, 'a');
				res.datas.forEach(res => {
					this.cuslist.push(res);
				});
			});
		},
		requstlist(data) {
			console.log(data);
			this.$request('/organization/private/supplier/withPagingList', data, 'post', this.authorization).then(res => {
				console.log(res.datas, 'a');
				res.datas.forEach(res => {
					this.cuslist.push(res);
				});
			});
		},
		tocuritem(index, item) {
			this.SET_SUPPLYMAIN(item);
			if (this.showindex == 0) {
				// 平台
				uni.navigateTo({
					url: '../supplymain/supplymain?type=0'
				});
			} else {
				uni.navigateTo({
					url: '../supplymain/supplymain?type=1'
				});
			}
			console.log(index, item, 'e');
		},
		toadd() {
			uni.navigateTo({
				url: '../addsupply/addsupply'
			});
		},
		tonav(val) {
			this.showindex = val;
			this.pageNum = 1;
			this.cuslist = [];
			if (val == 0) {
				let data = {
					storeId: this.storeId,
					searchKeywords: '',
					pageNum: this.pageNum,
					pageSize: 10
				};
				this.requstptlist(data);
			} else {
				let data = {
					storeId: this.storeId,
					searchKeywords: '',
					pageNum: this.pageNum,
					pageSize: 10
				};
				this.requstlist(data);
			}
			console.log(this.showindex);
		}
	},
	components: {
		cusitem,
		topback,
		tabbar
	}
};
</script>

<style lang="less" scoped>
.customer {
	width: 100%;
	box-sizing: border-box;
	padding-top: 180rpx;

	.headertop {
		background: #2d8cf0;
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
			// height: 100rpx;
			background: #ffffff;
		}
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
			position: relative;
			.label {
				position: absolute;
				right: 0;
				top: 30rpx;
				width: 140rpx;
				text-align: center;
				line-height: 42rpx;
				height: 42rpx;
				background: #2d8cf0;
				border-radius: 8rpx;
				font-size: 24rpx;
				color: #ffffff;
			}
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
