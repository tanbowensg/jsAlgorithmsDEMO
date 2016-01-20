var gulp=require("gulp")
var concat=require("gulp-concat")
var sass = require("gulp-sass")

gulp.task("build", function() {
    return gulp.src(["./src/js/sort/*.js","./src/js/sort/lib.js"])
	    .pipe(concat("algorithms.js"))
	    .pipe(gulp.dest("./"))
})

gulp.task("sass", function() {
    return gulp.src("./src/style/*.scss")
	    .pipe(sass("style.css"))
	    .pipe(gulp.dest("./"))
})

gulp.task("default",function(){
	gulp.watch("./src/js/sort/*.js",['build'])
	gulp.watch("./src/style/*.scss",['sass'])
	console.log('start watch!')
})