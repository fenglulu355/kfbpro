const baseUrl = 'https://testmd.carszone.cn'

const request = (url = '', date = {}, type = '', header = '', Content = '') => {
	return new Promise((resolve, reject) => {

		uni.request({
			method: type,
			url: baseUrl + url,
			data: date,
			header: {
				'Authorization': header,
				'Content-type': Content ? Content : 'application/x-www-form-urlencoded'
			},
			dataType: 'json',
		}).then((response) => {
			setTimeout(function() {
				uni.hideLoading();
			}, 200);
			let [error, res] = response;
			resolve(res.data);
		}).catch(error => {
			let [err, res] = error;
			reject(err)
		})
	});
}
export default request
