<template>
	<view class="addcar">
		<view class="top"><topback :topback="'个人设置'" :iscenter="true" :isbg="true"></topback></view>
		<view class="content">
			<view class="basic box">
				<view class="iptmain">
					<view class="iptbox">
						<input type="text" value="" placeholder="点击填写" />
						<view class="text" @click="nameshow = !nameshow">
							<image v-if="nameshow" src="../../../static/images/eys_xiansi@2x.png" mode=""></image>
							<image v-if="!nameshow" src="../../../static/images/eye@2x.png" mode=""></image>
						</view>
					</view>

					<view class="iptbox">
						<input :type="pswshow==false?'password':''" value="" placeholder="请输入新密码" />
						<view class="text" @click="pswshow = !pswshow">
							<image v-if="pswshow" src="../../../static/images/eys_xiansi@2x.png" mode=""></image>
							<image v-if="!pswshow" src="../../../static/images/eye@2x.png" mode=""></image>
						</view>
					</view>
					<view class="iptbox">
						<input type="text" :type="newpswshow==false?'password':''" value="" placeholder="请确认新密码" />
						<view class="text" @click="newpswshow = !newpswshow">
							<image v-if="newpswshow" src="../../../static/images/eys_xiansi@2x.png" mode=""></image>
							<image v-if="!newpswshow" src="../../../static/images/eye@2x.png" mode=""></image>
						</view>
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
		return {
			nameshow: true,
			pswshow:false,
			newpswshow:false
		};
	},
	methods: {
		tochangepsw() {
			uni.navigateTo({
				url: '../changepsw/changepsw'
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
		.iptmain {
			box-sizing: border-box;
			padding: 0rpx 15rpx;
		}
		.iptbox {
			border-bottom: 1rpx solid #e5e5e5;
			display: flex;
			justify-content: space-between;
			align-items: center;
			box-sizing: border-box;
			padding: 37rpx 0rpx;
			.text {
				image {
					width: 40rpx;
					height: 40rpx;
				}
			}
			input {
				font-size: 26rpx;
				color: #999999;
				text-align: left;
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
