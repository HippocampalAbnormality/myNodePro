function fn(callback) {
	callback();
}

fn(() => {
	console.log(123)
})
