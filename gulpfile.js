var gulp = require('gulp'),
  gutil = require('gulp-util'),
  spsave = require('gulp-spsave'),
  webpack = require('webpack'),
  git = require('gulp-git');
var creds = require("./settings.js");
var src = process.cwd();
var assets = process.cwd() + '/Webpack-SimpleDemo-Dist';

var release = require('gulp-git-release');
 
gulp.task('release',['pack'], function() {
    return gulp.src('dist/**/*')
        .pipe(release({
            prefix: 'dist',
            release: true,
            debug: false,
            repository: 'https://github.com/jiyuan12354/Webpack-SimpleDemo-Dist.git',
            bumpVersion: false
        }));
});

//run webpack pack
gulp.task('pack', function (cb) {
  var _conf = require('./webpack.prod.config.js');
  webpack(_conf, function (err, stats) {
    if (err) throw new gutil.PluginError('webpack', err)
    gutil.log('[webpack]', stats.toString({ colors: true }))
    cb();
  });
});

//deploy assets to remote sharepoint site
gulp.task('deploy',['clone'], function () {
    return gulp.src(assets + '/**')
      .pipe(spsave({
        siteUrl: 'https://nokia.sharepoint.com/sites/O365KMPOC',
        folder: "SiteAssets/SimpleDemo"
      }, creds));
})

// Clone a remote repo 
gulp.task('clone', function(cb){
  git.clone('https://github.com/jiyuan12354/Webpack-SimpleDemo-Dist.git', function (err) {
    if (err) throw err;
    cb();
  });
});

//default task
gulp.task('default',['release'])
// gulp.task('default',['deploy'])

