<template>
	<view class="order">
		<view class="top" v-if="origin == 'sales'"><topback :type="'two'" :topback="'确认销售单'" :iscenter="true" :iswhite="false"></topback></view>
		<view class="top" v-if="origin == 'purchase'"><topback :type="'two'" :topback="'确认采购单'" :iscenter="true" :iswhite="false"></topback></view>

		<!-- 司机信息 -->
		<view class="sales" v-if="origin == 'sales'">
			<view class="addcus" v-if="!driverinfo">
				<image src="../../../static/images/add.png" mode=""></image>
				<view class="text">添加客户</view>
			</view>
			<view class="cusinfos" v-if="driverinfo">
				<view class="cus">
					<listvertical :curinfo="driverinfo" :type="'order'"></listvertical>
					<image @click="showpay('picker1')" src="../../../static/images/icon_shangla@2x.png" mode=""></image>
				</view>
			</view>
		</view>
		<LbPicker ref="picker1" :props="myProps" mode="selector" v-model="value" :list="driverlist" @confirm="Confirmdriver"></LbPicker>
		<view class="cusinfos " v-if="origin == 'purchase'">
			<view class="ci-top">
				<text class="name">采购员李师傅</text>
				<text class="tel">64648678</text>
			</view>
			<view class="address">
				<text class="text">地址：</text>
				<text class="ads">哀诉好低啊u上帝阿斯顿阿士东哈怂电话奥斯丁和奥数啊</text>
			</view>
			<image src="../../../static/images/icon_shangla@2x.png" mode=""></image>
		</view>
		<view class="accountlist">
			<view class="topinfo">
				<view class="allprice">
					<text class="ap">商品总价：{{ totalPrice | showPrice }}</text>
					<text class="toclean" @click="toclean">清空购物单</text>
				</view>
			</view>
			<view class="nogoods" v-if="saleli.length == 0">暂无商品</view>
			<view class="listbox">
				<view class="saleli" v-for="(item, index) in saleli" :key="index">
					<view class="mains">
						<view class="m-left"><image :src="product + item.goodsImage" mode=""></image></view>
						<view class="m-right">
							<view class="goodsname">{{ item.goodsName }}</view>
							<view class="type-sale">
								<text class="type">{{ item.goodsCode }}</text>
							</view>
							<view class="price-account">
								<text class="price">￥{{ item.storeGoodsSalePrice }}</text>
								<view class="accout">
									<view @click="decrement(item, index)">-</view>
									{{ item.cart_num }}
									<view @click="increment(item, index)">+</view>
								</view>
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		<view class="iptmain" v-if="origin == 'sales'">
			<view class="iptbox">
				<view class="text">配送方式</view>
				<view class="input" @click="showpay('picker')">
					<text>{{ psfs }}</text>
					<image src="../../../static/images/icon_shangla@2x.png" mode=""></image>
				</view>
			</view>
			<LbPicker ref="picker" mode="selector" v-model="value1" :list="list" @confirm="handleConfirm"></LbPicker>
			<view class="iptbox">
				<view class="text">配送公司</view>
				<input type="text" value="" placeholder="点击填写" v-model="psname" />
			</view>
			<view class="iptbox">
				<view class="text">承运人</view>
				<input type="text" value="" placeholder="点击填写" v-model="cyr" />
			</view>
			<view class="iptbox last">
				<view class="text">物流单号</view>
				<input type="text" value="" placeholder="点击填写" v-model="wlnum" />
			</view>
			<view class="iptbox last">
				<view class="text">物流费用</view>
				<input type="text" value="" placeholder="点击填写" v-model="orderLogisticsAmount" />
			</view>
			<view class="iptbox last" v-if="pstype == 1">
				<view class="text">承运人手机号</view>
				<input type="text" value="" placeholder="点击填写" v-model="cyrtel" />
			</view>
		</view>
		<view class="tobtn">
			<view class="btnitem" @click="toaddgoods">添加商品</view>
			<view class="btnitem" @click="toacount">去结算</view>
		</view>
	</view>
</template>

<script>
import { mapState, mapMutations } from 'vuex';
import topback from '../../../components/topback/topback.vue';
import listvertical from '../../../components/listvertical/listvertical.vue';
import LbPicker from '../../../components/lb-picker/index.vue';

