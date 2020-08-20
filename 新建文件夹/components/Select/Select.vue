<template>
	<view class="select selection">
		<view class="inner server" v-clickOut="test" v-if="type == 'server'">
			<view class="inputWrapper" @click="showOptions = !showOptions">
				<text v-html="selected ? selected : '全部分组'"></text>
				<image class="icon" src="../../static/images/icon_xiala@2x.png" mode=""></image>
			</view>
			<view class="options" v-show="showOptions">
				<view class="li" v-for="(item, index) in options" :key="index" @click="choose(item,index)">
					<text :class="curindex==index?'sel':''" v-if="item.groupName">{{ item.groupName }}</text>
				</view>
			</view>
		</view>
		<view class="inner server" v-clickOut="test" v-if="type == 'all'">
			<view class="inputWrapper" @click="showOptions = !showOptions">
				<text v-html="selected ? selected : '综合排序'"></text>
				<image class="icon" src="../../static/images/icon_xiala@2x.png" mode=""></image>
			</view>
			<view class="options" v-show="showOptions">
				<view class="li" v-for="(item, index) in options" :key="index" @click="choose(item,index)">
					<text :class="curindex==index?'sel':''" v-if="item.groupName">{{ item.groupName }}</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			selected: '',
			showOptions: false,
			curindex:null,
		};
	},
	props: {
		options: {
			type: Array
		},
		type: {
			type: String
		}
	},
	methods: {
		choose(item,index) {
			this.curindex=index
			this.showOptions = false;
			if (item.groupName !== this.selected) {
				this.selected = item.groupName;
				this.$emit('selected', item);
			}
		},
		outsideDirec() {
			this.showOptions = false;
		},
		test() {
			this.showOptions = false;
		}
		// example2() {
		//   return "xxx";
		// }
	},
	directives: {
		clickOut: {
			bind: function(el, binding) {
				function handler(e) {
					if (el.contains(e.target)) return false;
					if (binding.expression) {
						binding.value();
					}
				}
				el.handler = handler;
				document.addEventListener('click', el.handler);
			},
			unbind: function(el) {
				document.removeEventListener('click', el.handler);
			}
		}
	}
};
</script>

<style lang="less" scoped>
// .inner {
// 	/* background: firebrick; */
// 	position: relative;
// 	/* margin: 0 auto */
// 	width: 80%;
// 	height: 60rpx;
// 	font-size: 32rpx;
// 	color: #666666;
// }
// .inner > .options {
// 	position: absolute;
// 	left: 0;
// 	right: 0;
// 	top: 65rpx;
// 	z-index: 1;
// 	box-sizing: border-box;
// 	padding: 0rpx 15rpx;
// 	background-color: #fff;

// 	box-shadow: 0 0 4rpx #ddd;
// 	border-radius: 3px;
// 	width: 90%;
// 	/* background: orangered; */
// 	overflow-y: scroll;
// }
// /* 隐藏滚动条 */
// .options::-webkit-scrollbar {
// 	display: none;
// }
// .inner > .options > .li {
// 	border-bottom: 1rpx solid #ddd;
// 	height: 70rpx;
// 	line-height: 70rpx;
// 	font-size: 24rpx;
// 	text-align: left;
// 	/* background: brown; */
// 	cursor: pointer;
// }
// .inner > .options :last-child {
// 	border: none;
// }

// .inner .inputWrapper {
// 	width: 100%;
// 	height: 100%;
// 	display: flex;
// 	justify-content: flex-start;
// 	align-items: center;
// }
// .inner .inputWrapper > input {
// 	/* background: #007aff; */
// 	width: 80%;
// 	height: 100%;
// 	font-size: 32rpx;
// 	padding: 0 10rpx;
// 	outline: none;
// }
.selection{
	width: 100%;
}
.server {
	width: 100%;
	height: 80rpx;
	.inputWrapper {
		font-size: 32rpx;
		height: 80rpx;
		line-height: 80rpx;
		text-align: center;
		color: #666666;
		.icon {
			width: 21rpx;
			height: 11rpx;
			padding-left: 20rpx;
			position: relative;
			bottom: 4rpx;
		}
	}
	.options {
		width: 100%;
		background: #ffffff;
		box-shadow: 5rpx 5rpx 15rpx #d5d5d5;
		box-sizing: border-box;
		padding: 20rpx 15rpx;
		.li {
			height: 70rpx;
			line-height: 70rpx;
			text-align: center;
			font-size: 30rpx;
			color: #666666;
			border-top: 1rpx solid #f7f7f7;
			&:first-child {
				border: none;
			}
		}
	}
}
.sel {
	color: #2d8cf0;
}
</style>
