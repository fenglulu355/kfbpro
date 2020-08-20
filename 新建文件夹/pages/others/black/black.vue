<template>
	<view>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				val:''
			};
		},
		onLoad(val) {
			console.log(val);
			this.val=val
			
		},
		created() {
			uni.switchTab({
				url:'../../'+this.val.aname+'/'+this.val.bname+'/'+this.val.bname
			})
		}
	}
</script>

<style lang="less">

</style>
