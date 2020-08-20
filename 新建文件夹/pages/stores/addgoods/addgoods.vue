<template>
	<view class="addgoods">
		<view class="headertop">
			<topback :topback="'商品'" :type="'one'" :isleft="true" :isbule="false" :isaddpic="false" @change="tobacks"></topback>
			<view class="selectbox">
				<Select @selected="getSelectgroup" :options="goodsgroup" :type="'server'"></Select>
				<Select @selected="getSelect" :options="options" :type="'all'"></Select>
			</view>
		</view>

		<view class="content">
			<!-- tabbar -->
			<view class="salelist">
				<view class="saleli" v-for="(item, index) in saleli" :key="index">
					<view class="mains">
						<view class="m-left"><image :src="product + item.goodsImage" mode=""></image></view>
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
									<view @click="decrement(item, index)">-</view>
									{{ item.cart_num }}
									<view @click="increment(item, index)" :disabled="item.cart_num >= item.stock">+</view>
								</view>
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		<!-- 购物单 -->
		<view class="accountlist" v-if="isShow">
			<view class="bg" @click="isShow = !isShow"></view>
			<view class="topinfo">
				<view class="allprice">
					<text class="ap">商品总价：{{ totalPrice | showPrice }}</text>
					<text class="toclean" @click="toclean">清空购物单</text>
				</view>
			</view>
			<view class="listbox">
				<view class="saleli" v-for="(item, index) in goodsinfo" :key="index">
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
									<!-- <view @click="decrement(item, index)">-</view> -->
									<text>数量：{{ item.cart_num }}</text>
									<!-- <view @click="increment(item, index)" :disabled="item.cart_num >= item.stock">+</view> -->
								</view>
							</view>
						</view>
					</view>
				</view>
			</view>
			<view class="botinfo"><view class="toaccount" @click="tosupplier">去结算</view></view>
		</view>
		<!-- 选择客户 -->
		<view class="accountlist" v-if="issupplier">
			<view class="bg"></view>
			<view class="topinfo">
				<view class="allprice">
					<text class="toclean" @click="toclean">取消</text>
					<text class="ap">确定</text>
				</view>
			</view>
			<view class="listbox suplist">
				<view class=" supli" v-for="(item, index) in supli" :key="index" :class="supindex == index ? 'cursup' : ''" @click="changesup(index, item)">
					{{ item.driverName }}
				</view>
			</view>
			<view class="botinfo"><view class="toaccount" @click="toorder">去结算</view></view>
		</view>
		<view class="botinfo">
			<view class="icons" @click="isShow = true">
				<image src="../../../static/logo.png" mode=""></image>
				<text v-show="goodsinfo.length != 0">{{ goodsinfo.length }}</text>
			</view>
			<view class="allprice">商品总价：{{ totalPrice | showPrice }}</view>
			<view class="toaccount" @click="toaccount">去结算</view>
		</view>
	</view>
</template>

<script>
	import {
		mapState,
		mapMutations
	} from 'vuex';
