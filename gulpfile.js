import gulp from 'gulp';
import sass from 'sass';
import gulpSass from 'gulp-sass';
import postcss from 'gulp-postcss';
import autoprefixer from 'autoprefixer';
import cleanCSS from 'gulp-clean-css';
import sourcemaps from 'gulp-sourcemaps';
import rename from 'gulp-rename';

const sassProcessor = gulpSass(sass);

// Compile SCSS to CSS
function compileSass() {
  return gulp
    .src('scss/**/*.scss')
    .pipe(sourcemaps.init())
    .pipe(sassProcessor().on('error', sassProcessor.logError))
    .pipe(postcss([autoprefixer()]))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('dist/css'))
    .pipe(cleanCSS())
    .pipe(rename({ suffix: '.min' }))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('dist/css'));
}

// Watch for changes
function watch() {
  gulp.watch('scss/**/*.scss', compileSass);
}

// Export tasks
export const css = compileSass;
export const watchTask = watch;
export default css;
