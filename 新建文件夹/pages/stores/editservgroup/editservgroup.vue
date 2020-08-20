<template>
	<view class="editinfo">
		<view class="top"><topback :type="'two'" :topback="'服务分组'" :iscenter="true" :iswhite="true" @change="tobacks"></topback></view>
		<view class="content">
			<view class="box">
				<view class="groupli" v-for="(item, index) in list" :key="index">
					<view class="input">{{ item.groupName }}</view>
					<view class="setting">
						<image src="../../../static/images/icon_delete@2x.png" @click="del(item)" mode=""></image>
						<image src="../../../static/images/icon_bianji@2x.png" @click="edit(item)" mode=""></image>
					</view>
				</view>
			</view>
			<view class="save" @click="addgroup">新增分组</view>
			<confirms :title="'修改分组名称'" :isshow="isshow" @change="changename"></confirms>
			<confirms :title="'新增分组'" :isshow="isaddshow" @change="addname"></confirms>
		</view>
	</view>
</template>

<script>
import topback from '../../../components/topback/topback.vue';
import confirms from '../../../components/confirmbox/confirmbox.vue';

export default {
	data() {
		return {
			isshow: false,
			isaddshow: false,
			list: [],
			storeId: '',
			authorization: '',
			curitem: {},
			
			
			
			
		};
	},
	onLoad(val) {
		this.storeId = uni.getStorageSync('shopid');
		this.authorization = uni.getStorageSync('atrztion');
		this.requstlist();
	},
	methods: {
		tobacks(e) {
			if (e == 'back') {
				uni.navigateTo({
					url: '../service/service'
				});
			}
		},
		requstlist() {
			this.$request('/goods/store/service/group/withoutPagingList', { storeId: this.storeId }, 'get', this.authorization).then(res => {
				this.list = res.datas;
			});
		},
		del(item) {
			console.log(item);
			var that = this;
			uni.showModal({
				title: '提示',
				content: '您确定要删除此服务分组吗',
				success: function(res) {
					if (res.confirm) {
						that.$request('/goods/store/service/group/delete', { groupId: item.groupId, storeId: that.storeId }, 'delete', that.authorization,'application/json').then(res => {
							if (res.kfbCode == 200) {
								uni.showToast({
									title: '删除成功'
								});
								that.requstlist();
							} else {
								uni.showToast({
									icon: 'none',
									title: res.kfbCode + res.kfbErrorMsg
								});
							}
						});
					} else if (res.cancel) {
						uni.showToast({
							icon: 'none',
							title: '取消操作'
						});
					}
				}
			});
		},
		addgroup() {
			this.isaddshow = true;
		},
		addname(e, a) {
			if (a == 'cancle') {
				this.isaddshow = false;
			} else if (a == 'qr') {
				if (e == 0) {
					this.isaddshow = false;
				} else {
					let data = {
						groupName: e,
						storeId: this.storeId
					};
					this.send(data);
					this.isaddshow = false;
				}
			}
		},
		changename(e, a) {
			if (a == 'cancle') {
				this.isshow = false;
			} else if (a == 'qr') {
				if (e == 0) {
					this.isshow = false;
				} else {
					let data = {
						groupName: e,
						storeId: this.storeId,
						groupId: this.curitem.groupId
					};
					this.send(data);
					this.isshow = false;
				}
			}
		},
		send(data) {
			this.$request('/goods/store/service/group/save', data, 'post', this.authorization).then(res => {
				if (res.kfbCode == 200) {
					uni.showToast({
						title: '编辑成功'
					});
					this.requstlist();
				} else {
					uni.showToast({
						icon: 'none',
						title: res.kfbCode + res.kfbErrorMsg
					});
				}
			});
		},
		edit(item) {
			this.isshow = true;
			this.curitem = item;
			console.log(item);
		}
	},
	components: { topback, confirms }
};
</script>

<style lang="less" scoped>
.editinfo {
	width: 100%;
	background: #fafafa;
	position: relative;
	.top {
		width: 100%;
		height: 100rpx;
		background: #2d8cf0;
	}
	.content {
		width: 100%;
		box-sizing: border-box;
		padding: 36rpx 30rpx;
		.box {
			width: 100%;
			.groupli {
				display: flex;
				justify-content: space-between;
				align-items: center;
				width: 100%;
				border-bottom: 1rpx solid #e5e5e5;
				box-sizing: border-box;
				padding: 36rpx 0 20rpx 0;
				input,
				.input {
					font-size: 28rpx;
					color: #333333;
					font-weight: 400;
				}
				.setting {
					width: 20%;
					display: flex;
					justify-content: space-around;
					image {
						width: 38rpx;
						height: 38rpx;
					}
				}
			}
		}
		.save {
			margin-top: 180rpx;
			width: 100%;
			height: 80rpx;
			background: #2d8cf0;
			text-align: center;
			line-height: 80rpx;
			color: #ffffff;
		}
	}
}
</style>
