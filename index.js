/**
 * 文件路径依赖别名
 */
let through = require('through2');
var gutil = require('gulp-util');
var alias = require('./alias');

module.exports = function (options) {
    return through.obj(function (file, enc, cb) {
        if (file.isNull()) {
            return cb(null, file);
        }
        if (file.isStream()) {
            return cb(new gutil.PluginError('gulp-path-alias', 'stream not supported'));
        }
        var content = file.contents.toString('utf8');
        content = alias(options, content, file.path);
        file.contents = Buffer.from(content);
        cb(null, file);
    });
}
