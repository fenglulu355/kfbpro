<template>
	<view class="addcar">
		<view class="top"><topback :type="'two'" :topback="'商品详情'" :iscenter="true" :iswhite="true" @change="tobacks"></topback></view>
		<view class="content">
			<view class="basic box senior">
				<view class="title">
					<text>固有属性</text>
					<view class="edit">
						<text v-if="editgy == true" @click="toeditgy">编辑</text>
						<text v-if="editgy == false" @click="tosavegy">保存</text>
						<image src="../../../static/images/icon_shangla@2x.png" mode=""></image>
					</view>
				</view>
				<view class="iptmain">
					<view class="iptbox  addpic">
						<view class="text">商品图片</view>
						<!-- <input type="text" value="" placeholder="点击填写" /> -->
						<view class="addipt"><image :src="product + infos.goodsImage" mode=""></image></view>
					</view>

					<view class="iptbox">
						<view class="text">
							商品名称
							<text v-if="editgy == false">*</text>
						</view>
						<view class="input">{{ infos.goodsName }}</view>
					</view>

					<view class="iptbox">
						<view class="text">
							编号
							<text v-if="editgy == false">*</text>
						</view>
						<view class="input">{{ infos.goodsCode }}</view>
					</view>
					<view class="iptbox">
						<view class="text">副名称</view>
						<view class="input">{{ infos.goodsNickName }}</view>
					</view>
					<view class="iptbox last more" v-if="showgymore == false">
						<view class="text" @click="showgymore = true">
							更多信息
							<image src="../../../static/images/icon_xiala@2x.png" mode=""></image>
						</view>
					</view>
				</view>
				<view class="iptmain" v-if="showgymore == true">
					<view class="iptbox">
						<view class="text">商品类型</view>
						<view class="input">{{ infos.goodsType == 1 ? '线上商品' : '线下商品' }}</view>
					</view>

					<view class="iptbox">
						<view class="text">品牌</view>
						<view class="input">{{ infos.goodsBrand }}</view>
					</view>
					<view class="iptbox">
						<view class="text">配套车型</view>
						<view class="input">{{ infos.storeGoodsMatchingModels }}</view>
					</view>
					<view class="iptbox">
						<view class="text">规格</view>
						<view class="input">{{ infos.goodsStandard }}</view>
					</view>
					<view class="iptbox">
						<view class="text">单位</view>
						<view class="input">{{ infos.goodsUnit }}</view>
					</view>
					<view class="iptbox">
						<view class="text">主机图号</view>
						<view class="input">{{ infos.storeGoodsHostChartNumber }}</view>
					</view>
					<view class="iptbox">
						<view class="text">产地</view>
						<view class="input">{{ infos.storeGoodsOriginAddress }}</view>
					</view>
					<view class="iptbox last">
						<view class="text">维保期</view>
						<view class="input">{{ infos.goodsWarrantyPeriod }}</view>
					</view>
				</view>
			</view>
			<view class="senior box">
				<view class="title">
					<text>动态属性</text>
					<text class="edit">
						编辑
						<image src="../../../static/images/icon_shangla@2x.png" mode=""></image>
					</text>
				</view>
				<view class="iptmain">
					<view class="iptbox">
						<view class="text">成本</view>
						<view class="input">{{ infos.storeGoodsCostPrice }}</view>
					</view>
					<view class="iptbox">
						<view class="text">售价</view>
						<view class="input">{{ infos.storeGoodsSalePrice }}</view>
					</view>

					<view class="iptbox">
						<view class="text">库存</view>
						<view class="input">{{ infos.storeGoodsInventory }}</view>
					</view>
					<view class="iptbox">
						<view class="text">库存预警值</view>
						<view class="input">{{ infos.storeGoodsWarningInventory }}</view>
					</view>
					<view class="iptbox">
						<view class="text">分组</view>
						<view class="input">{{ infos.goodsGroupName }}</view>
					</view>
					<view class="iptbox last" @click="tostockchange">
						<view class="text">库存变更记录</view>
						<input type="text" value="" placeholder="点击查看 >" />
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
import topback from '../../../components/topback/topback.vue';
export default {
	data() {
		return {
			editgy: true,
			editdt: false,
			storeId: '',
			authorization: '',
			storeGoodsId: '',
			infos: '',
			showgymore: false,
			goodsBrand: '',
			goodsCode: '',
			goodsName: '',
			goodsNickName: '',
			goodsType: '',
			storeGoodsMatchingModels: '',
			goodsStandard: '',
			goodsUnit: '',
			storeGoodsHostChartNumber: '',
			storeGoodsOriginAddress: '',
			goodsWarrantyPeriod: '',
			storeGoodsCostPrice: '',
			storeGoodsSalePrice: '',
			storeGoodsInventory: '',
			storeGoodsWarningInventory: '',
			goodsGroupName: ''
		};
	},
	onLoad(val) {
		console.log(val);
		this.storeId = uni.getStorageSync('shopid');
		this.authorization = uni.getStorageSync('atrztion');
		this.storeGoodsId = val.storeGoodsId;
		this.request();
	},
	methods: {
		tobacks(e) {
			console.log(e);
			if (e == 'back') {
				uni.switchTab({
					url: '../kgoodds/kgoodds'
				});
			}
		},

		// 编辑固有属性
		toeditgy() {
			uni.showModal({
				title: '提示',
				content: '确定要编辑固有属性吗',
				success: function(res) {
					if (res.confirm) {
						uni.navigateTo({
							url: '../editattr/editattr?from=gy'
						});
					} else if (res.cancel) {
						uni.showToast({
							icon: 'none',
							title: '取消操作'
						});
					}
				}
			});

			// this.showgymore = true;
			// this.editgy = false;
		},
		// 保存固有属性
		tosavegy() {
			this.editgy = true;
			this.showgymore = false;
			let data = {
				storeGoodsId: this.storeGoodsId,
				storeGoodsName: this.goodsName,
				storeGoodsCode: this.goodsCode,
				storeGoodsNickName: this.goodsNickName,
				storeGoodsMatchingModelsName: this.storeGoodsMatchingModels,
				storeGoodsOriginAddressName: this.storeGoodsOriginAddress,
				storeGoodsBrandName: this.goodsBrand,
				goodsStandardName: this.goodsStandard,
				storeGoodsWarrantyPeriod: this.goodsWarrantyPeriod,
				storeGoodsHostChartNumber: this.storeGoodsHostChartNumber
			};
			console.log(data);
		},
		request() {
			this.$request('/goods/store/goods/infobypk/' + this.storeGoodsId, '', 'get', this.authorization).then(res => {
				this.infos = res.datas;
				this.goodsBrand = this.infos.goodsBrand;
				this.goodsCode = this.infos.goodsCode;
				this.goodsName = this.infos.goodsName;
				this.goodsNickName = this.infos.goodsNickName;
				this.goodsType = this.infos.goodsType;
				this.storeGoodsMatchingModels = this.infos.storeGoodsMatchingModels;
				this.goodsStandard = this.infos.goodsStandard;
				this.goodsUnit = this.infos.goodsUnit;
				this.storeGoodsHostChartNumber = this.infos.storeGoodsHostChartNumber;
				this.storeGoodsOriginAddress = this.infos.storeGoodsOriginAddress;
				this.goodsWarrantyPeriod = this.infos.goodsWarrantyPeriod;
				this.storeGoodsCostPrice = this.infos.storeGoodsCostPrice;
				this.storeGoodsSalePrice = this.infos.storeGoodsSalePrice;
				this.storeGoodsInventory = this.infos.storeGoodsInventory;
				this.storeGoodsWarningInventory = this.infos.storeGoodsWarningInventory;
				this.goodsGroupName = this.infos.goodsGroupName;
				console.log(res.datas);
			});
		},
		tostockchange() {
			uni.navigateTo({
				url: '../stockchange/stockchange?storeGoodsId=' + this.storeGoodsId
			});
		}
	},
	components: { topback }
};
</script>

