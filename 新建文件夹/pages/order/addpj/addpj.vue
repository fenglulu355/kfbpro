<template>
	<view class="addgoods">
		<view class="headertop">
			<topback :topback="'配件'" :type="'one'" :isleft="true" :isbule="false" :isaddpic="false" @change="topchange"></topback>
			<view class="selectbox"><Select @selected="getSelect" :options="options" :type="'server'"></Select></view>
		</view>
		<view class="content">
			<view class="salelist">
				<view class="saleli" v-for="(item, index) in saleli" :key="index">
					<view class="mains">
						<view class="m-left" @click="tomain(item, index)">
							<image :src="$picUrl + '/productPicture/' + item.goodsImage" mode=""></image>
							<image class="bq" v-if="item.goodsType == 1" src="../../../static/images/title_biaoqian@2x.png" mode=""></image>
						</view>
						<view class="m-right">
							<view class="goodsname">{{ item.goodsName }}</view>
							<view class="type-sale">
								<text class="type">{{ item.goodsNickName }}</text>
								<text class="sale">月售：{{ item.storeGoodsTotalSales }}</text>
							</view>
							<view class="num-stock">
								<text class="num">{{ item.goodsCode }}</text>
								<text class="stock">库存：{{ item.storeGoodsInventory }}</text>
							</view>
							<view class="price-account">
								<text class="price">￥{{ item.storeGoodsSalePrice }}</text>
								<view class="accout">
									<image v-if="item.storeGoodsInventory != 0" src="../../../static/images/add.png" mode="" @click="addtoorder(item, index)"></image>
									<!-- <view @click="decrement(item, index)">-</view>
									{{ item.cart_num }}
									<view @click="increment(item, index)" :disabled="item.cart_num >= item.stock">+</view> -->
								</view>
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>

		<view class="orderbox">
			<view class="botinfo">
				<view class="icons" @click="isShow = true">
					<image src="../../../static/logo.png" mode=""></image>
					<text v-show="goodsinfo.length != 0">{{ goodsinfo.length }}</text>
				</view>
				<view class="allprice">商品总价：{{ totalPrice | showPrice }}</view>
				<view class="toaccount" @click="tojspj">去结算</view>
			</view>
			<!-- 购物单 -->
			<view class="accountlist" v-if="isShow">
				<view class="bg"></view>
				<view class="topinfo">
					<view class="allprice">
						<text class="ap">商品总价：{{ totalPrice | showPrice }}</text>
						<text class="toclean" @click="toclean">清空购物单</text>
					</view>
				</view>
				<view class="listbox">
					<view class="saleli" v-for="(item, index) in goodsinfo" :key="index">
						<view class="mains">
							<view class="m-left">
								<image :src="$picUrl + '/productPicture/' + item.goodsImage" mode=""></image>
							</view>
							<view class="m-right">
								<view class="goodsname">{{ item.itemName }}</view>
								<view class="type-sale">
									<text class="type">{{ item.goodsCode }}</text>
								</view>
								<view class="price-account">
									<text class="price">￥{{ item.itemUnitPrice }}</text>
									<view class="accout" @click="cardel(item,index)">删除</view>
								</view>
							</view>
						</view>
					</view>
				</view>
				<view class="botinfo">
					<view class="toaccount" @click="isShow = false">继续</view>
					<view class="toaccount" @click="tojspj">去结算</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import topback from '../../../components/topback/topback.vue';
	import tabbar from '../../../components/tabbar/tabbar.vue';
	import goodsitem from '../../../components/goodsitem/goodsitem';
	import Select from '../../../components/Select/Select.vue';
	import {
		mapState,
		mapMutations
	} from 'vuex';
	export default {
		data() {
			return {
				ispop: false,
				issel: true,
				showindex: 0,
				inputVal: '',
				isShow: false,
				options: [],
				goodsinfo: [],
				supli: [{
					name: '供应商1'
				}, {
					name: '供应商1'
				}, {
					name: '供应商1'
				}, {
					name: '供应商1'
				}, {
					name: '供应商1'
				}],
				saleli: [],
				isShow: false,
				storeId: '',
				authorization: '',
				storagelist: []
			};
		},
		onLoad(options) {
			this.storeId = uni.getStorageSync('shopid');
			this.authorization = uni.getStorageSync('atrztion');
			if (!this.orderinfo) {
				uni.showToast({
					icon: 'none',
					title: '暂无数据，请重新结算'
				})
				setTimeout(function() {
					uni.navigateTo({
						url: '../ordermain/ordermain?showindex=1'
					})
				}, 800);
			} else {
				this.copylist = this.pjlist
				this.goodsinfo = JSON.parse(JSON.stringify(this.copylist))
			}
		},
		created() {
			this.requsetgoup();
			this.requstlist(1, 10);
		},
		computed: {
			...mapState(['pjlist', 'orderinfo']),
			totalPrice() {
				return this.goodsinfo.reduce((previousValue, item) => previousValue + item.itemNumber * Number(item.itemUnitPrice),
					0);
			}
		},
		filters: {
			showPrice(price) {
				return '￥' + price.toFixed(2);
			}
		},
		methods: {
			...mapMutations(['SET_PJLIST']),
			topchange(e) {
				if (e == 'back') {
					uni.navigateTo({
						url: '../ordermain/ordermain'
					})
				}
			},
			// 获取分组
			requsetgoup() {
				this.$request('/goods/store/goods/group/withoutPagingList', {
					storeId: this.storeId
				}, 'post', this.authorization).then(res => {
					this.options = res.datas;
					console.log(res, 'a');
				});
			},
			// 获取列表
			requstlist(pageNum, pageSize, searchKeywords, driverUserId) {
				let data = {
					storeId: this.storeId,
					pageNum: pageNum,
					pageSize: pageSize
				};
				this.$request('/goods/store/goods/withPagingList', data, 'post', this.authorization).then(res => {
					this.saleli = res.datas;
					this.saleli.forEach(res => {
						res.cart_num = 1;
					});
					console.log(res);
				});
			},
			// 添加进购物单
			addtoorder(val, index) {
				let obj = {}
				obj.itemId = val.storeGoodsId
				obj.itemName = val.goodsName
				obj.itemUnitPrice = Number(val.storeGoodsSalePrice)
				obj.itemNumber = val.cart_num
				obj.goodsCode = val.goodsCode
				obj.goodsImage = val.goodsImage
				this.SET_PJLIST(obj)
				this.goodsinfo = this.pjlist
			},
			// 清空服务单
			toclean() {
				this.goodsinfo = [];
				this.isShow = false;
				this.SET_PJLIST('clean')
			},
			// 删除购物单某个子项目
			cardel(item, index) {
				this.SET_PJLIST(index)
				if (this.goodsinfo.length == 0) {
					this.isShow = false
				}
			},
			//跳转至工单页面去结算服务
			tojspj() {
				this.isShow = false
				let datas = {
					storeId: this.storeId,
					orderId: this.orderinfo.orderId,
					detailStageAmountType: 1,
					orderGoodsItems: this.pjlist
				}
				// console.log(datas);
				this.$request('/order/store/order/goods/update', datas, 'put', this.authorization, 'application/json').then(res => {
					// console.log(res);
					if (res.kfbCode == '200') {
						uni.showToast({
							title: '添加成功'
						})
						setTimeout(function() {
							uni.navigateTo({
								url: '../ordermain/ordermain'
							});
						}, 500);
					}
				});


			},

			getSelect(val) {
				console.log(val);
			},
			addnew() {
				this.issel = true;
				uni.navigateTo({
					url: '../addgoods/addgoods'
				});
			},
			toinventory() {
				uni.navigateTo({
					url: '../inventory/inventory'
				});
			},
			tozfgl() {
				this.issel = false;
				uni.navigateTo({
					url: '../goodsgroup/goodsgroup'
				});
			},
			tomain(item, index) {
				uni.navigateTo({
					url: '../goodsmain/goodsmain'
				});
			}
		},

		components: {
			topback,
			tabbar,
			goodsitem,
			Select
		}
	};
