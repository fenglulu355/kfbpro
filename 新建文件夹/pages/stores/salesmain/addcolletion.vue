<template>
	<view class="cusmain">
		<view class="top"><topback :type="'two'" :topback="'收款'" :iscenter="true" :iswhite="false" @change="tobacks"></topback></view>
		<view class="content">
			<view class="p-top">
				<image src="../../../static/images/icon_daishou.png" mode=""></image>
				<view class="price">+{{ infos.orderAmountsPayable - infos.orderAmountPaid }}</view>
				<view class="text">待收金额</view>
			</view>
		</view>
		<view class="money ">
			<view class="text">实收金额</view>
			<view class="IPT">
				<text>￥</text>
				<input class="input" type="text" value="" v-model="saleprice" @blur="regsaleprice(saleprice)" />
			</view>
		</view>

		<view class="pay ">
			<view class="paybox">
				<text>支付方式</text>
				<view @click="showpay('picker')">
					{{ type.item }}
					<image src="../../../static/images/icon_shangla@2x.png" mode=""></image>
				</view>
			</view>
			<LbPicker ref="picker" mode="selector" v-model="value1" :list="list" @change="handleChange" @confirm="handleConfirm" @cancel="handleCancel">></LbPicker>
			<view class="note">
				<view class="text">收款备注</view>
				<textarea value="" v-model="note" placeholder="未填写收款备注" />
			</view>
		</view>
		<view class="onebtn"><view class="oneitem" @click="tosendsale">确认减免</view></view>
	</view>
</template>

<script>
import { mapState, mapMutations } from 'vuex';
import topback from '../../../components/topback/topback.vue';
import LbPicker from '../../../components/lb-picker/index.vue';
export default {
	data() {
		return {
			value1: '微信支付',
			type: { item: '请选择支付方式' },
			typeindex: 1,
			list: ['微信支付', '支付宝支付', '云闪付', '银行支付', '现金支付', '其他方式'],
			price: null,
			orderid: '',
			saleprice: null,
			note: '',
			authorization: '',
			max: null,
			origin: ''
		};
	},
	components: { topback, LbPicker },
	props: ['infos'],
	onLoad(options) {},
	computed: {
		...mapState(['saleinfos', 'orderinfo'])
	},
	methods: {
		tobacks(e) {
			console.log(e);
			if (e == 'back') {
				this.$emit('change', false);
			}
		},
		showpay(name) {
			this.$refs[name].show();
		},
		handleChange(item) {
			// this.type = item;
			console.log(item);
		},
		handleConfirm(item) {
			this.type = item;
			if (item.index[0]) {
				this.typeindex = 1;
			} else {
				this.typeindex = Number(item.index) + 1;
			}
		},
		handleCancel(item) {
			// this.type = item;
		},

		regsaleprice(val) {
			let max = this.infos.orderAmountsPayable - this.infos.orderAmountPaid;
			if (val > max) {
				uni.showToast({
					icon: 'none',
					title: '最大金额为￥' + max
				});
				this.saleprice = null;
			}
		},
		tosendsale() {
			if (this.saleprice == null) {
				uni.showToast({
					icon: 'none',
					title: '实收金额为空'
				});
				return;
			} else if (this.type.item == '请选择支付方式') {
				uni.showToast({
					icon: 'none',
					title: '请选择支付方式'
				});
				return;
			} else {
				var that = this;
				uni.showModal({
					title: '提示',
					content: '确认收款',
					success: function(res) {
						if (res.confirm) {
							let data = {
								storeId: that.infos.orderStoreId,
								orderId: that.infos.orderId,
								receiptAmount: that.saleprice,
								payType: that.typeindex,
								remark: that.note,
								updateType: 2
							};

							console.log(data);
							that.sendinfo(data);
						} else if (res.cancel) {
							uni.showToast({
								icon: 'none',
								title: '取消操作'
							});
						}
					}
				});
			}
		},
		//结算信息
		sendinfo(data) {
			this.$request('/order/store/sale/order/collect/money/update', data, 'put', uni.getStorageSync('atrztion'), 'application/json').then(res => {
				console.log(res);
				if (res.kfbCode == '200') {
					uni.showToast({
						title: '添加收款成功'
					});
					setTimeout(function() {
						uni.navigateTo({
							url: '../sales-mng/sales-mng'
						});
					}, 500);
				} else {
					uni.showToast({
						icon: 'none',
						title: res.kfbErrorMsg
					});
					console.log(res.kfbCode);
				}
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
	box-sizing: border-box;
	padding: 120rpx 0rpx;
	.top {
		background: #2d8cf0;
		width: 100%;
		position: absolute;
		top: 0;
	}
}
.content {
	background: #ffffff;
	text-align: center;
	box-sizing: border-box;
	padding: 30rpx 30rpx;
	image {
		width: 100rpx;
		height: 100rpx;
	}
	.price {
		font-size: 60rpx;
		color: #e23a3a;
	}
	.text {
		font-size: 24rpx;
		color: #999999;
	}
}
.money {
	background: #ffffff;
	margin: 30rpx 0;
	box-sizing: border-box;
	padding: 30rpx 30rpx;
	.text {
		font-size: 28rpx;
		color: #282828;
	}
	.IPT {
		box-sizing: border-box;
		padding: 30rpx 0rpx;
		display: flex;
		align-items: center;
		border-bottom: 1rpx solid #e5e5e5;
	}

	.input,
	text {
		font-size: 60rpx;
		color: #282828;
	}
}
.pay {
	background: #ffffff;
	margin: 30rpx 0;
	box-sizing: border-box;
	padding: 0rpx 30rpx;
	font-size: 28rpx;
	color: #666666;
	.paybox {
		box-sizing: border-box;
		padding: 30rpx 0;
		display: flex;
		justify-content: space-between;
		align-items: center;
		border-bottom: 1rpx solid #e5e5e5;
		image {
			margin-left: 20rpx;
			width: 11rpx;
			height: 22rpx;
		}
	}
	.note {
		box-sizing: border-box;
		padding: 30rpx 0;
		textarea {
			font-size: 24rpx;
			color: #b7b7b7;
			width: 100%;
			box-sizing: border-box;
			padding: 15rpx 15rpx;
		}
	}
}
.onebtn {
	box-sizing: border-box;
	padding: 0 30rpx;
	position: fixed;
	bottom: 30rpx;
	left: 0;
	width: 100%;
	height: 100rpx;
	text-align: center;
	.oneitem {
		background: #2d8cf0;
		color: #ffffff;
		font-size: 32rpx;
		width: 100%;
		height: 100%;
		line-height: 100rpx;
		text-align: center;
		border-radius: 5rpx;
	}
}
</style>
