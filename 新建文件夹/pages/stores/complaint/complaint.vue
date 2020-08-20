<template>
	<view class="editinfo">
		<view class="top"><topback :type="'two'" :topback="'投诉建议'" :iscenter="true" :iswhite="true" @change='tobacks'></topback></view>
		<view class="tabs"><tabbar :tabbarlist="tabbarlist" :type="0" @change="tonav" :startindex="showindex"></tabbar></view>
		<view class="content">
			<view class="cuscpl">
				<view class="tabs"><tabbar :tabbarlist="mintab" :startindex="mshowindex" :type="1" @change="mtonav"></tabbar></view>
				<view class="cpllist">
					<view class="cplli" v-for="(item, index) in cplli" :key="index" @click="tomain(item, index)">
						<view class="cp-top">
							<text class="time">{{ item.complaintAddTimeStr }}</text>
							<text class="type" v-if="item.complaintStatus == 1">待处理</text>
							<text class="type" v-if="item.complaintStatus == 2">处理中</text>
							<text class="type" v-if="item.complaintStatus == 3">已回复</text>
						</view>
						<view class="contents" v-if="item.complaintStatus == 1 || item.complaintStatus == 2">
							<view class="title">{{ item.complaintTitle }}</view>
							<view class="content">{{ item.complaintContent }}</view>
						</view>
						<view class="reply" v-if="item.complaintStatus == 3">
							<view class="pmain">投诉详情：{{ item.complaintContent }}</view>
							<view class="prpl">回复：{{ item.complaintSolve }}</view>
						</view>
					</view>
				</view>
			</view>
			<view class="save" @click="ispop = true">发起投诉</view>
		</view>
		<view class="addcpl" v-if="ispop">
			<input type="text" value="" placeholder="请输入投诉标题" v-model="complainttitles" />
			<view class="stutas" @click="showpay('status')">
				<text>投诉来源：</text>
				<text>{{ status }}</text>
			</view>
			<LbPicker ref="status" mode="selector" v-model="status" :list="statuslist" @confirm="statusconfim"></LbPicker>
			<textarea value="" placeholder="请输入投诉内容" v-model="complaintval" />
			<view class="save" @click="tosend">提交</view>
		</view>
	</view>
</template>

