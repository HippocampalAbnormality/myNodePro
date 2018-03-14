class Test {
	constructor(active) {
		this.active = active
	}

	say() {
		console.log(this.active)
	}
}

export { Test as _ }