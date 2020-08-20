<template>
	<view class=" editinfo">
		<view class="top"><topback :type="'two'" :topback="'反馈详情'" :iscenter="true" :iswhite="true"></topback></view>
		<view class="pcontent">
			<view class="list">
				<view class="li">
					<text class="text">投诉来源：</text>
					<text class="main">工单</text>
				</view>
				<view class="li">
					<text class="text">关联单号：</text>
					<text class="main">6543217583881433</text>
				</view>
				<view class="li">
					<text class="text">投诉时间：</text>
					<text class="main">2020-02-02 20:20</text>
				</view>
				<view class="li">
					<text class="text">投诉状态：</text>
					<text class="main">待处理</text>
				</view>
				<view class="li">
					<text class="text">投诉内容：</text>
					<text class="main">乱收费、乱收费、乱收费、乱收乱收费、乱收乱收费、乱收乱收费、乱收乱收费、乱收乱收费、乱收乱收费、乱收乱收费、乱收乱收费、乱收乱收费单</text>
				</view>
				<view class="li">
					<text class="text">最新回复：</text>
					<text class="main">乱收费、乱收费</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
import topback from '../../../components/topback/topback.vue';

export default {
	data() {
		return {};
	},
	components: { topback },
	methods: {}
};
</script>

<style lang="less" scoped>
.editinfo {
	width: 100%;
	background: #fafafa;
	position: relative;
	box-sizing: border-box;
	padding: 100rpx 0rpx;
	.top {
		width: 100%;
		height: 100rpx;
		background: #2d8cf0;
		position: fixed;
		top: 0;
		left: 0;
		z-index: 1111111;
	}
	.list {
		margin-top: 40rpx;
		width: 100%;
		background: #ffffff;
		box-sizing: border-box;
		padding: 30rpx 0rpx 60rpx 0rpx;
		font-size: 28rpx;
		.li {
			display: flex;
			justify-content: space-between;
			box-sizing: border-box;
			padding: 20rpx 0rpx;
			.text {
				width: 22%;
				color: #666666;
			}
			.main {
				width: 78%;
				color: #999999;
			}
		}
	}
}
</style>
