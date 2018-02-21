"use strict";

function fn(callback) {
	callback();
}

fn(function () {
	console.log(123);
});