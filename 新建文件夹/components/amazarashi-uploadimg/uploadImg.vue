<template>
	<view
		class="upload-img"
		:style="{
			width: width + 'rpx',
			height: height + 'rpx',
			'background-image': 'url(' + bgsrc + ')'
		}"
		@tap="handleAddNewImage"
	>
		<image class="cover" :src="currentImage" mode="aspectFill"></image>
		<view class="plusicon">
			<slot name="icon">
				<text
					v-if="!choosed"
					class="iconfont " 
					>&#xe8fe;</text>
			</slot>
		</view>
	</view>
</template>

<script>
export default {
	props: {
		width: {
			type: Number,
			default: 300
		},
		height: {
			type: Number,
			default: 190
		},
		bgsrc: {
			type: String
		}
	},
	data() {
		return {
			currentImage: '',
			choosed:false
		};
	},
	methods: {
		handleAddNewImage() {
			const _that = this;
			uni.chooseImage({
				count: 1,
				sourceType: ['album', 'camera'],
				sizeType: ['compressed'],
				success(res) {
					_that.currentImage = res.tempFilePaths[0];
					_that.choosed = true;
					_that.$emit('chooseimg', {
						src: _that.currentImage
					});
				}
			});
		}
	}
};
</script>

<style lang="less">


.iconfont {
  font-family: "iconfont" !important;
  font-size: 16px;
  font-style: normal;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.icon-plus:before {
  content: "\e8fe";
}
.upload-img {
	position: relative;
	background-size: 100% 100%;
	-webkit-background-size: 100% 100%;
	.cover {
		display: inline-block;
		width: 100%;
		height: 100%;
	}
	.plusicon{
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%,-50%);
	}
}
</style>
