<template>
	<view class="content">
		<view class="container">
			<view class="class-nav">
				<view :class="['label',item.select?'select':'' ]" v-for="(item,index) in classNav" :key="index" @click="setNav(index)">{{item.title}}</view>
			</view>
			<view class="class-content">
				<view class="label">
					<view class="label-header">
						<image class="img" mode="widthFix" src="../../static/images/brush.png"></image>
					</view>
					<view class="label-info">
						<view class="title">
							中级会计职称三年真题透视详解
						</view>
						<view class="time">
							<span>生产与作业管理</span><span>19:00-20:00</span>
						</view>
						<view class="speed">
							<span>授课进度</span>
							<view class="lang">
								<view></view>
							</view>
							<span>100%</span>
						</view>
						<view class="study">
							<view class="teacher-ul">
								<view class="teacher-li">
									<image class="img" mode="center" src="../../static/images/brush.png"></image>
									<span>柠檬老师</span>
								</view>
								<view class="teacher-li">
									<image class="img" mode="center" src="../../static/images/brush.png"></image>
									<span>柠檬老师</span>
								</view>
							</view>
							<view class="study-button">进班学习</view>
						</view>
					</view>
					<view class="imprint">
						免费
					</view>
				</view>
				<view class="label">
					<view class="label-header">
						<image class="img" mode="widthFix" src="../../static/images/brush.png"></image>
					</view>
					<view class="label-info">
						<view class="title">
							中级会计职称三年真题透视详解
						</view>
						<view class="time">
							<span>生产与作业管理</span><span>19:00-20:00</span>
						</view>
						<view class="speed">
							<span>授课进度</span>
							<view class="lang">
								<view></view>
							</view>
							<span>100%</span>
						</view>
						<view class="study">
							<view class="teacher-ul">
								<view class="teacher-li">
									<image class="img" mode="center" src="../../static/images/brush.png"></image>
									<span>柠檬老师</span>
								</view>
								<view class="teacher-li">
									<image class="img" mode="center" src="../../static/images/brush.png"></image>
									<span>柠檬老师</span>
								</view>
							</view>
							<view class="study-button">进班学习</view>
						</view>
					</view>
					<view class="imprint">
						付费
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
				classNav: [{
					title: '全部',
					select: true
				}, {
					title: '免费公开课',
					select: false
				}, {
					title: '付费视频课',
					select: false
				}]
			}
		},
		components: {
			bottomNav,
			icon
		},
		onShow() {
			uni.hideHomeButton();
		},
		methods: {
			setNav(index) {
				let arr = this.classNav;
				for (let i in arr) {
					arr[i].select = false
				}
				arr[index].select = true;
				this.classNav = arr;
			}
		}
	}
</script>

