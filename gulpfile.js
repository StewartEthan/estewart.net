// Dependencies
const babel   = require('gulp-babel');
const del     = require('del');
const gulp    = require('gulp');
const gutil   = require('gulp-util');
const jsh     = require('gulp-jshint');
const nodemon = require('gulp-nodemon'); 
const stylint = require('gulp-stylint');
const stylus  = require('gulp-stylus');
const uglify  = require('gulp-uglify');

// Error logging fn
const logErr = err => gutil.log(gutil.colors.red('[Error]'), err.toString());
const buildDir = 'public';

// Clean tasks
// For cleaning out the dist folder, either
// in parts or as a whole
gulp.task('clean:css', () => del([`${buildDir}/css`]));
gulp.task('clean:js', () => del([`${buildDir}/js`]));
gulp.task('clean', () => del([buildDir]));

// Build tasks
// - pipes Stylus files into CSS
// - transpiles JS files down to ES5 compatibility
gulp.task('build:css', () => {
  return gulp.src('assets/css/**/*.styl')
    .pipe(stylus({ compress:true }))
    .pipe(gulp.dest(`${buildDir}/css`))
    .on('error', logErr);
});
gulp.task('build:js', () => {
  return gulp.src('assets/js/**/*.js')
    .pipe(babel({ presets:['es2015'] }))
    .pipe(uglify())
    .pipe(gulp.dest(`${buildDir}/js`))
    .on('error', logErr);
});
gulp.task('build', gulp.series('build:css','build:js'));

// Eval tasks
// Useful for error checking in
// case of build fails or whatever
gulp.task('eval:js', () => {
  return gulp.src('assets/js/**/*.js')
    .pipe(jsh({esversion: 6}))
    .pipe(jsh.reporter('jshint-stylish'))
    .on('error', logErr);
});
gulp.task('eval:stylus', () => {
  return gulp.src('assets/css/**/*.styl')
    .pipe(stylint({ config: './.stylintrc' }))
    .pipe(stylint.reporter())
    .on('error', logErr);
});
gulp.task('eval', gulp.series('eval:js','eval:stylus'));

// Watch task
// For rebuilding assets on file changes
gulp.task('watch:css', () => {
  gulp.watch('assets/css/**/*.styl', gulp.series('build:css'));
});
gulp.task('watch:js', () => {
  gulp.watch('assets/js/**/*.js', gulp.series('build:js'));
});
gulp.task('watch', gulp.parallel('watch:css','watch:js'));

// Serve task
// Runs nodemon through gulp
gulp.task('serve', () => {
  return nodemon({
    script: './app.js',
    ignore: ['assets/',buildDir,'views/']
  });
});

// Default task
// 1. Clean out the dist folder
// 2. Build all assets
// 3. Watch for file changes
gulp.task('default', gulp.series('clean','build', gulp.parallel('watch','serve')));

