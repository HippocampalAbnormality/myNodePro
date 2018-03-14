function test(name) {
	this.name = name;
}
test();

class Test {
	constructor(name) {
		this.name = name;
	}

	sayName() {
		alert(this.name);
	}
}

let zt = new Test('zt');
zt.sayName();

test('1234234','sdfwsdfdf')