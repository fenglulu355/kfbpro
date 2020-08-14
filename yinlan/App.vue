<script>
	export default {
		onLaunch: function() {
			console.log('App Launch')
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style>
	/*每个页面公共css */
	/* 	@import url("static/fonts/iconfont.css"); */
	/* page {
		height: 100vh;
	} */

	.content {
		height: 100%;
		display: flex;
		flex-direction: column;
	}

	.container {
		flex: 1;
		margin-bottom: 110rpx;
		display: flex;
		flex-direction: column;
		/* min-height: 93vh; */
	}
</style>
