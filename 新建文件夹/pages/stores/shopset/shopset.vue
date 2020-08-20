<template>
	<view class="shopset">
		<view class="top"><topback :type="'two'" @change="toback" :topback="'门店设置'" :iscenter="true" :iswhite="true"></topback></view>
		<view class="content">
			<view class="box tops">
				<view class="iptbox">
					<view class="text">门店头像</view>
					<image class="head" :src="userhead + shopinfo.storeAvatar" mode=""></image>
				</view>
				<view class="iptbox">
					<view class="text">门店名称</view>
					<input type="text" value="" :placeholder="shopinfo.storeName" v-model="storeName" />
				</view>
				<view class="iptbox" @click="showpay('area')">
					<view class="text">地区</view>
					<view class="input">{{ city[0] }}{{ city[1] }}{{ city[2] }}</view>
				</view>
				<LbPicker ref="area" v-model="value3" mode="multiSelector" :list="list" :level="3" @confirm="handleConfirm"></LbPicker>

				<view class="iptbox ">
					<view class="text">详细地址</view>
					<input type="text" value="" :placeholder="shopinfo.storeAddress" v-model="storeAddress" />
				</view>
				<view class="iptbox">
					<view class="text">联系人</view>
					<input type="text" value="" :placeholder="shopinfo.storeContactsName" v-model="storeContactsName" />
				</view>
				<view class="iptbox">
					<view class="text">手机号</view>
					<input type="text" value="" :placeholder="shopinfo.storeContactsPhone" v-model="storeContactsPhone" />
				</view>
				<view class="iptbox last zyyw">
					<view class="text">主营业务</view>
					<view class="business">
						<text v-for="(item, index) in shopinfo.storeMainBusinessList">{{ item.businessName }}</text>
					</view>
					<view class="text center">上述信息请联系BD经理修改</view>
				</view>
			</view>
			<view class="box bots">
				<view class="iptbox" @click="showpay('time')">
					<view class="text">营业时间</view>
					<view class="input">{{ time.storeStartServiceTimeStr }}-{{ time.storeEndServiceTimeStr }}</view>
				</view>
				<simple-datetime-picker ref="time" :type="'time'" @submit="timeconfirm"></simple-datetime-picker>
				<simple-datetime-picker ref="endtime" @submit="endtimeconfirm"></simple-datetime-picker>
				<view class="iptbox last" @click="showpay('status')">
					<view class="text">营业状态</view>
					<input type="text" value="" :placeholder="storeStatus + `  >`" />
				</view>
				<LbPicker ref="status" mode="selector" v-model="storeStatus" :list="statuslist" @confirm="statusconfim"></LbPicker>
				<simple-datetime-picker ref="statustime" :type="'year'" @submit="statustimeconfirm"></simple-datetime-picker>
				<simple-datetime-picker ref="statusendtime" :type="'year'" @submit="statusendtimeconfirm"></simple-datetime-picker>
			</view>
			<view class="save">保存</view>
		</view>
		<!-- <view class="iptbox last zyyw">
			<view class="text">公告</view>
			<textarea class="textarea" value="" placeholder="发动机维修" />
		</view> -->
	</view>
</template>

<script>
import topback from '../../../components/topback/topback.vue';
import LbPicker from '../../../components/lb-picker/index.vue';
import areaData from '../../../components/lb-picker/area-data-min.js';
import simpleDatetimePicker from '../../../components/biiliwuiid-datatime-picker/biiliwuiid-datatime-picker.vue';

