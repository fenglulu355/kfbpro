<template>
	<view class="cusmain">
		<view class="top"><topback :type="'two'" :topback="'新增收入'" :iscenter="true" :iswhite="true"></topback></view>
		<view class="pcontent">
			<view class="price">金额</view>
			<view class="iptbox"><input type="text" value="" placeholder="￥" v-model="price" /></view>
			<view class="proname common" @click="showpay('picker')">
				<text class="text">收入类型</text>
				<view class="main">
					<text>{{ value1 }}</text>
					<image src="../../../static/images/icon_shangla@2x.png" mode=""></image>
				</view>
			</view>
			<LbPicker ref="picker" mode="selector" v-model="value1" :list="list" @confirm="confirmtype"></LbPicker>
			<view class="times common" @click="showpay('picker1')">
				<text class="text">项目名称</text>
				<view class="main">
					<text>{{ curitem.dictNameZh }}</text>
					<image src="../../../static/images/icon_shangla@2x.png" mode=""></image>
				</view>
			</view>
			<LbPicker ref="picker1" :props="myProps" mode="selector" v-model="value2" :list="typelist" @confirm="confirmitem"></LbPicker>
			<view class="times common">
				<text class="text">交易时间</text>
				<view class="main">
					2020-02-06 15：00
					<image src="../../../static/images/icon_shangla@2x.png" mode=""></image>
				</view>
			</view>

			<view class="note">
				备注
				<textarea value="" placeholder="点击填写" v-model="note" />
			</view>
			<view class="btn" @click="tosave">确定</view>
		</view>
	</view>
</template>

<script>
import topback from '../../../components/topback/topback.vue';
import LbPicker from '../../../components/lb-picker/index.vue';

export default {
	data() {
		return {
			authorization: '',
			storeId: '',
			zcid: 'ea784aff5cf411eaa00028d244287577',
			srid: 'e0de31c25cf411eaa00028d244287577',
			value1: '其他收入',
			typeindex: 1,
			sztype: 6,
			curitem: [],
			value2: '',
			list: ['其他收入', '其他支出'],
			typelist: [],
			myProps: {
				label: 'dictNameZh',
				value: 'id'
			},
			price: '',
			note: ''
		};
	},
	components: { topback, LbPicker },
	onLoad() {
		this.storeId = uni.getStorageSync('shopid');
		this.authorization = uni.getStorageSync('atrztion');
		let data = {
			pageSize: 9999,
			parentId: this.srid,
			relId: this.storeId
		};
		this.requst(data);
	},
	methods: {
		requst(data) {
			this.$request('/system/dict/withPagingList', data, 'get', this.authorization).then(res => {
				console.log(res);
				this.typelist = res.datas;
				this.curitem = this.typelist[0];
			});
		},
		showpay(name) {
			this.$refs[name].show();
		},
		confirmtype(e) {
			if (e.item == '其他收入') {
				this.typeindex = 1;
				this.sztype = 6;
				let data = {
					pageSize: 9999,
					parentId: this.srid,
					relId: this.storeId
				};
				this.requst(data);
			} else {
				this.typeindex = 2;
				this.sztype = 5;
				let data = {
					pageSize: 9999,
					parentId: this.zcid,
					relId: this.storeId
				};
				this.requst(data);
			}
		},
		confirmitem(e) {
			this.curitem = e.item;
		},
		tosave() {
			let data = new Date();
			console.log(this.price, this.sztype, this.curitem, data);
		}
	}
};
</script>

<style lang="less" scoped>
.cusmain {
	width: 100%;
	height: 100%;
	position: relative;
	box-sizing: border-box;
	padding: 120rpx 0rpx;
	.top {
		background: #2d8cf0;
		width: 100%;
		height: 100rpx;
		position: fixed;
		top: 0;
		left: 0;
		z-index: 1111111;
	}
}
.price {
	background: #ffffff;
	width: 100%;
	color: #282828;
	font-size: 28rpx;
}
.iptbox {
	background: #ffffff;
	width: 100%;
	border-bottom: 1rpx solid #e5e5e5;
	input {
		font-size: 60rpx;
		color: #282828;
	}
}

.common {
	background: #ffffff;
	display: flex;
	justify-content: space-between;
	align-items: center;
	color: #666666;
	border-bottom: 1rpx solid #e5e5e5;
	box-sizing: border-box;
	padding: 30rpx 0;
	.text {
		font-size: 28rpx;
	}
	.main {
		color: #282828;
		font-size: 26rpx;
	}
	image {
		margin-left: 20rpx;
		width: 12rpx;
		height: 21rpx;
	}
}
.proname {
	box-sizing: border-box;
	padding-top: 80rpx;
}
.times {
	.main {
		color: #666666;
	}
}
.note {
	background: #ffffff;
	font-size: 28rpx;
	color: #666666;
	box-sizing: border-box;
	padding: 40rpx 0;
	textarea {
		width: 100%;
		height: 150rpx;
		background: #fafafa;
		border-radius: 5px;
		font-size: 26rpx;
		color: #999999;
		box-sizing: border-box;
		padding: 20rpx 20rpx;
	}
}
.btn {
	margin-top: 200rpx;
	width: 100%;
	height: 100rpx;
	line-height: 100rpx;
	text-align: center;
	color: #ffffff;
	font-size: 30rpx;
	background: #2d8cf0;
}
</style>
