<template>
	<view class="cusmain">
		<view class="top"><topback :topback="'供应商详情页'" :iscenter="true"></topback></view>
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
				<view class="title">顺丰公司</view>
				<view class="name-tle">
					<text class="name">刘经理</text>
					<text class="tel">548948979</text>
				</view>
				<view class="price">
					地址：
					<text>天府新谷</text>
				</view>
			</view>
		</view>
		<view class="pcontent">
			<!-- 销售 -->
			<view class="sales">
				<view class="salelist">
					<view class="saleli" v-for="(item, index) in saleli" :key="index"><goodsitem :goodsinfo="item" :types="5"></goodsitem></view>
				</view>
			</view>
		</view>
		<view class="addcus" @click="toadd">发起线下采购</view>
	</view>
</template>

<script>
import topback from '../../../components/topback/topback.vue';

import caritem from '../../../components/listvertical/listvertical.vue';
import goodsitem from '../../../components/goodsitem/goodsitem';
export default {
	data() {
		return {
			saleli: [
				{
					shopname: '哦阿斯蒂芬今晚i吉尔菲我就二分',
					address: '挨饿飞机恰尔即日起为案说法撒旦',
					goodsname: '佛寺饥饿反',
					goodsnum: 'aisjhfdia',
					price: '455774',
					nums: '15',
					type: '0',
					attr: ['24小时', '后处理', '夜间救援']
				},
				{
					shopname: '哦阿斯蒂芬今晚i吉尔菲我就二分',
					address: '挨饿飞机恰尔即日起为案说法撒旦',
					goodsname: '佛寺饥饿反',
					goodsnum: 'aisjhfdia',
					price: '455774',
					nums: '15',
					type: '1'
				}
			]
		};
	},
	components: { topback, caritem, goodsitem },
	methods: {
		toadd() {
			uni.navigateTo({
				url: '../addsupply/addsupply'
			});
		},
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
	// background: #007AFF;
	border-radius: 5rpx;
	position: absolute;
	left: 0;

	top: 300rpx;
}
.addcus {
	width: calc(100% - 60rpx);
	height: 100rpx;
	background: #2d8cf0;
	text-align: center;
	line-height: 100rpx;
	color: #ffffff;
	position: fixed;
	bottom: 20rpx;
	left: 50%;
	transform: translateX(-50%);
	box-shadow: 0px 4px 6px 0px rgba(250, 250, 250, 0.6);
}
.tobtn {
	width: 100%;
	box-sizing: border-box;
	padding: 0 30rpx;
	position: fixed;
	bottom: 20rpx;
	left: 50%;
	transform: translateX(-50%);
	display: flex;
	justify-content: space-between;
	.box {
		width: 30%;
		height: 80rpx;
		line-height: 80rpx;
		color: #ffffff;
		font-size: 32rpx;
		text-align: center;
	}
	.add {
		background: #2d8cf0;
	}
	.collection {
		background: #e23a3a;
	}
	.reduction {
		background: #999999;
	}
}

.sales {
	box-sizing: border-box;
	padding: 30rpx 0;
	.salelist {
		width: 100%;
		.saleli {
			box-sizing: border-box;
			padding: 25rpx 15rpx;
			background: #ffffff;
			margin: 25rpx 0;
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
	padding: 50rpx 30rpx;
	color: #ffffff;
	image {
		width: 118rpx;
		height: 118rpx;
		border-radius: 50%;
	}
	.infos {
		width: 80%;
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
			font-size: 24rpx;
			box-sizing: border-box;
			padding-top: 30rpx;
		}
	}
	.edit {
		align-self: center;
		font-size: 28rpx;
		text {
			box-sizing: border-box;
			padding-left: 20rpx;
		}
	}
}
</style>
