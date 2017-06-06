var gulp = require('gulp'),
  gutil = require('gulp-util'),
  spsave = require('gulp-spsave'),
  webpack = require('webpack');
var creds = require("./settings.js");
var src = process.cwd();
var assets = process.cwd() + '/dist';

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
gulp.task('deploy', ['pack'],function () {
    var spSave = require('gulp-spsave');
    return gulp.src(assets + '/**')
      .pipe(spsave({
        siteUrl: 'https://nokia.sharepoint.com/sites/O365KMPOC',
        folder: "SiteAssets/SimpleDemo"
      }, creds));
})

//default task
gulp.task('default',['deploy'])

