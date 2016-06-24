var gulp = require('gulp'),
  sass = require('gulp-sass'),
  rename = require('gulp-rename'),
  sourceMaps = require('gulp-sourcemaps');

/**
 * @name eslint task
 * @description runs command "eslint js/**" on cmd
 */
gulp.task('eslint', function () {
  var run = require('gulp-run');
  var cmd = new run.Command(`eslint js\\**`);
  cmd.exec();
});

/**
 * @name sass task
 * @description compiles sass file(s) to css file with source mapping
 */
gulp.task('sass', function () {
  return gulp.src('./styles/style.scss')
    .pipe(sourceMaps.init())
    .pipe(sass())
    .pipe(sourceMaps.write('./'))
    .pipe(gulp.dest('./styles'));
});

gulp.task('watch', function() {
    gulp.watch('sytles/*.scss', ['sass']);
});

gulp.task('default', ['eslint', 'sass']);
