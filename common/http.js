const httpGet = (url, data) => {
	return new Promise((resolve, reject) => {
		uni.request({
			url: url,
			data: data,
			method: 'GET',
			success(result) {
				resolve(result.data)
			},
			fail(error) {
				reject(error)
			}
		})
	})
}

const httpPost = (url, data) => {
	return new Promise((resolve, reject) => {
		uni.request({
			url:url,
			data:data,
			method:"POST",
			success(result) {
				resolve(result.data)
			},
			fail(error) {
				reject(error)
			}
		})
	})
}

export {
	httpGet,
	httpPost
}