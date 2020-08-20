<template>
	<view class="addgoods">
		<view class="headertop">
			<topback :topback="'库存'" :type="'one'" :isleft="true" :isbule="false" :isaddpic="true" @change="topchange"></topback>
			<view class="selectbox">
				<Select @selected="getSelect" :options="options" :type="'server'"></Select>
				<Select @selected="getSelect" :options="options" :type="'all'"></Select>
				<view class="pop" v-if="ispop">
					<view class="bg" @click="ispop = false"></view>
					<view class="box">
						<view class="fzgl " :class="issel == true ? 'sel' : ''" @click="addnew">新增线下商品</view>
						<view class="addnew" :class="issel == false ? 'sel' : ''" @click="tozfgl">分组管理</view>
					</view>
				</view>
			</view>
		</view>
		<view class="content">
			<view class="salelist">
				<view class="saleli" v-for="(item, index) in saleli" :key="index">
					<view class="mains">
						<view class="m-left" @click="tomain(item, index)">
							<image :src="product + item.goodsImage" mode=""></image>
							<image class="bq" v-if="item.goodsType == 1" src="../../../static/images/title_biaoqian@2x.png" mode=""></image>
						</view>
						<view class="m-right">
							<view class="goodsname">{{ item.goodsBrand }}</view>
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
									<view class="replenishment item" v-if="item.storeGoodsInventory < 1">补货</view>
									<view class="inventory item" @click="toinventory(item)">盘点</view>
								</view>
							</view>
						</view>
					</view>
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
export default {
	data() {
		return {
			ispop: false,
			issel: true,
			showindex: 0,
			tabbarlist: ['全部', '未结清', '已结清'],
			inputVal: '',
			isShow: false,
			options: [{ groupName: '全部分组', groupId : '' }],
			goodsinfo: [],
			supli: [{ name: '供应商1' }, { name: '供应商1' }, { name: '供应商1' }, { name: '供应商1' }, { name: '供应商1' }],
			saleli: [],
			storeId: '',
			authorization: '',
			pageNum: 1,
			searchKeywords: '',
			goodsType: '',
			goodsGroupId:''
		};
	},
	onLoad() {
		this.storeId = uni.getStorageSync('shopid');
		this.authorization = uni.getStorageSync('atrztion');
		let data = {
			storeId: this.storeId,
			pageNum: 1,
			pageSize: 10,
			searchKeywords: this.searchKeywords,
			goodsGroupId : this.goodsGroupId 
		};
		this.requstlist(data);
		this.requstgroup();
	},
	onReachBottom() {
		console.log('触底');
		this.pageNum = this.pageNum + 1;
		let data = {
			storeId: this.storeId,
			pageNum: this.pageNum,
			pageSize: 10,
			searchKeywords: this.searchKeywords,
			goodsGroupId : this.goodsGroupId 
		};
		this.requstlist(data);
	},
	methods: {
		topchange(e, a) {
			if (e == 'back') {
				uni.switchTab({
					url: '../../stores/Shome/Shome'
				});
			} else if (e == 'showpop') {
				this.ispop = !this.ispop;
			} else if (a == 'search') {
				this.saleli = [];
				this.searchKeywords = e;
				this.pageNum = 1;
				this.goodsType = '';
				let data = {
					storeId: this.storeId,
					pageNum: this.pageNum,
					pageSize: 10,
					searchKeywords: this.searchKeywords,
					goodsType: this.goodsType
				};
				this.requstlist(data);
			}
		},
		// 请求商品分组
		requstgroup() {
			this.$request('/goods/store/goods/group/withoutPagingList', { storeId: this.storeId }, 'post', this.authorization, '').then(res => {
				res.datas.forEach(res=>{
					this.options.push(res)
				})
				console.log(res.datas, 'sf');
			});
		},
		// 门店工单数量统计
		requstlist(data) {
			this.$request('/goods/store/goods/withPagingList', data, 'post', this.authorization).then(res => {
				res.datas.forEach(res => {
					this.saleli.push(res);
				});
				console.log(res.datas, 'a');
			});
		},
		getSelect(val) {
			console.log(val);
			this.goodsGroupId  = val.groupId ;
			this.pageNum = 1;
			this.saleli = [];
			let data = {
				storeId: this.storeId,
				pageNum: this.pageNum,
				pageSize: 10,
				searchKeywords: this.searchKeywords,
				goodsGroupId : this.goodsGroupId 
			};
			this.requstlist(data);
		},
		addnew() {
			this.issel = true;
			uni.navigateTo({
				url: '../addgoods/addgoods'
			});
		},
		toinventory(item) {
			uni.navigateTo({
				url: '../inventory/inventory?storeGoodsId='+item.storeGoodsId+'&inventory='+item.storeGoodsInventory 
			});
		},
		tozfgl() {
			this.issel = false;
			uni.navigateTo({
				url: '../goodsgroup/goodsgroup'
			});
		},
		tomain(item, index) {
			if(item.goodsType==1){
				uni.navigateTo({
					url: '../goodsmain/goodsmain?storeGoodsId='+item.storeGoodsId
				});
			}else{
				uni.navigateTo({
					url: '../offlinegoodsmain/offlinegoodsmain?storeGoodsId='+item.storeGoodsId
				});
			}
			
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
			width: 100%;
			height: 10000rpx;
			position: fixed;
			top: 0rpx;
			right: 0rpx;
			z-index: 11111111111111111;
			font-size: 28rpx;
			.bg {
				position: absolute;
				top: 0;
				left: 0;
				width: 100%;
				height: 10000rpx;
				// background: #333333;
				// opacity: .5;
			}
			.box {
				position: absolute;
				top: 100rpx;
				right: 40rpx;
				z-index: 11111111111111111111111111;
				background: #ffffff;
				width: 50%;
			}
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
					width: 60%;
					display: flex;
					justify-content: flex-end;
					align-items: center;
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
</style>