<script>
import topback from '../../../components/topback/topback.vue';
import tabbar from '../../../components/tabbar/tabbar.vue';
import LbPicker from '../../../components/lb-picker/index.vue';
export default {
	data() {
		return {
			ispop: false,
			type: null,
			orderid: '',
			complainttitles: '',
			complaintval: '',
			authorization: '',
			showindex: 0,
			mshowindex: 0,
			tabbarlist: ['客户投诉', '我的投诉'],
			mintab: ['全部', '待处理', '处理中', '已回复'],
			cplli: [],
			storeId: '',
			complaintStatus: '',
			status: '点击选择',
			statuslist: ['工单', '销售单', '采购单', '客户端', '销售退货', '采购退货'],
			complaintSource: ''
		};
	},
	onLoad(val) {
		console.log(val);
		this.storeId = uni.getStorageSync('shopid');
		this.authorization = uni.getStorageSync('atrztion');
		if (val) {
			this.ispop = val.ispop;
			this.type = val.type;
			this.orderid = val.orderid;
		}
		let data = {
			storeId: this.storeId
		};
		this.requst(data);
	},
	methods: {
		tobacks(e) {
			console.log(e);
			if (e == 'back') {
				uni.switchTab({
					url:'../Shome/Shome'
				})
			}
		},

		showpay(name) {
			this.$refs[name].show();
		},
		statusconfim(e) {
			console.log(e);
			this.complaintSource = Number(e.index + 1);
			console.log(this.complaintSource);
		},
		tosend() {
			if (this.complaintval == '') {
				uni.showToast({
					icon: 'none',
					title: '投诉内容为空！'
				});
				return;
			} else {
				if (this.orderid) {
					let data = {
						complaintSource: this.type,
						complaintContent: this.complaintval,
						complaintOrderCode: this.orderid,
						complaintTitle: this.complainttitles
					};
					this.sendinfo(data);
				} else {
					let data = {
						complaintSource: this.complaintSource,
						complaintContent: this.complaintval,
						complaintTitle: this.complainttitles
					};
					this.sendinfo(data);
				}
			}
		},
		tonav(index) {
			this.showindex = index;
			console.log(index, 'index');
		},
		tomain() {
			uni.navigateTo({
				url: '../complaintmain/complaintmain'
			});
		},
		mtonav(index) {
			this.mshowindex = index;
			if (index == 0) {
				this.complaintStatus = '';
			} else if (index == 1) {
				this.complaintStatus = 1;
			} else if (index == 2) {
				this.complaintStatus = 2;
			} else if (index == 3) {
				this.complaintStatus = 3;
			}
			this.cplli = [];
			let data = {
				storeId: this.storeId,
				complaintStatus: this.complaintStatus
			};
			this.requst(data);
			console.log(index, 'index');
		},
		requst(data) {
			this.$request('/system/complaint/store/withPagingList', data, 'post', this.authorization).then(res => {
				console.log(res);
				res.datas.forEach(res => {
					this.cplli.push(res);
				});
			});
		},
		sendinfo(data) {
			var that = this;
			this.$request('/system/complaint/save', data, 'post', this.authorization).then(res => {
				console.log(res);
				if (res.kfbCode == 200) {
					uni.showToast({
						title: '提交成功'
					});
					that.cplli = [];
					let data = {
						storeId: that.storeId
					};
					that.requst(data);
					setTimeout(function() {
						that.ispop = false;
					}, 500);
				} else {
					uni.showToast({
						icon: 'none',
						title: '提交失败' + res.kfbCode
					});
				}
			});
		}
	},
	components: { topback, tabbar, LbPicker }
};
</script>

<style lang="less" scoped>
.editinfo {
	width: 100%;
	background: #fafafa;
	position: relative;
	box-sizing: border-box;
	padding: 100rpx 0rpx;
	.top {
		width: 100%;
		height: 100rpx;
		background: #2d8cf0;
		position: fixed;
		top: 0;
		left: 0;
		z-index: 1111111;
	}
	.content {
		width: 100%;
		box-sizing: border-box;
		padding: 0rpx 30rpx;
		.tabs {
			box-sizing: border-box;
			padding: 40rpx 0;
		}
		.cpllist {
			width: 100%;
			.cplli {
				background: #ffffff;
				margin-bottom: 30rpx;
				color: #666666;
				.cp-top {
					display: flex;
					justify-content: space-between;
					align-items: center;
					box-sizing: border-box;
					padding: 20rpx 20rpx;
					border-bottom: 1rpx solid #e5e5e5;
					.time {
						font-size: 24rpx;
					}
					.type {
						font-size: 28rpx;
					}
				}
				.contents,
				.reply {
					min-height: 200rpx;
					box-sizing: border-box;
					padding: 30rpx 20rpx;
					font-size: 28rpx;
				}
			}
		}
	}
}
.addcpl {
	width: 100%;
	min-height: 2600rpx;
	box-sizing: border-box;
	padding: 30rpx 30rpx;
	background: #ffffff;
	position: fixed;
	top: 100rpx;
	left: 0;
	input {
		width: 100%;
		font-size: 26rpx;
		color: #999999;
		margin-bottom: 20rpx;
		height: 50rpx;
	}
	.stutas {
		font-size: 26rpx;
		color: #999999;
		margin-bottom: 30rpx;
		display: flex;
		justify-content: space-between;
	}
	textarea {
		min-height: 800rpx;
		width: 100%;
		font-size: 26rpx;
		color: #999999;
	}
}
.save {
	margin-top: 80rpx;
	width: 100%;
	height: 80rpx;
	background: #2d8cf0;
	text-align: center;
	line-height: 80rpx;
	color: #ffffff;
}
</style>
