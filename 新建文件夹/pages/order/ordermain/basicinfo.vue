<template>
	<view class="basicinfo">
		<!-- 选择客户 -->
		<view class="infos" v-if="online==false || infos.orderContactsPerson">
			<image src="../../../static/images/kfb.png" mode=""></image>
			<view class="i-left">
				<view class="shopname">{{ infos.orderDriverUserName }}</view>
				<view class="names">
					<text class="name">{{ infos.orderContactsPerson }}</text>
					<text class="tel">{{ infos.orderContactsPhone }}</text>
				</view>
				<view class="adress">
					<text class="text">地址:</text>
					<text class="main">暂无地址</text>
				</view>
			</view>
		</view>
		<view class="addcar" v-else @click="tocus">
			<text class="text">选择客户</text>
			<image src="../../../static/images/add.png" mode=""></image>
		</view>
		<!-- 选择车辆 -->
		<view class="infos" v-if=" online==false|| infos.orderModelsName ">
			<image :src="carpic + infos.orderModelsNameTwo + '.png'" mode=""></image>
			<view class="i-left">
				<view class="shopname">{{ infos.orderModelsName }}</view>
				<view class="carinfo">
					<text class="carnum">{{ infos.orderDriverUserCarPlateNumber }}</text>
					<text class="km">{{ infos.orderMileage }}KM</text>
				</view>
			</view>
		</view>
		<view class="addcar" v-else @click="toralacar">
			<text class="text">选择车辆</text>
			<image src="../../../static/images/add.png" mode=""></image>
		</view>
		<!-- 故障描述 -->
		<view class="fault">
			<view class="km">
				<text>当前里程数</text>
				<text>{{ infos.orderMileage }}km</text>
			</view>
			<view class="f-desc">
				<text>故障描述</text>
				<input type="text" v-if="infos.orderStatus==1 " value="" v-model="gzdes" placeholder="点击填写（不超过30字）" />
				<view class="des" v-else>{{ infos.orderFaultDescription }}</view>

			</view>
			<view class="addpic" v-if="infos.orderStatus==1 ">
				<!-- <input type="file" accept="image/*" value="" /> -->
				<view class="box" v-for="(item, index) in infos.orderFaultImage" :key="index">
					<image class="img" :src="'https://kfbnet2019.obs.cn-north-1.myhuaweicloud.com/orderFaultImage/' + item.imageUrl"
					 mode=""></image>
				</view>
				<image class="img" @click="addpics" src="../../../static/images/addpic@2x.png" mode=""></image>
			</view>
			<view class="addpic" v-else>
				<view class="box" v-for="(item, index) in infos.orderFaultImage" :key="index">
					<image class="img" :src="fautpic + item.imageUrl" mode=""></image>
				</view>
			</view>
		</view>
		<view class="logistics">
			<view class="iptbox">
				<view class="text">负责人</view>
				<view class="input" @click="tochangefzr('pickerfzr')">
					<text v-if="nofzr==true">{{fzr}}</text>
					<view v-else class="">
						<text v-for="(item,index) in infos.orderResponsible">{{item.orderResponsibleName}}</text>
					</view>
				</view>
				<image v-if="online == true" @click="tochangefzr('pickerfzr')" class="more" src="../../../static/images/icon_shangla@2x.png"
				 mode=""></image>
				<LbPicker ref="pickerfzr" mode="selector" v-model="fzr" :list="fzrlist" @change="handleChange" @cancel="handleCancel"
				 @confirm="Confirmfzr">></LbPicker>
			</view>
			<view class="iptbox">
				<view class="text">实际工单时间</view>
				<view class="input">{{ infos.orderAddTimeStr }}</view>
				<image v-if="online == true" @click="tochangesjtime('sjtime')" class="more" src="../../../static/images/icon_shangla@2x.png"
				 mode=""></image>
			</view>
			<view class="iptbox last">
				<view class="text">预计完成时间</view>
				<view class="input">{{ infos.orderEstimatedFinishTimeStr }}</view>
				<image v-if="infos.orderStatus==1" class="more" src="../../../static/images/icon_shangla@2x.png" mode=""></image>
			</view>

		</view>
		<view class="logistics">
			<view class="iptbox">
				<view class="text">开单人</view>
				<view class="input">{{ infos.addUserName }}</view>
			</view>
			<view class="iptbox last">
				<view class="text">开单时间</view>
				<view class="input">{{ infos.orderAddTimeStr }}</view>
			</view>

		</view>
		<view class="tobtn" v-if="infos.orderStatus==1">
			<view class="price">{{ infos.orderTotalAmount }}</view>
			<view class="btnitem">取消订单</view>
			<view class="btnitem">结算</view>
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
	import uploadImg from '../../../components/amazarashi-uploadimg/uploadImg.vue';
	import confirms from '../../../components/confirmbox/confirmbox.vue';
	import LbPicker from '../../../components/lb-picker/index.vue';
	import minpicker from '../../../components/min-picker/min-picker.vue';
	import minpopup from '../../../components/min-picker/min-popup.vue';

	export default {
		data() {
			return {
				basicinfos: [],
				nofzr: true,
				online: '',
				startTimes: [2010, 6, 1],
				endTime: 2046,
				show1: false,
				goodsinfo: [],
				origin: '',
				headnum: {},
				servlist: [],
				pjlist: [],
				authorization: '',
				orderid: '',
				shopid: '',
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
				gzdes: '', //故障描述
				fzr: '暂无负责人',
				fzrlist: []
			};
		},
		computed: {
			...mapState(['orderinfo', 'serverlist']),
		},
		onLoad(options) {

		},
		created() {
			let datas = uni.getStorageSync('ordermaininfo');
			this.authorization = uni.getStorageSync('atrztion');
			this.shopid = uni.getStorageSync('shopid');
			this.orderid = datas.orderId;
			console.log(datas, 'datas');
			if (datas.orderStatus == 1) {
				this.online = true;
				this.requestfzr();
			} else if (datas.orderStatus == 2 || datas.orderStatus == 3) {
				this.online = false
				this.requestfzr();
			}
			console.log(this.online, 'online');
		},
		mounted() {},
		methods: {
			...mapMutations(['SET_ORDERINFO', 'SET_SERVERLIST']),
			// 跳转至客户列表

			tocus() {
				uni.navigateTo({
					url: '../../stores/customer/customer?from=order'
				});
			},
			// 关联车辆
			toralacar() {
				uni.navigateTo({
					url: '../ralacar/ralacar?driverId=' + this.orderinfo.orderDriverUserId + '&from=order'
				});
			},
			// 上传图片
			addpics() {
				console.log(1);
				uni.chooseImage({
					count: 1,
					success: res => {
						this.piclist = res.tempFilePaths;
						console.log(res);

						uni.uploadFile({
							url: 'http://114.116.28.111:8084/system/file/upload',
							filePath: res.tempFilePaths[0],
							name: 'file',
							formData: {
								// 'file':res.tempFilePaths[0],
								fileStorageFolder: 'orderFaultImage'
							},
							header: {
								authorization: this.authorization,
								'Content-Type': 'multipart/form-data'
							},
							success: function(uploadFileRes) {
								console.log(uploadFileRes.data);
							}
						});
					}
				});
				// console.log(this.piclist);
				// uni.uploadFile({
				// 	url:this.$baseUrl+'/system/file/upload', //仅为示例，非真实的接口地址
				// 	files: [],

				// 	success: res => {
				// 		console.log(res);
				// 	}
				// });
			},

			// 显示负责人
			tochangefzr(name) {
				var that = this;
				setTimeout(function() {
					that.$refs[name].show();
				}, 200);
			},
			// 请求负责人
			requestfzr() {
				var that = this;
				this.$request('/organization/user/store/staff/withPagingList', {
					storeId: this.shopid,
					userStatus: 1
				}, 'post', this.authorization, '').then(res => {
					for (var i = 0, length = res.datas.length; i < length; i++) {
						let obj = {};
						(obj.label = res.datas[i].userName), (obj.value = res.datas[i].userId);
						that.fzrlist.push(obj);
					}
				});
			},
			handleChange(item) {},
			handleCancel(item) {

			},
			// 修改工单负责人和完成时间
			changeorderbasic(data) {
				this.$request('/order/store/order/update', data, 'PUT', this.authorization, 'application/json').then(res => {
					console.log(res);
					if (res.kfbCode == '200') {
						uni.showToast({
							title: '修改成功'
						});
					} else {
						uni.showToast({
							icon: 'none',
							title: '修改失败'
						});
					}
				});
			},
			//选择负责人
			Confirmfzr(item) {
				if (this.nofzr == true) {
					this.fzr = item.item.label;
				} else {
					this.infos.orderResponsible[0].orderResponsibleName = item.item.label;
				}
				let data = {
					storeId: this.shopid,
					orderId: this.orderid,
					listResponsible: [{
						userId: item.item.value,
						userName: item.item.label
					}]
				};
				this.changeorderbasic(data);
			},
			// 显示实际工单时间
			tochangesjtime(name) {
				this.show1 = true;

			},


		},
		filters: {
			showPrice(price) {
				return '￥' + price.toFixed(2);
			}
		},
		components: {
			confirms,
			minpopup,
			minpicker,
			topback,
			tabbar,
			uploadImg,
			LbPicker
		},
		watch: {
			infos(val) {
				this.basicinfos = val
				if (val.orderResponsible.length == 0) {
					this.nofzr = true
				} else {
					this.nofzr = false
				}
			}
		},
		props: ['infos']
	}
