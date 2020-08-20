<template>
	<view class="editinfo">
		<view class="top"><topback :type="'two'" :topback="'编辑客户资料'" :iscenter="true" :iswhite="true"></topback></view>
		<view class="content">
			<view class="box">
				<view class="iptbox">
					<view class="text">客户名称</view>
					<input type="text" value="" :placeholder="driverinfo.driverName" v-model="groupname" />
				</view>
				<view class="iptbox">
					<view class="text">手机号</view>
					<input type="text" value="" :placeholder="driverinfo.driverPhone" v-model="tel" />
				</view>
				<view class="iptbox">
					<view class="text">联系人</view>
					<input type="text" value="" :placeholder="driverinfo.driverUserContacts" v-model="name" />
				</view>
				<view class="iptbox last">
					<view class="text">地址</view>
					<input type="text" value="" :placeholder="driverinfo.driverAddress" v-model="adress" />
				</view>
			</view>

			<lbpicker ref="picker3" v-model="value3" mode="multiSelector" :list="list" :level="3" @confirm="handleConfirm"></lbpicker>

			<view class="save" @click="sendinfo">保存</view>
		</view>
	</view>
</template>

<script>
import topback from '../../../components/topback/topback.vue';
import lbpicker from '../../../components/lb-picker/index.vue';
import areaData from '../../../components/lb-picker/area-data-min.js';
export default {
	data() {
		return {
			driverId: '',
			storeId: '',
			atrztion: '',
			driverinfo: [],
			groupname: '',
			tel: '',
			name: '',
			adress: '',
			list: areaData,
			value3: ''
		};
	},
	onLoad(val) {
		this.driverId = val.driverId;
		this.storeId = uni.getStorageSync('shopid');
		this.atrztion = uni.getStorageSync('atrztion');
		let data = {
			driverUserId: this.driverId,
			storeId: this.storeId
		};
		this.requestinfo(data);
	},
	methods: {
		requestinfo(data) {
			this.$request('/organization/driver/user/store/info', data, 'post', this.atrztion, '').then(res => {
				console.log(res);
				this.driverinfo = res.datas;
				this.groupname=res.datas.driverName
				this.name=res.datas.driverUserContacts
				this.tel=res.datas.driverPhone
				this.adress=res.datas.driverAddress
			});
		},
		sendinfo() {
			var that=this
			let data = {
				driverUserName: this.groupname,
				driverUserContacts: this.name,
				driverUserPhone: this.tel,
				storeId: this.storeId,
				driverId: this.driverId,
				driverUserAddress: this.adress
			};
			if (this.groupname == '' || this.name == '' || this.tel == '') {
				uni.showToast({
					icon: 'none',
					title: '请完善信息'
				});
				return;
			} else {
				this.$request('/organization/driver/user/store/update', data, 'post', this.atrztion, '').then(res => {
					// this.driverinfo = res.datas;
					console.log(res);
					if(res.kfbCode==200){
						uni.showToast({
							title:'编辑成功'
						})
						setTimeout(function() {
							uni.navigateTo({
								url:'../cusmain/cusmain?driverId='+that.driverId
							})
						}, 500);
					}else{
						uni.showToast({
							icon:'none',
							title:res.kfbCode+res.kfbErrorMsg
						})
					}
				});
			}
		},
		showadress(name) {
			this.$refs[name].show();
		},
		handleConfirm(val) {
			console.log(val);
			this.adress = val.item[0].label + val.item[1].label + val.item[2].label;
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
			input {
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
