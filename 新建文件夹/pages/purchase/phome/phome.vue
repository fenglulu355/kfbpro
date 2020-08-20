<template>
	<view class="addgoods">
		<view class="headertop">
			<view class="bg isbgs" v-show="isShow"></view>
			<topback :topback="'采购'" :type="'one'" :isleft="true" :isbule="false" :isaddpic="true" @change="topchange"></topback>
			<view class="selectbox">
				<view class="pop" v-if="ispop">
					<view class="addnew" :class="issel == 0 ? 'sel' : ''" @click="ptcg">发起平台采购</view>
					<view class="fzgl" :class="issel == 1 ? 'sel' : ''" @click="xxcg">发起线下采购</view>
					<view class="addnew" :class="issel == 2 ? 'sel' : ''" @click="addressgl">收获地址管理</view>
				</view>
				<view class="tabs">
					<tabbar :tabbarlist="tabbarlist" :type="0" @change="tonav"></tabbar>
					<tabbar :tabbarlist="mtabbarlist" :type="1" @change="tonav"></tabbar>
				</view>
			</view>
		</view>
		<!-- 		
 -->
		<view class="content">
			<!-- tabbar -->
			<view class="sales">
				<view class="salelist">
					<view class="saleli" v-for="(item, index) in saleli" :key="index">
						<goodsitem :goodsinfo="item" :types="4"></goodsitem>

						<view class="btns">
							<view class="cancle item" v-if="item.type == 1">取消订单</view>
							<view class="return item" v-if="item.type == 0">发起退货</view>
							<view class="cur item" v-if="item.type == 2">确认退货</view>
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
			issel: 0,
			showindex: 0,
			tabbarlist: ['平台采购', '线下采购'],
			mtabbarlist: ['全部', '待确认', '待发货', '已发货', '已完成', '已取消'],
			isShow: false,
			goodsinfo: [],
			saleli: [
				{
					shopname: '哦阿斯蒂芬今晚i吉尔菲我就二分',
					address: '挨饿飞机恰尔即日起为案说法撒旦',
					goodsname: '佛寺饥饿反',
					goodsnum: 'aisjhfdia',
					price: '455774',
					nums: '15',
					type: '0'
				},
				{
					shopname: '哦阿斯蒂芬今晚i吉尔菲我就二分',
					address: '挨饿飞机恰尔即日起为案说法撒旦',
					goodsname: '佛寺饥饿反',
					goodsnum: 'aisjhfdia',
					price: '455774',
					nums: '15',
					type: '1'
				},
				{
					shopname: '哦阿斯蒂芬今晚i吉尔菲我就二分',
					address: '挨饿飞机恰尔即日起为案说法撒旦',
					goodsname: '佛寺饥饿反',
					goodsnum: 'aisjhfdia',
					price: '455774',
					nums: '15',
					type: '2'
				},
				{
					shopname: '哦阿斯蒂芬今晚i吉尔菲我就二分',
					address: '挨饿飞机恰尔即日起为案说法撒旦',
					goodsname: '佛寺饥饿反',
					goodsnum: 'aisjhfdia',
					price: '455774',
					nums: '15',
					type: '1'
				},
				{
					shopname: '哦阿斯蒂芬今晚i吉尔菲我就二分',
					address: '挨饿飞机恰尔即日起为案说法撒旦',
					goodsname: '佛寺饥饿反',
					goodsnum: 'aisjhfdia',
					price: '455774',
					nums: '15',
					type: '0'
				}
			]
		};
	},

	methods: {
		topchange(val) {
			console.log(val);
			if (val == 'showpop') {
				this.ispop = !this.ispop;
			}
		},
		getSelect(val) {
			console.log(val);
		},
		ptcg() {
			console.log(1);
			this.issel = 0;
			uni.navigateTo({
				url: '../../stores/addgoods/addgoods?from=' + 'purchase'
			});
		},
		xxcg() {
			this.issel = 1;
			// uni.navigateTo({
			// 	url: '../goodsgroup/goodsgroup'
			// });
		},
		addressgl() {
			this.issel = 2;
			uni.navigateTo({
				url: '../addressmng/addressmng'
			});
		},
		toinventory() {
			uni.navigateTo({
				url: '../inventory/inventory'
			});
		},

		tomain(item, index) {
			uni.navigateTo({
				url: '../goodsmain/goodsmain'
			});
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
		height: 180rpx;
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
		// height: 100rpx;
		background: #ffffff;
	
	}
}
.content {
	box-sizing: border-box;
	padding: 300rpx 30rpx 30rpx 30rpx;

	.salelist {
		width: 100%;
	}
}
.btns {
	width: 100%;
	display: flex;
	justify-content: flex-end;
	box-sizing: border-box;
	padding: 40rpx 0;
	.item {
		width: 200rpx;
		height: 60rpx;
		background: #2d8cf0;
		border-radius: 5rpx;
		color: #ffffff;
		font-size: 32rpx;
		text-align: center;
		line-height: 60rpx;
	}
	.cancle {
		background: #e23a3a;
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
