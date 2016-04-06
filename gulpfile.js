var gulp         = require("gulp");
var browserSync  = require("browser-sync").create();
var compass      = require("gulp-compass");
var uglify       = require("gulp-uglify");
var rename       = require("gulp-rename");
var autoprefixer = require("gulp-autoprefixer");
gulp.task("server",function(){

    browserSync.init({
        server : {
            baseDir : "./"
        }
    });

});

gulp.task("html",["server"],function(){

    gulp.watch("./*.html",browserSync.reload);

});


gulp.task('compass',["server"], function() {

    function buildcompass(src){

        return gulp.src(src)
          .pipe(compass({
            css: 'css',
            sass: 'sass',
            image : "images",
            relative : true,
            style : "compressed",
            javascript : "js"　
          }))
          .on("error",function(err){
            console.log(err);
          })
          .pipe(autoprefixer({
              browsers: ['ie 8-10','Firefox >= 20','Chrome >= 30','iOS >= 6','Android >= 4'],
              cascade: false
          }))
          .pipe(browserSync.stream())
          .pipe(gulp.dest('./css'));

    }

    gulp.watch("./sass/*.scss")

        .on("change",function(e){

            buildcompass("./sass/*.scss");

        });

    return buildcompass("./sass/*.scss");
});

// gulp.task("js",["server"],function(){

//  function buildjs(src){
//      return gulp.src(src)
//        .pipe(uglify())
//        .pipe(gulp.dest('dist/all.js'));
//  }

// });

gulp.task('default',['server','compass','html']);