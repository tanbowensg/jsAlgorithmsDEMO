var gulp=require("gulp")
var concat=require("gulp-concat")

gulp.task("build", function() {
    return gulp.src(["./src/js/sort/lib.js","./src/js/sort/*.js"])
	    .pipe(concat("algorithms.js"))
	    .pipe(gulp.dest("./"))
})

gulp.task("default",function(){
	gulp.watch("./src/js/sort/*.js",['build'])
	console.log('start watch!')
})