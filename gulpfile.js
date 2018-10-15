var gulp = require("gulp");
var browserSync = require("browser-sync");
var plumber = require("gulp-plumber");
var autoPrefixer = require("gulp-autoprefixer");
var sass = require("gulp-sass");
var connect = require("gulp-connect-php");
//------------------------------------------------------------
//
// DEFAULT TASK
//
//------------------------------------------------------------
gulp.task("browser-sync" , function() { 
	browserSync.init({
       proxy: "localhost"
    });
});

gulp.task("reload" , function() {
	browserSync.reload();
});

gulp.task("html", function() {
	gulp.src(["./htdocs/**/*html"])
		.pipe(plumber())
		.pipe(browserSync.reload({stream:true}));
});

gulp.task("sass" , function() {
	gulp.src(["./htdocs/**/*scss"])
		.pipe(plumber())
		.pipe(autoPrefixer("last 2 version"))
		.pipe(sass({
			outputStyle: "expanded"
		}))
		.pipe(gulp.dest("./htdocs/"))
		.pipe(browserSync.reload({stream:true}));
});

gulp.task("php" , function() {
	gulp.src(["./htdocs/**/*php"])
		.pipe(plumber())
		.pipe(browserSync.reload({stream:true}));
});

gulp.task("javascript" , function() {
	gulp.src(["./htdocs/**/*js"])
		.pipe(plumber())
		.pipe(browserSync.reload({stream:true}));
});

gulp.task("watch" , function() {
	gulp.watch(["./htdocs/**/*html"] , ["html"]);
	gulp.watch(["./htdocs/**/*php"] , ["php"]);
	gulp.watch(["./htdocs/**/*scss"] , ["sass"]);
	gulp.watch(["./htdocs/**/*js"] , ["javascript"]);
});

gulp.task("default" , ["browser-sync" , "watch"]); 