</script>

<style lang="less" scoped>
	.addgoods {
		width: 100%;
		background: #fafafa;
		position: relative;
	}

	.headertop {
		background: #ffffff;
		position: fixed;
		width: 100%;
		z-index: 111;
		top: 0;
		left: 0;

		.bg {
			position: absolute;
			top: 0;
			z-index: 111;
			width: 100%;
			height: 200rpx;
		}

		.selectbox {
			margin-top: 100rpx;
			background: #ffffff;
			width: 100%;
			height: 100rpx;
			display: flex;
			justify-content: space-around;
			position: relative;

			.pop {
				width: 30%;
				background: #ffffff;
				position: absolute;
				top: -10rpx;
				right: 40rpx;
				z-index: 11111111111111111;
				font-size: 28rpx;

				view {
					text-align: center;
					line-height: 60rpx;
				}

				.sel {
					color: #2d8cf0;
				}
			}
		}

		.tabs {
			width: 100%;
			box-sizing: border-box;
			padding: 0 15rpx;
			// height: 100rpx;
			background: #ffffff;
		}
	}

	.content {
		box-sizing: border-box;
		padding: 200rpx 30rpx 30rpx 30rpx;

		.salelist {
			width: 100%;
		}
	}

	.isbgs {
		background: rgba(0, 0, 0, 0.5);
	}

	.saleli {
		box-sizing: border-box;
		padding: 25rpx 15rpx;
		background: #ffffff;
		margin: 25rpx 0;

		.mains {
			width: 100%;
			display: flex;
			justify-content: space-between;

			.m-left {
				width: 30%;
				height: 150rpx;
				position: relative;

				image {
					width: 150rpx;
					height: 150rpx;
				}

				.bq {
					width: 150rpx;
					height: 34rpx;
					position: absolute;
					bottom: 0;
					left: 0;
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
					padding-top: 20rpx;
					font-size: 32rpx;
					display: flex;
					justify-content: space-between;
					align-items: center;

					.price {
						color: #e23a3a;
						font-weight: 500;
					}

					.accout {
						width: 40%;
						display: flex;
						justify-content: flex-end;
						align-items: center;

						image {
							width: 40rpx;
							height: 40rpx;
						}

						.item {
							margin-right: 10rpx;
							width: 46%;
							height: 50rpx;
							background: #007aff;
							font-size: 30rpx;
							color: #ffffff;
							text-align: center;
							line-height: 50rpx;
							border-radius: 5rpx;
						}
					}
				}
			}
		}
	}

	.orderbox {
		.accountlist {
			position: fixed;
			z-index: 1111;
			bottom: 100rpx;
			left: 0;
			width: 100%;
			background: rgba(0, 0, 0, 0.5);

			.bg {
				width: 100%;
				height: 1500rpx;
			}

			.topinfo {
				background: #ffffff;
				border-radius: 16px 16px 0px 0px;
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

			.listbox {
				background: #ffffff;
				box-sizing: border-box;
				padding: 30rpx 0;
				max-height: 400rpx;
				overflow-y: scroll;
			}

			.saleli {
				margin: 0 0;
				box-sizing: border-box;
				padding: 20rpx 30rpx;
			}

			.suplist {
				box-sizing: border-box;
				padding: 30rpx 30rpx;
				background: #ffffff;
				width: 100%;
				display: flex;
				justify-content: space-between;
				flex-wrap: wrap;

				.supli {
					width: 48%;
					background: #e5e5e5;
					height: 100rpx;
					margin-top: 30rpx;
					text-align: center;
					line-height: 100rpx;
					font-size: 32rpx;
					color: #333333;
				}

				.cursup {
					background: #2d8cf0;
					color: #ffffff;
				}
			}

			.botinfo {
				justify-content: space-between;
			}
		}

		.saleli {
			box-sizing: border-box;
			padding: 25rpx 15rpx;
			background: #ffffff;
			margin: 25rpx 0;

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
							text-align: right;
							font-size: 26rpx;
							position: relative;
							bottom: 20rpx;
						}
					}
				}
			}
		}

		.botinfo {
			position: fixed;
			bottom: 0;
			left: 0;
			width: 100%;
			height: 104rpx;
			background: #ffffff;
			box-shadow: 0px -2px 4px 0px #f7f7f7;
			display: flex;
			align-items: center;
			justify-content: space-between;
			box-sizing: border-box;
			padding: 0 30rpx;

			.icons {
				width: 40rpx;
				position: relative;

				image {
					width: 40rpx;
					height: 40rpx;
				}

				text {
					display: inline-block;
					background: #e23a3a;
					width: 30rpx;
					height: 30rpx;
					font-size: 20rpx;
					text-align: center;
					line-height: 30rpx;
					color: #ffffff;
					border-radius: 50%;
					position: absolute;
					top: -30%;
					right: -30%;
				}
			}

			.allprice {
				font-size: 32rpx;
				color: #666666;
			}

			.toaccount {
				width: 200rpx;
				height: 60rpx;
				background: #2d8cf0;
				color: #ffffff;
				text-align: center;
				line-height: 60rpx;
				font-size: 32rpx;
			}
		}
	}
</style>
