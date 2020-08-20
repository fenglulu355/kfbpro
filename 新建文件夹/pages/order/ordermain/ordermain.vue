<template>
	<view class="salesmain">
		<view class="top"><topback :type="'two'" :topback="'工单结算'" :iscenter="true" :istext="'投诉'" :iswhite="true" :nums="headnum" @change="tobacks"></topback></view>
		<view class="tabs"><tabbar :tabbarlist="tabbarlist" :type="0" @change="tonav" :startindex="showindex"></tabbar></view>
		<!-- 基本信息 -->
		<view class="basicinfobox" v-if="showindex == 0"><basicinfos :infos="infos" :online="online"></basicinfos></view>
		<!-- 服务与配件 -->
		<view class="fj-fwbox" v-if="showindex == 1"><servpj :infos="infos"></servpj></view>
		<!-- 结算信息 -->
		<view class="accountinfo" v-if="showindex == 2">
			<view class="noinfo" v-if="orderStatus == 1">
				<image src="../../../static/images/zanwushuju@2x.png" mode=""></image>
				<view class="text">工单暂未结算</view>
				<view class="tobtn">
					<view class="price"></view>
					<view class="btnitem" style="opacity: 0;"></view>
					<view class="btnitem" @click="tosendpf">结算</view>
				</view>
			</view>
			<view class="hasinfo" v-else>
				<view class="infos" v-if="orderNodeStatus == 2">
					<view class="allprice item">
						<text>结算时间</text>
						<text>{{ infos.orderPaymentTimeStr }}</text>
					</view>
					<view class="allprice item">
						<text>结清时间</text>
						<text>{{ infos.orderSettlementTimeStr }}</text>
					</view>
					<view class="allprice item">
						<text>结算状态</text>
						<text>已结清</text>
					</view>
					<view class="allprice item">
						<text>结算备注</text>
						<text>这是一段备注</text>
					</view>
					<view class="allprice item">
						<text>配件费</text>
						<text>￥{{ infos.orderReplacementParts.detailStageAmount }}</text>
					</view>
					<view class="allprice item">
						<text>服务费</text>
						<text>￥{{ infos.orderServiceItems.detailStageAmount }}</text>
					</view>
					<view class="allprice item">
						<text>优惠金额</text>
						<text>￥{{ infos.orderDiscountAmount }}</text>
					</view>
					<view class="allprice item">
						<text>合计应付</text>
						<text>￥{{ infos.orderAmountsPayable }}</text>
					</view>
					<view class="allprice item">
						<text>已付金额</text>
						<text>￥{{ infos.orderAmountPaid }}</text>
					</view>
				</view>
				<view class="infos" v-if="orderNodeStatus == 1">
					<view class="allprice item">
						<text>结算时间</text>
						<text>{{ infos.orderPaymentTimeStr }}</text>
					</view>
					<view class="allprice item">
						<text>结清时间</text>
						<text>￥</text>
					</view>
					<view class="allprice item">
						<text>优惠金额</text>
						<text>￥35465468</text>
					</view>
					<view class="allprice item">
						<text>合计应付</text>
						<text>￥35465468</text>
					</view>
					<view class="allprice item">
						<text>当前待付金额</text>
						<text>￥35465468</text>
					</view>
					<view class="allprice item">
						<text>已付金额</text>
						<text>￥0</text>
					</view>
				</view>
				<view class="goodslist">
					<view class="listbox">
						<view class="saleli" v-for="(item, index) in infos.orderReplacementParts.projectDetails" :key="index">
							<view class="s-top">
								<text class="time">{{ infos.orderSettlementTimeStr }}</text>
								<text class="zfb" v-if="infos.orderServiceItems.detailStageAmountType == 1">支付宝</text>
								<text class="wx" v-if="infos.orderServiceItems.detailStageAmountType == 2">微信支付</text>
							</view>
							<view class="mains">
								<view class="m-left"><image :src="product + item.itemImage" mode=""></image></view>
								<view class="m-right">
									<view class="goodsname">{{ item.itemName }}</view>
									<view class="type-sale">
										<text class="type">{{ item.itemCode }}</text>
									</view>
									<view class="price-account">
										<text class="price">￥{{ item.itemTotalAmount }}</text>
									</view>
								</view>
							</view>
						</view>
					</view>
					<view class="listbox">
						<view class="saleli" v-for="(item, index) in infos.orderServiceItems.projectDetails" :key="index">
							<view class="s-top">
								<text class="time">{{ infos.orderSettlementTimeStr }}</text>
								<text class="zfb" v-if="infos.orderServiceItems.detailStageAmountType == 1">支付宝</text>
								<text class="wx" v-if="infos.orderServiceItems.detailStageAmountType == 2">微信支付</text>
							</view>
							<view class="mains">
								<!-- <view class="m-left">
									<image :src="item.img" mode=""></image>
								</view> -->
								<view class="m-right">
									<view class="goodsname">{{ item.itemName }}</view>
									<view class="type-sale">
										<text class="type">{{ item.itemNumber }} {{ item.itemUnit }}</text>
									</view>
									<view class="price-account">
										<text class="price">￥{{ item.itemTotalAmount }}</text>
									</view>
								</view>
							</view>
						</view>
					</view>
				</view>
				<view class="tobtn" v-if="orderStatus == 1">
					<view class="btnitem">添加收款</view>
					<view class="btnitem" v-if="origin == 'purchase'">取消订单</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
