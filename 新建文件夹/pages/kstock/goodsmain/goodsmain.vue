<template>
	<view class="addcar">
		<view class="top"><topback :type="'two'" :topback="'商品详情'" :iscenter="true" :iswhite="true" @change="tobacks"></topback></view>
		<view class="content">
			<view class="basic box">
				<view class="title">基本</view>
				<view class="iptmain">
					<view class="iptbox  addpic">
						<view class="text">商品图片</view>
						<!-- <input type="text" value="" placeholder="点击填写" /> -->
						<view class="addipt"><image src="../../../static/images/addpic.png" mode=""></image></view>
					</view>

					<view class="iptbox">
						<view class="text">商品名称</view>
						<input type="text" value="" placeholder="点击填写" />
					</view>

					<view class="iptbox">
						<view class="text">编号</view>
						<input type="text" value="" placeholder="请输入正确编号，添加后无法修改" />
					</view>
					<view class="iptbox">
						<view class="text">副名称</view>
						<input type="text" value="" placeholder="点击填写" />
					</view>
					<view class="iptbox last more">
						<view class="text">
							更多信息
							<image src="../../../static/images/icon_xiala@2x.png" mode=""></image>
						</view>
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
						<input type="text" value="" placeholder="正确填写成本，以便库存总价值" />
					</view>
					<view class="iptbox">
						<view class="text">售价</view>
						<input type="text" value="" placeholder="填写售价" />
					</view>

					<view class="iptbox">
						<view class="text">库存</view>
						<input type="text" value="" placeholder="填写库存量" />
					</view>
					<view class="iptbox">
						<view class="text">库存预警值</view>
						<input type="text" value="" placeholder="点击填写" />
					</view>
					<view class="iptbox">
						<view class="text">分组</view>
						<input type="text" value="" placeholder="点击选择分组" />
					</view>
					<view class="iptbox last">
						<view class="text">库存变更记录</view>
						<input type="text" value="" placeholder="点击选择分类" />
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
			storeId: '',
			authorization: '',
			toreGoodsId: ''
		};
	},
	onLoad(val) {
		console.log(val);
		this.storeId = uni.getStorageSync('shopid');
		this.authorization = uni.getStorageSync('atrztion');
		this.toreGoodsId = val.toreGoodsId;
	},
	components: { topback }
};
</script>

<style lang="less" scoped>
.addcar {
	width: 100%;
	background: #fafafa;
	position: relative;

	.top {
		width: 100%;
		height: 100rpx;
		background: #2d8cf0;
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
			input {
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
				width: 11rpx;
				height: 21rpx;
			}
		}
	}
}
</style>
