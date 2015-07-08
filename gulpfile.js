var gulp = require('gulp');
var connect = require('gulp-connect');
var inject = require('gulp-inject');

gulp.task('connect', function() {
  connect.server({
    root: 'dist',
    livereload: true
  });
});
 
gulp.task('html', function () {
  gulp.src('./dist/*.html')
    .pipe(connect.reload());
});
 
gulp.task('watch', function () {
  gulp.watch(['./src/**/*.html'], ['build', 'html']);
});

gulp.task('build', function () {
  var sources = gulp.src(['./src/articles/*.html']);
  var target = gulp.src('./src/index.html');
  var options = {
    starttag: '<!-- inject:articles:{{ext}} -->',
    transform: function (filePath, file) {
      return file.contents.toString('utf8')
    }
  };

  return target.pipe(inject(sources, options))
               .pipe(gulp.dest('./dist/'));
});
 
gulp.task('default', ['connect', 'watch']);
