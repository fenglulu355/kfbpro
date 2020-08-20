<template>
	<view class="editbox">
		<view class="addcar">
		<view class="top"><topback :type="'two'" :topback="'编辑商品详情'" :iscenter="true" :iswhite="true" @change="tobacks"></topback></view>
			<view class="content">
				<view class="basic box">
					<view class="iptmain">
						<view class="iptbox  addpic">
							<view class="text">商品图片</view>
							<!-- <input type="text" value="" placeholder="点击填写" /> -->
							<view class="addipt"><image src="../../../static/images/addpic.png" mode=""></image></view>
						</view>
		
						<view class="iptbox">
							<view class="text">
								商品名称
								<text>*</text>
							</view>
							<input type="text" value="" placeholder="点击填写" />
						</view>
		
						<view class="iptbox">
							<view class="text">
								编号
								<text>*</text>
							</view>
							<input type="text" value="" placeholder="请输入正确编号，添加后无法修改" />
						</view>
						<view class="iptbox">
							<view class="text">副名称</view>
							<input type="text" value="" placeholder="点击填写" />
						</view>
						<view class="iptbox">
							<view class="text">商品类型</view>
							<input type="text" value="" placeholder="点击选择分类" />
						</view>
						<view class="iptbox">
							<view class="text">品牌</view>
							<input type="text" value="" placeholder="填写售价" />
						</view>
						<view class="iptbox">
							<view class="text">配套车型</view>
							<input type="text" value="" placeholder="填写库存量" />
						</view>
						<view class="iptbox">
							<view class="text">规格</view>
							<input type="text" value="" placeholder="点击选择分组" />
						</view>
						<view class="iptbox">
							<view class="text">单位</view>
							<input type="text" value="" placeholder="填写售价" />
						</view>
						<view class="iptbox">
							<view class="text">主机图号</view>
							<input type="text" value="" placeholder="填写库存量" />
						</view>
						<view class="iptbox last">
							<view class="text">产地</view>
							<input type="text" value="" placeholder="点击选择分组" />
						</view>
					</view>
				</view>
			<view class="save">保存</view>
			</view>
		</view>
		<view class="addcar">
			<view class="top"><topback :topback="'编辑商品固有属性'" :iscenter="true" :isbg="true"></topback></view>
			<view class="content">
				<view class="basic box">
					<view class="iptmain">
						
						<view class="iptbox">
							<view class="text">库存预警值</view>
							<input type="text" value="" placeholder="点击填写" />
						</view>
						<view class="iptbox">
							<view class="text">成本</view>
							<input type="text" value="" placeholder="正确填写成本，以便统计库存总价值" />
						</view>
						<view class="iptbox">
							<view class="text">售价</view>
							<input type="text" value="" placeholder="填写售价" />
						</view>
						<view class="iptbox last">
							<view class="text">商品类型</view>
							<input type="text" value="" placeholder="点击选择分组" />
						</view>
						
					</view>
				</view>
			<view class="save">保存</view>
			</view>
		</view>
	</view>
</template>

<script>
import topback from '../../../components/topback/topback.vue';
export default {
	data() {
		return {};
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
			line-height: 60rpx;
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
</style>
