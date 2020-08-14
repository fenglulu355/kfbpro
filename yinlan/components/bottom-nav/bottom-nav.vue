<template>
	<view class="bottom-nav">
		<view class="nav" v-for="(item,index) in bottomNav" :key="index" v-if="item.type == 'ord'" @click="setBottomNav(index)">
			<image class="img" mode="widthFix" :src="item.icon" :style="'width:' + item.width"></image>
			<view class="text" :style="{'color':item.select?'#DF421D':'#9b9b9b'}">
				{{item.title}}
			</view>
		</view>
		<view class="nav content-nav" v-else>
			<image class="img" mode="scaleToFill" :src="item.icon" :style="'width:' + item.width"></image>
			<view class="text">
				{{item.title}}
			</view>
		</view>
	</view>
</template>

<script>
	import {
		mapState,
		mapActions,
		mapMutations
	} from 'vuex';
	export default {
		computed: {
			...mapState(['bottomNav'])
		},
		methods: {
			...mapActions([]),
			...mapMutations(['setBottomNav']),
		}
	}
</script>

<style scoped>
	.bottom-nav {
		width: 100%;
		height: 104rpx;
		background-color: #fff;
		box-shadow: 0px 0px 10px 5px #F1F1F1;
		display: flex;
		justify-content: space-between;
		align-items: flex-end;
		z-index: 20;
		position: fixed;
		bottom: 0;
		left: 0;
	}

	.bottom-nav .nav {
		flex: 1;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		align-items: center;
		margin: auto 0;
		height: 65rpx;
	}

	.bottom-nav .nav .img {
		width: 35rpx;
	}

	.bottom-nav .nav .text {
		font-size: 24rpx;
		font-weight: normal;
		font-stretch: normal;
		line-height: 24rpx;
		letter-spacing: 0px;
		color: #666666;
		margin-top: 10rpx;
		text-align: center;
	}
	.bottom-nav .content-nav{
		position: relative;
		margin: 0;
	}
	.bottom-nav .content-nav .img{
		flex-shrink: 0;
		width: 96rpx;
		height: 96rpx;
		padding: 12rpx;
		border-radius: 50%;
		box-sizing: border-box;
		position: absolute;
		top: -90rpx;
		background-color: #fff;
		box-shadow: 0px 0px 10px 5px #F1F1F1;
	}
	.bottom-nav .content-nav .text{
		align-items: flex-end;
		/* margin-bottom: 16rpx; */
		margin-top: 22rpx;
	}
</style>
