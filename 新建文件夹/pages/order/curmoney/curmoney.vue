<template>
	<view class="cusmain">
		<view class="top" v-if="origin == 'sales'"><topback :type="'two'" :topback="'减免'" :iscenter="true" :iswhite="false"></topback></view>
		<view class="top" v-else><topback :type="'two'" :topback="'收款'" :iscenter="true" :iswhite="false"></topback></view>
		<view class="content">
			<view class="p-top" v-if="origin == 'sales'">
				<image src="../../../static/images/icon_daishou.png" mode=""></image>
				<view class="price">+{{ saleinfos.orderAmountPaid }}</view>
				<view class="text">待收金额</view>
			</view>
			<view class="p-top" v-else>
				<image src="../../../static/images/icon_daishou.png" mode=""></image>
				<!-- <view class="price">+{{ price }}</view> -->
				<view class="price">+{{ orderinfo.orderTotalAmount - orderinfo.orderDiscountAmount }}</view>
				<view class="text">待收金额</view>
			</view>
		</view>
		<view class="money " v-if="origin == 'sales'">
			<view class="text">减免欠款</view>
			<view class="IPT">
				<text>￥</text>
				<input class="input" type="text" value="" v-model="saleprice" @blur="regsaleprice(saleprice)" />
			</view>
		</view>
		<view class="money " v-else>
			<view class="text">实收金额</view>
			<view class="IPT">
				<text>￥</text>
				<input class="input" type="text" value="" v-model="sprice" @blur="regsprice(sprice)" />
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
		<view class="onebtn" v-if="origin == 'sales'"><view class="oneitem" @click="tosendsale">确认减免</view></view>
		<view class="onebtn" v-else><view class="oneitem" @click="tosend">确认收款</view></view>
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
			sname: '',
			sprice: null,
			saleprice: 0,
			note: '',
			yh: 0,
			issh: false,
			authorization: '',
			max: null,
			origin: ''
		};
	},
	components: { topback, LbPicker },
	onLoad(options) {
		if (options.from == 'sales') {
			this.origin = 'sales';
			if (this.saleinfos.length == 0) {
				uni.showToast({
					icon: 'none',
					title: '暂无数据，请重新结算'
				});
				setTimeout(function() {
					uni.navigateTo({
						url: '../../stores/order/order?from=sales'
					});
				}, 500);
			}
			console.log(this.saleinfos);
		} else {
			var that = this;
			console.log(options);
			this.orderid = options.orderid;
			this.price = options.price;
			this.yh = options.yh;
			this.sprice = Number(this.orderinfo.orderTotalAmount - this.orderinfo.orderDiscountAmount);
			this.max = Number(this.orderinfo.orderTotalAmount - this.orderinfo.orderDiscountAmount);
			this.sname = options.sname;
			this.authorization = uni.getStorageSync('atrztion');
			console.log(this.orderinfo, 'asdas');
			if (!this.orderinfo) {
				uni.showToast({
					icon: 'none',
					title: '暂无数据，请重新结算'
				});
				setTimeout(function() {
					uni.navigateTo({
						url: '../collection/collection?orderid=' + that.orderid
					});
				}, 500);
			}
		}
	},
	computed: {
		...mapState(['saleinfos', 'orderinfo'])
	},
	methods: {
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
		// 判断实收金额是否合格
		regsprice(sprice) {
			let apr = Number(this.yh) + Number(this.sprice);
			if (sprice > Number(this.max)) {
				uni.showToast({
					icon: 'none',
					title: '最大金额为￥' + this.max
				});
				this.sprice = this.max;
			}
		},
		regsaleprice(val) {
			if (val > this.saleinfos.orderAmountPaid) {
				uni.showToast({
					icon: 'none',
					title: '最大金额为￥' + this.saleinfos.orderAmountPaid
				});
				this.saleprice = 0;
			}
		},
		tosendsale() {
			if (this.type.item == '请选择支付方式') {
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
							console.log(that.saleinfos, 'fsf');
							let arr = that.saleinfos;
							arr.payType = that.typeindex;
							arr.orderDiscountAmount = that.saleprice;
							arr.remark=that.note
							console.log(arr);
							that.sendinfo(arr);
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
		tosend() {
			if (this.type.item == '请选择支付方式') {
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
								orderId: that.orderinfo.orderId,
								storeId: that.orderinfo.storeId,
								storeName: that.orderinfo.storeName,
								receiptAmount: Number(that.sprice),
								payType: that.typeindex,
								orderDiscountAmount: that.orderinfo.orderDiscountAmount,
								remark: that.note
							};
							console.log(data);
							that.$request('/order/store/order/collect/money/update', data, 'put', that.authorization, 'application/json').then(res => {
								if (res.kfbCode == '200') {
									uni.showToast({
										title: '添加收款成功'
									});
									setTimeout(function() {
										uni.switchTab({
											url: '../ohome/ohome'
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
			this.$request('/order/store/sale/order/save', data, 'post',  uni.getStorageSync('atrztion'), 'application/json').then(res => {
				console.log(res);
				if (res.kfbCode == '200') {
					uni.showToast({
						title: '添加收款成功'
					});
					setTimeout(function() {
						uni.switchTab({
							url: '../../stores/sales-mng/sales-mng'
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