<style>
	.class-nav {
		width: 100%;
		height: 92rpx;
		background-color: #ffffff;
		display: flex;
		justify-content: space-around;
		border-top: 1px solid #f8f8fa;
		position: fixed;
		top: 0;
		z-index: 4;
	}

	/*  #ifdef  H5  */
	.class-nav {
		width: 100%;
		height: 92rpx;
		background-color: #ffffff;
		display: flex;
		justify-content: space-around;
		border-top: 1px solid #f8f8fa;
		position: fixed;
		top: 44px;
		z-index: 4;
	}
	/*  #endif  */

	.class-nav .label {
		font-family: NotoSansHans-Regular;
		font-size: 24rpx;
		letter-spacing: 0px;
		color: #b2b2b2;
		height: 86rpx;
		line-height: 92rpx;
		border-bottom: none;
	}

	.class-nav .select {
		color: #000000;
		border-bottom: 6rpx solid #42be67;
	}

	.class-content {
		flex: 1;
		background-color: #f7f7f9;
		padding: 32rpx 30rpx;
		display: flex;
		flex-direction: column;
		margin-top: 92rpx;
		padding-bottom: 50rpx;
		/* margin-bottom: 120rpx; */
	}

	.class-content .label {
		width: 100%;
		display: flex;
		flex-direction: column;
		/* height: 677rpx; */
		background-color: #ffffff;
		box-shadow: 0px 0px 30rpx 0px rgba(138, 148, 168, 0.2);
		border-radius: 20rpx;
		overflow: hidden;
		position: relative;
		margin-bottom: 25rpx;
	}

	.class-content .label .imprint {
		width: 110rpx;
		height: 50rpx;
		background-color: #ffbf16;
		position: absolute;
		right: 0;
		top: 0;
		border-radius: 0rpx 20rpx 0 20rpx;
		font-family: NotoSansHans-Regular;
		font-size: 24rpx;
		font-weight: normal;
		font-stretch: normal;
		line-height: 50rpx;
		letter-spacing: 0px;
		color: #ffffff;
		text-align: center;
	}

	.class-content .label .label-header {
		height: 384rpx;
		width: 100%;
		overflow: hidden;
	}

	.class-content .label .label-header .img {
		width: 100%;
	}

	.class-content .label .label-info {
		padding-left: 40rpx;
		padding-right: 30rpx;
		padding-top: 40rpx;
		padding-bottom: 30rpx;
		box-sizing: border-box;
		display: flex;
		flex-direction: column;
	}

	.class-content .label .label-info .title {
		font-family: NotoSansHans-Medium;
		font-size: 24rpx;
		font-weight: 600;
		font-stretch: normal;
		line-height: 24rpx;
		letter-spacing: 0px;
		color: #333333;
	}

	.class-content .label .label-info .time {
		margin: 24rpx 0;
	}

	.class-content .label .label-info .time span {
		font-family: NotoSansHans-Regular;
		font-size: 24rpx;
		font-weight: normal;
		font-stretch: normal;
		line-height: 24rpx;
		letter-spacing: 0px;
		color: #b6b6b6;
		margin-right: 24rpx;
	}

	.class-content .label .label-info .speed {
		margin-bottom: 50rpx;
		display: flex;
		align-items: center;
	}

	.class-content .label .label-info .speed span {
		font-family: NotoSansHans-Regular;
		font-size: 24rpx;
		font-weight: normal;
		font-stretch: normal;
		line-height: 24rpx;
		letter-spacing: 0px;
		color: #b6b6b6;
	}

	.class-content .label .label-info .speed .lang {
		width: 345rpx;
		height: 10rpx;
		background-color: #f1f1f1;
		border-radius: 5rpx;
		margin: 0 15rpx;
		overflow: hidden;
	}

	.class-content .label .label-info .speed .lang view {
		width: 137rpx;
		height: 10rpx;
		background-color: #42be67;
		border-radius: 5rpx;
	}

	.class-content .label .label-info .study {
		display: flex;
		justify-content: space-between;
	}

	.class-content .label .label-info .study .teacher-ul {
		display: flex;
		align-items: center;
	}

	.class-content .label .label-info .study .teacher-ul .teacher-li {
		display: flex;
		align-items: center;
		margin-right: 60rpx;
	}

	.class-content .label .label-info .study .teacher-ul .teacher-li .img {
		width: 36rpx;
		height: 36rpx;
		background-color: #e3e4e7;
		border-radius: 50%;
		margin-right: 10rpx;
	}

	.class-content .label .label-info .study .teacher-ul .teacher-li span {
		font-family: NotoSansHans-Regular;
		font-size: 24rpx;
		font-weight: normal;
		font-stretch: normal;
		line-height: 24rpx;
		letter-spacing: 0px;
		color: #b6b6b6;
	}

	.class-content .label .label-info .study .study-button {
		width: 138rpx;
		height: 48rpx;
		background-color: #42be67;
		border-radius: 0 15px 15px 15px;
		font-family: NotoSansHans-Regular;
		font-size: 24rpx;
		font-weight: normal;
		font-stretch: normal;
		line-height: 24rpx;
		letter-spacing: 0px;
		color: #ffffff;
		text-align: center;
		line-height: 48rpx;
	}
</style>
