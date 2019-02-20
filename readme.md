## gulp-miniprogram-path-alias

### 小程序 依赖引用路径别名

- 支持在 `wxml`, `wxs`, `wxss`, `js` 中对资源文件使用别名引用依赖；
- 支持本地资源别名；
- 支持远程资源别名；
- 支持小程序资源相关组件的引用别名（如：image/video/audio/web-view等）。

### Install
``` bash
npm install --save-dev gulp-miniprogram-path-alias
```

### Usage

``` bash
.
├── src 
│   └── common
└── gulpfile.js
```

在你的 `gulpfile.js` 添加一个 `task`
``` js
var alias = require('gulp-miniprogram-path-alias');
var path = require('path');

function _join(dirname) {
    return path.join(__dirname, '..', 'src', dirname);
}
var aliasConfig = {
    common: _join('common'),
    @act: 'https://m.abc.com/activity/'
};

gulp.task('alias', function () {
    gulp.src('src/**/*.{js,wxml,wxss}')
        .pipe(alias(aliasConfig))
        .pipe(gulp.dest('/build'));
});
```
`*.js` :
``` js
var common = require('common');
// or
import common from 'common';
```
`*.wxml` :
``` html
<import src="common/test.wxml" />
```
``` html
<image src="@act/a.png" />
<!-- 转译后 -->
<image src="https://m.abc.com/activity/a.png" />
```
`*.wxss` :
``` css
@import "common/style.wxss";
```

### 建议
