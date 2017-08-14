// Author : Chathu Vishwajith
// Licence : MIT License
// http://opensource.org/licenses/MIT

const gulp = require('gulp'),
  nodemon = require('gulp-nodemon'),
  livereload = require('gulp-livereload');

gulp.task('serve', function() {
  livereload.listen();
  nodemon({
    script: 'index.js',
    ext: 'js',
    env: {
      NODE_ENV: "dev",
      PORT: 9080,
      JWT_TOKEN_EXPIRE_TIME: '1h'
    },
    ignore: ['./node_modules/**']
  }).on('restart', function() {
    // when the app has restarted, run livereload.
    gulp.src('index.js').pipe(livereload());
  });
});
