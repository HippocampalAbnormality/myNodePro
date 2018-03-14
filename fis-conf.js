// fis.match('/fisSrc/*.{js,css,png,jpeg,gif,svg}', {
// 	useHash: true
// });

// fis.match('/fisSrc/public/js/index.js', {
// 	release: '/public/fisSrc/js/'
// });

// fis.match('/fisSrc/public/css/**.css', {
// 	release: '/public/fisSrc/css$0'
// });

// // fis.match('/fisSrc/public/img/**.{png,jpeg,gif}', {
// // 	release: '/public/fisSrc/img$0'
// // })

// 所有模板放到 tempalte 目录下
fis.match('fisSrc/template/*.html', {
	release: '/views/fisTemplate/'
});


// fis.media('debug').match('/fisSrc/*.{js,css,png}', {
//   useHash: false,
//   useSprite: false,
//   optimizer: null
// })