import { mapState, mapMutations } from 'vuex';
import topback from '../../../components/topback/topback.vue';
import tabbar from '../../../components/tabbar/tabbar.vue';
import uploadImg from '../../../components/amazarashi-uploadimg/uploadImg.vue';
import confirms from '../../../components/confirmbox/confirmbox.vue';
import LbPicker from '../../../components/lb-picker/index.vue';
import minpicker from '../../../components/min-picker/min-picker.vue';
import minpopup from '../../../components/min-picker/min-popup.vue';

import basicinfos from './basicinfo.vue';
import servpj from './servpj.vue';

export default {
	data() {
		return {
			goodsinfo: [],
			origin: '',
			headnum: {},
			tabbarlist: ['基本信息', '配件与服务', '结算信息'],
			showindex: 0,
			saleli: [],
			authorization: '',
			orderid: '',
			shopid: '',
			infos: [],
			online: false,
			piclist: [],
			src: '',
			serchecked: false,
			sertype: 1,
			pjchecked: false,
			pjtype: 1,
			isservconfim: false,
			ispjconfim: false,
			fwtotals: 0,
			pjtotals: 0,
			serfoucs: null,
			orderStatus: null,
			orderNodeStatus: null,
			gzdes: '' //故障描述
		};
	},
	computed: {
		...mapState(['orderinfo', 'serverlist'])
	},
	onLoad(options) {
		var that = this;
		let datas = uni.getStorageSync('ordermaininfo');
		this.authorization = uni.getStorageSync('atrztion');
		this.shopid = uni.getStorageSync('shopid');
		this.orderid = datas.orderId;
		if (options.showindex) {
			this.showindex = options.showindex;
		} else {
			// this.showindex = 0
		}
		this.request(this.orderid);
		var that = this;

		setTimeout(function() {
			console.log(that.infos, 'afsdf');
			if (that.infos.orderStatus == 1) {
				that.$set(that.headnum, 'num', that.infos.orderCode);
				that.$set(that.headnum, 'text', '进行中');
			} else if (that.infos.orderStatus == 2) {
				console.log(2);
				if (that.orderNodeStatus == 2) {
					that.$set(that.headnum, 'num', that.infos.orderCode);
					that.$set(that.headnum, 'text', '已结清');
				} else {
					that.$set(that.headnum, 'num', that.infos.orderCode);
					that.$set(that.headnum, 'text', '未结清');
				}
			} else if (that.infos.orderStatus == 3) {
				that.$set(that.headnum, 'num', that.infos.orderCode);
				that.$set(that.headnum, 'text', '已作废');
			}
		}, 200);
	},
	created() {},
	methods: {
		tobacks(e) {
			console.log(e);
			if (e == 'back') {
				uni.navigateBack();
				// uni.switchTab({
				// 	url: '../ohome/ohome'
				// })
			} else if (e == '投诉') {
				console.log(1);
				uni.navigateTo({
					url: '../../stores/complaint/complaint?type=1&ispop=true&orderid=' + this.orderid
				});
			}
		},
		...mapMutations(['SET_ORDERINFO', 'SET_SERVERLIST']),
		// 请求数据
		request(orderid) {
			var that = this;
			this.$request('/order/store/order/infobypk/' + orderid, '', 'get', this.authorization).then(res => {
				this.infos = res.datas;
				this.SET_ORDERINFO(this.infos);
				this.gzdes = res.datas.orderFaultDescription;
				this.gzpiclist = res.datas.orderFaultImage;
				console.log(this.infos, 'serverlistaaa');
				this.orderStatus = this.infos.orderStatus;
				this.orderNodeStatus = this.infos.orderNodeStatus;
			});
		},
		tonav(index) {
			this.showindex = index;
			console.log(index, 'index');
		}
	},
	filters: {
		showPrice(price) {
			return '￥' + price.toFixed(2);
		}
	},
	components: {
		confirms,
		minpopup,
		basicinfos,
		minpicker,
		topback,
		tabbar,
		uploadImg,
		LbPicker,
		servpj
	}
};
</script>

