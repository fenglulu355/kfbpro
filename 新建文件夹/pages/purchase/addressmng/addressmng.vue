<template>
	<view class="adresslist">
		<view class="top"><topback :topback="'收货地址'" :iscenter="true" :isbg="true"></topback></view>
		<view class="adslist">
			<view class="adsli">
				<view class="a-top">
					<text class="name">采购员刘师傅</text>
					<text class="tel">549867498798</text>
				</view>
				<view class="adrs">
					<text class="text">地址：</text>
					<view class="main">委任为认为人为微软微软微软微软微软我认为热望热望微软我我我我我9及服务jf-wej-</view>
				</view>
				<image src="../../../static/images/icon_bianji@2x.png" mode=""></image>
			</view>
			<view class="save" @click="toadd">新增收货地址</view>
		</view>
	</view>
</template>

<script>
import topback from '../../../components/topback/topback.vue';

export default {
	data() {
		return {};
	},
	methods:{
		toadd(){
			uni.navigateTo({
				url:'../editdress/editdress'
			})
		}
	},
	components: { topback }
};
</script>

<style lang="less" scoped>
.adresslist {
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
	.adslist {
		width: 100%;
		box-sizing: border-box;
		padding: 0 30rpx;
		.adsli {
			background: #ffffff;
			margin-top: 30rpx;
			position: relative;
			box-sizing: border-box;
			padding: 30rpx 0;
			.a-top {
				font-size: 32rpx;
				color: #282828;
				box-sizing: border-box;
				padding: 0 0 20rpx 0;
				.tel {
					padding-left: 20rpx;
					font-size: 26rpx;
					color: #666666;
				}
			}
			.adrs {
				display: flex;
				justify-content: flex-start;
				width: 100%;
				font-size: 26rpx;
				color: #999999;
				.text {
					width: 12%;
				}
				.main {
					width: 60%;
					line-height: 40rpx;
				}
			}
			image {
				width: 40rpx;
				height: 40rpx;
				position: absolute;
				right: 50rpx;
				top: 50%;
				transform: translateY(-50%);
			}
		}
	}
}
.save {
	position: fixed;
	bottom: 50rpx;
	left: 50%;
	transform: translateX(-50%);
	width: calc(100% - 60rpx);
	height: 80rpx;
	background: #2d8cf0;
	text-align: center;
	line-height: 80rpx;
	color: #ffffff;
	border-radius: 5rpx;
}
</style>
