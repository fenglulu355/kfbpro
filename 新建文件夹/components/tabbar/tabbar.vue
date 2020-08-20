<template>
	<view class="tabbar">
		<view class="main item" v-if="type == 0">
			<view class="tabitem" v-for="(item, index) in tabbarlist" :key="index" :class="startindex == index ? 'cur' : ''" @click="curitem(index, item)">
				<text>{{ item }}</text>
			</view>
		</view>
		<view class="mmain item" v-if="type == 1">
			<view class="tabitem" v-for="(item, index) in tabbarlist" :key="index" :class="startindex == index ? 'mcur' : ''" @click="mcuritem(index, item)">
				<text>{{ item }}</text>
			</view>
		</view>
		<view class="mmain item" v-if="type == 3">
			<view class="tabitem" v-for="(item, index) in tabbarlist" :key="index" :class="startindex == index ? 'mcur' : ''" @click="mcuritem(index, item)">
				<text>{{ item }}</text>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			iscur: 0,
			ismcur: 0
		};
	},

	props: {
		tabbarlist: {
			type: Array
		},
		type: {
			type: Number
		},
		startindex: {
			type: Number,
			default: 0
		}
	},
	created() {
		console.log(this.tabbarlist);
	},
	methods: {
		curitem(index, item) {
			this.$emit('change', index);
		},
		mcuritem(index, item) {
			this.$emit('change', index);
		}
	}
};
</script>

<style lang="less" scoped>
.tabbar {
	width: 100%;

	.main {
		width: 100%;
		display: flex;
		justify-content: space-around;
	}
	.mmain {
		width: 100%;
		display: flex;
		justify-content: space-between;
		background: #ffffff;
		box-sizing: border-box;
		padding: 20rpx 0;
		.tabitem {
			color: #b7b7b7;
			width: 100%;
			height: 50rpx;
			line-height: 50rpx;
		}
		.mcur {
			font-size: 32rpx;
			color: #ffffff;
			background: #2d8cf0;
			border-radius: 5px;
		}
	}
	.tabitem {
		width: 100%;
		color: #999999;
		height: 80rpx;
		font-size: 28rpx;
		text-align: center;
		line-height: 80rpx;
	}
	.cur {
		color: #2d8cf0;
		border-bottom: 4rpx solid #2d8cf0;
	}
}
</style>
