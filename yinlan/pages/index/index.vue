<template>
	<view class="content">
		<view class="container">
			<view class="study">
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
					<view class="study-button">
						<image class="img" mode="widthFix" src="../../static/images/like.png"></image>
						<view class="txt">
							关注公众号
						</view>
					</view>
				</view>

				<view class="study-banner">
					<image class="img" mode="widthFix" src="../../static/images/banner.png"></image>
				</view>
				<view class="study-class">
					<navigator class="study-kind" url="../system/system" hover-class="none">
						<view class="recommend images">
							<image class="img" style="width: 42rpx;" mode="widthFix" src="../../static/images/lana_03.png"></image>
						</view>
						<view class="txt">
							系统班
						</view>
					</navigator>

					<navigator class="study-kind" url="../open-class/open-class" hover-class="none">
						<view class="images">
							<image class="img" style="width: 48rpx;" mode="widthFix" src="../../static/images/lana_12.png"></image>
						</view>
						<view class="txt">
							公开课
						</view>
					</navigator>
					<navigator class="study-kind" url="../video-class/video-class" hover-class="none">
						<view class="recommend images">
							<image class="img" style="width: 48rpx;" mode="widthFix" src="../../static/images/lana_09.png"></image>
						</view>
						<view class="txt">
							视频课
						</view>
					</navigator>
					<view class="study-kind">
						<view class="images">
							<image class="img" style="width: 46rpx;" mode="widthFix" src="../../static/images/lana_06.png"></image>
						</view>
						<view class="txt">
							题库
						</view>
					</view>
				</view>

				<view class="stuy-swiper">
					<swiper class="swiper" indicator-dots indicator-color="#d9d9d9" next-margin="160px" indicator-active-color="#0360ff">
						<swiper-item>
							<view class="swiper-item">
								<image class="img" mode="widthFix" src="../../static/images/A.png"></image>
							</view>
						</swiper-item>
						<swiper-item>
							<view class="swiper-item">
								<image class="img" mode="widthFix" src="../../static/images/B.png"></image>
							</view>
						</swiper-item>
					</swiper>
				</view>

				<view class="open-class">
					<view class="title">
						公开课
					</view>
					<view class="open-class-kinds">
						<view class="kinds">
							<image class="img" mode="widthFix" src="../../static/images/icon_019_07.png"></image>
							<view class="kinds-content">
								<view class="kinds-title">正常命题套路，30分钟搞定</view>
								<view class="kinds-time">
									<image class="kinds-img" mode="widthFix" src="../../static/images/icon_06.png"></image>19:00-20:00
								</view>
							</view>
							<view class="watch">
								观看
							</view>
						</view>
						<view class="kinds">
							<image class="img" mode="widthFix" src="../../static/images/icon_019_07.png"></image>
							<view class="kinds-content">
								<view class="kinds-title">正常命题套路，30分钟搞定</view>
								<view class="kinds-time">
									<image class="kinds-img" mode="widthFix" src="../../static/images/icon_06.png"></image>19:00-20:00
								</view>
							</view>
							<view class="watch">
								观看
							</view>
						</view>
					</view>
				</view>
				<view class="brush">
					<view class="title">
						刷刷题
					</view>
					<view class="brush-content">
						<view class="brush-text">
							<view class="title">
								证券从业高频考点大放送
							</view>
							<view class="button">
								立即刷刷题
							</view>
						</view>
						<image class="brush-img" mode="widthFix" src="../../static/images/brush.png"></image>
					</view>
				</view>
				<view class="audition">
					<view class="title">
						试听课
					</view>
					<view class="audition-content">
						<view class="audition-item">
							<view class="audition-item-left">
								<view class="audition-item-time">
									<view class="audition-button">
										章节
									</view>
									<view class="audition-time">
										19:30
									</view>
								</view>
								<view class="audition-title">
									考试真题看这里，透过真理看考点
								</view>
								<view class="audition-watch">
									459观看
								</view>
							</view>
							<view class="audition-item-right">
								<image class="audition-item-right-img" mode="widthFix" src="../../static/images/right-bg_03.png"></image>
								<view class="audition-item-right-button">
									观看
									<image mode="widthFix" src="../../static/images/sp.png"></image>
								</view>
								<image class="audition-item-right-man" mode="widthFix" src="../../static/images/man.png"></image>
							</view>
						</view>
						<view class="audition-item">
							<view class="audition-item-left">
								<view class="audition-item-time">
									<view class="audition-button">
										章节
									</view>
									<view class="audition-time">
										19:30
									</view>
								</view>
								<view class="audition-title">
									考试真题看这里，透过真理看考点
								</view>
								<view class="audition-watch">
									459观看
								</view>
							</view>
							<view class="audition-item-right">
								<image class="audition-item-right-img" mode="widthFix" src="../../static/images/right-bg_03.png"></image>
								<view class="audition-item-right-button">
									观看
									<image mode="widthFix" src="../../static/images/sp.png"></image>
								</view>
								<image class="audition-item-right-man" mode="widthFix" src="../../static/images/man.png"></image>
							</view>
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
	export default {
		data() {
			return {
				title: 'Hello'
			}
		},
		components: {
			bottomNav
		},
		onLoad() {
			// this.testRequest();
			// console.log(this.baseUrl);
		},
		methods: {
			...mapActions(['testRequest']),
		}
	}
