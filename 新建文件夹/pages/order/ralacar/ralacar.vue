item.km
<template>
	<view class="customer">
		<view class="headertop" v-if="origin == 'wer'">
			<topback :topback="'车辆'" :type="'one'" :isleft="true" :isbule="true" :isaddpic="false" @change="topchange"></topback>
		</view>
		<view class="headertop" v-if="origin == 'order'"><topback :topback="'关联车辆'" :type="'two'" :iscenter="true" :isbule="true" :iswhite="true"></topback></view>
		<view class="titles"  v-if="origin == 'order'">该用户已关联以下车辆,点击添加</view>
		<view class="cuslist">
			<view class="infos" v-for="(item, index) in cuslist" :key='item.carId' @click="tocuritem(item,index)">
				<image :src="'https://kfbnet2019.obs.cn-north-1.myhuaweicloud.com/brandImage/' + item.carModelsNameTwo + '.png'" mode=""></image>
				<view class="i-left">
					<view class="shopname">{{ item.carModelsName }}</view>
					<view class="carinfo">
						<text class="carnum">{{ item.carName }}</text>
						<text class="km">{{ item.carLastMaintenanceMileage }} KM</text>
					</view>
				</view>
			</view>
		</view>
		<view class="addcus">跳过</view>
	</view>
</template>

<script>
import cusitem from '../../../components/listvertical/listvertical.vue';
import topback from '../../../components/topback/topback.vue';
import { mapState, mapMutations } from 'vuex';
export default {
	data() {
		return {
			cuslist: [],
			searchKeywords: '',
			orderDriverUserId: '',
			origin: '',
			copyorder:[]
		};
	},
	onLoad(val) {
		this.orderDriverUserId = val.driverId;

		if (val.from == 'order') {
			this.origin = 'order';
			
			
			if (!this.orderinfo) {
				uni.showToast({
					icon: 'none',
					title: '暂无数据，请重新选择'
				});
				setTimeout(function() {
					uni.navigateTo({
						url: '../ordermain/ordermain'
					});
				}, 800);
			} else {
				
				let data = {
					storeId: uni.getStorageSync('shopid'),
					driverId: this.orderDriverUserId,
					pageNum: 1,
					pageSize: 10
				};
				console.log(val);
				this.requst(data);
				this.copyorder = this.orderinfo;
			}
			
		}
	},
	computed: {
		...mapState(['orderinfo'])
	},
	methods: {
		requst(data) {
			this.$request('/organization/driver/user/car/withPagingList', data, 'get', uni.getStorageSync('atrztion'), 'application/json').then(res => {
				console.log(res);
				this.cuslist = res.datas;
			});
		},
		requstsearch(data) {
			this.$request('/organization/driver/order/user/car/withPagingList', data, 'POST', uni.getStorageSync('atrztion'), '').then(res => {
				console.log(res);
				this.cuslist = res.datas;
			});
		},
		
		tocuritem(item, index) {
			var that=this
			console.log(index, item, 'e');
			console.log(this.copyorder,'ad');
			// uni.navigateTo({ url: '../cusmain/cusmain' });
			uni.showModal({
			    title: '提示',
			    content: '确定选择此车辆吗',
			    success: function (res) {
			        if (res.confirm) {
						let data={
							carMileage:item.carLastMaintenanceMileage,
							carModelsNameTwo:item.carModelsNameTwo,
							driverUserId :that.orderDriverUserId,
							orderId:that.copyorder.orderId, //订单ID
							storeId:that.copyorder.storeId, //门店Id
							carPlateNumber :item.carPlateNumber,//车牌号
							carModels:item.carModelsId,// 车型
							carModelsName :item.carModelsName//车型显示名称
						}
						console.log(data,item);
						that.$request('/order/store/order/driver/car/update', data, 'put', uni.getStorageSync('atrztion'), 'application/json').then(res => {
							console.log(res);
							if(res.kfbCode=='200'){
								uni.showToast({
									title:'添加成功'
								})
								setTimeout(function() {
									uni.navigateTo({
										url: '../ordermain/ordermain'
									});
								}, 500);
							}else{
								uni.showToast({
									icon:'none',
									title:'添加失败'
								})
								// setTimeout(function() {
								// 	uni.navigateTo({
								// 		url: '../ordermain/ordermain'
								// 	});
								// }, 500);
							}
						});
						
						
						
			        } else if (res.cancel) {
			            uni.showToast({
			            	icon:'none',
							title:'取消操作'
			            })
			        }
			    }
			});
			
		},
		topchange(e, type) {
			if (type == 'search') {
				let data = {
					storeId: uni.getStorageSync('shopid'),
					searchKeywords: e,
					pageNum: 1,
					pageSize: 10
				};
				this.requstsearch(data);
			}
		}
	},
	components: { cusitem, topback }
};
</script>

<style lang="less" scoped>
.customer {
	width: 100%;
	height: 100%;
	position: relative;
	box-sizing: border-box;
	padding: 100rpx 0rpx;
	.headertop {
		background: #2d8cf0;
		position: fixed;
		width: 100%;
		height: 100rpx;
		z-index: 111;
		top: 0;
		left: 0;
	}
	.titles{
		color: #666666;
		font-size: 28rpx;
		box-sizing: border-box;
		padding: 40rpx 20rpx 0 20rpx ;
	}
	.cuslist {
		width: 100%;
		box-sizing: border-box;
		padding: 20rpx 20rpx;
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
					font-size: 28rpx;
					color: #666666;
					text {
						width: 45%;
					}
				}
			}
		}
	}
	.addcus {
		width: 80%;
		height: 100rpx;
		background: #2d8cf0;
		text-align: center;
		line-height: 100rpx;
		color: #ffffff;
		position: fixed;
		bottom: 20rpx;
		left: 50%;
		transform: translateX(-50%);
		box-shadow: 0px 4px 6px 0px rgba(250, 250, 250, 0.6);
	}
}
</style>
