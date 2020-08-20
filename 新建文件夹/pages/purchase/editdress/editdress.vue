<template>
	<view class="addcar">
		<view class="top"><topback :topback="'新增收货地址'" :iscenter="true" :isbg="true"></topback></view>
		<view class="content">
			<view class="basic box">
				<view class="iptmain">
					<view class="iptbox">
						<view class="text">收货人</view>
						<input type="text" value="" placeholder="张师傅" />
					</view>
					<view class="iptbox">
						<view class="text">手机号</view>
						<input type="text" value="" placeholder="手机号" />
					</view>
					<view class="iptbox">
						<view class="text">地区</view>
						<input type="text" value="" placeholder="点击选择" />
					</view>
					<view class=" last textarea">
						<view class="text">地址</view>
						<textarea value="" placeholder="请填写地址详情" />
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
				width: 80rpx;
				height: 80rpx;
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
.textarea {
	width: 100%;
	box-sizing: border-box;
	padding: 37rpx 0rpx;
	.text {
		width: 100%;
		font-size: 28rpx;
	}
	textarea {
		width: 100%;
		font-size: 28rpx;
	
		box-sizing: border-box;
		padding: 15rpx 15rpx;
	}
}
</style>
