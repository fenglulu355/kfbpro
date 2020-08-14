<template>
	<view :class="['popup',isOpen?'open':'']">
		<view class="popup-content">
			<view class="close" @click="close">
				<icon name="icon-guanbi" color="#42be67" size="26"></icon>
			</view>
			<view class="title">专属课程</view>
			<view class="text">
				购买指定课程后可观看
			</view>
			<view class="consulting">咨询</view>
			<span class="purchase">
				购买
			</span>
		</view>
	</view>
</template>

<script>
	import icon from '../icon/icon.vue'
	export default {
		data() {
			return {

			};
		},
		props:['isOpen'],
		components: {
			icon
		},
		methods: {
			close() {
				this.$emit('close');
			}
		}
	}
</script>

<style scoped>
	.popup {
		width: 100vw;
		height: 100vh;
		background-color: rgba(0, 0, 0, 0.5);
		position: fixed;
		top: 0;
		left: 0;
		z-index: 5;
		display: flex;
		justify-content: center;
		align-items: center;
		transform: translateY(100%);
		transition: cubic-bezier(0.215,.61,.355,1) .15s;
	}
	
	.open{
		transform: translateY(0%);
	}
	
	.popup-content {
		width: 481rpx;
		height: 406rpx;
		background-color: #ffffff;
		border-radius: 20rpx;
		position: relative;
		display: flex;
		flex-direction: column;
	}

	.popup-content .close {
		position: absolute;
		right: 15rpx;
		top: 15rpx;
	}

	.title {
		text-align: center;
		color: #333333;
		font-size: 24rpx;
		font-weight: bold;
		margin: 50rpx auto;
	}

	.text {
		color: #333333;
		font-size: 24rpx;
		text-align: center;
		margin-bottom: 50rpx;
	}

	.consulting {
		margin: 0 auto;
		width: 384rpx;
		height: 62rpx;
		background-color: #42be67;
		border-radius: 5rpx;
		text-align: center;
		line-height: 62rpx;
		font-size: 24rpx;
		color: #fffefe;
	}
	.purchase{
		color: #42be67;
		font-size: 24rpx;
		margin: 0 auto;
		margin-top: 40rpx;
	}
</style>
