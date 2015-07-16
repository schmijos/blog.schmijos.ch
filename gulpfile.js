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

gulp.task('build_index_content', function () {
  var sources = gulp.src(['./.tmp/articles/*.html']);
  var target = gulp.src('./.tmp/index.html');
  var options = {
    starttag: '<!-- inject:articles:{{ext}} -->',
    transform: function (filePath, file) {
      return file.contents.toString('utf8')
    }
  };

  return target.pipe(inject(sources, options))
               .pipe(gulp.dest('./.tmp/'));
});

gulp.task('build_index_links', function () {
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

gulp.task('markdown', function () {
  gulp.src(['./src/articles/*.md'])
    .pipe(markdown())
    .pipe(gulp.dest('./.tmp/articles'));
});

gulp.task('html', function () {
  gulp.src(['./src/**/*.html'])
    .pipe(gulp.dest('./.tmp'));
});

gulp.task('copy_dist', function() {
  gulp.src(['./.tmp/**/*.html'])
    .pipe(gulp.dest('./dist'));
});

gulp.task('build_index', ['build_index_content', 'build_index_links']);
gulp.task('build', ['html', 'markdown', 'build_index', 'copy_dist']);
gulp.task('default', ['connect', 'watch']);
