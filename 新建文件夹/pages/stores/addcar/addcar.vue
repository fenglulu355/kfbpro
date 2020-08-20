<template>
	<view class="addcar">
		<view class="top"><topback :topback="'新增车辆信息'" :iscenter="true" :isbg="true"></topback></view>
		<view class="content">
			<view class="basic box">
				<view class="title">基本</view>
				<view class="iptmain">
					<view class="iptbox">
						<view class="text">
							车辆或设备名
							<text>*</text>
						</view>
						<input type="text" value="" placeholder="点击填写" />
					</view>
					<view class="iptbox">
						<view class="text">车型</view>
						<input type="text" value="" placeholder="点击选择" />
					</view>
					<view class="iptbox">
						<view class="text">发动机型号</view>
						<input type="text" value="" placeholder="点击填写" />
					</view>
					<view class="iptbox">
						<view class="text">当前里程数</view>
						<input type="text" value="" placeholder="点击填写" />
					</view>
					<view class="iptbox last addpic">
						<view class="text">上传行驶证</view>
						<!-- <input type="text" value="" placeholder="点击填写" /> -->
						<view class="addipt"><image src="../../../static/images/addpic.png" mode=""></image></view>
					</view>
				</view>
			</view>
			<view class="senior box">
				<view class="title">高级</view>
				<view class="iptmain">
					<view class="iptbox">
						<view class="text">车辆识别代码</view>
						<input type="text" value="" placeholder="点击填写" />
					</view>
					<view class="iptbox">
						<view class="text">所有人</view>
						<input type="text" value="" placeholder="点击填写" />
					</view>
					<view class="iptbox">
						<view class="text">住址</view>
						<input type="text" value="" placeholder="点击填写" />
					</view>
					<view class="iptbox">
						<view class="text">使用性质</view>
						<input type="text" value="" placeholder="点击填写" />
					</view>
					<view class="iptbox">
						<view class="text">发动机号码</view>
						<input type="text" value="" placeholder="点击填写" />
					</view>
					<view class="iptbox">
						<view class="text">注册日期</view>
						<input type="text" value="" placeholder="点击选择" />
					</view>
					<view class="iptbox last">
						<view class="text">发证日期</view>
						<input type="text" value="" placeholder="点击填写" />
					</view>
				</view>
			</view>
			<view class="save">保存</view>
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
				align-self: flex-start;
			}
			image {
				width: 245rpx;
				height: 126rpx;
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
.more{
	background: #F0AD4E;
	display: flex;
	justify-content: space-between;
	align-items: center;
}
</style>
