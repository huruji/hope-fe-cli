// const gulp = require('gulp');
// const concat = require('gulp-concat');
// const browserSync = require('browser-sync').create();
// const compass = require('gulp-compass');
// const runSequence = require('run-sequence');
// const cleanCSS = require('gulp-clean-css');
// const include = require('gulp-include');
// const del = require('del');
// const autoprefixer = require('gulp-autoprefixer');
// const uglify = require('gulp-uglify');
// const imagemin = require('gulp-imagemin');
// const sass = require('gulp-sass');

// const BASE_PATH = './src/ui';
// const path = require('path');

// gulp.task('default', function() {
//     return runSequence(['clean'],['build'],['server','watch']);
// });
// gulp.task('clean', function() {
//     return del('./src/ui/dist/*',function() {
//         console.log('task clean completed');
//     })
// });
// gulp.task('build', function () {
//     return runSequence(['sass', 'img', 'html','uglify-js'], function() {
//         console.log('task build is completed!');
//     });
// });

// gulp.task('img', function() {
//     return gulp.src('./src/ui/src/img/**/*.*')
//       .pipe(imagemin())
//       .pipe(gulp.dest('./src/ui/dist/img/'))
//       .pipe(gulp.dest('./src/public/img/'))
// });

// gulp.task('uglify-js', function() {
//     return gulp.src(['./src/ui/src/js/**/*.js','!./src/ui/src/js/**/*.min.js'])
//     .pipe(uglify())
//     .pipe(gulp.dest('./src/ui/dist/js/'))
//       .pipe(gulp.dest('./src/public/js'));
// });

// gulp.task('server', function() {
//     browserSync.init({
//         server:'./src/ui/dist/',
//         port: 8001
//     });
// });

// gulp.task('reload', function() {
//     return browserSync.reload();
// });


// gulp.task('sass', function() {
//   return gulp.src('./src/ui/src/sass/**/*.scss')
//     .pipe(sass({outputStyle:'compressed'}).on('error',sass.logError))
//     .pipe(cleanCSS())
//     .pipe(autoprefixer({
//       browsers: ['last 5 versions'],
//       cascade: false
//     }))
//     .pipe(gulp.dest('./src/ui/src/css'))
//     .pipe(gulp.dest('./src/ui/dist/css'))
//     .pipe(gulp.dest('./src/public/css'));
// });

// gulp.task('html', function() {
//     return gulp.src('./src/ui/src/html/*.html')
//         .pipe(include())
//         .pipe(gulp.dest('./src/ui/dist/'));
// });

// gulp.task('watch', function() {
//     return gulp.watch([
//         './src/ui/src/**/*.*'
//     ], function() {
//         return runSequence(['build'],['reload']);
//     });
// });

const gulp = require('gulp');
const concat = require('gulp-concat');
const browserSync = require('browser-sync').create();
const compass = require('gulp-compass');
const runSequence = require('run-sequence');
const cleanCSS = require('gulp-clean-css');
const include = require('gulp-include');
const del = require('del');
const autoprefixer = require('gulp-autoprefixer');
const uglify = require('gulp-uglify');
const imagemin = require('gulp-imagemin');
const sass = require('gulp-sass');
const spritesmith = require('gulp.spritesmith');

const path = require('path');
const fs = require('fs');

gulp.task('default', function() {
    return runSequence(['clean'],['build'],['server','watch']);
});
gulp.task('clean', function() {
    return del('./dist/*',function() {
        console.log('task clean completed');
    })
});
gulp.task('build', function () {
    return runSequence(['sass', 'img', 'html','uglify-js', 'sprites'], function() {
        console.log('task build is completed!');
    });
});

gulp.task('img', function() {
    return gulp.src(['./src/img/**/*.*','!./src/img/sprites/**/*.*'])
      .pipe(imagemin())
      .pipe(gulp.dest('./dist/img/'))
});

gulp.task('sprites', function() {
    const dirs = fs.readdirSync('./src/img/sprites');
    const spritesTasks = [];
    dirs.forEach((dir)=> {
        if(fs.statSync(path.join('./src/img/sprites',dir)).isDirectory){
            spritesTasks.push(`sprites${dir}`)
            gulp.task(`sprites${dir}`, function() {
                return gulp.src(`./src/img/sprites/${dir}/*.png`)
                .pipe(spritesmith({
                    imgName:`${dir}.png`,
                    cssName:`sprites-css/${dir}.css`,
                    padding:5,
                    algorithm:'top-down',
                    cssTemplate: function (data) {
                        const arr=[];
                        data.sprites.forEach(function (sprite) {
                        arr.push(".icon-"+sprite.name+
                            "{" +
                            "background-image: url('"+sprite.escaped_image+"');"+
                            "background-position: "+sprite.px.offset_x+"px "+sprite.px.offset_y+"px;"+
                            "width:"+sprite.px.width+";"+
                            "height:"+sprite.px.height+";"+
                            "}\n");
                       });
                   return arr.join("");
                    }
                }))
                .pipe(gulp.dest(`./dist/img/`));
            })
        }
    });
     return runSequence(spritesTasks);
});



gulp.task('uglify-js', function() {
    return gulp.src(['./src/js/**/*.js','!./src/js/**/*.min.js'])
    .pipe(uglify())
    .pipe(gulp.dest('./dist/js/'))
});

gulp.task('server', function() {
    browserSync.init({
        server:'./dist/',
        port: 8001
    });
});

gulp.task('reload', function() {
    return browserSync.reload();
});



gulp.task('sass', function() {
  return gulp.src('./src/sass/**/*.scss')
    .pipe(sass({outputStyle:'compressed'}).on('error',sass.logError))
    .pipe(cleanCSS())
    .pipe(autoprefixer({
      browsers: ['last 5 versions'],
      cascade: false
    }))
    .pipe(gulp.dest('./dist/css'))
});

gulp.task('html', function() {
    return gulp.src('./src/html/*.html')
        .pipe(include())
        .pipe(gulp.dest('./dist/'));
});

gulp.task('watch', function() {
    return gulp.watch([
        './src/**/*.*'
    ], function() {
        return runSequence(['build'],['reload']);
    });
});
