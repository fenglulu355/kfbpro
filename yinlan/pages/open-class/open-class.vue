<template>
	<view class="content">
		<view class="status_bar">
			<!-- 这里是状态栏 -->
		</view>
		<view class="open-class">
			<view class="page-title">
				<navigator delta="1" class="back" open-type="navigateBack" hover-class="none">
					<icon name="icon-fanhui" color="#222222" size="36"></icon>
				</navigator>
				<view class="title">会计初级职称</view>
			</view>
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

			<scroll-view scroll-y class="open-class-ul" enable-flex>
				<view class="describe" v-for="item in 3" @click="open" :key="index">
					<view class="header-img">
						<image class="img" mode="widthFix" src="../../static/images/brush.png"></image>
						<view class="label">
							免费
						</view>
						<view class="time">
							54:00
						</view>
					</view>
					<view class="title">
						<p>中级会计职称三年真题透视详解文字描述区</p>
						<p>第一期即将开课，5月14日</p>
					</view>
				</view>
			</scroll-view>


		</view>
		<courseNav></courseNav>
		<popup :isOpen="isOpenPoput" @close="close"></popup>
	</view>
</template>

<script>
	import icon from '../../components/icon/icon.vue'
	import courseNav from '../../components/course-nav/course-nav.vue'
	import popup from '../../components/popup/popup.vue'
	export default {
		data() {
			return {
				isOpenPoput:false
			}
		},
		components: {
			icon,
			courseNav,
			popup
		},
		onShow() {
			uni.hideHomeButton();
		},
		methods: {
			//打开弹窗
			open(){
				this.isOpenPoput = true
			},
			//关闭弹窗
			close(){
				this.isOpenPoput = false
			},
			//跳转章节页
			openChapter(){
				uni.navigateTo({
					url:'../class-chapter/class-chapter'
				})
			}
		}
	}
</script>

<style scoped>
	.content {
		height: 100vh;
		flex-shrink: 0;
		overflow: hidden;
	}

	.status_bar {
		height: var(--status-bar-height);
		width: 100%;
		flex-shrink: 0;
	}

	.open-class {
		/* padding: 0 30rpx; */
		box-sizing: border-box;
		/* 		margin-bottom: 120rpx; */
		flex: 1;
		display: flex;
		flex-direction: column;
		overflow: hidden;
	}

	.page-title {
		height: 100rpx;
		padding: 0 30rpx;
		box-sizing: border-box;
		display: flex;
		align-items: center;
	}

	.page-title .back {
		margin-right: 30rpx;
	}

	.page-title .title {
		font-size: 32rpx;
		color: #1b1b1b;
	}

	.study-head {
		display: flex;
		padding: 30rpx;
		box-sizing: border-box;
		width: 100%;
		justify-content: space-between;
		/* 		position: fixed;
		top: 140rpx;
		left: 0; */
		background-color: #fff;
		/* z-index: 2; */
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

	.open-class-ul {
		display: flex;
		flex-direction: column;
		flex: 1;
		overflow: auto;
		/* 	margin-top: 157rpx; */
		/* 	overflow: auto; */
		-webkit-overflow-scrolling: touch;
		/* height: 1000rpx; */
		/* padding: 0 30rpx; */
		box-sizing: border-box;
		/* padding-top: 20rpx; */
		margin-bottom: 120rpx;
		flex-shrink: 0;
	}

	.describe:first-child {
		margin-top: 20rpx;
	}

	.describe {
		width: 690rpx;
		margin: 0 auto;
		/* height: 523rpx; */
		background-color: #ffffff;
		box-shadow: 0px 0px 30rpx 0px rgba(138, 148, 168, 0.2);
		border-radius: 20rpx;
		overflow: hidden;
		margin-bottom: 25rpx;
		flex-shrink: 0;
	}

	.describe .header-img {
		height: 384rpx;
		overflow: hidden;
		position: relative;
	}

	.describe .header-img .label {
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

	.describe .header-img .time {
		position: absolute;
		right: 40rpx;
		bottom: 20rpx;
		color: #ffffff;
		font-size: 24rpx;
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
</style>
