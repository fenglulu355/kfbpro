<template>
	<view class="incomain">
		<view class="top"><topback :type="'two'" :isbg="false" :topback="'收支详情'" :iscenter="true"></topback></view>
		<view class="content">
			<view class="c-top">
				<image src="../../../static/images/icon_shouru.png" mode=""></image>
				<view class="text">+{{ fncitem.incomeExpendAmount }}</view>
			</view>
			<view class="lists">
				<view class="li-item">
					<text class="text">流水单号</text>
					<text class="main">{{ fncitem.incomeExpendCode }}</text>
				</view>
				<view class="li-item">
					<text class="text">关联单号</text>
					<text class="main">{{ fncitem.orderCode }}</text>
				</view>
				<view class="li-item">
					<text class="text">收支创建时间</text>
					<text class="main">{{ fncitem.incomeExpendTransactionHour }}</text>
				</view>
				<view class="li-item">
					<text class="text">收支类型</text>
					<text class="main" v-if="fncitem.type == 1">收入</text>
					<text class="main" v-if="fncitem.type == 2">支出</text>
				</view>
				<view class="li-item border">
					<text class="text">收支项目</text>
					<text class="main">{{ fncitem.incomeExpendItem }}</text>
				</view>
				<view class="li-item">
					<text class="text">付款方</text>
					<text class="main">{{ fncitem.incomeExpendRelName }}</text>
				</view>
				<view class="li-item">
					<text class="text">收款方</text>
					<text class="main">{{ fncitem.incomeExpendIncomeUserName }}</text>
				</view>
				<view class="li-item">
					<text class="text">支付方式</text>
					<text class="main">{{ fncitem.incomeExpendPayType }}</text>
				</view>
				<view class="li-item">
					<text class="text">备注</text>
					<text class="main">{{ fncitem.incomeExpendRemark }}</text>
				</view>
			</view>
			<view class="toother" @click="tomain">查看关联订单</view>
		</view>
	</view>
</template>

<script>
import topback from '../../../components/topback/topback.vue';
import { mapState, mapMutations } from 'vuex';
export default {
	data() {
		return {};
	},
	onLoad() {
		console.log(this.fncitem, 'a');
		if (this.fncitem.length == 0) {
			uni.showToast({
				icon: 'none',
				title: '暂无数据'
			});
			setTimeout(function() {
				uni.navigateTo({
					url: '../finance/finance'
				});
			}, 200);
		}
	},
	computed: {
		...mapState(['fncitem'])
	},
	methods: {
		tobacks(e, type) {
			console.log(e, type);
			if (e == 'back') {
				uni.navigateTo({
					url:'../finance/finance'
				})
			} 
		},
		tomain() {
			let arr = this.fncitem;
			if (arr.incomeExpendType.indexOf('作废') != -1) {
				console.log(111);
				uni.showToast({
					icon: 'none',
					title: '作废单无关联订单'
				});
				return;
			} else if (arr.incomeExpendType.indexOf('销售') != -1) {
				uni.navigateTo({
					url: '../salesmain/salesmain?orderId=' + this.fncitem.orderId
				});
			}else if (arr.incomeExpendType.indexOf('工单') != -1) {
				uni.navigateTo({
					url: '../../order/ordermain/ordermain?orderid=' + this.fncitem.orderId
				});
			}
			console.log(arr);
		}
	},
	components: { topback }
};
</script>

<style lang="less" scoped>
.incomain {
	width: 100%;
	background: #fafafa;
	position: relative;
	box-sizing: border-box;
	// padding-top: 100rpx;
	.top {
		width: 100%;
		height: 100rpx;
		background: #ffffff;
	}
	.content {
		width: 100%;
		.c-top {
			background: #ffffff;
			text-align: center;
			box-sizing: border-box;
			padding: 50rpx 0;
			image {
				width: 100rpx;
				height: 100rpx;
			}
			.text {
				font-size: 60rpx;
				color: #282828;
			}
		}
		.lists {
			background: #ffffff;
			box-sizing: border-box;
			padding: 0 30rpx;
			margin: 30rpx 0;
			.li-item {
				width: 100%;
				display: flex;
				justify-content: space-between;
				box-sizing: border-box;
				padding: 30rpx 0;
				.text {
					font-size: 28rpx;
					color: #666666;
				}
				.main {
					color: #333333;
					font-size: 26rpx;
				}
			}
			.border {
				border-bottom: 1rpx solid #e5e5e5;
			}
		}
	}
	.toother {
		width: 60%;
		height: 80rpx;
		margin: 40rpx auto;
		background: #2d8cf0;
		border-radius: 5rpx;
		text-align: center;
		line-height: 80rpx;
		color: #ffffff;
		font-size: 30rpx;
	}
}
</style>
