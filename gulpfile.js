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
	gulp.src(["./src/**/*html"])
		.pipe(plumber())
		.pipe(browserSync.reload({stream:true}));
});

gulp.task("sass" , function() {
	gulp.src(["./src/**/*scss"])
		.pipe(plumber())
		.pipe(autoPrefixer("last 2 version"))
		.pipe(sass({
			outputStyle: "expanded"
		}))
		.pipe(gulp.dest("./src/"))
		.pipe(browserSync.reload({stream:true}));
});

gulp.task("php" , function() {
	gulp.src(["./src/**/*php"])
		.pipe(plumber())
		.pipe(browserSync.reload({stream:true}));
});

gulp.task("javascript" , function() {
	gulp.src(["./src/**/*js"])
		.pipe(plumber())
		.pipe(browserSync.reload({stream:true}));
});

gulp.task("watch" , function() {
	gulp.watch(["./src/**/*html"] , ["html"]);
	gulp.watch(["./src/**/*php"] , ["php"]);
	gulp.watch(["./src/**/*scss"] , ["sass"]);
	gulp.watch(["./src/**/*js"] , ["javascript"]);
});

gulp.task("default" , ["browser-sync" , "watch"]); 