export default {
	data() {
		return {
			shopinfo: [],
			authorization: '',
			storeId: '',
			storeName: '',
			city: ['', '', ''],
			storeAddress: '',
			storeContactsName: '',
			storeContactsPhone: '',
			time: {
				storeStartServiceTimeStr: '',
				storeEndServiceTimeStr: ''
			},
			storeStatus: '',
			statustime: {
				start: '',
				end: ''
			},
			statusindex: '',
			statuslist: ['营业中', '休息中', '歇业中'],
			value3: [],
			list: areaData
		};
	},
	onLoad() {
		console.log('load');
		this.storeId = uni.getStorageSync('shopid');
		this.authorization = uni.getStorageSync('atrztion');
		this.request();
	},
	methods: {
		toback(e) {
			if (e == 'back') {
				uni.switchTab({
					url: '../Shome/Shome'
				});
			}
		},
		showpay(name) {
			var that = this;
			uni.showModal({
				title: '提示',
				content: '确定要修改吗',
				success: function(res) {
					if (res.confirm) {
						that.$refs[name].show();
					} else if (res.cancel) {
						uni.showToast({
							icon: 'none',
							title: '取消操作'
						});
					}
				}
			});
		},
		statusconfim(e) {
			console.log(e);
			this.statusindex = Number(e.index) + 1;
			this.$refs['statustime'].show();
		},
		statustimeconfirm(e) {
			let a = e.year + `-` + e.month + `-` + e.day + ` ` + e.hour + `:` + e.minute + `:` + e.second;
			this.$set(this.statustime, 'start', a);
			this.$refs['statusendtime'].show();
		},
		statusendtimeconfirm(e) {
			let a = e.year + `-` + e.month + `-` + e.day + ` ` + e.hour + `:` + e.minute + `:` + e.second;
			this.$set(this.statustime, 'end', a);
			let data = {
				storeId: this.storeId,
				storeBusinessStatus: this.statusindex,
				storeStartStopOperationStr: this.statustime.start,
				storeEndStopOperationStr: this.statustime.end
			};
			console.log(data);
			this.changestatus(data);
		},
		changestatus(data) {
			this.$request('/organization/store/service/time/update', data, 'put', this.authorization, 'application/json').then(res => {
				if (res.kfbCode == 200) {
					uni.showToast({
						title: '编辑成功'
					});
				} else {
					uni.showToast({
						icon: 'none',
						title: res.kfbCode + res.kfbErrorMsg
					});
				}
			});
		},
		timeconfirm(e) {
			// console.log(e);
			let a = e.hour + `:` + e.minute + `:` + e.second;

			this.$refs['endtime'].show();
			this.$set(this.time, 'storeStartServiceTimeStr', a);
		},
		endtimeconfirm(e) {
			let a = e.hour + `:` + e.minute + `:` + e.second;
			this.$set(this.time, 'storeEndServiceTimeStr', a);
			let data = {
				storeId: this.storeId,
				storeStartServiceTimeStr: this.time.storeStartServiceTimeStr,
				storeEndServiceTimeStr: this.time.storeEndServiceTimeStr
			};
			this.changetime(data);
		},
		changetime(data) {
			this.$request('/organization/store/service/time/update', data, 'put', this.authorization, 'application/json').then(res => {
				if (res.kfbCode == 200) {
					uni.showToast({
						title: '编辑成功'
					});
				} else {
					uni.showToast({
						icon: 'none',
						title: res.kfbCode + res.kfbErrorMsg
					});
				}
			});
		},
		handleConfirm(item) {
			console.log('confirm::', item);
			this.city = [];
			this.city[0] = item.item[0].label;
			this.city[1] = item.item[1].label;
			this.city[2] = item.item[2].label;
			console.log(this.city);
		},
		request() {
			this.$request('/organization/store/infobypk/' + this.storeId, '', 'get', this.authorization).then(res => {
				console.log(res.datas, 'a');
				this.shopinfo = res.datas;
				this.city[0] = res.datas.storeProvinceName;
				this.city[1] = res.datas.storeCityName;
				this.city[2] = res.datas.storeCountyName;
				this.time.storeStartServiceTimeStr = this.shopinfo.storeStartServiceTimeStr;
				this.time.storeEndServiceTimeStr = this.shopinfo.storeEndServiceTimeStr + ` >`;
				if ((this.shopinfo.storeBusinessStatus = 1)) {
					this.storeStatus = '营业中';
				} else if ((this.shopinfo.storeBusinessStatus = 2)) {
					this.storeStatus = '休息中';
				} else if ((this.shopinfo.storeBusinessStatus = 3)) {
					this.storeStatus = '歇业中';
				}
			});
		}
	},
	components: { topback, LbPicker, simpleDatetimePicker }
};
</script>

<style lang="less" scoped>
.shopset {
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
			background: #ffffff;
			box-sizing: border-box;
			padding: 0rpx 15rpx;
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
			.head {
				width: 86rpx;
				height: 86rpx;
			}
			input,
			.input {
				width: 80%;
				font-size: 26rpx;
				color: #999999;
				text-align: right;
			}
		}
		.last {
			border: none;
		}
		.zyyw {
			display: block;
			.textarea {
				width: 100%;
				font-size: 26rpx;
				color: #999999;
				box-sizing: border-box;
				padding: 10rpx 0;
			}
			.texts {
				font-size: 26rpx;
				color: #999999;
				text-align: center;
			}
			.center {
				font-size: 26rpx;
				color: #999999;
				text-align: center;
			}
			.business {
				// background: #007aff;
				font-size: 26rpx;
				color: #999999;
				width: 100%;
				box-sizing: border-box;
				padding: 10rpx 0 50rpx 0;
				text {
					margin-right: 10rpx;
				}
			}
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
