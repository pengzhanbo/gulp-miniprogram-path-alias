## gulp-minipropram-path-alias

小程序 依赖引用路径别名

### Install
``` bash
npm install --save-dev gulp-miniprogram-path-alias
```

### Usage

Add it to your `gulpfile.js`
``` js
var alias = require('gulp-miniprogram-path-alias');
gulp.task('alias', function () {
    gulp.src('src/**/*.js')
        .pipe(alias({
            'common': '/src/common'
        }))
        .pipe(gulp.dest('/build'));
});
```
Then, your `*.js`
``` js
var common = require('common');
// or
import common from 'common';
```
And your `*.wxml`
``` html
<import src="common/test.wxml" />
```
And your `*.wxss`
``` css
@import "common/style.wxss";
```
