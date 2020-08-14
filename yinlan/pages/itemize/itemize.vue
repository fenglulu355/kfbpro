<template>
	<view class="content">
		<view class="itemize-nav">
			<view :class="['nav-list',item.select?'select':'']" v-for="(item,index) in itemizeData" :key="index" @click="setModule(index)">
				<span>{{item.title}}</span>
			</view>
		</view>
		<scroll-view scroll-with-animation scroll-y="true" class="itemize-list" :scroll-into-view="currentId" @scroll="setnav" enable-flex>
			<view class="itemize-ul" v-for="(item,index) in itemizeData" :key="index" :id="item.id">
				<view class="title">{{item.title}}</view>
				<view class="itemize-li">
					<view class="module select" v-for="(i,dex) in item.list" :key="dex">
						<view class="module-icon">
							<image class="img" mode="widthFix" :src="i.icon"></image>
						</view>
						<view class="module-title">{{i.title}}</view>
					</view>
				</view>
			</view>
		</scroll-view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				currentId:'id_0',
				itemizeData:[
					{
						id:'id_0',
						title:'会计',
						select:true,
						list:[
							{
								icon:'../../static/images/study.png',
								title:'会计初级职称'
							},{
								icon:'../../static/images/study.png',
								title:'会计初级职称'
							},{
								icon:'../../static/images/study.png',
								title:'会计初级职称'
							}
						]
					},{
						id:'id_1',
						title:'会计',
						select:false,
						list:[
							{
								icon:'../../static/images/study.png',
								title:'会计初级职称'
							},{
								icon:'../../static/images/study.png',
								title:'会计初级职称'
							},{
								icon:'../../static/images/study.png',
								title:'会计初级职称'
							}
						]
					},{
						id:'id_2',
						title:'会计',
						select:false,
						list:[
							{
								icon:'../../static/images/study.png',
								title:'会计初级职称'
							},{
								icon:'../../static/images/study.png',
								title:'会计初级职称'
							},{
								icon:'../../static/images/study.png',
								title:'会计初级职称'
							}
						]
					}
				]
			}
		},
		methods: {
			setModule(index){
				let arr = this.itemizeData;
				for(let i in arr){
					arr[i].select = false;
				}
				arr[index].select = true;
				this.itemizeData = arr;
				this.currentId = arr[index].id;
				// console.log(this.currentId);
			},
			setnav(e){
				 // console.log(e)
			}
		}
	}
</script>

<style scoped>
	/* .content{
		height: 100vh;
	} */
	.content {
		height: 100vh;
		flex-direction: unset;
		background-color: #f6f6f6;
	}

	.itemize-nav {
		width: 152rpx;
		height: 100%;
		background-color: #ffffff;
		display: flex;
		flex-direction: column;
	}
	
	.itemize-nav .nav-list{
		background-color: #ffffff;
		display: flex;
		justify-content: center;
		height: 84rpx;
		width: 100%;
	}
	
	.itemize-nav .nav-list span{
		color: #727272;
		text-align: center;
		line-height: 84rpx;
		font-size: 24rpx;
	}
	.itemize-nav .nav-list span::before{
		content: '.';
		background-color: #fff;
		color: #fff;
		width: 4rpx;
		height: 24rpx;
		margin-right: 14rpx;
	}

	.itemize-nav .select {
		height: 84rpx;
		width: 100%;
		border-radius: 0 0 0 40rpx;
		background-color: #f6f6f6;
		display: flex;
		justify-content: center;
	}

	.itemize-nav .select span {
		text-align: center;
		line-height: 84rpx;
		font-size: 24rpx;
		color: #373737;
	}

	.itemize-nav .select span::before {
		content: ' .';
		width: 4rpx;
		height: 24rpx;
		background-color: #42be67;
		border-radius: 2px;
		color: #42BE67;
		margin-right: 14rpx;
	}

	.itemize-list {
		flex: 1;
		height: 100%;
		display: flex;
		flex-direction: column;
		/* padding: 0 30rpx;
		box-sizing: border-box; */
	}
	.itemize-list::-webkit-scrollbar {
	    display: none;
	}

	.itemize-list .itemize-ul {
		margin-top: 25rpx;
		padding: 0 30rpx;
		box-sizing: border-box;
	}
	.itemize-list .itemize-ul:last-child{
		margin-bottom: 30rpx;
	}

	.itemize-list .itemize-ul .title {
		font-family: NotoSansHans-Regular;
		font-size: 24rpx;
		line-height: 75rpx;
		color: #373737;
	}

	.itemize-list .itemize-ul .itemize-li {
		display: grid;
		grid-template-columns: 1fr 1fr;
		grid-row-gap: 16rpx;
		grid-column-gap: 16rpx;
	}
	.itemize-list .itemize-ul .itemize-li .select{
		border-bottom: 1px solid #47DA73;
	}

	.itemize-list .itemize-ul .itemize-li .module {
		width: 100%;
		height: 200rpx;
		background-color: #ffffff;
		border-radius: 20rpx;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}

	.itemize-list .itemize-ul .itemize-li .module .module-icon {
		width: 42rpx;
	}

	.itemize-list .itemize-ul .itemize-li .module .module-icon .img {
		width: 100%;
		margin: 42rpx 0;
	}

	.itemize-list .itemize-ul .itemize-li .module .module-title {
		font-size: 24rpx;
		line-height: 24rpx;
		letter-spacing: 0px;
		color: #727272;
	}
</style>
