const BASE_URL = "http://iwenwiki.com:3000"
// es6  promise 
export default (options) => {

	// 加载中
	uni.showLoading({
		title: "加载中"
	})

	return new Promise((resolve, reject) => {

		uni.request({
			url: BASE_URL + options.url,
			method: options.method || 'GET',
			data: options.data || {},
			success(res) {
				resolve(res.data);
			},
			fail(err) {
				uni.showToast({
					icon: 'none',
					title: '数据请求失败'
				})
				reject(err);
			},
			complete() {
				uni.hideLoading();
			}
		})

	})
}


