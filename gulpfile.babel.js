import gulp from 'gulp'
import pkg from './package.json'
import header from 'gulp-header'
import del from 'del'
import concat from 'gulp-concat'
import * as jasmineBrowser from 'gulp-jasmine-browser'
import fs from 'fs-extra'
import markdown from 'gulp-markdown'
import watch from 'gulp-watch'
import dotenv from 'dotenv'

gulp.task('env', done => {
  fs.stat('.env', (err, stat) => {
    if (err === null && stat.size > 1) {
      console.log('*Found .env file; incorporating user auth data into specs.*')
      console.log('NOTE: if your user is not Premium with R-18 enabled some specs will fail.')
      const envConfig = dotenv.parse(fs.readFileSync('.env'))
      for (const k in envConfig) {
        process.env[k] = envConfig[k]
      }

      const output = `
        let userInfo = {
          auth_user: '${process.env.USERNAME}',
          email: '${process.env.EMAIL}',
          password: '${process.env.PASSWORD}',
          auth_token: '${process.env.AUTH_TOKEN}'
        };
        let premiumUserInfo = {
          auth_user: '${process.env.PREMIUM_USERNAME}',
          email: '${process.env.PREMIUM_EMAIL}',
          password: '${process.env.PREMIUM_PASSWORD}',
          auth_token: '${process.env.PREMIUM_AUTH_TOKEN}'
        };
      `
      fs.ensureFileSync('tmp/authinfo.js')
      fs.writeFileSync('tmp/authinfo.js', output)
    } else {
      console.log('*.env file not found or empty; only some specs will run.*')
      console.log('Check the \'.env\' secion in README.md for details on how to set .env')
      fs.ensureFileSync('tmp/authinfo.js')
      fs.writeFileSync('tmp/authinfo.js', '')
    }
  })
  done()
})

const banner =
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
  '*/\n'
gulp.task('banner-js', () => {
  return gulp
    .src('dist/js/*.js')
    .pipe(header(banner, { pkg }))
    .pipe(gulp.dest('dist/js/'))
})
gulp.task('banner-css', () => {
  return gulp
    .src('dist/css/*.css')
    .pipe(header(banner, { pkg }))
    .pipe(gulp.dest('dist/css/'))
})
gulp.task('banner',
  gulp.series(gulp.parallel('banner-js', 'banner-css'))
)

gulp.task('clean-dist', done => {
  del.sync('dist/**/*')
  done()
})
gulp.task('clean-spec', done => {
  del.sync('build/spec/**/*.js')
  done()
})
gulp.task('clean',
  gulp.parallel('clean-dist', 'clean-spec')
)

gulp.task('copy-dist-to-docs', () => {
  return gulp
    .src('dist/**/*')
    .pipe(gulp.dest('docs'))
})

gulp.task('copy-img', () => {
  return gulp
    .src('src/img/**/*')
    .pipe(gulp.dest('dist/img'))
})
gulp.task('copy',
  gulp.series(gulp.parallel('copy-img'))
)

gulp.task('concat-spec', () => {
  const file = fs.readFileSync('build/spec/fixture/index.html', 'utf8')
  fs.writeFileSync('build/spec/fixture/html.js', `var html = \`${file}\``)
  return gulp
    .src(['spec/helpers/method.js', 'build/spec/fixture/html.js'])
    .pipe(concat('html_in_method.js'))
    .pipe(gulp.dest('build/spec/fixture'))
})

gulp.task('md2html', () => {
  return gulp
    .src(['README.md'])
    .pipe(markdown())
    .pipe(gulp.dest('dist'))
})

gulp.task('jasmine', () => {
  const testFiles = [
    'node_modules/clipboard/dist/clipboard.js',
    'node_modules/cross-storage/dist/client.js',
    'node_modules/jquery/dist/jquery.js',
    'node_modules/jasmine-jquery/lib/jasmine-jquery.js',
    'node_modules/jquery-watch/jquery-watch.js',
    'node_modules/keysim/dist/keysim.js',
    'dist/js/emojidex.js',
    'spec/helpers/data.js',
    'build/spec/fixture/html_in_method.js',
    'tmp/authinfo.js',
    'dist/img/logo.png',
    'dist/css/document.min.css',
    'dist/css/emojidex.min.css',
    // 'spec/emojidex-autocomplete.js',
    'spec/palette/*.js',
    // 'spec/palette/indexes.js',
    // 'spec/palette/base.js',
    // 'spec/emojidex-replace.js'
  ]
  return gulp.src(testFiles)
    .pipe(watch(testFiles))
    .pipe(jasmineBrowser.specRunner())
    // Require random flag, ex: localhost:8888/?random=false
    .pipe(jasmineBrowser.server())
})

gulp.task('build',
  gulp.series('md2html', 'copy', 'banner', 'copy-dist-to-docs')
)

gulp.task('spec',
  gulp.series('build', 'env', 'concat-spec', 'jasmine')
)

gulp.task('test-prepare',
  gulp.series('build', 'env', 'concat-spec')
)
