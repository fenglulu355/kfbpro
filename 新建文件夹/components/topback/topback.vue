<template>
	<view class="headers" :class="isbule == true ? 'isbule' : ''" :style="{ height: barHeight.statusBarHeight + paddingheight + `rpx`, 'padding-top': paddingheight + `rpx`, 'box-sizing': 'border-box' }">
		<view class="typeone" v-if="type == 'one'">
			<view class="topinfos" :class="isbule == true ? 'isbule' : ''">
				<view class="t-left">
					<text class="span" @click="toback">
						<</text> <text class="text">{{ topback }}
					</text>
				</view>
				<view class="t-center">
					<image @click="tosearch" src="../../static/images/icon_serach@2x.png" class="search" mode=""></image>
					<input type="text" value="" v-model="search" placeholder="搜索客户名称,联系人,手机号" placeholder-class="placeholder" />
				</view>
				<view class="t-right adds">
					<image @click="showpop" v-if="isaddpic == true" src="../../static/images/icon_add@2x.png" mode=""></image>
				</view>
			</view>
		</view>
		<view class="typetwo" v-if="type == 'two'" :class="iscenter == true ? 'iscenter' : ''">
			<text class="span" :class="iswhite == true ? 'iswhite' : ''" @click="toback">
				<</text> <text class="text" :class="iswhite == true ? 'iswhite' : ''">{{ topback }}
			</text>
			<text class="texts" @click="todosome" :class="iswhite == true ? 'iswhite' : ''">{{ istext }}</text>
		</view>
		<!-- <view class="noceniswhite" v-if="iswhite == true && iscenter == false">
			<text class="span" @click="toback"><</text>
			<text class="text">{{ topback }}</text>
		</view>-->
		<view v-if="nums" class="bgpic" style="background: url(../../static/images/bg_1.png);
				background-position: center;
				background-size: cover;
				background-repeat: no-repeat;">
			<view class="texts">{{ nums.text }}</view>
			<view class="num">{{ nums.num }}</view>
		</view>
	</view>
</template>

<script>
	import tabbar from '../tabbar/tabbar.vue';
	import Select from '../Select/Select.vue';

	export default {
		data() {
			return {
				search: '',
				ispop: false,
				isShow: false,
				barHeight: '',
				options: [{
						name: '全部分组',
						code: '0'
					},
					{
						name: '零件',
						code: '1'
					},
					{
						name: '配件',
						code: '2'
					}
				],
				paddingheight: 0,
				tabbarlist: ['全部', '未结清', '已结清']
			};
		},
		computed: {},
		components: {
			tabbar,
			Select
		},
		props: ['type', 'iswhite', 'istext', 'topback', 'isbule', 'isleft', 'isaddpic', 'iscenter', 'nums'],
		created() {
			console.log(this.topback, this.nums);
			this.isBarHeight999().then(isTemp => {
				this.barHeight = isTemp;
				if (this.barHeight.statusBarHeight != 0) {
					this.paddingheight = 65;
				}
				// console.log(this.barHeight);
			});
		},
		methods: {
			showpop() {
				this.$emit('change', 'showpop');
			},
			toback() {
				this.$emit('change', 'back');
			},
			tosearch() {
				console.log(this.search);
				this.$emit('change', this.search, 'search');
			},
			todosome(){
					this.$emit('change', this.istext, 'istext');
			},
		}
	};
</script>

<style lang="less" scoped>
	.headers {
		width: 100%;
	}

	.typeone {
		width: 100%;

		.topinfos {
			box-sizing: border-box;
			padding: 30rpx 0 0 0;
			display: flex;
			justify-content: space-between;
			align-items: center;

			.t-left {
				width: 20%;
				font-size: 40rpx;
				color: #282828;
				font-weight: 600;

				.span {
					padding: 0 10rpx;
				}
			}

			.t-center {
				width: 65%;
				position: relative;
				height: 53rpx;

				input {
					font-size: 24rpx;
					box-sizing: border-box;
					padding: 0 10rpx 0 50rpx;
					background: #f7f7f7;
					width: 100%;
					height: 100%;
					border-radius: 25rpx;
				}

				image {
					position: absolute;
					top: 50%;
					transform: translateY(-50%);
					left: 2%;
					width: 30rpx;
					height: 30rpx;
				}

				.placeholder {
					font-size: 24rpx;
					color: #b7b7b7;
				}
			}

			.t-right {
				height: 100%;
				background: #555555;
				width: 15%;
				position: relative;

				image {
					position: absolute;
					top: 50%;
					transform: translateY(-50%);
					right: 1%;
					width: 80rpx;
					height: 80rpx;
					z-index: 1;
				}
			}
		}

		.selectbox {
			background: #ffffff;
			width: 100%;
			height: 100rpx;
			display: flex;
			justify-content: space-between;
			align-items: center;
		}
	}

	.isbule {
		background: #2d8cf0;

		.t-left {

			.span,
			.text {
				color: #ffffff;
			}
		}
	}

	.iswhite {
		color: #ffffff;
	}

	.iscenter {
		display: flex;
		justify-content: space-between;
		align-items: center;
		text-align: center;

		.span {
			width: 10%;
			text-align: left;
		}

		.text {
			width: 80%;
			text-align: center;
		}

		.texts {
			width: 10%;
			text-align: right;
		}
	}

	.typetwo {
		font-size: 40rpx;
		font-weight: 600;
		box-sizing: border-box;
		padding: 20rpx 15rpx;

		.texts {
			font-size: 28rpx;
			font-weight: 400;
		}
	}

	.isf .noceniswhite {
		background: #ffffff;
		width: 100%;
		color: #282828;
		height: 100rpx;
		font-size: 40rpx;
		line-height: 100rpx;
		box-sizing: border-box;
		padding-left: 60rpx;
		font-weight: 600;

		.span {
			box-sizing: border-box;
			position: absolute;
			left: 20rpx;
		}

		.text {
			position: absolute;
			left: 70rpx;
		}
	}

	.bluebg {
		background: #2d8cf0;
	}

	.topbacks {
		width: 100%;
		color: #ffffff;
		height: 100rpx;
		font-size: 40rpx;
		line-height: 100rpx;
		box-sizing: border-box;
		padding-left: 60rpx;
		font-weight: 600;

		.span {
			box-sizing: border-box;
			position: absolute;
			left: 20rpx;
		}

		.text {
			position: absolute;
			left: 70rpx;
		}
	}

	.topback {
		// position: fixed;
		// top: 0;
		// left: 0;
		// z-index: 11;
		top: 15rpx;
		width: 100%;
		color: #ffffff;
		height: 100rpx;
		font-size: 40rpx;
		line-height: 100rpx;
		box-sizing: border-box;
		padding-left: 60rpx;
		font-weight: 600;

		.span {
			box-sizing: border-box;
			position: absolute;
			left: 20rpx;
		}

		.text {
			position: absolute;
			left: 50%;
			transform: translateX(-50%);
		}
	}

	.incenter {

		// background: #2d8cf0;
		.text {
			position: absolute;
			left: 50%;
			transform: translateX(-50%);
		}
	}

	.bgpic {
		width: 100%;
		height: 300rpx;
		text-align: center;
		color: #ffffff;
		box-sizing: border-box;
		padding-top: 20rpx;
		font-size: 28rpx;

		.texts {
			box-sizing: border-box;
			padding-bottom: 30rpx;
			font-size: 40rpx;
			font-weight: 500;
		}
	}
</style>
