<template>
	<view class="course-nav">
		<view class="nav">
			<image class="img" mode="widthFix" src="../../static/images/icon_16.png"></image>
			<view class="text">
				学习
			</view>
		</view>
		<view class="nav">
			<image class="img" mode="widthFix" src="../../static/images/icon_16.png"></image>
			<view class="text">
				学习
			</view>
		</view>
		<view class="nav">
			<image class="img" mode="widthFix" src="../../static/images/icon_16.png"></image>
			<view class="text">
				学习
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {

			};
		}
	}
</script>

<style scoped>
	.course-nav {
		position: fixed;
		bottom: 0;
		width: 100vw;
		height: 110rpx;
		background-image: linear-gradient(#ffffff,
			#ffffff),
			linear-gradient(#ffffff,
			#ffffff);
		background-blend-mode: normal,
			normal;
		box-shadow: 0px -6px 17px 0px rgba(138, 148, 168, 0.07);
		display: flex;
		justify-content: space-between;
	}
	.course-nav .nav{
		width: 180rpx;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}
	.course-nav .nav .img{
		width: 25rpx;
		margin-bottom: 12rpx;
	}
	.course-nav .text{
		color: #666666;
		font-size: 24rpx;
	}
</style>