<style lang="less" scoped>
.iptbox {
	border-bottom: 1rpx solid #e5e5e5;
	display: flex;
	justify-content: space-between;
	align-items: center;
	box-sizing: border-box;
	padding: 37rpx 0rpx;

	.text {
		width: 32%;
		font-size: 28rpx;

		text {
			color: #e23a3a;
		}
	}

	.input,
	input {
		font-size: 26rpx;
		color: #999999;
		text-align: right;
	}

	.input {
		width: 60%;
		display: flex;
		justify-content: flex-end;

		text {
			padding-left: 10rpx;
		}
	}

	.more {
		padding-left: 10rpx;
		width: 11rpx;
		height: 21rpx;
	}
}

.last {
	border: none;
}

.logistics {
	background: #ffffff;
	box-sizing: border-box;
	padding: 30rpx 30rpx;
	margin-top: 30rpx;
}

.salesmain {
	width: 100%;
	background: #fafafa;
	position: absolute;
	top: 0;
	left: 0;

	.top {
		width: 100%;
		height: 350rpx;
		background: #4d9df2;
	}

	.tabs {
		background: #ffffff;
	}

	.basicinfo {
		width: 100%;
		font-size: 28rpx;
		color: #666666;
		box-sizing: border-box;
		padding: 0rpx 30rpx 200rpx 30rpx;

		.addreli {
			color: #999999;
		}

		.addcar {
			background: #ffffff;
			line-height: 55rpx;
			box-sizing: border-box;
			padding: 50rpx 30rpx;
			display: flex;
			justify-content: space-between;
			margin: 30rpx 0;

			image {
				margin: 0 auto;
				width: 100rpx;
				height: 100rpx;
			}
		}

		.infos {
			background: #ffffff;
			line-height: 55rpx;
			box-sizing: border-box;
			padding: 20rpx 30rpx;
			display: flex;
			justify-content: space-between;
			margin: 30rpx 0;

			image {
				width: 100rpx;
				height: 100rpx;
				border-radius: 50%;
			}

			.i-left {
				width: 82%;

				.shopname {
					font-size: 32rpx;
					color: #333333;
				}

				.names {
					.tel {
						padding-left: 20rpx;
					}
				}

				.adress {
					width: 100%;
					display: flex;
					justify-content: space-between;

					.text {
						width: 13%;
					}

					.main {
						width: 85%;
					}
				}

				.carinfo {
					display: flex;
					justify-content: space-between;

					text {
						width: 45%;
					}

					.km {
						text-align: right;
					}
				}
			}
		}

		.fault {
			background: #ffffff;
			box-sizing: border-box;
			padding: 0 15rpx;

			.km {
				display: flex;
				justify-content: space-between;
				color: #333333;
				box-sizing: border-box;
				padding: 20rpx 0;
				border-bottom: 1rpx solid #e5e5e5;
			}

			.f-desc {
				box-sizing: border-box;
				padding: 20rpx 0;
				border-bottom: 1rpx solid #e5e5e5;

				.des,
				input {
					background: #F0AD4Es;
					width: 100%;
					font-size: 26rpx;
					margin-top: 10rpx;
				}
			}

			.addpic {
				width: 100%;
				box-sizing: border-box;
				padding: 20rpx 0;
				display: flex;
				justify-content: space-between;
				flex-wrap: wrap;
				align-items: center;

				.img {
					width: 31%;
					height: 200rpx;
					margin-bottom: 30rpx;
				}
			}
		}
	}

	.accountinfo {
		width: 100%;

		.noinfo {
			text-align: center;
			box-sizing: border-box;
			padding: 50rpx 0;
			color: #999999;
			font-size: 32rpx;

			image {
				width: 450rpx;
				height: 450rpx;
			}
		}

		.infos {
			width: 100%;
			box-sizing: border-box;
			padding: 30rpx 30rpx;

			.item {
				box-sizing: border-box;
				padding: 20rpx 0rpx;
				display: flex;
				justify-content: space-between;
				color: #666666;
				font-size: 28rpx;
				line-height: 50rpx;
			}
		}

		.goodslist {
			.s-top {
				width: 100%;
				display: flex;
				justify-content: space-between;
				font-size: 26rpx;
				color: #67c23a;
				border-bottom: 1rpx solid #e5e5e5;
				box-sizing: border-box;
				padding: 0 0 10rpx 0;

				.time {
					font-size: 24rpx;
					color: #666666;
				}

				.zfb {
					color: #2d8cf0;
				}
			}

			.mains {
				box-sizing: border-box;
				padding-top: 20rpx;
			}
		}
	}

	.goodslist {
		width: 100%;
		background: #ffffff;
		box-sizing: border-box;
		padding: 30rpx 30rpx;

		.saleli {
			box-sizing: border-box;
			padding: 25rpx 15rpx;

			.mains {
				width: 100%;
				display: flex;
				justify-content: space-between;

				.m-left {
					width: 30%;

					image {
						width: 150rpx;
						height: 150rpx;
					}
				}

				.m-right {
					width: 69%;

					.goodsname {
						font-size: 32rpx;
						font-weight: 500;
						color: #333333;
					}

					.type-sale {
						display: flex;
						justify-content: space-between;
						align-items: center;
						color: #666666;
						box-sizing: border-box;
						padding: 10rpx 0 15rpx 0;

						.type {
							width: 60%;
							font-size: 26rpx;
							text-overflow: ellipsis;
							overflow: hidden;
							white-space: nowrap;
						}

						.sale {
							font-size: 24rpx;
						}
					}

					.num-stock {
						display: flex;
						justify-content: space-between;
						align-items: center;
						color: #666666;
						font-size: 24rpx;
					}

					.price-account {
						box-sizing: border-box;
						padding-top: 10rpx;
						font-size: 32rpx;
						display: flex;
						justify-content: space-between;
						align-items: center;

						.price {
							color: #e23a3a;
							font-weight: 500;
						}

						.prices {
							color: #2d8cf0;
							font-weight: 500;
						}

						.carnum {
							font-size: 24rpx;
							color: #999999;
						}

						.accout {
							// background: #007AFF;
							width: 40%;
							display: flex;
							justify-content: space-between;
							align-items: center;
						}
					}
				}
			}
		}
	}

	.tobtn {
		width: 100%;
		display: flex;
		justify-content: flex-end;
		align-items: center;
		background: #ffffff;
		box-sizing: border-box;
		padding: 30rpx 30rpx;
		// margin-top: 50rpx;
		position: fixed;
		bottom: 0rpx;
		left: 0;

		.price {
			font-size: 32rpx;
			color: #282828;
			width: 30%;
		}

		.btnitem {
			margin-left: 30rpx;
			width: 30%;
			height: 60rpx;
			background: #e23a3a;
			text-align: center;
			line-height: 60rpx;
			font-size: 24rpx;
			color: #ffffff;
		}
	}
}

.iptcolor {
	color: #09bb07;
}
</style>
