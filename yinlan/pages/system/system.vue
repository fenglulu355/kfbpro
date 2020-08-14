<template>
	<view class="content">
		<view class="system">
			<view class="study-head">
				<view class="study-button">
					<image class="img" mode="widthFix" src="../../static/images/study.png"></image>
					<!-- 	<view class="txt">
					切换考试
				</view> -->
					<navigator class="txt" url="../itemize/itemize" hover-class="none">
						切换考试
					</navigator>
				</view>
				<view class="study-input">
					<icon name="icon-sousuo" color="#42be67" size="32"></icon>
					<input type="text" value="" placeholder="输入当前专业查找类别" />
				</view>
			</view>
			<view class="system-ul">
				<navigator class="system-li" v-for="item in 12" :key="index"  url="../system-payment/system-payment" hover-class="none">
					<view class="system-label">VIP</view>
					<view class="system-name">
						<image class="img" mode="widthFix" src="../../static/images/icon_019_07.png"></image>
						<view class="name">
							<p>中级会计职称三年真题透视详解</p>
							<p>第一期即将开课，5月14日</p>
						</view>
					</view>
					<view class="system-man">
						<view class="man">
							<image class="img" mode="widthFix" src="../../static/images/icon_019_07.png"></image>
							<p>柠檬老师</p>
						</view>
						<view class="man">
							<image class="img" mode="widthFix" src="../../static/images/icon_019_07.png"></image>
							<p>柠檬老师</p>
						</view>
						<view class="money">
							<p> <span>¥</span> 49.9</p>
							<p>1846人购买</p>
						</view>
					</view>
				</navigator>
			</view>
		</view>
		<courseNav></courseNav>
	</view>
</template>

<script>
	import icon from '../../components/icon/icon.vue'
	import courseNav from '../../components/course-nav/course-nav.vue'
	export default {
		data() {
			return {

			}
		},
		components: {
			icon,
			courseNav
		},
		onShow() {
			uni.hideHomeButton();
		},
		methods: {

		}
	}
</script>

<style scoped>
	.system {
		padding: 0 30rpx;
		box-sizing: border-box;
		margin-bottom: 120rpx;
	}

	.study-head {
		display: flex;
		padding: 30rpx 20rpx;
		box-sizing: border-box;
		width: 100%;
		justify-content: space-between;
		position: fixed;
		top: 0;
		left: 0;
		background-color: #fff;
		z-index: 2;
	}

	.study-head .study-button {
		display: flex;
		align-items: center;
	}

	.study-head .study-button .img {
		width: 30rpx;
		margin-right: 6rpx;
	}

	.study-head .study-button .txt {
		color: #6a6a6a;
		font-size: 24rpx;
	}

	.study-input {
		width: 330rpx;
		height: 56rpx;
		background-color: #ffffff;
		border-radius: 24rpx;
		border: solid 1px #cacacc;
		display: flex;
		align-items: center;
		padding: 0 20rpx;
		box-sizing: border-box;
	}

	.study-input input {
		font-size: 24rpx;
		line-height: 56rpx;
		color: #c6c6c8;
		margin-left: 20rpx;
	}

	.system-ul {
		display: flex;
		flex-direction: column;
		margin-top: 156rpx;
	}

	.system-ul .system-li {
		width: 100%;
		height: 260rpx;
		background-color: #ffffff;
		box-shadow: 0px 0px 30rpx 0px rgba(138, 148, 168, 0.2);
		border-radius: 20rpx;
		margin-bottom: 30rpx;
		position: relative;
		overflow: hidden;
		padding: 26rpx 24rpx;
		padding-top: 64rpx;
		box-sizing: border-box;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		padding-left: 32rpx;
	}

	.system-ul .system-li .system-label {
		position: absolute;
		width: 96rpx;
		height: 36rpx;
		background-color: #ffbf16;
		border-radius: 20rpx 0rpx 20rpx 0rpx;
		top: 0;
		left: 0;
		text-align: center;
		line-height: 36rpx;
		font-size: 24rpx;
		color: #ffffff;
	}

	.system-name {
		display: flex;
	}

	.system-name .img {
		width: 72rpx;
		border-radius: 20rpx;
		margin-right: 18rpx;
	}

	.system-name .name {
		display: flex;
		flex-direction: column;
		justify-content: space-between;
	}

	.system-name .name p:first-child {
		color: #333333;
		font-size: 24rpx;
	}

	.system-name .name p:last-child {
		color: #c6c6c8;
		font-size: 24rpx;
	}

	.system-man {
		display: flex;
		justify-content: space-between;
		align-items: flex-end;
	}

	.system-man .man {
		display: flex;
		align-items: center;
	}

	.system-man .man .img {
		width: 36rpx;
		height: 36rpx;
		border-radius: 50%;
		overflow: hidden;
		margin-right: 10px;
	}

	.system-man .man p {
		color: #c6c6c8;
		font-size: 24rpx;
	}
	.system-man .money p:first-child{
		color: #fc6939;
		font-size: 30rpx;
		text-align: center;
	}
	.system-man .money p:last-child{
		color: #c6c6c8;
		font-size: 24rpx;
		text-align: center;
	}
	.system-man .money span{
		color: #fc6939;
		font-size: 24rpx;
	}
</style>