import topback from '../../../components/topback/topback.vue';
import tabbar from '../../../components/tabbar/tabbar.vue';
import goodsitem from '../../../components/goodsitem/goodsitem';
import Select from '../../../components/Select/Select.vue';
export default {
	data() {
		return {
			origin: '',
			showindex: 0,
			tabbarlist: ['全部', '未结清', '已结清'],
			inputVal: '',
			isShow: false,
			issupplier: false,
			supindex: 0,
			options: [
				{
					name: '全部分组',
					code: '0'
				},
				{
					name: '零件',
					code: '1'
				},
				{
					name: '配件',
					code: '2'
				}
			],
			goodsinfo: [],
			supli: [],
			saleli: [],
			storeId: '',
			atrztion: '',
			pageNum: 1,
			cursopinfo: {},
			goodsgroup: []
		};
	},

	computed: {
		...mapState(['saleinfos','salegoods']),
		totalPrice() {
			return this.goodsinfo.reduce((previousValue, item) => previousValue + item.cart_num * item.storeGoodsSalePrice, 0);
		}
	},
	onLoad(options) {
		this.origin = options.from;
		this.storeId = uni.getStorageSync('shopid');
		this.atrztion = uni.getStorageSync('atrztion');
		console.log(this.origin);
		let data = {
			storeId: this.storeId,
			pageNum: this.pageNum,
			pageSize: 10
		};
		this.requstlist(data);
		this.requetgp();
		this.requstsup();
		// this.copylist = this.salegoods;
		// this.goodsinfo = JSON.parse(JSON.stringify(this.copylist));
	},
	onReachBottom() {
		console.log('触底');
		this.pageNum = this.pageNum + 1;
		let data = {
			storeId: this.storeId,
			pageNum: this.pageNum,
			pageSize: 10
		};
		this.requstlist(data);
	},
	methods: {
		...mapMutations(['SET_SALEINFOS','SET_SALEGOODS','SET_SALEDRIVERS']),
		tobacks(e){
			console.log(e);
			if(e=='back'){
				uni.navigateTo({
					url:'../sales-mng/sales-mng'
				})
			}
		},
		// 商品
		requstlist(data) {
			this.$request('/goods/store/goods/withPagingList', data, 'post', this.atrztion).then(res => {
				console.log(res.datas, 'aaa');
				res.datas.forEach(res => {
					res.cart_num = 0;
					this.saleli.push(res);
				});
			});
		},
		// 商品分组
		requetgp() {
			this.$request('/goods/store/goods/group/withoutPagingList', { storeId: this.storeId }, 'post', this.atrztion).then(res => {
				this.goodsgroup = res.datas;
				console.log(res.datas, 'a');
			});
		},
		// 客户
		requstsup() {
			this.$request('/organization/driver/user/withPagingList', { storeId: this.storeId }, 'post', this.atrztion).then(res => {
				this.supli = res.datas;
				this.cursopinfo=res.datas[0]
				console.log(res, 'a');
			});
		},
		decrement(item, index) {
			if (item.cart_num == 0) {
				return;
			} else if (item.cart_num == 1) {
				let a = this.goodsinfo.indexOf(item);
				item.cart_num--;
				this.goodsinfo.splice(a, 1);
			} else if (item.cart_num >= 1) {
				let a = this.goodsinfo.indexOf(item);
				this.goodsinfo[a].cart_num--;
				this.$set(this.goodsinfo, a, this.goodsinfo[a]);
			}
		},
		// 数量+
		increment(item, index) {
			console.log(item);
			//
			if (this.goodsinfo.length == 0) {
				item.cart_num++;
				this.goodsinfo.push(item);
			} else {
				let status = this.goodsinfo.some(e => e.storeGoodsId === item.storeGoodsId);
				if (status == false) {
					item.cart_num++;
					this.goodsinfo.push(item);
				} else {
					let a = this.goodsinfo.indexOf(item);
					this.goodsinfo[a].cart_num++;
					this.$set(this.goodsinfo, a, this.goodsinfo[a]);
				}
			}
		},
		toaccount() {
			console.log(this.goodsinfo);
			if (this.goodsinfo.length == 0) {
				return;
			} else {
				this.isShow = true;
			}
		},
		// 选择客户
		tosupplier() {
			this.isShow = false;
			this.issupplier = true;
		},
		changesup(index, item) {
			this.supindex = index;
			this.cursopinfo = item;
			console.log(this.cursopinfo);
		},
		toclean() {
			this.isShow = false;
			this.goodsinfo = [];
			this.saleli.forEach(res => {
				res.cart_num = 0;
			});
		},
		tonav(index) {
			this.showindex = index;
			console.log(index, 'index');
		},
		getSelectgroup(val) {
			console.log(val);
			this.saleli = [];
			let data = {
				storeId: this.storeId,
				goodsGroupId: val.groupId,
				pageNum: 1,
				goodsClassOne: '',
				goodsClassTwo: '',
				goodsClassThree: '',
				goodsType: '',
				searchKeywords: '',
				driverUserId: '',
				pageSize: 10
			};
			this.requstlist(data);
		},
		getSelect(val) {
			console.log(val);
		},
		// 最后结算
		toorder() {
			console.log(this.goodsinfo, this.cursopinfo);
			let goodslist = [],saleinfos=[],
				obj;
			this.goodsinfo.forEach(res => {
				goodslist.push(res);
			});
			saleinfos[0]=goodslist
			saleinfos[1]=this.cursopinfo
		
			this.SET_SALEGOODS(goodslist)
			this.SET_SALEDRIVERS(this.cursopinfo)
				console.log(this.cursopinfo, 'goodslist');
			setTimeout(function() {
				uni.navigateTo({
					url: '../order/order?from=sales' 
				});
			}, 500);
		}
	},
	filters: {
		showPrice(price) {
			return '￥' + price.toFixed(2);
		}
	},
	components: { topback, tabbar, goodsitem, Select }
};
</script>

<style lang="less" scoped>
.addgoods {
	width: 100%;
	background: #fafafa;
	position: relative;
	.add {
		position: fixed;
		right: 20rpx;
		bottom: 20%;
		image {
			width: 138rpx;
			height: 138rpx;
		}
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
			justify-content: space-between;
			align-items: center;
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
		justify-content: flex-end;
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
					display: flex;
					justify-content: space-between;
					align-items: center;
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
	// box-shadow: 0px -2px 4px 0px #f7f7f7;
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
</style>
