// Gulp.js configuration

import browserify from "browserify";
import babelify from "babelify";
import gulp from "gulp";
import source from "vinyl-source-stream";
import svg from "svg-browserify";
import buffer from "vinyl-buffer";
import sass from "gulp-sass";
import postcss from "gulp-postcss";
import cssnano from "cssnano";
import rename from "gulp-rename";
import uglify from "gulp-uglify";
import browserifyCss from "browserify-css";

const
	src = "src/",
	build = "dist/";

// CSS processing
function css() {
	var plugins = [
		cssnano()
	];

	return gulp.src(src + "/styles.sass")
		.pipe(
			sass({
				outputStyle: "nested",
				precision: 3,
				errLogToConsole: true
			}).on("error", sass.logError)
		)
		.pipe(postcss(plugins))
		.pipe(rename("styles.min.css"))
		.pipe(gulp.dest(build));
}

var bundleTask = function() {
	return browserify("index.js")
		.transform(babelify, {presets: ["@babel/preset-env"]})
		.transform(svg)
		.transform(browserifyCss)
		.bundle()
		.pipe(source("bundle.js"))
		.pipe(rename({ extname: ".min.js" }))
		.pipe(buffer())
		.pipe(uglify())
		.pipe(gulp.dest(build));
};

gulp.task("bundle", bundleTask);
gulp.task("css", css);

// run css and bundle tasks synchronously
gulp.task("build", gulp.series("css", "bundle"));

// watch for file changes
function watch(done) {
	// css changes
	gulp.watch(src + "/styles.sass", css);

	done();
}

gulp.task("watch", watch);

// default task
gulp.task("default", gulp.series("build", "watch"));
