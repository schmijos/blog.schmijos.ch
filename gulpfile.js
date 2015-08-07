var del = require('del');
var fs = require('fs');
var gulp = require('gulp');
var connect = require('gulp-connect');
var inject = require('gulp-inject');
var markdown = require('gulp-markdown');

gulp.task('default', ['connect', 'watch']);

gulp.task('connect', function() {
  connect.server({
    root: 'dist',
    livereload: true
  });
});

gulp.task('reload', function () {
  gulp.src(['./dist/*.html'])
    .pipe(connect.reload());
});

gulp.task('watch', function () {
  gulp.watch(['./src/**/*.html', './src/**/*.md'], ['build', 'reload']);
});

gulp.task('clean:dist', function(cb) { del(['dist'], cb); });
gulp.task('clean:tmp', function(cb) { del(['.tmp'], cb); });
gulp.task('clean', ['clean:tmp', 'clean:dist']);

/* PRECOMPILATION - copying into .tmp/ */
gulp.task('precompile:prepare', ['clean:tmp']);

gulp.task('html', ['precompile:prepare'], function () {
    return gulp.src(['./src/**/*.html'])
        .pipe(gulp.dest('./.tmp'));
});

gulp.task('markdown', ['precompile:prepare'], function () {
    return gulp.src(['./src/articles/*.md'])
        .pipe(markdown())
        .pipe(gulp.dest('./.tmp/articles'));
});

gulp.task('precompile', ['html', 'markdown']);


/* COMPILATION - operating in .tmp/ */

gulp.task('inject_index_content', ['precompile'], function () {
  var articles = fs.readdirSync('./.tmp/articles/');
  var newest_article = articles[articles.length - 1];
  var sources = gulp.src('./.tmp/articles/' + newest_article);
  var target = gulp.src('./.tmp/index.html');
  var options = {
    starttag: '<!-- inject:article_content -->',
    transform: function (filePath, file) {
      return file.contents.toString('utf8')
    }
  };

  return target.pipe(inject(sources, options))
               .pipe(gulp.dest('./.tmp/'));
});

gulp.task('inject_index_links', ['inject_index_content'], function () {
    var sources = gulp.src(['./.tmp/articles/*.html']);
    var target = gulp.src('./.tmp/index.html');
    var options = {
        starttag: '<!-- inject:article_links -->',
        transform: function (filePath, file) {
            return '<li>'+filePath.toString('utf8')+'</li>'
        }
    };

    return target.pipe(inject(sources, options))
        .pipe(gulp.dest('./.tmp/'));
});

gulp.task('build_index', ['inject_index_content', 'inject_index_links']);

/* BUILDING - copying into dist/ */

gulp.task('copy_dist', ['clean:dist'], function() {
  gulp.src(['./.tmp/**/*.html']).pipe(gulp.dest('./dist'));
  return gulp.src(['./bower_components/**/dist/**/*.*'], {
      base: './'
  }).pipe(gulp.dest('./dist'));
});


gulp.task('build', ['build_index'], function() {
  gulp.start('copy_dist');
});
