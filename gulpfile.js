var gulp = require('gulp');
var connect = require('gulp-connect');
var inject = require('gulp-inject');
var markdown = require('gulp-markdown');

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
  gulp.watch(['./src/**/*.html'], ['build', 'reload']);
});

gulp.task('build_index', function () {
  var sources = gulp.src(['./.tmp/articles/*.html']);
  var target = gulp.src('./.tmp/index.html');
  var options = {
    starttag: '<!-- inject:articles:{{ext}} -->',
    transform: function (filePath, file) {
      return file.contents.toString('utf8')
    }
  };

  return target.pipe(inject(sources, options))
               .pipe(gulp.dest('./dist/'));
});

gulp.task('markdown', function () {
  gulp.src(['./src/articles/*.md'])
    .pipe(markdown())
    .pipe(gulp.dest('./.tmp/articles'));
});

gulp.task('html', function () {
  gulp.src(['./src/**/*.html'])
    .pipe(gulp.dest('./.tmp'));
});

gulp.task('build', ['html', 'markdown', 'build_index']);
gulp.task('default', ['connect', 'watch']);
