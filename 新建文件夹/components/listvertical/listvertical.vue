<template>
	<view class="">
		<view class="cusinfo seritem" v-if="type == 'service'">
			<view class="i-left">
				<view class="il-top item">
					<text class="name">{{ curinfo.serviceName }}</text>
					<text class="type">{{ curinfo.serviceGroupName }}</text>
				</view>
				<view class="il-bot item">
					<text class="price">￥{{ curinfo.serviceAmount }}</text>
					<text class="unit">{{ curinfo.serviceUnit }}</text>
				</view>
			</view>
			<view class="i-right">
				<image v-if="origin != 'order'" @click="todel" src="../../static/images/icon_delete@2x.png" mode=""></image>
				<image v-if="origin != 'order'" @click="toedit" src="../../static/images/icon_bianji@2x.png" mode=""></image>
			</view>
		</view>
		<view class="cusinfo" v-if="type == 'order'">
			<image :src="'https://kfbnet2019.obs.cn-north-1.myhuaweicloud.com/userAvatar/'+curinfo.driverAvatar" mode=""></image>
			<view class="infos">
				<view class="title">{{ curinfo.driverName }}</view>
				<view class="name-tel">
					<text class="name">{{ curinfo.driverUserContacts }}</text>
					<text class="tel">{{ curinfo.driverPhone }}</text>
				</view>
				<view class="address" v-if="curinfo.driverAddress">地址：{{ curinfo.driverAddress }}</view>
			</view>
		</view>
		<view class="cusinfo" v-if="type == 'supply'">
			<image :src="userhead+'userAvatar.jpg'" mode=""></image>
			<view class="infos">
				<view class="title">{{ curinfo.supplierName }}</view>
				<view class="name-tel">
					<text class="name">{{ curinfo.supplierContacts }}</text>
					<text class="tel">{{ curinfo.supplierContactsPhone }}</text>
				</view>
				<!-- <view class="address" v-if="curinfo.supplierProvince">地址：{{curinfo.supplierProvince}}{{curinfo.supplierCity}}{{curinfo.supplierCounty}}{{ curinfo.supplierDetailedAddress }}</view> -->
				<view class="address" v-if="curinfo.supplierProvinceName">地址：{{curinfo.supplierProvinceName}}{{curinfo.supplierCityName}}{{curinfo.supplierCountyName}}{{ curinfo.supplierDetailedAddress }}</view>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {};
	},
	props: ['curinfo', 'type', 'origin'],
	methods: {
		todel() {
			this.$emit('del', this.curinfo);
		},
		toedit() {
			this.$emit('edit', this.curinfo);
		},
		toadd() {
			this.$emit('addtoorder', this.curinfo);
		}
	},
	created() {
		// console.log(this.curinfo, this.type);
	}
};
</script>

<style lang="less" scoped>
.seritem {
	// background: #4CD964;
	width: 100%;
	display: flex;
	justify-content: space-between;
	.i-left {
		width: 80%;
		box-sizing: border-box;
		padding-right: 5%;

		.item {
			width: 100%;
			display: flex;
			justify-content: space-between;
			align-items: center;
			box-sizing: border-box;
			padding: 10rpx 0;
		}
		.name,
		.price {
			font-size: 32rpx;
			color: #333333;
		}
		.type {
			font-size: 26rpx;
			color: #666666;
		}
		.unit {
			font-size: 24rpx;
			color: #666666;
		}
	}
	.i-right {
		// background: #007AFF;
		width: 20%;
		display: flex;
		justify-content: space-around;
		align-items: center;
		image {
			width: 38rpx;
			height: 38rpx;
		}
	}
}
.cusinfo {
	width: 100%;
	display: flex;
	justify-content: flex-start;
	box-sizing: border-box;
	padding: 10rpx 10rpx;
	image {
		width: 100rpx;
		height: 100rpx;
		border-radius: 50%;
	}

	.infos {
		box-sizing: border-box;
		padding-left: 20rpx;
		align-self: center;
		.title {
			font-size: 32rpx;
			box-sizing: border-box;
			// padding-top: 20rpx;
			color: #333333;
		}
		.name-tel {
			box-sizing: border-box;
			padding-top: 10rpx;
			font-size: 28rpx;
			color: #666666;
		}
		.tel {
			box-sizing: border-box;
			padding-left: 20rpx;
		}
		.address {
			box-sizing: border-box;
			padding-top: 20rpx;
			font-size: 24rpx;
			color: #999999;
		}
	}
}
</style>
