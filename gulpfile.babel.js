import gulp from 'gulp';
import pkg from './package.json';
import header from 'gulp-header';
import del from 'del';
import concat from 'gulp-concat';
import * as jasmineBrowser from 'gulp-jasmine-browser';
import fs from 'fs-extra';
import markdownDocs from 'gulp-markdown-docs';
import watch from 'gulp-watch';

gulp.task('env', (done) => {
  fs.stat('.env', (err, stat) => {
    if (err === null) {
      console.log("*Found .env file; incorporating user auth data into specs.*");
      console.log("NOTE: if your user is not Premium with R-18 enabled some specs will fail.");
      const dotenv = require('dotenv')
      const envConfig = dotenv.parse(fs.readFileSync('.env'))
      for (var k in envConfig) {
        process.env[k] = envConfig[k]
      }
      let output = `
        let userInfo = {
          auth_user: '${process.env.USERNAME}',
          email: '${process.env.EMAIL}',
          password: '${process.env.PASSWORD}',
          auth_token: '${process.env.AUTH_TOKEN}'
        };
        let premiumUserInfo = {
          auth_user: '${process.env.USERNAME}',
          auth_token: '${process.env.AUTH_TOKEN}'
        };
      `;
      fs.ensureFileSync('tmp/authinfo.js');
      fs.writeFileSync('tmp/authinfo.js', output);
    } else {
      console.log("*.env file not found; only some specs will run.*");
      console.log("Check the '.env' secion in README.md for details on how to set .env");
      fs.ensureFileSync('tmp/authinfo.js');
      fs.writeFileSync('tmp/authinfo.js', '');
    }
  });
  done();
});

let banner =
  '/*\n' +
  ' * <%= pkg.title || pkg.name %> - v<%= pkg.version %>\n' +
  ' * <%= pkg.description %>\n' +
  ' * <%= pkg.homepage %>\n' +
  ' *\n' +
  ' * Includes:\n' +
  ' *   emojidexReplace, emojidexAutocomplete\n' +
  ' *\n' +
  ' * =LICENSE=\n' +
  ' * <%= pkg.license.description %>\n' +
  ' * <%= pkg.license.url %>\n' +
  ' *\n' +
  ' * <%= pkg.license.copyright %>\n' +
  ' *\n' +
  ' *\n' +
  ' * Includes:\n' +
  ' * --------------------------------\n' +
  '*/\n';
gulp.task('banner-js', () => {
  return gulp
    .src('docs/js/*.js')
    .pipe(header(banner, { pkg: pkg }))
    .pipe(gulp.dest('docs/js/'));
});
gulp.task('banner-css', () => {
  return gulp
    .src('docs/css/*.css')
    .pipe(header(banner, { pkg: pkg }))
    .pipe(gulp.dest('docs/css/'));
});
gulp.task('banner',
  gulp.series(gulp.parallel('banner-js', 'banner-css'))
);

gulp.task('clean-docs', (done) => {
  del.sync('docs/**/*');
  done();
});
gulp.task('clean-spec', (done) => {
  del.sync('build/spec/**/*.js');
  done();
});
gulp.task('clean',
  gulp.parallel('clean-docs', 'clean-spec')
);

gulp.task('md2html', () => {
  return gulp
    .src(['README.md'])
    .pipe(markdownDocs('index.html', {
      layoutStylesheetUrl: '',
      templatePath: 'docs/index.html'
    }))
    .pipe(gulp.dest('docs'));
});

gulp.task('copy-img', () => {
  return gulp
    .src('src/img/**/*')
    .pipe(gulp.dest('docs/img'));
});
gulp.task('copy',
  gulp.series(gulp.parallel('copy-img'))
);

gulp.task('concat-spec', () => {
  let file = fs.readFileSync('build/spec/fixture/index.html', 'utf8');
  fs.writeFileSync('build/spec/fixture/html.js', `var html = \`${file}\``);
  return gulp
    .src(['spec/helpers/method.js', 'build/spec/fixture/html.js'])
    .pipe(concat('html_in_method.js'))
    .pipe(gulp.dest('build/spec/fixture'));
});

gulp.task('jasmine', () => {
  let testFiles = [
    'node_modules/cross-storage/dist/client.js',
    'node_modules/jquery/dist/jquery.js',
    'node_modules/jasmine-jquery/lib/jasmine-jquery.js',
    'node_modules/jquery-watch/jquery-watch.js',
    'node_modules/keysim/dist/keysim.js',
    'docs/js/emojidex.js',
    'spec/helpers/data.js',
    'build/spec/fixture/html_in_method.js',
    'tmp/authinfo.js',
    'docs/img/logo.png',
    'docs/css/document.min.css',
    'docs/css/emojidex.min.css',
    'spec/emojidexAutocomplete.js',
    'spec/palette/*.js',
    'spec/emojidexReplace.js'
  ];
  return gulp.src(testFiles)
    .pipe(watch(testFiles))
    .pipe(jasmineBrowser.specRunner())
    // Require random flag, ex: localhost:8888/?random=false
    .pipe(jasmineBrowser.server())
});

gulp.task('build',
  gulp.series('md2html', 'copy', 'banner')
);

gulp.task('spec',
  gulp.series('md2html', 'copy', 'banner', 'env', 'concat-spec', 'jasmine')
);