<template>
	<view class="cusmain">
		<view class="top"><topback :type="'two'" :topback="'账单详情'" :iscenter="true" :iswhite="true" @change="tobacks"></topback></view>
		<!-- 头部信息 -->
		<view
			v-if="origin == 0"
			class="headinfo"
			style="background: url(../../../static/images/bg.png);
				background-position: center;
				background-size: cover;
				background-repeat: no-repeat;"
			>
			<image :src="userhead + zditem.driverAvatar" mode=""></image>
			<view class="infos">
				<view class="title">{{ zditem.driverName }}</view>
				<view class="name-tle">
					<text class="name">{{ zditem.driverUserContacts }}</text>
					<text class="tel">{{ zditem.driverPhone }}</text>
				</view>
				<view class="price">
					余额：
					<text>{{ zditem.accountBalance }}</text>
				</view>
				<view class="notice">注意：更多账单信息请在pc端查看</view>
			</view>
		</view>
		<view
			v-if="origin == 1"
			class="headinfo"
			style="background: url(../../../static/images/bg.png);
				background-position: center;
				background-size: cover;
				background-repeat: no-repeat;"
			>
			<image :src="userhead + zditem.supplierAvatar" mode=""></image>
			<view class="infos">
				<view class="title">{{ zditem.supplierName }}</view>
				<view class="name-tle">
					<text class="name">{{ zditem.supplierContacts }}</text>
					<text class="tel">{{ zditem.supplierPhone }}</text>
				</view>
				<view class="price">
					余额：
					<text>{{ zditem.accountBalance }}</text>
				</view>
				<view class="notice">注意：更多账单信息请在pc端查看</view>
			</view>
		</view>
		
		<view class="cuslist nodata" v-if="zdlist.length==0">
			暂无数据
		</view>
		<view class="cuslist" v-else>
			<view class="cusli" v-for="(item, index) in zdlist" :key="index" @click="tozdmain(item, index)">
				<image v-if="item.type == 2" src="../../../static/images/icon_daishou.png" mode=""></image>
				<image v-if="item.type == 1" src="../../../static/images/icon_zhichu.png" mode=""></image>
				<view class="c-left">
					<view class="name">
						<text v-if="item.billType == 1">工单欠款</text>
						<text v-if="item.billType == 2">销售单欠款</text>
						<text v-if="item.billType == 3">收款</text>
						<text v-if="item.billType == 4">应付减免</text>
						<text v-if="item.type == 2" class="xs">+{{ item.amount }}</text>
						<text v-if="item.type == 1" class="xz">-{{ item.amount }}</text>
					</view>
					<view class="time">{{ item.updateTimeStr }}</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
import topback from '../../../components/topback/topback.vue';
import { mapState, mapMutations } from 'vuex';

export default {
	data() {
		return {
			zdlist: [],
			origin: ''
		};
	},
	onLoad(val) {
		console.log(this.zditem, 'a');
		if (this.zditem.length == 0) {
			uni.showToast({
				icon: 'none',
				title: '暂无数据'
			});
			setTimeout(function() {
				uni.navigateTo({
					url: '../finance/finance'
				});
			}, 200);
		} else {
			if (val.type == 0) {
				this.origin = 0;
				let data = {
					billId: this.zditem.billId,
					pageNum: 1,
					pageSize: 999999,
					billType: 1,
					driverUserId: '',
					supplierId: '',
					storeId: '',
					orderBeginTimeStr: '',
					orderEndTimeStr: '',
					searchKeywords: ''
				};
				console.log(data);
				this.requesttype(data);
			} else {
				this.origin = 1;
				let data = {
					billId: this.zditem.billId,
					pageNum: 1,
					pageSize: 999999,
					billType: 1,
					driverUserId: '',
					supplierId: '',
					storeId: '',
					orderBeginTimeStr: '',
					orderEndTimeStr: '',
					searchKeywords: ''
				};
				this.requestgystype(data);
			}
		}
	},
	computed: {
		...mapState(['zditem'])
	},
	components: { topback },
	methods: {
		tobacks(e) {
			console.log(e);
			if (e == 'back') {
				uni.navigateTo({
					url: '../finance/finance'
				});
			}
		},
		requesttype(data) {
			this.$request('/organization/store/income/expend/driver/user/detail/log/info', data, 'post', uni.getStorageSync('atrztion'), '').then(res => {
				let arr = res.datas;
				arr.forEach(res => {
					this.zdlist.push(res);
				});
				console.log(arr);
			});
		},
		requestgystype(data) {
			this.$request('/organization/store/income/expend/supplier/detail/log/info', data, 'post', uni.getStorageSync('atrztion'), '').then(res => {
				let arr = res.datas;
				arr.forEach(res => {
					this.zdlist.push(res);
				});
				console.log(arr);
			});
		}
	}
};
</script>

<style lang="less" scoped>
.cusmain {
	width: 100%;
	height: 100%;
	position: relative;
	.top {
		width: 100%;
		position: absolute;
		top: 0;
	}
}
.nodata{
	// background: #007AFF
	text-align: center;
	font-size: 32rpx;
	box-sizing: border-box;
margin-top: 150rpx;
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
			.name {
				font-size: 32rpx;
				color: #333333;
				display: flex;
				line-height: 60rpx;
				justify-content: space-between;
				.gs {
					color: #e23a3a;
				}
				.xs,
				.xt {
					color: #ffa928;
				}

				.xz {
					color: #67c23a;
				}
			}
			.time {
				font-size: 24rpx;
				color: #999999;
			}
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