<style lang="less" scoped>
.addcar {
	width: 100%;
	background: #fafafa;
	position: relative;
	box-sizing: border-box;
	padding-top: 120rpx;
	.top {
		width: 100%;
		height: 100rpx;
		background: #2d8cf0;
		position: fixed;
		top: 0;
		left: 0;
		z-index: 1111111;
	}
	.content {
		width: 100%;
		box-sizing: border-box;
		padding: 36rpx 30rpx;
		.box {
			border-radius: 5px 5px 0px 0px;
			box-shadow: 0px 4px 8px 0px rgba(250, 250, 250, 0.2);
			margin-bottom: 30rpx;
		}
		.title {
			font-size: 32rpx;
			color: #282828;
			line-height: 80rpx;
		}
		.iptmain {
			background: #ffffff;
			box-sizing: border-box;
			padding: 0rpx 15rpx;
		}
		.addpic {
			.text {
				align-self: center;
			}
			image {
				width: 86rpx;
				height: 86rpx;
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
				font-size: 28rpx;
				text {
					color: #e23a3a;
				}
			}
			input,
			.input {
				// background: #007AFF;
				width: 70%;
				font-size: 26rpx;
				color: #999999;
				text-align: right;
			}
		}
		.last {
			border: none;
		}
		.save {
			width: 100%;
			height: 80rpx;
			background: #2d8cf0;
			text-align: center;
			line-height: 80rpx;
			color: #ffffff;
		}
	}
}

.more {
	.text {
		margin: 0 auto;
	}
	image {
		margin-left: 20rpx;
		position: relative;
		bottom: 5rpx;
		width: 21rpx;
		height: 11rpx;
	}
}
.senior {
	.title {
		display: flex;
		justify-content: space-between;
		.edit {
			color: #999999;
			font-size: 28rpx;
			image {
				margin-left: 20rpx;
				// position: relative;
				// bottom: 5rpx;
				width: 11rpx;
				height: 21rpx;
			}
		}
	}
}
</style>
