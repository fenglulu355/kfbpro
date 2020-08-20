<template>
	<view class="editinfo">
		<view class="top"><topback :type="'two'" :topback="'新增线下供应商'" :iscenter="true" :iswhite="true"></topback></view>
		<view class="content">
			<view class="box">
				<view class="iptbox">
					<view class="text">商家名称</view>
					<input type="text" value="" placeholder="点击填写" v-model="sname" />
				</view>

				<view class="iptbox">
					<view class="text">联系人</view>
					<input type="text" value="" placeholder="点击选择" v-model="contact" />
				</view>
				<view class="iptbox">
					<view class="text">手机号</view>
					<input type="text" value="" placeholder="点击填写" v-model="tel" />
				</view>
				<view class="iptbox" @tap="handleTap('picker3')">
					<view class="text">地址</view>
					<lbpicker ref="picker3" v-model="value3" mode="multiSelector" :list="list" :level="3" @confirm="handleConfirm"></lbpicker>
					<view class="input">{{ city[0] }}{{ city[1] }}{{ city[2] }}</view>
				</view>
				<view class="iptbox last">
					<view class="text">地址详情</view>
					<input type="text" value="" placeholder="点击填写" v-model="adddress" />
				</view>
			</view>
			<view class="save" @click="tosave">保存</view>
		</view>
	</view>
</template>

<script>
import areaData from '../../../components/lb-picker/area-data-min.js';
import topback from '../../../components/topback/topback.vue';
import lbpicker from '../../../components/lb-picker/index.vue';
export default {
	data() {
		return {
			storeId: '',
			authorization: '',
			sname: '',
			contact: '',
			tel: '',
			adddress: '',
			city: ['点击选择>', '', ''],
			value3: [],
			list: areaData
		};
	},
	onLoad() {
		this.storeId = uni.getStorageSync('shopid');
		this.authorization = uni.getStorageSync('atrztion');
	},
	methods: {
		handleTap(picker) {
			this.$refs[picker].show();
		},

		handleConfirm(item) {
			console.log('confirm::', item);
			this.city = [];
			this.city[0] = item.item[0].label;
			this.city[1] = item.item[1].label;
			this.city[2] = item.item[2].label;
			console.log(this.city);
		},
		tosave() {
			if (this.sname == '' || this.contact == '' || this.tel == '' || this.adddress == '' || this.city[0] == '点击选择') {
				uni.showToast({
					icon: 'none',
					title: '请完善信息'
				});
			} else {
				let data = {
					storeId: this.storeId,
					supplierName: this.sname,
					supplierContacts: this.contact,
					supplierContactsPhone: this.tel,
					supplierProvinceName: this.city[0],
					supplierCityName: this.city[1],
					supplierCountyName: this.city[2],
					supplierDetailedAddress: this.adddress
				};
				console.log(data);
				this.sendinfo(data);
			}
		},
		sendinfo(data) {
			var that = this;
			this.$request('/organization/private/supplier/save', data, 'post', this.authorization).then(res => {
				// this.infos = res.datas;
				console.log(res);
				if (res.kfbCode == 200) {
					uni.showToast({
						title: '添加成功'
					});
					setTimeout(function() {
						uni.navigateTo({
							url: '../supply/supply'
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
	components: { topback, lbpicker }
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
