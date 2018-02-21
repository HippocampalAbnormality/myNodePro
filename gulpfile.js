let gulp = require('gulp'),
		sass = require('gulp-sass'),
		inline64 = require('gulp-inline-base64'), // 转换base64
		autoprefixer = require('gulp-autoprefixer'), // 处理css中浏览器兼容的前缀  
		rename = require('gulp-rename'), // 重命名
		cssnano = require('gulp-cssnano'), // css的层级压缩合并
		uglify = require('gulp-uglify'), // js压缩
		babel = require('gulp-babel'),
		concat = require('gulp-concat'), // 合并文件
		rev = require('gulp-rev'), // 对文件名加MD5后缀		
		revCollector = require('gulp-rev-collector'), // 路径替换 
		imagemin = require('gulp-imagemin'), // 图片压缩 
		htmlmin = require('gulp-htmlmin'), // html压缩
		clean = require('gulp-clean');
		// browserSync = require('browser-sync').create(),
		// reload = browserSync.reload;

const SRC_DIR = 'src/',
			DIST_DIR = 'public/gulpSrc/',
			DIST_FILES = DIST_DIR + '**',
			HTML_SRC = 'views/gulpPages/*.ejs',
			Config = {
				src: SRC_DIR,
				dist: DIST_DIR,
				dist_files: DIST_FILES,
				html: {
					src: SRC_DIR + 'ejs/*.ejs',
					dist: 'views/gulpPages'
				},
				sass: {
					src: SRC_DIR + 'sass/*.scss',
					dist: DIST_DIR + 'css'
				},
				js: {
					src: SRC_DIR + 'js/*.js',
					dist: DIST_DIR + 'js',
					build_name: 'build.js'  // 合并后的js名
				},
				img: {
					src: SRC_DIR + 'img/*.{jpeg,jpg,png,gif}',
					dist: DIST_DIR + 'img'
				}
			}


if (process.env.NODE_ENV === 'development') {
	dev()
} else {
	pro()
}

//======= gulp dev 开发环境下 ===============

function dev() {
	// 监视文件变化，自动执行任务
	gulp.task('watch', ['css', 'js', 'img', 'rev'], () => {
		gulp.watch(Config.sass.src, () => {
			gulp.run('css')
		})
		gulp.watch(Config.js.src, () => {
			gulp.run('js')
		})
		gulp.watch(Config.html.src, () => {
			gulp.run('rev')
		})
		// gulp.watch(Config.html.src, () => {
		// 	gulp.run('html')
		// })
	})

	// clean
	gulp.task('clean-js', () => {
		gulp.src(Config.js.dist + '/*.js')
		.pipe(clean());
	})
	gulp.task('clean-css', () => {
		gulp.src(Config.sass.dist + '/*.css')
		.pipe(clean());
	})

	// css转译
	gulp.task('css', ['clean-css'], () => {
		gulp.src(Config.sass.src)
		.pipe(autoprefixer("last 2 version", "> 1%"))
		.pipe(sass())
		.pipe(inline64({
			baseDir: DIST_DIR,
			maxSize: 14 * 1024,
			debug: true
		}))
		.pipe(rev())
		.pipe(gulp.dest(Config.sass.dist))
		.pipe(rev.manifest())
		.pipe(gulp.dest('rev/css'))
	})
	
	// js转译
	gulp.task('js', ['clean-js'], () => {
		gulp.src(Config.js.src)
		.pipe(babel({
			presets: ['es2015']
		}))
		.pipe(gulp.dest(Config.js.dist))
	})

	// 图片压缩整理
	gulp.task('img', () => {
		gulp.src(Config.img.src)
		.pipe(imagemin({
			optimizationLevel: 3, 
			progressive: true, 
			interlaced: true
		}))
		.pipe(gulp.dest(Config.img.dist))
	})

	
	// 加MD5、替换连接，压缩写在这里就没问题了
	gulp.task('rev', ['css'],() => {
		gulp.src(['rev/**/*.json', Config.html.src])
		.pipe(revCollector({
			replaceReved: true,
			dirReplacements: {
				'src/sass': '/gulpSrc/css'
			}
		}))
		.pipe(htmlmin({
			removeComments: true,//清除HTML注释
			collapseWhitespace: true//压缩HTML
		}))
		.pipe(gulp.dest(Config.html.dist))
	})

	gulp.task('default', ['css', 'js', 'img', 'rev'],() => {
		console.log('succ')
	})
}

//======= gulp pro 开发环境下 ===============

function pro() {

}