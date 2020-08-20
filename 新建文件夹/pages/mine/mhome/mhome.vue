<template>
	<view class="cusmain">
		<view class="top">
			<topback :type="'two'"
			 :topback="'我的'" 
			 :iscenter="true"
			 :iswhite='true'
			 ></topback></view>
		<!-- 头部信息 -->
		<view
			class="headinfo"
			style="background: url(../../../static/images/bg.png);
				background-position: center;
				background-size: cover;
				background-repeat: no-repeat;"
		>
			<image src="../../../static/logo.png" mode=""></image>
			<view class="infos">
				<view class="title">刘经理</view>
				<view class="name-tle"><text class="name">548948979</text></view>
			</view>
			<view class="edit" @click="topage('minesetting')">
				个人设置
				<text>></text>
			</view>
		</view>
		<view class="pcontent">
			<view class="topath">
				<image class="icon" src="../../../static/images/icon_lianxi@2x.png" mode=""></image>
				<view class="tp-right">
					<text>联系平台</text>
					<image src="../../../static/images/icon_shangla@2x.png" mode=""></image>
				</view>
			</view>
			<view class="topath">
				<image class="icon" src="../../../static/images/icon_guanyu@2x.png" mode=""></image>
				<view class="tp-right">
					<text>关于我们</text>
					<image src="../../../static/images/icon_shangla@2x.png" mode=""></image>
				</view>
			</view>
			<view class="topath">
				<image class="icon" src="../../../static/images/icon_xieyi@2x.png" mode=""></image>
				<view class="tp-right">
					<text>隐私协议{{ a }}</text>
					<image src="../../../static/images/icon_shangla@2x.png" mode=""></image>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
import topback from '../../../components/topback/topback.vue';

export default {
	data() {
		return { a: '' };
	},
	onLoad() {
		var that = this;
		uni.getSystemInfo({
			success: res => {
				console.log(res, 'res');
				that.a = res.statusBarHeight;
			
			}
		});
	},
	components: { topback },
	methods: {
		topage(url) {
			console.log(url);
			uni.navigateTo({
				url: `../${url}/${url}`
			});
		}
	}
};
</script>

<style lang="less" scoped>
.cusmain {
	width: 100%;
	height: 100%;
	position: relative;
	.top {
		width: 100%;
		position: absolute;
		top: 0;
	}
}
.pcontent {
	width: 100%;
	box-sizing: border-box;
	padding: 0 30rpx;
}
.topath {
	width: 100%;
	display: flex;
	justify-content: space-between;
	align-items: center;
	.icon {
		width: 56rpx;
		height: 56rpx;
	}
	.tp-right {
		width: 86%;
		box-sizing: border-box;
		padding: 50rpx 0;
		border-bottom: 1rpx solid #e5e5e5;
		display: flex;
		justify-content: space-between;
		align-items: center;
		text {
			font-size: 32rpx;
			color: #333333;
		}
		image {
			width: 12rpx;
			height: 21rpx;
		}
	}
}
.headinfo {
	width: 100%;
	height: 400rpx;
	display: flex;
	justify-content: space-between;
	align-items: center;
	box-sizing: border-box;
	padding: 0rpx 30rpx;
	color: #ffffff;
	image {
		width: 150rpx;
		height: 150rpx;
		border-radius: 50%;
		position: relative;
		top: 50rpx;
	}
	.infos {
		position: relative;
		top: 50rpx;
		width: 50%;
		box-sizing: border-box;
		padding-left: 20rpx;
		align-self: center;
		.title {
			font-size: 32rpx;
			box-sizing: border-box;
			padding-top: 20rpx;
		}
		.name-tle {
			box-sizing: border-box;
			padding-top: 20rpx;
			font-size: 28rpx;
		}

		.tel {
			font-size: 28rpx;
			box-sizing: border-box;
			padding-left: 20rpx;
		}
		.price {
			font-size: 30rpx;
			box-sizing: border-box;
			padding-top: 30rpx;
		}
	}
	.edit {
		position: relative;
		top: 50rpx;
		align-self: center;
		font-size: 28rpx;
		text {
			box-sizing: border-box;
			padding-left: 20rpx;
		}
	}
}
</style>
