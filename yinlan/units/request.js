
export default class XRequest {
	constructor(arg) {
		
	};
	static baseUrl = "https://www.example.com"
	
	static myRequest(method, url, data, success, fail, complete) {
		// 追加请求数据
		let myData = {
			txt: '111',
			a: '222',
			...data
		};
		let requestUrl = this.baseUrl + url;
		// 设置请求头
		let headers = {
			'custom-header': 'hello'
		};
		// 发起请求
		uni.request({
			url: requestUrl,
			method: method,
			data: myData,
			header: headers,
			success: (res) => {
				success(res)
			},
			fail: (res) => {
				fail(res)
			},
			complete: (res) => {
				complete(res)
			}
		});
	}
}


// 在页面中的用法

// this.XRequest.myRequest(
// 	'get',                               //请求方式
// 	'https://www.example.com/request',   //地址
// 	{
// 		text: 'uni.request'
// 	},                                   //data请求参数
// 	(res) => {                           //成功回调
// 		console.log(res);
// 	},
// 	(res) => {                           //失败回调
// 		console.log(res);
// 	},
// 	(res) => {                           // 调用结束的回调
// 		console.log(res);
// 	}
// );
