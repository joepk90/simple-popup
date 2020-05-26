var gulp = require('gulp'),
    clean = require('gulp-clean'),
    sass = require('gulp-sass'),
    // sassdoc = require('sassdoc'),
    sourcemaps = require('gulp-sourcemaps'),
    autoprefixer = require('gulp-autoprefixer'),
    plumber = require('gulp-plumber'),
    watch = require('gulp-watch'),
    rename = require('gulp-rename'),
    minifycss = require('gulp-minify-css'),
    parker = require('gulp-parker'),
    uglify = require('gulp-uglify'),
    concat = require('gulp-concat'),
    jshint = require('gulp-jshint'),
    stylish = require('jshint-stylish'),
    svgmin = require('gulp-svgmin'),
    svgstore = require('gulp-svgstore'),
    svgfallback = require('gulp-svgfallback'),
    amdOptimize = require('gulp-es6-amd'),
    browserSync = require('browser-sync').create(),

    basepaths = {
        src: 'source',
        dest: 'Simple_Popup/includes',
        node: 'node_modules'
    },

    paths = {
        js: {
            src: basepaths.src + '/js',
            dest: basepaths.dest + '/js'
        },
        css: {
            src: basepaths.src + '/scss',
            dest: basepaths.dest + '/css'
        },
        images: {
            src: basepaths.src + '/img',
            dest: basepaths.dest + '/img'
        },
        svgs: {
            src: basepaths.src + '/svg',
            dest: basepaths.dest + '/svg'
        }
    };

var requireConfig = {
    baseUrl: __dirname
};
var options = {
    umd: false
};

/*
  Styles - Clean
*/
gulp.task('clean-styles', function () {
    return gulp.src('style.css', {read: false})
        .pipe(clean());
});

/*
  Styles Task
*/
gulp.task('styles', ['clean-styles'], function() {
    gulp.src(paths.css.src + '/**/*.scss')
        .pipe(plumber({
            errorHandler: function(error) {
                console.log('Styles Error: ' + error.message);
                this.emit('end');
            }
        }))
        .pipe(sourcemaps.init())
        // .pipe(sassdoc())
        .pipe(sass())
        .pipe(autoprefixer('last 2 version'))
        .pipe(minifycss())
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest(paths.css.dest))
        .pipe(browserSync.stream());
});

/*
  Scripts - Clean
*/
gulp.task('clean-scripts', function () {

    return gulp.src(paths.js.dest + '/all.min.js', {read: false})
        .pipe(clean());

});

/*
  Scripts - Hint
*/
gulp.task('hint', function() {

    return gulp.src(paths.js.src + '/**/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter(stylish))
        .pipe(jshint.reporter('fail'));

});

/*
  Scripts - Concat and Uglify
*/
gulp.task('scripts', ['clean-scripts', 'hint' ], function () {

    return gulp.src([
        paths.js.src + '/**/*.js'
    ], {base: requireConfig.baseUrl})
        .pipe(sourcemaps.init())
        .pipe(plumber({
            errorHandler: function (error) {
                console.log('Scripts Error: ' + error.message);
                this.emit('end');
            }
        }))

        .on('error', console.log)
        .pipe(amdOptimize(requireConfig, options))
        .pipe(uglify())
        .pipe(concat('./all.min.js'))
        .pipe(sourcemaps.write())

        .pipe(gulp.dest(paths.js.dest))
        // .pipe(browserSync.stream({match: '**/*.js'}));

});

/*
  Scripts - Concat and Uglify
*/
gulp.task('vendor-scripts', function () {

    return gulp.src([
        basepaths.node + '/js-cookie/src/js.cookie.js'
    ], )
        .on('error', console.log)
        .pipe(amdOptimize(requireConfig, options))
        .pipe(uglify())
        .pipe(gulp.dest(paths.js.dest))
        // .pipe(browserSync.stream({match: '**/*.js'}));

});

// create a task that ensures the `js` task is complete before
// reloading browsers
// gulp.task('scripts-watch', function (done) {
//     console.log('do I get here?');
//     browserSync.reload();
//     done();
// });

/*
	SVG - Sprite and Minify
*/
gulp.task('svg', function() {
    return gulp.src(paths.svgs.src + '/**/*.svg')
        .pipe(svgmin(function (file) {
            return {
                plugins: [{
                    cleanupIDs: {
                        minify: true
                    }
                }]
            }
        }))
        .pipe(svgstore())
        //.pipe(svgfallback())
        .pipe(gulp.dest(paths.svgs.dest));
});

/*
 Default and Watch Task
 */
gulp.task('serve', ['styles', 'scripts', 'vendor-scripts'], function() {

    browserSync.init({
        host: '217.138.40.26',
        browser: "google chrome",
        open: true,
    });

    gulp.watch(paths.css.src + '/**/*.scss', ['styles']);
    gulp.watch(paths.js.src + '/**/*.js', ['scripts']);
    // gulp.watch(paths.svgs.src + '/**/*.svg', ['svg']);
});

/*
 Default and Watch Task
 */
gulp.task('default', ['serve']);