</script>

<style lang="less" scoped>
	// 服务配件
	.fj-fw {
		box-sizing: border-box;
		padding: 30rpx 30rpx 150rpx 30rpx;

		.contents {
			box-sizing: border-box;
			padding: 15rpx 15rpx;
			background: #ffffff;
			margin-bottom: 30rpx;

			.title {
				display: flex;
				justify-content: space-between;
				align-items: center;
				box-sizing: border-box;
				padding: 15rpx 15rpx;
				font-size: 32rpx;
				color: #333333;
				border-bottom: 1rpx solid #e5e5e5;

				.addsevr {
					width: 200rpx;
					height: 60rpx;
					border: 1rpx solid #2d8cf0;
					border-radius: 30rpx;
					color: #2d8cf0;
					text-align: center;
					line-height: 60rpx;
				}
			}

			.minfos {
				font-size: 24rpx;
				color: #999999;
				display: flex;
				box-sizing: border-box;
				align-items: center;
				padding-top: 20rpx;

				.type {
					width: 150rpx;
					border-radius: 5rpx;
					height: 40rpx;
					line-height: 40rpx;
					text-align: center;
					margin-right: 20rpx;
				}

				.kfb {
					color: #ffa928;
					border: 1rpx solid #ffa928;
				}

				.md {
					color: #fa8364;
					border: 1rpx solid #fa8364;
				}
			}

			.servlist {
				box-sizing: border-box;
				padding: 30rpx 0rpx 0 0;

				.servli {
					background: #f7f7f7;
					margin-bottom: 20rpx;
					box-sizing: border-box;
					padding: 15rpx 15rpx;
					position: relative;

					.name {
						width: 100%;
						font-size: 28rpx;
						color: #333333;

						image {
							width: 60rpx;
							height: 63rpx;
							position: absolute;
							right: 0;
							top: 0;
						}
					}

					.accoutbox {
						display: flex;
						justify-content: space-between;
						align-items: center;
						box-sizing: border-box;
						padding: 20rpx 0;

						.accout {
							display: flex;
							justify-content: space-between;
							align-items: center;
							width: 30%;
							color: #999999;
							font-size: 26rpx;

							.cs {
								background: #e5e5e5;
								width: 40%;
								text-align: center;
								font-size: 24rpx;
								padding: 5rpx 0;
							}

							.btns {
								font-size: 40rpx;
							}
						}

						.price {
							width: 60%;

							color: #333333;
							font-size: 32rpx;
							display: flex;
							justify-content: space-between;
							align-items: center;

							input {
								width: 90%;
								color: #333333;
								font-size: 32rpx;
								text-align: right;
							}

							image {
								padding-left: 20rpx;
								width: 12rpx;
								height: 21rpx;
							}
						}
					}
				}
			}

			.changetype {
				border-bottom: 1rpx solid #e5e5e5;
				color: #999999;
				font-size: 26rpx;
				display: flex;
				justify-content: space-between;
				align-items: center;

				switch {
					transform: scale(0.5, 0.5);
				}
			}

			.allprice {
				display: flex;
				justify-content: space-between;
				align-items: center;
				box-sizing: border-box;
				padding: 20rpx 0 10rpx 0;

				.xj {
					font-size: 26rpx;
					color: #999999;

					text {
						font-size: 32rpx;
						color: #333333;
					}
				}

				image {
					width: 11rpx;
					height: 21rpx;
				}
			}
		}
	}

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
		position: relative;

		.top {
			width: 100%;
			height: 300rpx;
			background: #4d9df2;
			// position: fixed;
			// top: 0;
			// left: 0;
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

					.box {
						width: 31%;
					}

					.img {
						width: 100%;
						height: 200rpx;
						margin-bottom: 30rpx;
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
</style>
