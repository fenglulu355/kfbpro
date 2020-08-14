<template>
	<view class="content">
		<view class="system-payment">
			<view class="describe">
				<view class="header-img">
					<image class="img" mode="widthFix" src="../../static/images/brush.png"></image>
				</view>
				<view class="title">
					<p>中级会计职称三年真题透视详解文字描述区</p>
					<p>第一期即将开课，5月14日</p>
				</view>
			</view>
			<view class="curriculum">
				<view class="title">
					<icon name="icon-xiangqing" color="#42be67" size="32"></icon>
					<p>课程信息</p>
				</view>
				<view class="info">
					<image class="img" mode="widthFix" src="../../static/images/icon_019_07.png"></image>
					<view class="text">
						<p>中级会计职称三年真题透视详解</p>
						<p>第一期即将开课，5月14日</p>
					</view>
					<view class="label">SVIP</view>
				</view>
			</view>
			<view class="payment-type">
				<view class="payment-type-label">
					<icon name="icon-zhifu" color="#42be67" size="32"></icon>
					<p>支付方式</p>
				</view>
				<view class="payment-type-label">
					<icon name="icon-weixin" color="#42be67" size="32"></icon>
					<p>微信支付</p>
				</view>
			</view>
			<view class="settlement">
				<view class="settlement-title">
					<icon name="icon-jiesuanjichushuju" color="#42be67" size="32"></icon>
					<p>支付方式</p>
				</view>
				<view class="money">
					订单价格：<span>¥49.9</span>
				</view>
			</view>
			<view class="payment-button">
				立即支付
			</view>
		</view>
	</view>
</template>

<script>
	import icon from '../../components/icon/icon.vue'
	export default {
		data() {
			return {

			}
		},
		components: {
			icon
		},
		onShow() {
			uni.hideHomeButton();
		},
		methods: {

		}
	}
</script>

<style scoped>
	.system-payment {
		padding: 0 30rpx;
		box-sizing: border-box;
		display: flex;
		flex-direction: column;
		background-color: #f8f8fa;
		padding-bottom: 46rpx;
		padding-top: 24rpx;
	}

	.describe {
		width: 100%;
		/* height: 523rpx; */
		background-color: #ffffff;
		box-shadow: 0px 0px 30rpx 0px rgba(138, 148, 168, 0.2);
		border-radius: 20rpx;
		overflow: hidden;
		margin-bottom: 25rpx;
	}
	
	.describe .header-img{
		height: 384rpx;
		overflow: hidden;
		position: relative;
	}

	.describe .img {
		width: 100%;
	}

	.describe .title {
		padding: 40rpx;
		box-sizing: border-box;
	}

	.describe .title p:first-child {
		color: #333333;
		font-size: 24rpx;
		line-height: 30rpx;
	}

	.describe .title p:last-child {
		color: #c6c6c8;
		font-size: 24rpx;
		line-height: 30rpx;
	}

	.curriculum {
		margin-bottom: 25rpx;
		width: 100%;
		height: 200rpx;
		background-color: #ffffff;
		border-radius: 20rpx;
		padding: 36rpx;
		box-sizing: border-box;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
	}

	.curriculum .title {
		display: flex;
	}

	.curriculum .title p {
		color: #202020;
		font-size: 24rpx;
		margin-left: 14rpx;
	}

	.curriculum .info {
		display: flex;
		justify-content: space-between;
	}

	.curriculum .info .img {
		width: 72rpx;
		border-radius: 20rpx;
	}

	.curriculum .info .text {
		margin: 0 20rpx;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		flex: 1;
	}

	.curriculum .info .text p:first-child {
		color: #202020;
		font-size: 24rpx;
	}

	.curriculum .info .text p:last-child {
		color: #202020;
		font-size: 24rpx;
		opacity: 0.6;
	}

	.curriculum .info .label {
		width: 98rpx;
		height: 36rpx;
		background-color: #ffbf16;
		text-align: center;
		line-height: 36rpx;
		color: #ffffff;
		font-size: 24rpx;
		border-radius: 0 15px 15px 15px;
	}

	.payment-type {
		width: 100%;
		height: 112rpx;
		background-color: #ffffff;
		border-radius: 15rpx;
		margin-bottom: 25rpx;
		display: flex;
		justify-content: space-between;
		padding: 0 36rpx;
		box-sizing: border-box;
	}

	.payment-type .payment-type-label {
		display: flex;
		align-items: center;
	}

	.payment-type .payment-type-label:first-child p {
		color: #202020;
		font-size: 24rpx;
		margin-left: 15rpx;
	}

	.payment-type .payment-type-label:last-child p {
		color: #949494;
		font-size: 24rpx;
		margin-left: 15rpx;
	}

	.settlement {
		width: 100%;
		height: 176rpx;
		background-color: #ffffff;
		border-radius: 15rpx;
		padding: 0 36rpx;
		box-sizing: border-box;
		display: flex;
		flex-direction: column;
		justify-content: center;
		margin-bottom: 140rpx;
	}

	.settlement .settlement-title {
		display: flex;
		align-items: center;
	}

	.settlement .settlement-title p {
		color: #202020;
		font-size: 24rpx;
		margin-left: 15rpx;
	}

	.settlement .money {
		margin-left: 47rpx;
		color: #949494;
		font-size: 24rpx;
		margin-top: 30rpx;
	}

	.settlement .money span {
		color: #fc6939;
		font-size: 24rpx;
	}

	.payment-button {
		width: 100%;
		height: 92rpx;
		background-color: #42be67;
		border-radius: 46rpx;
		text-align: center;
		line-height: 92rpx;
		color: #ffffff;
		font-size: 24rpx;
	}
</style>
