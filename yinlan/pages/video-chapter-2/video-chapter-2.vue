<template>
	<view class="content">
		<view class="chapter">
			<view class="header">
				<video id="video" src="https://img.cdn.aliyun.dcloud.net.cn/guide/uniapp/%E7%AC%AC1%E8%AE%B2%EF%BC%88uni-app%E4%BA%A7%E5%93%81%E4%BB%8B%E7%BB%8D%EF%BC%89-%20DCloud%E5%AE%98%E6%96%B9%E8%A7%86%E9%A2%91%E6%95%99%E7%A8%8B@20181126-lite.m4v"
				 controls></video>
				<view class="text">
					<p>中级会计职称三年真题透视详解</p>
					<p>第一期即将开课，5月14日</p>
				</view>
			</view>
			<view class="video-class">
				<view class="select">真题剖析</view>
				<view>真题剖析</view>
				<view>真题剖析</view>
			</view>
			<view class="chapter-content">
				<view :class="['chapter-select',isFixed?'fiexd':'']">
					<view :class="isSelect == 0?'select':''" @click="setSelect(0)">章节列表</view>
					<view :class="isSelect == 1?'select':''" @click="setSelect(1)">讲义内容</view>
				</view>
				<view v-if="isSelect == 0">
					<view class="chapte-li" v-for="(item,index) in 5" :key="index">
						<view class="chapte-li-header">
							<icon name="icon-shu" color="#42be67" size="32"></icon>
							<view class="title">
								第一章2A35542建设工程基本法律知识
							</view>
						</view>
						<view class="text">
							<span>难度：5.2</span><span>人数：35.4万人</span>
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
		</view>
	</view>
</template>

<script>
	import icon from '../../components/icon/icon.vue'
	export default {
		data() {
			return {
				isFixed: false,
				isSelect: 0,
				headerHeight: 0
			}
		},
		components: {
			icon
		},
		onShow() {
			uni.hideHomeButton();
		},
		methods: {
			setSelect(e) {
				this.isSelect = e;
			},
		}
	}
</script>

<style scoped>
	.video-class {
		display: flex;
		margin: 30rpx 0;
		margin-top: 600rpx;
		justify-content: space-around;
	}

	.video-class view {
		width: 214rpx;
		height: 62rpx;
		background-color: #daf6e2;
		border-radius: 31rpx;
		text-align: center;
		line-height: 62rpx;
		color: #000000;
		font-size: 24rpx;
	}
	
	.video-class .select{
		background-color: #42be67;
		color: #fff;
	}

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
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
	}

	.chapter .header #video {
		width: 750rpx;
		height: 424rpx;
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
		margin-top: -15rpx;
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
		/* justify-content: space-between; */
		justify-content: space-around;
		border-bottom: 2px solid #e0e0e0;
		margin-bottom: 34rpx;
	}

	.chapter-select view {
		height: 60rpx;
		text-align: center;
		line-height: 60rpx;
		color: #333333;
		font-size: 24rpx;
		margin-bottom: -22rpx;
	}

	/* .chapter-select .select {
		background-color: #42be67;
		color: #fff;
	} */

	.chapter-select .select {
		border-bottom: 2px solid #42be67;
		color: #42be67;
	}

	.handout {
		width: 100%;
		padding-bottom: 50rpx;
	}

	.handout .img {
		width: 100%;
	}
	
	.chapte-li{
		padding: 45rpx;
		border-bottom: 2px dashed #e1e1e1;
		display: flex;
		flex-direction: column;
	}
	.chapte-li:last-child{
		border: none;
	}
	.chapte-li .text{
		display: flex;
		margin-left: 44rpx;
	}
	.chapte-li .text span{
		color: #a2a2a2;
		font-size: 24rpx;
		margin-right: 45rpx;
	}
	.chapte-li-header{
		display: flex;
		align-items: center;
		margin-bottom: 40rpx;
	}
	.chapte-li-header .title{
		color: #333333;
		font-size: 24rpx;
		margin-left: 12rpx;
	}
</style>
