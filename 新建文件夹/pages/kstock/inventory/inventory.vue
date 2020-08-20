<template>
	<view class="addcar">
		<view class="top"><topback :type="'two'" :topback="'盘点库存'" :iscenter="true" :iswhite="true" @change="tobacks"></topback></view>
		<view class="content">
			<view class="infos">
				<view class="text">当前库存</view>
				<input type="text" value="" :placeholder="inventory" v-model="inventory" />
			</view>
			<view class="addnote" @click="isnode = !isnode">添加备注说明</view>
			<view class="toaddnote" v-if="isnode">
				添加备注
				<textarea value="" placeholder="备注" v-model="note" />
			</view>
			<view class="save" @click="save">保存</view>
		</view>
	</view>
</template>

<script>
let a = uni.getStorageSync('inventory');
import topback from '../../../components/topback/topback.vue';
export default {
	data() {
		return {
			isnode: true,
			storeId: '',
			authorization: '',
			storeGoodsId: '',
			inventory: '',
			note:'',
		};
	},
	onLoad(val) {
		this.storeId = uni.getStorageSync('shopid');
		this.authorization = uni.getStorageSync('atrztion');
		this.storeGoodsId = val.storeGoodsId;
		this.inventory = val.inventory;
	},
	methods: {
		save() {
			if(this.note==''){
				uni.showToast({
					icon: 'none',
					title: '请填写备注'
				});
			}else{
				let data={
					inventory:this.inventory ,
					storeGoodsId :this.storeGoodsId,
					remark:this.note
				}
				this.send(data)
			}
		},
		send(data) {
			this.$request('/goods/store/goods/inventory/update', data, 'put', this.authorization,'application/json').then(res => {
				if (res.kfbCode == 200) {
					uni.showToast({
						title: '编辑成功'
					});
					setTimeout(function() {
						uni.switchTab({
							url:'../kgoodds/kgoodds'
						})
					}, 500);
				} else {
					uni.showToast({
						icon: 'none',
						title: res.kfbCode + res.kfbErrorMsg
					});
				}
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
		padding: 0rpx 30rpx;
		.infos {
			border-bottom: 1rpx solid #e5e5e5;
			.text {
				font-size: 28rpx;
				color: #282828;
			}
			input {
				box-sizing: border-box;
				font-size: 60rpx;
				color: #282828;
			}
		}
		.addnote {
			font-size: 28rpx;
			color: #2d8cf0;
			text-align: right;
			padding-top: 30rpx;
		}
		.toaddnote {
			border-bottom: 1rpx solid #e5e5e5;
			font-size: 28rpx;
			color: #282828;
			margin: 20px 0 50rpx 0;
			textarea {
				width: 100%;
				box-sizing: border-box;
				padding: 15rpx 0rpx;
				font-size: 32rpx;
				color: #282828;
			}
		}
		.save {
			margin-top: 250rpx;
			width: 100%;
			height: 80rpx;
			background: #2d8cf0;
			text-align: center;
			line-height: 80rpx;
			color: #ffffff;
		}
	}
}
</style>