export default {
	data() {
		return {
			origin: '',
			curinfo: {
				icon: '../../../static/logo.png',
				title: '十点十分我问',
				name: '士大夫阿斯顿',
				tel: '3216548978'
			},
			saleli: [],
			driverinfo: [],
			storeId: '',
			authorization: '',
			sales: [],
			copylist: [],
			copylists: [],
			value1: '商家自配',
			psfs: '商家自配',
			value: '',
			driverlist: [],
			myProps: {
				label: 'driverUserContacts',
				value: 'driverId'
			},

			list: [{ label: '商家自配', value: 1 }, { label: '物流公司配送', value: 2 }],
			pstype: 1,
			cyr: '',
			wlnum: '',
			cyrtel: '',
			psname: '',
			orderLogisticsAmount:0
		};
	},

	onLoad(options) {
		this.origin = options.from;
		this.storeId = uni.getStorageSync('shopid');
		this.authorization = uni.getStorageSync('atrztion');
		console.log(this.origin);
		if (this.origin == 'sales') {
			console.log(this.salegoods, this.driverinfo, 'add');
			if (this.saledrivers.length == 0) {
				uni.showToast({
					icon: 'none',
					title: '暂无数据，请重新结算'
				});
				setTimeout(function() {
					uni.navigateTo({
						url: '../addgoods/addgoods?from=sales'
					});
				}, 800);
			} else {
				this.copylist = this.salegoods;
				this.saleli = JSON.parse(JSON.stringify(this.copylist));
				this.copylists = this.saledrivers;
				this.driverinfo = JSON.parse(JSON.stringify(this.copylists));
				this.requst();
				console.log(this.salegoods, this.driverinfo);
			}
		}
	},
	computed: {
		...mapState(['saleinfos', 'salegoods', 'saledrivers']),
		totalPrice() {
			return this.saleli.reduce((previousValue, item) => previousValue + item.cart_num * item.storeGoodsSalePrice, 0);
		}
	},
	methods: {
		...mapMutations(['SET_SALEINFOS', 'SET_SALEGOODS', 'SET_SALEDRIVERS']),
		decrement(item, index) {
			// item.cart_num--;
			console.log(item);
			if (item.cart_num == 0) {
				return;
			} else if (item.cart_num == 1) {
				let a = this.saleli.indexOf(item);
				item.cart_num--;
				this.saleli.splice(a, 1);
			} else if (item.cart_num >= 1) {
				let a = this.saleli.indexOf(item);
				this.saleli[a].cart_num--;
				this.$set(this.saleli, a, this.saleli[a]);
			}
		},
		// 数量+
		increment(item, index) {
			let a = this.saleli.indexOf(item);
			this.saleli[a].cart_num++;
			this.$set(this.saleli, a, this.saleli[a]);
		},
		// 去结算
		toacount() {
			if (this.psname == '' || this.cyr == '' || this.wlnum == '') {
				uni.showToast({
					icon: 'none',
					title: '请完善信息'
				});
			} else {
				if (this.pstype == 1) {
					if (this.cyrtel == '') {
						uni.showToast({
							icon: 'none',
							title: '承运人手机号未填写！'
						});
						return;
					}
				}
				let obj,
					arr = [];
				this.saleli.forEach(res => {
					obj = {};
					obj.orderStoreGoodsId = res.storeGoodsId;
					obj.orderGoodsName = res.goodsName;
					obj.orderGoodsCode = res.goodsCode;
					obj.purchaseQuantity = res.cart_num;
					obj.goodsCommodityPrice = res.storeGoodsSalePrice;
					obj.orderGoodsImage = res.goodsImage;
					obj.costPrice=res.storeGoodsCostPrice
					obj.detailTotalAmount=res.storeGoodsCostPrice*res.cart_num
					arr.push(obj);
				});
				let data = {
					storeId: this.storeId,
					driverUserId: this.driverinfo.driverId,
					driverUserName: this.driverinfo.driverName,
					orderLogisticsType: this.pstype,
					orderLogisticsCompanyName: this.psname, //配送公司名称
					orderLogisticsNumber: this.wlnum, //物流单号
					orderLogisticsAmount:this.orderLogisticsAmount,
					goodsList: arr,
					orderAmountPaid: this.totalPrice
				};
				console.log(data, this.driverinfo);
				this.SET_SALEINFOS(data);
				console.log(this.saleinfos, 'saleinfos');
				// this.sendinfo(data)

				setTimeout(function() {
					uni.navigateTo({
						url: '../../order/curmoney/curmoney?from=sales'
					});
				}, 500);
			}
		},

		// 清空购物单
		toclean() {
			this.saleli = [];
		},
		// 添加商品
		toaddgoods() {
			console.log(this.saleli);
			this.SET_SALEGOODS(this.saleli);
			this.SET_SALEDRIVERS(this.driverinfo);
			// console.log();
			setTimeout(function() {
				uni.navigateTo({
					url: '../addgoods/addgoods?from=sales'
				});
			}, 500);
		},
		showpay(name) {
			this.$refs[name].show();
		},
		handleConfirm(item) {
			console.log(item);
			this.pstype = item.value;
			this.psfs = item.item.label;
		},
		Confirmdriver(item) {
			console.log(item);
			this.driverinfo = item.item;
			this.SET_SALEDRIVERS(item.item);
			this.$forceUpdate();
		},
		// 请求客户
		requst() {
			let data = {
				storeId: uni.getStorageSync('shopid'),
				pageNum: 1,
				pageSize: 999999
			};
			this.$request('/organization/driver/user/withPagingList', data, 'post', uni.getStorageSync('atrztion'), '').then(res => {
				console.log(res);
				let arr = res.datas;
				// arr.forEach(res=>{
				// 	let obj={},
				// 	obj.lable=res.driverUserContacts,
				// 	obj.val=res.
				// })
				this.driverlist = res.datas;
				// this.cuslist = res.datas;
				// this.SET_ORDERINFO();
			});
		}
	},
	filters: {
		showPrice(price) {
			return '￥' + price.toFixed(2);
		}
	},
	components: { topback, listvertical, LbPicker }
};
</script>

