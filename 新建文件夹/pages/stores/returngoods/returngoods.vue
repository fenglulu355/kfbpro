<template>
	<view class="salesmng">
		<view class="top">
			<topback :topback="'退货'" :iscenter="false" :isbg="true"></topback>
			<input type="text" value="" placeholder="搜索客户名称,联系人,手机号" />
		</view>
		<view class="content">
			<!-- tabbar -->
			<tabbar :tabbarlist="tabbarlist" :type="0" @change="tonav"></tabbar>
			<view class="salelist">
				<view class="saleli" v-for="(item, index) in saleli" :key="index" @click="tomain(item, index)">
					<goodsitem :goodsinfo="item" @cancle="cancle" :types="3"></goodsitem>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
import topback from '../../../components/topback/topback.vue';
import tabbar from '../../../components/tabbar/tabbar.vue';
import goodsitem from '../../../components/goodsitem/goodsitem';

export default {
	data() {
		return {
			showindex: 0,
			tabbarlist: ['全部', '待确认', '已完成', '已取消'],
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
				}
			]
		};
	},
	methods: {
		tonav(index) {
			this.showindex = index;
			console.log(index, 'index');
		},
		toaddgoods() {
			uni.navigateTo({
				url: '../addgoods/addgoods'
			});
		},
		tomain(item, index) {
			// if (item.type == 2) {
			// 	uni.navigateTo({
			// 		url: '../curreturngoods/curreturngoods'
			// 	});
			// } else 
			if (item.type == 0) {
				uni.navigateTo({
					url: '../returngoodsmain/returngoodsmain?type=0'
				});
			} else if (item.type == 1) {
				uni.navigateTo({
					url: '../returngoodsmain/returngoodsmain?type=1'
				});
			} else if (item.type == 2) {
				uni.navigateTo({
					url: '../returngoodsmain/returngoodsmain?type=2'
				});
			}
		},
		cancle(val) {
			console.log(val, 's');
		}
	},
	components: { topback, tabbar, goodsitem }
};
</script>

<style lang="less" scoped>
.salesmng {
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
	.top {
		width: 100%;
		height: 100rpx;
		background: #2d8cf0;
		position: absolute;
		top: 0;
		left: 0;
		z-index: 1111111;
		display: flex;
		justify-content: space-around;
		align-items: center;
		input {
			box-sizing: border-box;
			position: absolute;
			top: 50%;
			transform: translateY(-50%);
			right: 20rpx;
			background: #ffffff;
			width: 70%;
			height: 55rpx;
			border-radius: 25rpx;
			padding: 0 25rpx;
			color: #b7b7b7;
			font-size: 24rpx;
		}
	}
}
.content {
	box-sizing: border-box;
	padding: 120rpx 30rpx 30rpx 30rpx;
	.salelist {
		width: 100%;
		.saleli {
			box-sizing: border-box;
			padding: 25rpx 15rpx;
			background: #ffffff;
			margin: 25rpx 0;
		}
	}
}
</style>
