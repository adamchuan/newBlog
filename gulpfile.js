var gulp = require("gulp");
var gutil = require("gulp-util");
var browserSync = require("browser-sync").create();
var compass = require("gulp-compass");
var uglify = require("gulp-uglify");
var rename = require("gulp-rename");
var autoprefixer = require("gulp-autoprefixer");
var webpack = require("webpack");
var WebpackDevServer = require("webpack-dev-server");
var webpackConfig = require("./webpack.config.js");


gulp.task("webpack-dev-server", function(callback) {

    // Start a webpack-dev-server
    new WebpackDevServer(webpack(webpackConfig), {
        publicPath: "http://127.0.0.1:8080/js",
        stats: {
            colors: true,
            hot: true,
        }
    }).listen(8080, "localhost", function(err) {
        if (err) throw new gutil.PluginError("webpack-dev-server", err);
        gutil.log("[webpack-dev-server]", "http://localhost:8080/webpack-dev-server/index.html");
    });
});

gulp.task("html", ["server"], () => {
    gulp.watch("./*.html", browserSync.reload);
});

gulp.task('compass', function() {

    function buildcompass(src) {

        return gulp.src(src)
            .pipe(compass({
                css: 'css',
                sass: 'sass',
                image: "images",
                relative: true,
                style: "compressed",
                javascript: "js",
            }))
            .on("error", function(err) {
                console.log(err);
            })
            .pipe(autoprefixer({
                browsers: ['ie 8-10', 'Firefox >= 20', 'Chrome >= 30', 'iOS >= 6', 'Android >= 4'],
                cascade: false
            }))
            // .pipe(browserSync.stream())
            .pipe(gulp.dest('./css'));

    }

    gulp.watch("./sass/*.scss")

    .on("change", function(e) {

        buildcompass("./sass/*.scss");

    });

    return buildcompass("./sass/*.scss");
});

gulp.task("js", ["server"], function() {

    function buildjs(src) {
        return gulp.src(src)
            .pipe(uglify())
            .pipe(gulp.dest('dist/all.js'));
    }

});

// gulp.task('default', ['server', 'webpack', 'html']);

gulp.task('default', ['compass', 'webpack-dev-server']);