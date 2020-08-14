<template>
	<view class="content">
		<scroll-view class="chapter" scroll-with-animation scroll-y="true" @scroll="scroll">
			<view class="header">
				<image class="img" src="../../static/images/brush.png"></image>
				<view class="text">
					<p>中级会计职称三年真题透视详解</p>
					<p>第一期即将开课，5月14日</p>
				</view>
			</view>
			<view class="chapter-content">
				<view :class="['chapter-select',isFixed?'fiexd':'']">
					<view :class="isSelect == 0?'select':''" @click="setSelect(0)">章节列表</view>
					<view :class="isSelect == 1?'select':''" @click="setSelect(1)">讲义内容</view>
				</view>
				<view v-if="isSelect == 0">
					<view class="chapte-ul" v-for="item in chapterContent" :key="index">
						<view class="chapte-ul-name">
							<icon :name="item.isLock?'icon-suoding':'icon-jiesuo'" color="#42be67" size="32"></icon>
							<view class="text">
								第一章：总结
							</view>
						</view>
						<view class="chapte-ul-li" v-for="items in item.videos">
							<view class="chapte-ul-li-top">
								<icon :name="items.isPlay?'icon-bofang':'icon-jf-play'" :color="items.isPlay?'#42be67':'#b6b6b6'" size="32"></icon>
								<view class="text">
									前言
								</view>
							</view>
							<view class="chapte-ul-li-bottom">
								自定义文字描述
							</view>
						</view>
					</view>
				</view>
				<view class="handout" v-else>
					<image class="img" mode="widthFix" src="../../static/images/handout.png"></image>
					<!-- <view class="share">
						 <icon name="icon-fenxiang" color="#d0d0d0" size="12"></icon>
					</view> -->
				</view>
			</view>
		</scroll-view>
	</view>
</template>

<script>
	import icon from '../../components/icon/icon.vue'
	export default {
		data() {
			return {
				isFixed: false,
				isSelect: 0,
				headerHeight:0,
				chapterContent: [{
					isLock: true,
					videos: [{
						isPlay: true
					}, {
						isPlay: false
					}, {
						isPlay: false
					}, {
						isPlay: false
					}]
				}, {
					isLock: false,
					videos: [{
						isPlay: false
					}, {
						isPlay: false
					}, {
						isPlay: false
					}, {
						isPlay: false
					}]
				}]
			}
		},
		components: {
			icon
		},
		onShow() {
			uni.hideHomeButton();
			let that = this;
			uni.getSystemInfo({
				success: function(res) { // res - 各种参数
					let info = uni.createSelectorQuery().select(".header");
					info.boundingClientRect(function(data) { //data - 各种参数
						that.headerHeight = data.height
					}).exec()
				}
			});
		},
		methods: {
			setSelect(e) {
				this.isSelect = e;
			},
			scroll: function(e) {
				if (e.detail.scrollTop > this.headerHeight) {
					this.isFixed = true
				} else {
					this.isFixed = false
				}
			},
		}
	}
</script>

<style scoped>
	.content {
		height: 100vh;
		display: flex;
		flex-direction: column;
	}

	.chapter {
		flex: 1;
		display: flex;
		flex-direction: column;
		background-color: #f8f8fa;
		height: 100%;
	}

	.chapter .header {
		border-radius: 0rpx 0rpx 20rpx 20rpx;
		padding-bottom: 30rpx;
		box-sizing: border-box;
	}

	.chapter .header .img {
		width: 100%;
		height: 418rpx;
		overflow: hidden;
	}

	.fiexd {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		padding: 40rpx 30rpx !important;
		box-sizing: border-box;
		background-color: #fff;
	}

	.fiexd view {
		margin-bottom: 0 !important;
	}

	.chapter .header .text {
		background-color: #fff;
		padding: 34rpx 30rpx;
		border-radius: 0rpx 0rpx 20rpx 20rpx;
	}

	.chapter .header .text p:first-child {
		color: #333333;
		font-size: 24rpx;
	}

	.chapter .header .text p {
		margin-bottom: 12rpx;
	}

	.chapter .header .text p:last-child {
		color: #b6b6b6;
		font-size: 24rpx;
	}

	.chapter-content {
		padding: 0 30rpx;
		box-sizing: border-box;
		background-color: #fff;
		border-radius: 20rpx 20rpx 0rpx 0rpx;
	}

	.chapter-select {
		display: flex;
		padding: 20rpx 0;
		box-sizing: border-box;
		justify-content: space-between;
	}

	.chapter-select view {
		width: 334rpx;
		height: 60rpx;
		background-color: #f2f4f9;
		border-radius: 5rpx;
		text-align: center;
		line-height: 60rpx;
		color: #333333;
		font-size: 24rpx;
		margin-bottom: 34rpx;
	}

	.chapter-select .select {
		background-color: #42be67;
		color: #fff;
	}

	.chapte-ul {
		display: flex;
		flex-direction: column;
		border-bottom: 2rpx dashed #e1e1e1;
		margin-bottom: 62rpx;
	}

	.chapte-ul:last-child {
		margin-bottom: 0;
		border: none;
	}

	.chapte-ul-name {
		display: flex;
		align-items: center;
		margin-bottom: 50rpx;
	}

	.chapte-ul-name .text {
		color: #333333;
		font-size: 24rpx;
		margin-left: 15rpx;
	}

	.chapte-ul-li {
		margin-bottom: 72rpx;
	}

	.chapte-ul-li-top {
		display: flex;
		align-items: center;
		margin-bottom: 14rpx;
	}

	.chapte-ul-li-top .text {
		color: #333333;
		font-size: 24rpx;
		margin-left: 15rpx;
	}

	.chapte-ul-li-bottom {
		color: #b6b6b6;
		font-size: 24rpx;
		margin-left: 47rpx;
	}
	.handout{
		width: 100%;
		padding-bottom: 50rpx;
	}
	.handout .img{
		width: 100%;
	}
</style>
