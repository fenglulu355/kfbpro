<template>
	<view class="content">
		<view class="container">
			<view class="my-content">
				<view class="my-header" :style="{backgroundImage:'url(' + url +'/themes/simpleboot3/public/assets/yinglan/images/my-header.png)'}">
					<view class="my-set">
						<icon name="icon-shezhi" color="#fff" size="26"></icon>
					</view>
					<view class="my-portrait">
						<image class="img" mode="widthFix" src="../../static/images/man.png"></image>
					</view>
					<view class="my-info">
						<view class="name">青同学</view>
						<view class="autograph">我正在学习会计初级职称</view>
					</view>
				</view>
				<view class="my-nav">
					<view class="my-nav-label">
						<image class="img" mode="widthFix" src="../../static/images/icon-1.png"></image>
						<view class="link">
							<view class="text">切换考试</view>
							<icon name="icon-you" color="#d0d0d0" size="24"></icon>
						</view>
					</view>
					<view class="my-nav-label">
						<image class="img" mode="widthFix" src="../../static/images/icon-2.png"></image>
						<view class="link">
							<view class="text">我的班次</view>
							<icon name="icon-you" color="#d0d0d0" size="24"></icon>
						</view>
					</view>
					<view class="my-nav-label">
						<image class="img" mode="widthFix" src="../../static/images/icon-3.png"></image>
						<view class="link">
							<view class="text">我的购买</view>
							<icon name="icon-you" color="#d0d0d0" size="24"></icon>
						</view>
					</view>
					<view class="my-nav-label">
						<image class="img" mode="widthFix" src="../../static/images/icon-4.png"></image>
						<view class="link">
							<view class="text">我的收藏夹</view>
							<icon name="icon-you" color="#d0d0d0" size="24"></icon>
						</view>
					</view>
					<view class="my-nav-label">
						<image class="img" mode="widthFix" src="../../static/images/icon-5.png"></image>
						<view class="link">
							<view class="text">我的错题集</view>
							<icon name="icon-you" color="#d0d0d0" size="24"></icon>
						</view>
					</view>
					<view class="my-nav-label">
						<image class="img" mode="widthFix" src="../../static/images/icon-6.png"></image>
						<view class="link">
							<view class="text">在线咨询</view>
							<icon name="icon-you" color="#d0d0d0" size="24"></icon>
						</view>
					</view>
					<view class="my-nav-label">
						<image class="img" mode="widthFix" src="../../static/images/icon-7.png"></image>
						<view class="link">
							<view class="text">关于我们</view>
							<icon name="icon-you" color="#d0d0d0" size="24"></icon>
						</view>
					</view>
					<view class="my-nav-label">
						<image class="img" mode="widthFix" src="../../static/images/icon-8.png"></image>
						<view class="link">
							<view class="text">设置提醒</view>
							<icon name="icon-you" color="#d0d0d0" size="24"></icon>
						</view>
					</view>
				</view>
			</view>
		</view>
		<bottomNav></bottomNav>
	</view>
</template>

<script>
	import {
		mapState,
		mapActions,
		mapMutations
	} from 'vuex';
	import bottomNav from '../../components/bottom-nav/bottom-nav.vue'
	import icon from '../../components/icon/icon.vue'
	export default {
		data() {
			return {

			}
		},
		computed: {
			...mapState(['url'])
		},
		components: {
			bottomNav,
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
	.my-content {
		padding: 0 30rpx;
		box-sizing: border-box;
		display: flex;
		flex-direction: column;
		margin-bottom: 100rpx;
	}

	.my-content .my-header {
		width: 100%;
		height: 260rpx;
		/* background-color: #42be67; */
		/* background-image: url(); */
		background-position: center;
		background-size: cover;
		background-repeat: no-repeat;
		box-shadow: 0px 10px 24px 0px rgba(0, 0, 0, 0.15);
		border-radius: 20px;
		position: relative;
		padding: 0 46rpx;
		display: flex;
		align-items: center;
		box-sizing: border-box;
		margin-bottom: 22rpx;
	}

	.my-content .my-header .my-set {
		position: absolute;
		right: 30rpx;
		top: 16rpx;
	}

	.my-content .my-header .my-portrait {
		width: 120rpx;
		height: 120rpx;
		background-color: #42be67;
		box-shadow: 0px 3px 15px 0px rgba(0, 0, 0, 0.3);
		border: solid 3px #4ae981;
		border-radius: 50%;
		overflow: hidden;
		margin-right: 20rpx;
	}

	.my-content .my-header .my-portrait .img {
		width: 100%;
	}

	.my-content .my-header .my-info {
		display: flex;
		flex-direction: column;
	}

	.my-content .my-header .my-info .name {
		font-family: NotoSansHans-Medium;
		font-size: 24rpx;
		font-weight: normal;
		font-stretch: normal;
		line-height: 24rpx;
		letter-spacing: 0px;
		color: #ffffff;
		margin-bottom: 14rpx;
	}

	.my-content .my-header .my-info .autograph {
		font-family: NotoSansHans-Regular;
		font-size: 24rpx;
		font-weight: normal;
		font-stretch: normal;
		line-height: 24rpx;
		letter-spacing: 0px;
		color: #76da94;
	}

	.my-content .my-nav {
		display: flex;
		flex-direction: column;
	}

	.my-content .my-nav .my-nav-label {
		height: 110rpx;
		display: flex;
		align-items: center;
		/* border-bottom: 1px solid #dcdcdc; */
	}

	.my-content .my-nav .my-nav-label .img {
		width: 30rpx;
		margin-right: 14rpx;
	}

	.my-content .my-nav .my-nav-label .link {
		flex: 1;
		height: 100%;
		display: flex;
		border-bottom: 1px solid #dcdcdc;
		justify-content: space-between;
		align-items: center;
	}

	.my-content .my-nav .my-nav-label .link .text {
		font-family: NotoSansHans-Regular;
		font-size: 24rpx;
		font-weight: normal;
		font-stretch: normal;
		line-height: 24rpx;
		letter-spacing: 0px;
		color: #000000;
	}
</style>
