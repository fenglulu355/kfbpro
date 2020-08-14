<template>
	<span :class="['iconfont',name ]" :style="'color:' + color + ';font-size:' + size + 'rpx'"></span>
	<!-- 示例
	 <icon name="icon-you" color="#d0d0d0" size="12"></icon> -->
</template>

<script>
	export default {
		data() {
			return {

			};
		},
		props: ['name', 'color', 'size']
	}
</script>

<style scoped>
	span{
		display: flex;
		flex-direction: column;
		justify-content: center;
	}
	@font-face {
	  font-family: 'iconfont';  /* project id 1889529 */
	  src: url('//at.alicdn.com/t/font_1889529_75m9hwj37be.eot');
	  src: url('//at.alicdn.com/t/font_1889529_75m9hwj37be.eot?#iefix') format('embedded-opentype'),
	  url('//at.alicdn.com/t/font_1889529_75m9hwj37be.woff2') format('woff2'),
	  url('//at.alicdn.com/t/font_1889529_75m9hwj37be.woff') format('woff'),
	  url('//at.alicdn.com/t/font_1889529_75m9hwj37be.ttf') format('truetype'),
	  url('//at.alicdn.com/t/font_1889529_75m9hwj37be.svg#iconfont') format('svg');
	}

	.iconfont {
	  font-family: "iconfont" !important;
	  font-size: 16px;
	  font-style: normal;
	  -webkit-font-smoothing: antialiased;
	  -moz-osx-font-smoothing: grayscale;
	}
	
	.icon-shu:before {
	  content: "\e61e";
	}
	
	.icon-shuxuexi-:before {
	  content: "\e6c7";
	}
	
	.icon-jiesuo:before {
	  content: "\e669";
	}
	
	.icon-suoding:before {
	  content: "\e6e6";
	}
	
	.icon-bofang:before {
	  content: "\e630";
	}
	
	.icon-fenxiang:before {
	  content: "\e623";
	}
	
	.icon-jf-play:before {
	  content: "\e615";
	}
	
	.icon-guanbi:before {
	  content: "\e607";
	}
	
	.icon-fanhui:before {
	  content: "\e611";
	}
	
	.icon-zhifu:before {
	  content: "\e60b";
	}
	
	.icon-weixin:before {
	  content: "\e617";
	}
	
	.icon-xiangqing:before {
	  content: "\e654";
	}
	
	.icon-jiesuanjichushuju:before {
	  content: "\e7d4";
	}
	
	.icon-sousuo:before {
	  content: "\e633";
	}
	
	.icon-shijian:before {
	  content: "\e632";
	}
	
	.icon-xia:before {
	  content: "\e614";
	}
	
	.icon-you:before {
	  content: "\e773";
	}
	
	.icon-shezhi:before {
	  content: "\e610";
	}


</style>
