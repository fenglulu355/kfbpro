<template>
	<view class="service">
		<view class="headertop">
			<topback :topback="'服务'" :type="'one'" :isleft="true" :isbule="false" :isaddpic="true" @change="topchange"></topback>
			<view class="selectbox"><Select @selected="getSelect" :options="options" :type="'server'"></Select></view>
		</view>

		<view class="cuslist">
			<view class="cusli" v-for="(item, index) in cuslist" :key="index + 1">
				<cusitem :curinfo="item" :type="'service'" @edit="edit" :origin="origin" @del="del"></cusitem>
				<image class="icon" v-if="origin == 'order'" @click="addtoorder(item, index)" src="../../../static/images/add.png" mode=""></image>
			</view>
		</view>
		<view v-if="this.origin != 'order'" class="addcus" @click="togroup">分组管理</view>
		<view class="orderbox" v-if="this.origin == 'order'">
			<view class="botinfo">
				<view class="icons" @click="isShow = true">
					<image src="../../../static/logo.png" mode=""></image>
					<text v-show="goodsinfo.length != 0">{{ goodsinfo.length }}</text>
				</view>
				<view class="allprice">商品总价：{{ totalPrice | showPrice }}</view>
				<view class="toaccount" @click="tojsfw">去结算</view>
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
							<view class="m-left"><image src="../../../static/images/img_weixiu.png" mode=""></image></view>
							<view class="m-right">
								<view class="goodsname">{{ item.itemName }}</view>
								<view class="type-sale">
									<text class="type">{{ item.itemNumber }} {{ item.serviceUnit }}</text>
								</view>
								<view class="price-account">
									<text class="price">￥{{ item.itemUnitPrice }}</text>
									<view class="accout" @click="cardel(item, index)">删除</view>
								</view>
							</view>
						</view>
					</view>
				</view>
				<view class="botinfo">
					<view class="toaccount" @click="isShow = false">继续</view>
					<view class="toaccount" @click="tojsfw">去结算</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
