const gulp = require('gulp');
const browserSync = require('browser-sync');
const sass = require('gulp-sass')(require('sass'));
const rename = require("gulp-rename");
const autoprefixer = require('gulp-autoprefixer');
const cleanCSS = require('gulp-clean-css');


// Static server
gulp.task('server', function () {
    browserSync.init({
        server: {
            baseDir: "src"
        }
    });
});

// Компиляция scss|sass => css в НЕсжатом стиле
gulp.task('styles', function (){
    return gulp.src("src/sass/*.+(scss|sass)")  // Взяли файл scss или sass
        .pipe(sass({outputStyle: 'expanded'}).on('error', sass.logError))  // Скомпилировали его в файл (.sass или .scss) в НЕсжатом стиле кода
        .pipe(autoprefixer({
			Browserslist: ['last 2 versions'],
            cascade: false
		}))
        .pipe(gulp.dest("src/css"));             // И положили файл (.sass или .scss) в папку css
});

// Компиляция scss|sass => css в сжатом стиле
gulp.task('styles_min', function (){
    return gulp.src("src/sass/*.+(scss|sass)")  // Взяли файл scss или sass
        .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))  // Скомпилировали его в файл (.sass или .scss) в сжатом стиле кода
        .pipe(rename({                      // Переименовали в .min.sass или .min.scss
            prefix: "",
            suffix: ".min",
        }))
        .pipe(autoprefixer({
			Browserslist: ['last 2 versions'],
            cascade: false
		}))
        .pipe(cleanCSS({compatibility: 'ie8'}))
        .pipe(gulp.dest("src/css"))             // И положили файл (.sass или .scss) в папку css
        .pipe(browserSync.stream());            // После изменения файла запустить browserSync
});

gulp.task('watch', function (){
    // Наблюдать за файлами. Если произошло событие "Изменение", то запустить функцию
    gulp.watch("src/sass/*.+(scss|sass)").on("change", gulp.parallel('styles', 'styles_min'))
    gulp.watch("src/*.html").on("change", browserSync.reload)
    // gulp.watch("src/sass/*.+(scss|sass)", gulp.parallel('styles'))
    // gulp.watch("src/*.html").on("change", browserSync.reload)
})

gulp.task('default', gulp.parallel('watch', 'server', 'styles', 'styles_min'));