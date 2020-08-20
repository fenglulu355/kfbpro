<template>
	<view class="confirm-inpt" v-if="isshow == true">
		<view class="ci-box" v-if="title == '修改'">
			<view class="title">{{ title }}</view>
			<view class="ipt">
				<text>￥</text>
				<input type="number" value="" v-model="confirminput" />
			</view>
			<view class="btn">
				<view class="cancle" @click="cancle">取消</view>
				<view class="cur" @click="confirm">确定</view>
			</view>
		</view>
		<view class="ci-box" v-if="title == '取消订单'">
			<view class="title">{{ title }}</view>
			<textarea class="textarea" value="" placeholder="请输入取消理由" v-model="confirminput" />
			<view class="btn">
				<view class="cancle" @click="cancle">取消</view>
				<view class="cur" @click="confirm">确定</view>
			</view>
		</view>
		<view class="ci-box" v-if="title == '修改分组名称'||title == '新增分组'">
			<view class="title">{{ title }}</view>
			<textarea class="textarea" value="" placeholder="请输入名称" v-model="confirminput" />
			<view class="btn">
				<view class="cancle" @click="cancle">取消</view>
				<view class="cur" @click="confirm">确定</view>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			confirminput: null,
			before: null
		};
	},
	props: ['title', 'isshow'],
	methods: {
		confirm() {
			if (this.confirminput == null) {
				this.$emit('change', 0,'qr');
			} else {
				this.$emit('change', this.confirminput,'qr');
			}
			this.before = this.confirminput;
			this.confirminput = null;
		},
		cancle() {
			this.confirminput=null
			this.$emit('change', this.before,'cancle');
		}
	}
};
</script>

<style lang="less" scoped>
.confirm-inpt {
	background: rgba(0, 0, 0, 0.5);
	width: 100%;
	height: 2000rpx;
	position: fixed;
	top: 0;
	left: 0;
	z-index: 11111111;
	.ci-box {
		background: #ffffff;
		width: 80%;
		margin: 500rpx auto;
		border-radius: 60rpx;
		box-sizing: border-box;
		padding: 10rpx 15rpx;
		.title {
			text-align: center;
			font-size: 36rpx;
			line-height: 80rpx;
			color: #333333;
		}
		.textarea {
			border: 1rpx solid #d5d5d5;
			width: 90%;
			height: 200rpx;
			margin: 0 auto;
			box-sizing: border-box;
			padding: 10rpx 10rpx;
			font-size: 32rpx;
			color: #333333;
		}
		.ipt {
			width: 100%;
			height: 100rpx;
			display: flex;
			align-items: center;
			justify-content: center;
			font-size: 32rpx;
			color: #333333;
			text {
			}
			input {
				width: 30%;
				border-bottom: 1rpx solid #eaeaea;
			}
		}
		.btn {
			width: 100%;
			height: 100rpx;
			display: flex;
			align-items: center;
			justify-content: space-between;
			view {
				width: 40%;
				height: 80rpx;
				font-size: 30rpx;
				text-align: center;
				line-height: 80rpx;
				color: #4d9df2;
			}
			.cancle {
				color: #999999;
			}
		}
	}
}
</style>