import cusitem from '../../../components/listvertical/listvertical.vue';
import topback from '../../../components/topback/topback.vue';
import Select from '../../../components/Select/Select.vue';
import { mapState, mapMutations } from 'vuex';
export default {
	data() {
		return {
			options: [],
			cuslist: [],
			storeId: '',
			authorization: '',
			origin: '',
			isShow: false,
			goodsinfo: [],
			storagelist: [],
			copylist: [],
			serviceGroupId: '', //服务分组id
			searchKeywords: '',
			driverUserId: ''
		};
	},
	onLoad(options) {
		console.log(options);
		this.origin = options.from;
		this.storeId = uni.getStorageSync('shopid');
		this.authorization = uni.getStorageSync('atrztion');
		if (this.origin == 'service') {
		} else if (this.origin == 'order') {
			if (!this.orderinfo) {
				uni.showToast({
					icon: 'none',
					title: '暂无数据，请重新结算'
				});
				setTimeout(function() {
					uni.navigateBack();
				}, 800);
			} else {
				this.copylist = this.serverlist;
				this.goodsinfo = JSON.parse(JSON.stringify(this.copylist));
			}
		}
	},
	created() {
		let data = {
			storeId: this.storeId,
			searchKeywords: this.searchKeywords,
			driverUserId: this.driverUserId,
			serviceGroupId: this.serviceGroupId
		};
		this.requstlist(data);
		this.requsetgoup();
	},
	computed: {
		...mapState(['serverlist', 'orderinfo', 'pjlist']),
		totalPrice() {
			return this.goodsinfo.reduce((previousValue, item) => previousValue + item.itemNumber * item.itemUnitPrice, 0);
		}
	},
	methods: {
		...mapMutations(['SET_SERVERLIST', 'SET_EDITSERVER']),
		topchange(e, a) {
			if (e == 'back') {
				if(this.origin=='order'){
					uni.navigateTo({
						url: '../../order/ordermain/ordermain'
					});
				}else{
					uni.switchTab({
						url:'../Shome/Shome'
					})
				}
			} else if (e == 'showpop') {
				uni.navigateTo({
					url: '../editserv/editserv?type=add'
				});
			} else if (a == 'search') {
				console.log(1);
				this.cuslist=[]
				if (e != '') {
					this.searchKeywords = e;
					let data = {
						storeId: this.storeId,
						searchKeywords: this.searchKeywords,
						driverUserId: this.driverUserId,
						serviceGroupId: this.serviceGroupId
					};
					this.requstlist(data);
				}
			}
		},
		// 获取分组
		requsetgoup() {
			this.$request('/goods/store/service/group/withoutPagingList', { storeId: this.storeId }, 'get', this.authorization).then(res => {
				this.options = res.datas;
			});
		},
		// 获取列表
		requstlist(data) {
			this.$request('/goods/store/service/withoutPagingList', data, 'post', this.authorization).then(res => {
				this.cuslist = res.datas;
				this.cuslist.forEach(res => {
					res.cart_num = 1;
				});
			});
		},
		// 选择分组
		getSelect(val) {
			this.cuslist = [];
			this.serviceGroupId = val.groupId;
			let data = {
				storeId: this.storeId,
				searchKeywords: this.searchKeywords,
				serviceGroupId: this.serviceGroupId,
				serviceGroupName: val.groupName
			};
			this.requstlist(data);
		},
		togroup(item) {
			uni.navigateTo({
				url: '../editservgroup/editservgroup'
			});
		},
		edit(val) {
			this.SET_EDITSERVER(val);
			uni.navigateTo({
				url: '../editserv/editserv?type=edit'
			});
		},
		del(val) {
			console.log(val, 'del');
		},
		//跳转至工单页面去结算服务
		tojsfw() {
			this.isShow = false;
			let datas = {
				storeId: this.storeId,
				orderId: this.orderinfo.orderId,
				detailStageAmountType: 1,
				orderServiceItems: this.serverlist
			};
			this.$request('/order/store/order/service/update', datas, 'put', this.authorization, 'application/json').then(res => {
				console.log(res);
				if (res.kfbCode == '200') {
					uni.showToast({
						title: '添加成功'
					});
					setTimeout(function() {
						uni.navigateTo({
							url: '../../order/ordermain/ordermain?showindex=0'
						});
					}, 500);
				}
			});
		},
		// 清空服务单
		toclean() {
			this.goodsinfo = [];
			this.isShow = false;
			this.SET_SERVERLIST('clean');
		},

		addtoorder(val, index) {
			let obj = {};
			obj.itemId = val.serviceId;
			obj.itemName = val.serviceName;
			obj.itemUnitPrice = val.serviceAmount;
			obj.itemNumber = val.cart_num;
			this.SET_SERVERLIST(obj);
			this.goodsinfo = this.serverlist;
			console.log(this.goodsinfo);
		},
		// 删除购物单某个子项目
		cardel(item, index) {
			this.SET_SERVERLIST(index);
			if (this.goodsinfo.length == 0) {
				this.isShow = false;
			}
		}
	},

	filters: {
		showPrice(price) {
			return '￥' + price.toFixed(2);
		}
	},
	components: {
		cusitem,
		topback,
		Select
	}
};
</script>

<style lang="less" scoped>
.service {
	width: 100%;
	box-sizing: border-box;
	padding-top: 200rpx;

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

	.cuslist {
		width: 100%;
		box-sizing: border-box;
		padding: 30rpx 20rpx;

		.cusli {
			box-sizing: border-box;
			padding: 15rpx 0rpx;
			background: #ffffff;
			margin-bottom: 30rpx;
			position: relative;

			.icon {
				width: 40rpx;
				height: 40rpx;
				position: absolute;
				right: 30rpx;
				top: 50%;
				transform: translateY(-50%);
			}

			.price-account {
				box-sizing: border-box;
				padding-top: 10rpx;
				font-size: 32rpx;
				display: flex;
				justify-content: space-between;
				align-items: center;

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

	.addcus {
		width: 80%;
		height: 80rpx;
		background: #2d8cf0;
		text-align: center;
		line-height: 80rpx;
		color: #ffffff;
		position: fixed;
		bottom: 20rpx;
		left: 50%;
		transform: translateX(-50%);
		box-shadow: 0px 4px 6px 0px rgba(250, 250, 250, 0.6);
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
			margin: 0 0 20rpx 0;
			box-sizing: border-box;
			padding: 0rpx 30rpx;
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
