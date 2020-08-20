<template>
	<view class="fj-fw">
		<!-- 进行中状态 -->
		<view class="fwbox contents" v-if="orderStatus==1">
			<view class="title">
				<text>服务项目</text>
				<view class="addsevr" @click="toaddpro('server')">添加服务</view>
			</view>
			<view class="servlist">
				<view class="servli" v-for="(item, index) in servlist" :key="item.serviceId">
					<view class="name">
						<text>{{ item.itemName }}</text>
						<image @click="delpro('server', index)" src="../../../static/images/del.png" mode=""></image>
					</view>
					<view class="accoutbox">
						<view class="accout">
							<view class="btns" @click="decrement(item, index,'server')">-</view>
							<view class="cs">{{ item.itemNumber }}</view>
							<view class="btns" @click="increment(item, index,'server')">+</view>
							<!-- {{ item.serviceUnit }} -->
						</view>
						<view class="price">
							<input type="text" :disabled="serchecked" value="" v-model="item.itemUnitPrice" />
							<image src="../../../static/images/icon_shangla@2x.png" mode=""></image>
						</view>
					</view>
				</view>
			</view>
			<view class="changetype">
				<text>分开结算/同一结算</text>
				<switch :checked="serchecked" @change="changeserv" />
			</view>
			<view class="allprice">
				<view class="xj">
					小计：
					<text v-if="fwtotals == 0">{{ fwtotal | showPrice }}</text>
					<text v-else>{{ fwtotals | showPrice }}</text>
				</view>
				<image @click="tochangezj('server')" src="../../../static/images/icon_shangla@2x.png" mode=""></image>
				<confirms :title="'修改总价'" :isshow="isservconfim" @change="changesevzj"></confirms>
			</view>
		</view>
		<view class="pjcl contents" v-if="orderStatus==1">
			<view class="title">
				<text>配件材料</text>
				<view class="addsevr" @click="toaddpro('pj')">添加配件</view>
			</view>
			<view class="servlist pjlist">
				<view class="servli" v-for="(item, index) in pjlistbox" :key="index">
					<view class="name">
						<text>{{ item.itemName }}</text>
						<image @click="delpro('pj',index)" src="../../../static/images/del.png" mode=""></image>
					</view>
					<view class="minfos">
						<view class="type kfb" v-if="item.goodsType == 1">卡服邦平台</view>
						<view class="type md" v-if="item.goodsType == 2">门店自有</view>
						<text>{{ item.goodsCode }}</text>
					</view>
					<view class="accoutbox">
						<view class="accout">
							<view class="btns" @click="decrement(item, index,'pj')">-</view>
							<view class="cs">{{ item.itemNumber }}</view>
							<view class="btns" @click="increment(item, index,'pj')">+</view>
							<!-- 次 -->
						</view>
						<view class="price">
							<input type="text" :disabled="pjchecked" value="" v-model="item.itemUnitPrice" />
							<image src="../../../static/images/icon_shangla@2x.png" mode=""></image>
						</view>
					</view>
				</view>
			</view>
			<view class="changetype">
				<text>分开结算/同一结算</text>
				<switch :checked="pjchecked" @change="changepj" />
			</view>
			<view class="allprice">
				<view class="xj">
					小计：
					<text v-if="pjtotals == 0">{{ pjtotal | showPrice }}</text>
					<text v-else>{{ pjtotals | showPrice }}</text>
				</view>
				<image @click="tochangezj('pj')" src="../../../static/images/icon_shangla@2x.png" mode=""></image>
				<confirms :title="'修改配件总价'" :isshow="ispjconfim" @change="changepjzj"></confirms>
			</view>
		</view>
		<!-- 已结清 -->
		<view class="yjq contents" v-if="orderStatus==2||orderStatus==3">
			<view class="title">
				<text>服务项目</text>
			</view>
			<view class="servlist">
				<view class="servli" v-for="(item, index) in servlist" :key="item.serviceId">
					<view class="name">
						<text>{{ item.itemName }}</text>
					</view>
					<view class="accoutbox">
						<view class="accout">
							<view class="btns yjq">*{{ item.itemNumber }} {{item.itemUnit}}</view>
						</view>
						<view class="price pyjq">
							{{item.itemTotalAmount | showPrice}}
						</view>
					</view>
				</view>
			</view>
			<view class="allprice ayjq">
				<view class="xj">
					小计：
					<text>{{ infos.orderServiceItems.detailStageAmount | showPrice }}</text>
				</view>

			</view>
		</view>
		<view class="yjq contents" v-if="orderStatus==2||orderStatus==3">
			<view class="title">
				<text>配件材料</text>
			</view>
			<view class="servlist">
				<view class="servli" v-for="(item, index) in pjlistbox" :key="item.serviceId">
					<view class="name">
						<text>{{ item.itemName }}</text>
					</view>
					<view class="accoutbox">
						<view class="accout">
							<view class="btns yjq">*{{ item.itemNumber }} {{item.itemUnit}}</view>
						</view>
						<view class="price pyjq">
							{{item.itemTotalAmount | showPrice}}
						</view>
					</view>
				</view>
			</view>
			<view class="allprice ayjq">
				<view class="xj">
					小计：
					<text>{{ infos.orderReplacementParts.detailStageAmount | showPrice }}</text>
				</view>

			</view>
		</view>
		<view class="tobtn" v-if="showjs">
			<view class="price" v-show="fwtotals == 0 && pjtotals == 0">￥{{ pjtotal + fwtotal }}</view>
			<view class="price" v-show="fwtotals != 0 && pjtotals == 0">￥{{ pjtotal + fwtotals }}</view>
			<view class="price" v-show="fwtotals == 0 && pjtotals != 0">￥{{ pjtotals + fwtotal }}</view>
			<view class="price" v-show="fwtotals != 0 && pjtotals != 0">￥{{ pjtotals + fwtotals }}</view>
			<view class="btnitem" style="opacity: 0;"></view>
			<view class="btnitem" @click="tosendpf">结算</view>
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
				tabbarlist: ['基本信息', '配件与服务', '结算信息'],
				showindex: 0,
				servlist: [],
				pjlistbox: [],
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
				orderNodeStatus: null,
				showjs: false


			};
		},
		computed: {
			...mapState(['orderinfo', 'serverlist', 'pjlist']),
			fwtotal: {
				get: function() {
					return this.servlist.reduce((previousValue, item) =>
						previousValue + item.itemNumber * item.itemUnitPrice, 0);
				},
				set: function(a) {
					this.fwtotals = a;
				}
			},
			pjtotal: {
				get: function() {
					return this.pjlistbox.reduce((previousValue, item) => previousValue + item.itemNumber * item.itemUnitPrice, 0);
				},
				set: function(a) {
					this.pjtotals = a;
				}
			}
		},
		created() {
			this.servlist = this.orderinfo.orderServiceItems.projectDetails
			this.pjlistbox = this.orderinfo.orderReplacementParts.projectDetails
			this.orderStatus = this.orderinfo.orderStatus
			this.orderNodeStatus = this.orderinfo.orderNodeStatus
			let datas = uni.getStorageSync('ordermaininfo');
			this.authorization = uni.getStorageSync('atrztion');
			this.shopid = uni.getStorageSync('shopid');
			this.orderid = datas.orderId;
			if (this.orderStatus == 1) {
				this.showjs = true
			} else if (this.orderStatus == 2) {
				if (this.orderNodeStatus == 1) {
					this.showjs = true
				}
			}
		},
		mounted() {

		},
		methods: {
			...mapMutations(['SET_ORDERINFO', 'SET_SERVERLIST', 'SET_PJLIST']),
			// 数量-
			decrement(item, index, data) {

				if (data == 'server') {
					if (item.itemNumber <= 1) {
						uni.showToast({
							icon: 'none',
							title: '数量不能小于1'
						})
					} else {
						this.servlist[index].itemNumber --
							this.$set(this.servlist, index, this.servlist[index])
					}
				} else {
					if (item.cart_num <= 1) {
						uni.showToast({
							icon: 'none',
							title: '数量不能小于1'
						})
					} else {
						this.pjlistbox[index].cart_num--
						this.$set(this.pjlistbox, index, this.pjlistbox[index])
					}
				}

			},
			// 数量+
			increment(item, index, data) {
				if (data == 'server') {
					this.servlist[index].itemNumber++
					this.$set(this.servlist, index,
						this.servlist[index])

				} else {
					this.pjlistbox[index].cart_num++
					this.$set(this.pjlistbox, index, this.pjlistbox[index])
				}

			},
			// 跳转至添加项目
			toaddpro(data) {
				if (data == 'server') {
					this.infos.orderServiceItems.projectDetails.forEach(res => {
						this.SET_SERVERLIST(res)
					})
					setTimeout(function() {
						uni.navigateTo({
							url: '../../stores/service/service?from=order'
						});
					}, 500);
				} else {
					this.infos.orderReplacementParts.projectDetails.forEach(res => {
						this.SET_PJLIST(res)
					})
					setTimeout(function() {
						uni.navigateTo({
							url: '../addpj/addpj?origin=order'
						});
					}, 500);
				}

			},
			// 删除某一项项目
			delpro(from, index) {
				if (data == 'server') {
					this.servlist.splice(index, 1);
				} else {
					this.pjlist.splice(index, 1);
				}

			},
			// 显示修改总价框框
			tochangezj(data) {
				if (data == 'server') {
					if (this.serchecked == true) {
						this.isservconfim = true;
					} else {
						uni.showToast({
							icon: 'none',
							title: '请选择统一结算'
						});
					}
				} else {
					if (this.pjchecked == true) {
						this.ispjconfim = true;
					} else {
						uni.showToast({
							icon: 'none',
							title: '请选择统一结算'
						});
					}
				}

			},
			// 修改服务总价e
			changesevzj(e) {
				console.log(e, 'a');
				if (e == 'cancle') {
					this.isservconfim = false;
				} else {
					this.fwtotal = Number(e);
					this.isservconfim = false;
				}
			},
			// 是否统一结算服务
			changeserv(e) {
				this.serchecked = e.target.value;
				if (this.serchecked == false) {
					this.fwtotals = 0;
					this.sertype = 1;
				} else {
					this.sertype = 2;
				}
			},
			// 是否统一结算配件
			changepj(e) {
				this.pjchecked = e.target.value;
				if (this.pjchecked == false) {
					this.pjtotals = 0;
					this.pjtype = 1;
				} else {
					this.pjtype = 2;
				}
			},

			// 修改配件总价e
			changepjzj(e) {
				if (e == 'cancle') {
					this.ispjconfim = false;
				} else {
					this.pjtotal = Number(e);
					this.ispjconfim = false;
				}
			},
			// 结算配件和服务
			tosendpf() {
				this.accout();
			},
			// 结算函数
			accout() {
				let fwprice,
					pjprice,
					that = this;
				this.fwtotals == 0 ? (fwprice = this.fwtotal) : (fwprice = this.fwtotals);
				this.pjtotals == 0 ? (pjprice = this.pjtotal) : (pjprice = this.pjtotals);
				for (let i = 0, length = this.pjlistbox.length; i < length; i++) {
					delete this.pjlistbox[i].goodsCode;
					delete this.pjlistbox[i].goodsImage;
				}
				var fromData = {
					orderId: this.orderid, //订单id
					storeId: this.shopid,
					orderGoodsUpdateInfo: {
						detailStageAmountType: this.pjtype,
						orderGoodsItems: this.pjlistbox,
						detailStageAmount: pjprice
					},
					orderServiceUpdateInfo: {
						detailStageAmountType: this.sertype,
						orderServiceItems: this.servlist,
						detailStageAmount: fwprice
					}
				};
				console.log(fromData);
				this.$request('/order/store/order/goods/unite/update', fromData, 'put', this.authorization, 'application/json')
					.then(res => {
						console.log(res);
						if (res.kfbCode == '200') {
							uni.showToast({
								title: '保存成功'
							});
							setTimeout(function() {
								uni.navigateTo({
									url: '../collection/collection?orderid=' + that.orderid
								});
							}, 500);
						} else {
							uni.showToast({
								icon: 'none',
								title: 'code:' + res.kfbCode + res.kfbErrorMsg
							});
						}
					})
					.catch(res => {
						console.log(res, 'cath');
					});
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
			minpicker,
			topback,
			tabbar,
			uploadImg,
			LbPicker
		},
		watch: {
			infos(val) {
				console.log(val.orderServiceItems.projectDetails, 'val.orderServiceItems.projectDetails');
				let a = JSON.stringify(this.servlist),
					b = JSON.stringify(val.orderServiceItems.projectDetails)
				console.log(a == b, 'adsdadasd');

				if ((a == b) == false) {
					console.log('falsedw');
				}

				// this.pjlistbox = this.pjlist
				console.log(this.serverlist, ' this.serverlist');
				this.basicinfos = val
				console.log(this.servlist);
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

							.yjq {
								font-size: 32rpx;
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

						.pyjq {
							justify-content: flex-end;
							color: #2D8CF0;
							font-size: 32rpx;
							text-align: right;
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

			.ayjq {
				justify-content: flex-end;
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

					.img {
						width: 31%;
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
