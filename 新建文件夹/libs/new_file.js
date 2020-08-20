export function POST(
		request,
		method,
		service,
		isShowErrToast,
		unLoginRedirectUrl
	) {
		// wx.setStorageSync('token','ulbrvtpvyt');
		var contentType = '',
			url = '';
		if (method == 'json') {
			contentType = 'multipart/form-data';
			url = baseUrl + service;
		} else {
			contentType = 'application/x-www-form-urlencoded';
			url = baseUrl + service;
		}

		let data = request;

		if (Object.keys(request).length) {
			data = {
				data: base64.encode(JSON.stringify(request))
			};
		}

		return new Promise((resolve, reject) => {
			uni.request({
				url: url,
				data: data,
				method: 'POST',
				header: {
					'content-type': contentType,
					// token: gettoken(),
					// cookie: 'PHPSESSID=' + getcookie(),
					// companyKey: companyKey,
					// time: Date.now()
				},
				success: function(data) {
					console.log(data)
					/*
					*   SUCCESS(200,"成功"),
					    ERROR(500,"系统异常"),
					    FAULT_TOLERANT(501,"容错"),
					    FAIL(201,"操作失败"),
					    NO_LOGIN(401,"未登陆"),
					    NO_ROLE(403,"无权限"),
					    NO_PARAM(202,"参数缺失"),
					    PARAM_CHECK(203,"参数校验失败"),
					    NO_DATA(204,"无数据"),
					    TEST(999999,"TEST")
					* */
					if (
						data.data.code == 200 ||
						data.data.code == 209 ||
						data.data.code == 204
					) {
						console.log(data.data)
						resolve(data.data.data, data.data.code);

					} else if (data.data.code == 401) {
						unLoginHandler(unLoginRedirectUrl, url);
					} else if (data.data.code == 403) {
						reject(data.data);
					} else {
						reject(data.data);
						let {
							message
						} = data.data;
						message = message ?
							message === 'GENERAL' ?
							'系统繁忙' :
							message :
							'系统繁忙';

						if (isShowErrToast) {
							console.info('isShowErrToast 不为空 ');
							return;
						}

						uni.showToast({
							title: message,
							duration: 2000,
							icon: 'none '
						});
					}
				},
				fail: function(err) {
					reject(err);
					uni.showToast({
						title: '系统繁忙',
						duration: 2000,
						icon: 'none'
					});
				}
			});
		});
	}