</script>

<style scoped>
	.audition-item-right-man {
		width: 250rpx;
		position: absolute;
		bottom: -20rpx;
		left: 0;
		right: 0;
		margin: 0 auto;
		z-index: 2;
	}

	.audition-item-right {
		width: 222rpx;
		position: relative;
		overflow: hidden;
	}

	.audition-item-right-img {
		position: absolute;
		width: 100%;
		left: 0;
		z-index: 1;
	}

	.audition-item-right-button {
		position: absolute;
		width: 150rpx;
		height: 50rpx;
		background-color: #47da73;
		right: 0;
		bottom: 0;
		z-index: 3;
		border-radius: 25rpx 0 20rpx 0;
		text-align: center;
		line-height: 50rpx;
		display: flex;
		align-items: center;
		justify-content: center;
		color: #ffffff;
		font-size: 24rpx;
	}

	.audition-item-right-button image {
		width: 28rpx;
		margin-left: 12rpx;
	}

	.audition-title {
		color: #333333;
		font-size: 24rpx;
		font-weight: bold;
	}

	.audition-watch {
		color: #c6c6c8;
		font-size: 24rpx;
	}

	.audition-time {
		color: #c6c6c8;
		font-size: 24rpx;
	}

	.audition-button {
		width: 83rpx;
		height: 36rpx;
		background-color: #daf6e2;
		border-radius: 0 15px 15px 15px;
		text-align: center;
		line-height: 36rpx;
		color: #42be67;
		font-size: 24rpx;
		margin-right: 12rpx;
	}

	.audition {
		display: flex;
		flex-direction: column;
		margin-bottom: 40rpx;
	}

	.audition .title {
		color: #333333;
		font-size: 30rpx;
		margin: 26rpx 0;
		font-weight: 500;
	}

	.audition-content {
		display: flex;
		flex-direction: column;
		margin-bottom: 30rpx;
	}

	.audition-item-left {
		padding: 0 33rpx;
		box-sizing: border-box;
		display: flex;
		flex-direction: column;
		justify-content: space-around;
	}

	.audition-item {
		width: 690rpx;
		height: 260rpx;
		background-color: #ffffff;
		box-shadow: 0px 0px 30rpx 0px rgba(138, 148, 168, 0.2);
		border-radius: 20rpx;
		display: flex;
		justify-content: space-between;
		margin-bottom: 30rpx;
	}

	.audition-item-time {
		display: flex;
		align-items: center;
	}

	.brush {
		display: flex;
		flex-direction: column;
	}

	.brush-content {
		margin-bottom: 25rpx;
		position: relative;
		height: 161rpx;
		background-color: #1fc7b2;
		border-radius: 20rpx;
		padding: 0 44rpx;
		display: flex;
		align-items: center;
	}

	.brush-img {
		position: absolute;
		width: 200rpx;
		right: 0;
		bottom: 0;
	}

	.brush-content .brush-text {
		display: flex;
		flex-direction: column;
	}

	.brush-content .brush-text .title {
		color: #ffffff;
		font-size: 24rpx;
		margin: 12rpx 0;
		font-weight: 500;
	}

	.brush-content .brush-text .button {
		border-radius: 0 15px 15px 15px;
		width: 149rpx;
		height: 42rpx;
		background-color: #f09326;
		font-size: 22rpx;
		text-align: center;
		line-height: 42rpx;
		color: #ffffff;
	}

	.brush .title {
		color: #333333;
		font-size: 30rpx;
		margin: 26rpx 0;
		font-weight: 500;
	}

	.study {
		padding: 0 30rpx;
		box-sizing: border-box;
	}

	.study .study-head {
		display: flex;
		margin: 30rpx 0;
		justify-content: space-between;
	}

	.study .study-head .study-button {
		display: flex;
		align-items: center;
	}

	.study .study-head .study-button .img {
		width: 30rpx;
		margin-right: 6rpx;
	}

	.study .study-head .study-button .txt {
		color: #6a6a6a;
		font-size: 24rpx;
	}

	.study .study-banner {
		width: 100%;
	}

	.study .study-banner .img {
		width: 100%;
		box-shadow: 0px 0px 10px 5px #F1F1F1;
	}

	.study .study-class {
		margin: 60rpx 0;
		display: flex;
		padding: 0 26rpx;
		box-sizing: border-box;
		justify-content: space-between;
	}

	.study .study-class .study-kind {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: space-between;
	}

	.study .study-class .study-kind .img {
		margin: auto;
	}

	.study .study-class .study-kind .recommend {
		position: relative;
	}

	.study .study-class .study-kind .recommend::after {
		position: absolute;
		content: '推荐';
		background-color: #ec2727;
		font-size: 20rpx;
		color: #fff;
		width: 48rpx;
		height: 22rpx;
		text-align: center;
		line-height: 22rpx;
		border-radius: 0 15px 15px 15px;
		top: -10rpx;
		left: 18rpx;
	}

	.study .study-class .study-kind .txt {
		color: #333333;
		font-size: 24rpx;
	}

	.images {
		height: 48rpx;
		display: flex;
		flex-direction: column;
		justify-content: center;
		margin-bottom: 36rpx;
	}

	.study .stuy-swiper {
		height: 180rpx;
	}

	.study .stuy-swiper .swiper {
		height: 100%;
	}

	.study .stuy-swiper .swiper swiper-item .swiper-item {
		width: 330rpx;
		height: 118rpx;
		border-radius: 20rpx;
		overflow: hidden;
		position: relative;
	}

	.study .stuy-swiper .swiper swiper-item .swiper-item .img {
		position: absolute;
		width: 108%;
		top: 0;
		left: 0;
		bottom: 0;
		right: 0;
		margin: auto;
	}

	.open-class {
		display: flex;
		flex-direction: column;
	}

	.open-class .title {
		color: #333333;
		font-size: 30rpx;
		margin: 26rpx 0;
		font-weight: 500;
	}

	.open-class-kinds {
		display: flex;
		flex-direction: column;
	}

	.open-class-kinds .kinds {
		width: 100%;
		height: 143rpx;
		background-color: #ffffff;
		border-radius: 20rpx;
		border: solid 1rpx #e6effc;
		margin-bottom: 25rpx;
		display: flex;
		padding: 0 25rpx;
		box-sizing: border-box;
		align-items: center;
	}

	.open-class-kinds .kinds .img {
		width: 72rpx;
	}

	.kinds-content {
		flex: 1;
		margin: 0 20rpx;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
	}

	.watch {
		width: 94rpx;
		height: 42rpx;
		background-color: #daf6e2;
		border-radius: 0 15px 15px 15px;
		color: #42be67;
		font-size: 24rpx;
		text-align: center;
		line-height: 42rpx;
	}

	.kinds-title {
		color: #333333;
		font-size: 24rpx;
	}

	.kinds-time {
		color: #c6c6c8;
		font-size: 24rpx;
		display: flex;
		align-items: center;
	}

	.kinds-img {
		width: 24rpx;
		margin-right: 8rpx;
	}
</style>
