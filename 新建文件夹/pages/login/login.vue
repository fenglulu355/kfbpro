<template>
	<view class="login">
		<view class="h1">您好！</view>
		<view class="h5">欢迎使用卡服邦门店管理系统</view>
		<view class="ipt num">
			<view class="text">账号</view>
			<input type="text" value="" placeholder="请输入账号" v-model="userLoginAccount" />
		</view>
		<view class="ipt psw">
			<view class="text">密码</view>
			<input class="pswipt" :type="pswshow == false ? 'password' : ''" value="" placeholder="请输入密码" v-model="userLoginPassword" />
			<view class="icons" @click="pswshow = !pswshow">
				<image v-if="pswshow" src="../../static/images/eys_xiansi@2x.png" mode=""></image>
				<image v-if="!pswshow" src="../../static/images/eye@2x.png" mode=""></image>
			</view>
		</view>
		<view class="tologin" @click="tologin">登录</view>
	</view>
</template>

<script>
import { mapState, mapMutations } from 'vuex';
export default {
	data() {
		return { pswshow: false, userLoginAccount: '', userLoginPassword: '' };
	},
	onLoad() {
		console.log(this.authorization, this.shopid,'Authorization');
	},
	computed: {
		...mapState(['authorization','shopid'])
	},
	methods: {
		...mapMutations(['SET_AUTHORIZATION', 'SET_SHOPID']),
		tologin() {
			if (this.userLoginAccount == '' || this.userLoginPassword == '') {
				uni.showToast({
					title: '请完善信息',
					icon: 'none'
				});
			} else {
				this.requst();
			}
		},

		requst() {
			var that = this;
			this.$request(
				'/websocket/store/login',
				{ userLoginAccount: this.userLoginAccount, userLoginPassword: this.userLoginPassword, userLongitude: '0000', userLatitude: '0000' },
				'post'
			).then(res => {
				console.log(res);
				if (res.kfbCode == 200) {
					uni.setStorage({
						key: 'rightList',
						data: res.datas.rightList,
						success() {
							console.log('成功了');
						},
						fail() {
							console.log('缓存失败了');
						}
					});
					

					uni.setStorage({
						key: 'atrztion',
						data: res.datas.jwtValue,
						success() {
							console.log('成功了');
						},
						fail() {
							console.log('缓存失败了');
						}
					});
					this.requstuserinfo(res.datas.jwtValue);
				} else {
					uni.showToast({
						icon: 'none',
						title: res.kfbErrorMsg
					});
				}
			});
		},
		requstuserinfo(Authorization) {
			this.$request('/websocket/find/user/jwt', '', 'post', Authorization).then(res => {
				console.log(res, 'a');
				if (res.kfbCode == 200) {
					uni.setStorage({
						key: 'shopid',
						data: res.additionalParameters.id,
						success() {
							let shopid = '';
							
						},
						fail() {
							console.log('缓存失败了');
						}
					});
					uni.showToast({
						title: '登录成功',
						duration: 2000
					});
					uni.switchTab({
						url: '../stores/Shome/Shome'
					});
				} else {
					uni.showToast({
						icon: 'none',
						title: res.kfbErrorMsg
					});
				}
			});
		}
	}
};
</script>

<style lang="less" scoped>
.login {
	box-sizing: border-box;
	padding: 100rpx 30rpx;
	.h1 {
		font-size: 40rpx;
		color: #282828;
	}
	.h5 {
		font-size: 24rpx;
		color: #666666;
		box-sizing: border-box;
		padding: 30rpx 0;
	}
	.num {
		margin-top: 100rpx;
	}

	.ipt {
		box-sizing: border-box;
		padding: 30rpx 0;
		position: relative;
		.text {
			font-size: 32rpx;
			color: #333333;
		}
		input {
			width: 100%;
			background: #f7f7f7;
			height: 100rpx;
			border-radius: 5rpx;
			margin: 20rpx 0;
			font-size: 28rpx;
			color: #999999;
			box-sizing: border-box;
			padding: 0 10rpx;
		}
		.icons {
			position: absolute;
			top: 50%;
			right: 30rpx;
		}
		image {
			width: 40rpx;
			height: 40rpx;
		}
	}
	.psw {
		.pswipt {
			box-sizing: border-box;
			padding: 0 10rpx;
			width: 100%;
			background: #f7f7f7;
			height: 100rpx;
			border: none;
			&:focus {
				outline: none;
			}
		}
	}
	.tologin {
		width: 100%;
		height: 100rpx;
		line-height: 100rpx;
		color: #ffffff;
		text-align: center;
		font-size: 30rpx;
		background: #2d8cf0;
		border-radius: 10rpx;
		margin-top: 100rpx;
	}
}
</style>