<style lang="less" scoped>
.order {
	width: 100%;
	background: #fafafa;
	position: relative;
	box-sizing: border-box;
	padding-top: 100rpx;
	.top {
		background: #ffffff;
		width: 100%;
		height: 100rpx;
		position: fixed;
		top: 0;
		left: 0;
		z-index: 11;
	}
	.cusinfos {
		background: #ffffff;
		box-sizing: border-box;
		margin: 30rpx 0;
		padding: 0rpx 30rpx;
		position: relative;
		.cus {
			box-sizing: border-box;
			padding: 15rpx 15rpx;
		}
		.ci-top {
			.name {
				color: #282828;
				font-size: 32rpx;
			}
			.tel {
				font-size: 28rpx;
				color: #666666;
				padding-left: 30rpx;
			}
		}
		.address {
			box-sizing: border-box;
			padding: 20rpx 0;
			font-size: 26rpx;
			color: #999999;
			display: flex;
			justify-content: flex-start;
			.text {
				width: 13%;
			}
			.ads {
				width: 70%;
			}
		}
		image {
			position: absolute;
			right: 30rpx;
			top: 50%;
			transform: translateX(-50%);
			width: 12rpx;
			height: 21rpx;
		}
	}
	.addcus {
		background: #ffffff;
		box-sizing: border-box;
		margin: 30rpx 0;
		text-align: center;
		padding: 30rpx 0;

		image {
			width: 55rpx;
			height: 55rpx;
		}
		.text {
			color: #333333;
			font-size: 24rpx;
			box-sizing: border-box;
			padding-top: 20rpx;
		}
	}
	.accountlist {
		width: 100%;
		box-sizing: border-box;
		padding: 0 30rpx;
		.topinfo {
			background: #ffffff;
			width: 100%;
			box-sizing: border-box;
			padding: 30rpx 30rpx;
			border-bottom: 1rpx solid #e5e5e5;
			.allprice {
				display: flex;
				justify-content: space-between;
				align-items: center;
				font-size: 32rpx;
				color: #999999;
			}
			.ap {
				color: #2d8cf0;
				font-size: 32rpx;
			}
		}
		.nogoods {
			text-align: center;
			font-size: 32rpx;
			box-sizing: border-box;
			padding: 50px 0;
			background: #ffffff;
			// color: #2d8cf0;
		}
		.listbox {
			background: #ffffff;
			box-sizing: border-box;
			padding: 0rpx 15rpx;
		}
		.saleli {
			box-sizing: border-box;
			padding: 25rpx 15rpx;
			background: #ffffff;
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

	.iptmain {
		margin: 30rpx 0;
		box-sizing: border-box;
		padding: 0rpx 30rpx;
	}
	.iptbox {
		background: #ffffff;
		border-bottom: 1rpx solid #e5e5e5;
		display: flex;
		justify-content: space-between;
		align-items: center;
		box-sizing: border-box;
		padding: 37rpx 15rpx;
		.text {
			font-size: 28rpx;
			text {
				color: #e23a3a;
			}
		}
		input,
		.input {
			font-size: 26rpx;
			color: #999999;
			text-align: right;
			image {
				margin-left: 20rpx;
				width: 12rpx;
				height: 21rpx;
			}
		}
	}
	.last {
		border: none;
	}
	.tobtn {
		width: 100%;
		display: flex;
		justify-content: flex-end;
		background: #ffffff;
		box-sizing: border-box;
		padding: 30rpx 30rpx;
		margin-top: 50rpx;
		.btnitem {
			margin-left: 30rpx;
			width: 30%;
			height: 60rpx;
			background: #2d8cf0;
			text-align: center;
			line-height: 60rpx;
			font-size: 24rpx;
			color: #ffffff;
		}
	}
}
</style>
