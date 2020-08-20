<template>
	<view class="cusmain" v-if="infos">
		<view class="top">
			<topback :type="'two'" :topback="'确认采购单'" :iscenter="true" :iswhite="false"></topback>
		</view>
		<view class="content">
			<view class="p-top">
				<image src="../../../static/images/icon_daishou.png" mode=""></image>
				<!-- <view class="price">+{{ totol }}</view> -->
				<view class="price">+{{ infos.orderTotalAmount - infos.orderDiscountAmount }}</view>
				<view class="text">待收金额</view>
			</view>
		</view>
		<view class="list">
			<view class="li">
				<text class="name">配件费</text>
				<!-- <text class="prc">￥{{ pj }}</text> -->
				<text class="prc">￥{{ infos.orderReplacementParts.detailStageAmount}}</text>
			</view>
			<view class="li">
				<text class="name">服务费</text>
				<!-- <text class="prc">￥{{ fw }}</text> -->
				<text class="prc">￥{{ infos.orderServiceItems.detailStageAmount }}</text>
			</view>
			<view class="li">
				<text class="name">优惠金额</text>
				<!-- <text class="prc">￥{{ yh }}</text> -->
				<text class="prc">￥{{ infos.orderDiscountAmount }}</text>
			</view>
		</view>
		<view class="btn">
			<view class="item addprc" @click="isyh = true">添加优惠金额</view>
			<view class="item red" @click="toclc">收款</view>
			<confirms :title="'添加优惠金额'" :isshow="isyh" @change="changeyh"></confirms>
		</view>
	</view>
</template>

<script>
	import {
		mapState,
		mapMutations
	} from 'vuex';
	import topback from '../../../components/topback/topback.vue';
	import confirms from '../../../components/confirmbox/confirmbox.vue';

	export default {
		data() {
			return {
				authorization: '',
				infos:[],
				orderid: '',
				sname: '',
				isyh: false,
				yh: 0
			};
		},
		components: {
			topback,
			confirms
		},
		onLoad(val) {
			this.orderid = val.orderid;
			this.authorization=uni.getStorageSync('atrztion')
			
			
			
		},
		created() {
			this.request(this.orderid )
		},
		methods: {
			...mapMutations(['SET_ORDERINFO']),
			request(orderid) {
				var that = this;
				this.$request('/order/store/order/infobypk/' + orderid, '', 'get', this.authorization).then(res => {
					this.infos = res.datas;
				});
			},
			changeyh(e) {
				if (e == 'cancle') {
					// this.yh = 0;
					this.orderinfo.orderDiscountAmount = 0
					// this.isyh = false;

				} else {
					// this.yh =;
					if (Number(e) > Number(this.infos.orderTotalAmount)) {
						uni.showToast({
							icon: 'none',
							title: '优惠金额不能大于待收金额！'
						})
					} else {
						// this.yh=e
						this.infos.orderDiscountAmount = Number(e)
						this.isyh = false;
					}

				}
			},
			tozdmain(item, index) {},
			toclc() {
				var that=this
				console.log(this.infos);
				this.SET_ORDERINFO(this.infos)
				setTimeout(function() {
					uni.navigateTo({
						url: '../curmoney/curmoney?orderid='+that.orderid 
					});
				}, 800);

			}
		}
	};
</script>

<style lang="less" scoped>
	.cusmain {
		width: 100%;
		height: 100%;
		position: relative;
		box-sizing: border-box;
		padding: 100rpx 0rpx;

		.top {
			background: #ffffff;
			width: 100%;
			height: 100rpx;
			position: absolute;
			top: 0;
			z-index: 1;
		}
	}

	.content,
	.list {
		background: #ffffff;
		box-sizing: border-box;
		padding: 30rpx 30rpx;
	}

	.content {
		text-align: center;

		image {
			width: 100rpx;
			height: 100rpx;
		}

		.price {
			font-size: 60rpx;
			color: #282828;
		}

		.text {
			font-size: 24rpx;
			color: #999999;
		}
	}

	.list {
		margin-top: 30rpx;

		.li {
			display: flex;
			justify-content: space-between;
			align-items: center;
			font-size: 28rpx;
			color: #666666;
			box-sizing: border-box;
			padding: 10rpx 0;

			.prc {
				font-size: 26rpx;
				color: #333333;
			}
		}
	}

	.btn {
		background: #ffffff;
		box-sizing: border-box;
		padding: 0 30rpx;
		position: fixed;
		bottom: 0;
		left: 0;
		width: 100%;
		height: 100rpx;
		display: flex;
		justify-content: flex-end;
		align-items: center;

		.item {
			background: #2d8cf0;
			color: #ffffff;
			font-size: 32rpx;
			min-width: 200rpx;
			box-sizing: border-box;
			padding: 10rpx 20rpx;
			text-align: center;
			border-radius: 5rpx;
			margin-left: 30rpx;
		}

		.red {
			background: #e23a3a;
		}
	}
</style>
