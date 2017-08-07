// Dependencies
const babel   = require('gulp-babel');
const del     = require('del');
const gulp    = require('gulp');
const gutil   = require('gulp-util');
// const jsh     = require('gulp-jshint');
const nodemon = require('gulp-nodemon'); 
const stylint = require('gulp-stylint');
const stylus  = require('gulp-stylus');
const uglify  = require('gulp-uglify');

// Vars/helper functions
const assetTypes = ['css','fonts','img','js'];
const buildDir = 'public';
const gulpTask = process.argv.slice(2) || 'default';

const getTasks = task => assetTypes.map(type => `${task}:${type}`);
const logErr = err => gutil.log(gutil.colors.red('[Error]'), err.toString());

// Clean tasks
// For cleaning out the dist folder, either
// in parts or as a whole
assetTypes.forEach(dir => {
  gulp.task(`clean:${dir}`, () => del([`${buildDir}/${dir}/**/*`]));
});
gulp.task('clean', gulp.parallel(...getTasks('clean')));

// Build tasks
// - pipes Stylus files into CSS
// - transpiles JS files down to ES5 compatibility
// - moves fonts and images to public directory
gulp.task('build:css', () => {
  return gulp.src('assets/css/**/*.styl')
    .pipe(stylus({ compress: gulpTask === 'prod' }))
    .pipe(gulp.dest(`${buildDir}/css`))
    .on('error', logErr);
});
gulp.task('build:fonts', () => {
  return gulp.src('assets/fonts/**/*')
    .pipe(gulp.dest(`${buildDir}/fonts`))
    .on('error', logErr);
});
gulp.task('build:img', () => {
  return gulp.src('assets/img/**/*')
    .pipe(gulp.dest(`${buildDir}/img`))
    .on('error', logErr);
});
gulp.task('build:js', () => {
  return gulp.src('assets/js/**/*.js')
    .pipe(babel({ presets:['es2015'] }))
    .pipe(gulpTask === 'prod' ? uglify() : gutil.noop())
    .pipe(gulp.dest(`${buildDir}/js`))
    .on('error', logErr);
});
gulp.task('build', gulp.parallel(...getTasks('build')));

// // Eval tasks
// // Useful for error checking in
// // case of build fails or whatever
// gulp.task('eval:js', () => {
//   return gulp.src('assets/js/**/*.js')
//     .pipe(jsh({esversion: 6}))
//     .pipe(jsh.reporter('jshint-stylish'))
//     .on('error', logErr);
// });
// gulp.task('eval:stylus', () => {
//   return gulp.src('assets/css/**/*.styl')
//     .pipe(stylint({ config: './.stylintrc' }))
//     .pipe(stylint.reporter())
//     .on('error', logErr);
// });
// gulp.task('eval', gulp.series('eval:js','eval:stylus'));

// Watch task
// For rebuilding assets on file changes
assetTypes.forEach(dir => {
  gulp.task(`watch:${dir}`, () => {
    gulp.watch(`assets/${dir}/**/*`, gulp.series(`build:${dir}`));
  });
});
gulp.task('watch', gulp.parallel(...getTasks('watch')));

// Rebuild task
// Shortcut to clean, then build
gulp.task('rebuild', gulp.series('clean','build'));

// Serve task
// Runs nodemon through gulp
gulp.task('serve', () => {
  return nodemon({
    script: './app.js',
    ignore: ['assets/',buildDir,'views/']
  });
});

// Prod task
// For deploying on production
gulp.task('prod', gulp.series('clean','build'));

// Default task
// 1.  Clean out the dist folder
// 2.  Build all assets
// 3a. Watch for file changes
// 3b. Serve the app
gulp.task('default', gulp.series('clean','build', gulp.parallel('watch','serve')));