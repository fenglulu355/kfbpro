<template>
	<view class="editinfo">
		<view class="top"><topback :type="'two'" :topback="'编辑服务项目'" :iscenter="true" :iswhite="true" @change="tobacks"></topback></view>
		<view class="content">
			<view class="box">
				<view class="iptbox">
					<view class="text">服务名称</view>
					<input type="text" value="" :placeholder="serviceName" v-model="serviceName" />
				</view>
				<view class="iptbox">
					<view class="text">单位规格</view>
					<input type="text" value="" :placeholder="serviceUnit" v-model="serviceUnit" />
				</view>
				<view class="iptbox">
					<view class="text">服务单价</view>
					<input type="text" value="" :placeholder="serviceAmount" v-model="serviceAmount" />
				</view>
				<view class="iptbox last" @click="showpay('group')">
					<view class="text">分组</view>
					<view class="input">{{ group }}</view>
				</view>
				<LbPicker ref="group" mode="selector" v-model="group" :list="list" @confirm="groupconfim"></LbPicker>
			</view>
			<view class="save" @click="tosave">保存</view>
		</view>
	</view>
</template>

<script>
import topback from '../../../components/topback/topback.vue';
import { mapState, mapMutations } from 'vuex';
import LbPicker from '../../../components/lb-picker/index.vue';

export default {
	data() {
		return {
			infos: '',
			storeId: '',
			authorization: '',
			serviceId: '',
			serviceGroupId: '',
			serviceName: '',
			serviceUnit: '',
			serviceAmount: '',
			group: '',
			list: [],
			type: ''
		};
	},
	onLoad(val) {
		this.type = val.type;
		this.storeId = uni.getStorageSync('shopid');
		this.authorization = uni.getStorageSync('atrztion');
		if (val.type == 'edit') {
			if (this.editserver.length == 0) {
				uni.showToast({
					icon: 'none',
					title: '暂无数据，请重新选择'
				});
				setTimeout(function() {
					uni.navigateTo({
						url: '../service/service'
					});
				}, 500);
			} else {
				this.infos = this.editserver;
				this.group = this.infos.serviceGroupName;
				this.serviceName = this.infos.serviceName;
				this.serviceAmount = String(this.infos.serviceAmount);
				this.serviceUnit = this.infos.serviceUnit;
			}
		} else {
		}

		this.requstlist();
	},
	computed: {
		...mapState(['editserver'])
	},
	methods: {
		tobacks(e) {
			console.log(e);
			if (e == 'back') {
				uni.navigateTo({
					url: '../service/service'
				});
			}
		},
		showpay(name) {
			this.$refs[name].show();
		},
		requstlist(data) {
			this.$request('/goods/store/service/group/withoutPagingList', { storeId: this.storeId }, 'get', this.authorization).then(res => {
				res.datas.forEach(res => {
					let obj = {};
					obj.label = res.groupName;
					obj.value = res.groupId;
					this.list.push(obj);
				});
			});
		},
		groupconfim(e) {
			this.group = e.item.label;
			this.serviceGroupId = e.item.value;
		},
		tosave() {
			var that = this;
			if (this.type == 'edit') {
				uni.showModal({
					title: '提示',
					content: '您确定要修改吗',
					success: function(res) {
						if (res.confirm) {
							let data = {
								storeId: that.storeId,
								serviceName: that.serviceName,
								serviceId: that.infos.serviceId,
								serviceAmount: Number(that.serviceAmount),
								serviceUnit: that.serviceUnit,
								serviceGroupId: that.serviceGroupId
							};
							that.send(data);
						} else if (res.cancel) {
							uni.showToast({
								icon: 'none',
								title: '取消操作'
							});
						}
					}
				});
			} else {
				if (this.serviceName == '' || this.serviceAmount == '' || this.serviceUnit == '' || this.serviceGroupId == '') {
					uni.showToast({
						icon: 'none',
						title: '请完善信息'
					});
				} else {
					uni.showModal({
						title: '提示',
						content: '您确定要添加此服务吗',
						success: function(res) {
							if (res.confirm) {
								let data = {
									storeId: that.storeId,
									serviceName: that.serviceName,
									serviceAmount: Number(that.serviceAmount),
									serviceUnit: that.serviceUnit,
									serviceGroupId: that.serviceGroupId
								};
								that.send(data);
							} else if (res.cancel) {
								uni.showToast({
									icon: 'none',
									title: '取消操作'
								});
							}
						}
					});
				}
			}
		},
		send(data) {
			this.$request('/goods/store/service/save', data, 'post', this.authorization).then(res => {
				if (res.kfbCode == 200) {
					uni.showToast({
						title: '编辑成功'
					});
					setTimeout(function() {
						uni.navigateTo({
							url: '../service/service'
						});
					}, 500);
				} else {
					uni.showToast({
						icon: 'none',
						title: res.kfbCode + res.kfbErrorMsg
					});
				}
			});
		}
	},
	components: { topback, LbPicker }
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
		// position: fixed;
		// top: 0;
		// left: 0;
		// z-index: 1111111;
	}
	.content {
		width: 100%;
		box-sizing: border-box;
		padding: 36rpx 30rpx;
		.box {
			border-radius: 5px 5px 0px 0px;
			box-shadow: 0px 4px 8px 0px rgba(250, 250, 250, 0.2);
			margin-bottom: 30rpx;
		}
		.iptbox {
			border-bottom: 1rpx solid #e5e5e5;
			display: flex;
			justify-content: space-between;
			align-items: center;
			box-sizing: border-box;
			padding: 37rpx 0rpx;
			.text {
				font-size: 28rpx;
				text {
					color: #e23a3a;
				}
			}
			input,
			.input {
				font-size: 26rpx;
				color: #999999;
				text-align: right;
			}
		}
		.last {
			border: none;
		}
		.save {
			position: fixed;
			bottom: 30rpx;
			left: 50%;
			transform: translateX(-50%);
			width: 90%;
			height: 80rpx;
			background: #2d8cf0;
			text-align: center;
			line-height: 80rpx;
			color: #ffffff;
		}
	}
}
</style>
