<template>
	<view class="content">
		<view class="container">
			<view class="find-nav">
				<view class="find-banner">
					<image class="img" mode="widthFix" src="../../static/images/man.png"></image>
				</view>
				<view class="nav">
					<view v-for="(item,index) in findNav" :key="index" :class="['nav-module',item.select?'select':'']" @click="setNav(index)">{{item.title}}</view>
				</view>
			</view>
			<view class="find-content" v-if="curPage == 0">
				<view class="real" v-for="item in 5" :key="index">
					<image class="img" mode="widthFix" src="../../static/images/man.png"></image>
					<view class="real-info">
						<view class="title">中级会计职称三年真题透视详解，考试真题看这里，透过真理看考点</view>
						<view class="time">
							<icon name="icon-shijian" color="#cacacc" size="24"></icon><span>19:00-20:00</span>
						</view>
					</view>
				</view>
			</view>
			<view class="find-content" v-else>
				<view class="problem">
					<view class="problem-title">
						<view class="label">Q</view>
						<view class="title">中级会计职称三年真题透视详解</view>
						<icon name="icon-xia" color="#c5c5c5" size="24"></icon>
					</view>
					<view class="problem-content">
						<view class="label">A</view>
						<view class="text">中级会计职称三年真题透视详解，考试真题看这里，透过真理看考点。中级会计职称三年真题透视详解，考试真题看这里，透过真理看考点。</view>
					</view>
				</view>
				<view class="problem">
					<view class="problem-title">
						<view class="label">Q</view>
						<view class="title">中级会计职称三年真题透视详解</view>
						<icon name="icon-xia" color="#c5c5c5" size="24"></icon>
					</view>
					<view class="problem-content" style="display: none;">
						<view class="label">A</view>
						<view class="text">中级会计职称三年真题透视详解，考试真题看这里，透过真理看考点。中级会计职称三年真题透视详解，考试真题看这里，透过真理看考点。</view>
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
				curPage: 0,
				findNav: [{
						id: 0,
						title: '英岚资讯',
						select: true
					},
					{
						id: 1,
						title: '常见问题',
						select: false
					}
				]
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
			setNav(index) {
				let arr = this.findNav;
				for (let i in arr) {
					arr[i].select = false;
				};
				arr[index].select = true;
				this.findNav = arr;
				this.curPage = arr[index].id;
			}
		}
	}
</script>

<style scoped>
	.find-nav {
		width: 100%;
		position: fixed;
		top: 0;
	}

	.find-nav .find-banner {
		height: 251rpx;
		background-color: #4a6ffc;
		overflow: hidden;
	}

	.find-nav .find-banner .img {
		width: 100%;
	}

	.find-nav .nav {
		height: 92rpx;
		width: 100%;
		display: flex;
	}

	.find-nav .nav .nav-module {
		flex: 1;
		height: 100%;
		font-family: NotoSansHans-Regular;
		font-size: 24rpx;
		font-weight: normal;
		font-stretch: normal;
		line-height: 92rpx;
		letter-spacing: 0px;
		text-align: center;
		color: #b2b2b2;
		background-color: #ffffff;
	}

	.find-nav .nav .select {
		background-color: #42be67;
		color: #fff;
	}

	.find-content {
		flex: 1;
		padding: 30rpx;
		box-sizing: border-box;
		width: 100%;
		margin-top: 343rpx;
		background-color: #f8f8fa;
	/* 	margin-bottom: 120rpx; */
	}

	.find-content .real {
		width: 100%;
		/* height: 194rpx; */
		background-color: #ffffff;
		box-shadow: 0px 0px 30px 0px rgba(138, 148, 168, 0.2);
		border-radius: 20rpx;
		margin-bottom: 20rpx;
		padding: 30rpx;
		box-sizing: border-box;
		display: flex;
	}

	.find-content .real .img {
		width: 130rpx;
		height: 130rpx;
		border-radius: 20rpx;
		margin-right: 25rpx;
	}

	.find-content .real .real-info {
		flex: 1;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
	}

	.find-content .real .real-info .title {
		font-family: NotoSansHans-Regular;
		font-size: 24rpx;
		font-weight: normal;
		font-stretch: normal;
		line-height: 36rpx;
		letter-spacing: 0px;
		color: #333333;
	}

	.find-content .real .real-info .time {
		display: flex;
		align-items: center;
	}


	.find-content .real .real-info .time span {
		font-family: NotoSansHans-Regular;
		font-size: 24rpx;
		font-weight: normal;
		font-stretch: normal;
		line-height: 24rpx;
		letter-spacing: 0px;
		color: #c6c6c8;
		margin-left: 7rpx;
	}

	.find-content .problem {
		display: flex;
		flex-direction: column;
		width: 100%;
		background-color: #ffffff;
		box-shadow: 0px 0px 30rpx 0px rgba(138, 148, 168, 0.2);
		border-radius: 20rpx;
		padding: 35rpx 30rpx;
		box-sizing: border-box;
		margin-bottom: 20rpx;
	}

	.find-content .problem-title {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.find-content .problem-title .label {
		width: 36rpx;
		height: 36rpx;
		background-color: #42be67;
		font-family: NotoSansHans-Regular;
		font-size: 18rpx;
		font-weight: normal;
		font-stretch: normal;
		line-height: 36rpx;
		letter-spacing: 0px;
		color: #ffffff;
		border-radius: 50%;
		text-align: center;
	}

	.find-content .problem-title .title {
		color: #333333;
		font-size: 24rpx;
		margin: 0 12rpx;
		flex: 1;
	}

	.find-content .problem-content {
		display: flex;
		margin-top: 30rpx;
	}

	.find-content .problem-content .label {
		width: 36rpx;
		height: 36rpx;
		background-color: #e2e2e2;
		font-family: NotoSansHans-Regular;
		font-size: 18rpx;
		font-weight: normal;
		font-stretch: normal;
		line-height: 36rpx;
		letter-spacing: 0px;
		color: #ffffff;
		border-radius: 50%;
		text-align: center;
	}

	.find-content .problem-content .text {
		margin: 0 12rpx;
		flex: 1;
		font-size: 24rpx;
		line-height: 36rpx;
		letter-spacing: 0px;
		color: #c5c5c5;
	}
</style>
