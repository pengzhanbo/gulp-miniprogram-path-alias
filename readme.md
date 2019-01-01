## gulp-miniprogram-path-alias

### 小程序 依赖引用路径别名

### Install
``` bash
npm install --save-dev gulp-miniprogram-path-alias
```

### Usage

``` bash
.
├── src # 开发目录
│   └── common #公共功能模块，管理功能功能模块，与业务交互有一定相关的模块
└── gulpfile.js # 别名配置
```

在你的 `gulpfile.js` 添加一个 `task`
``` js
var alias = require('gulp-miniprogram-path-alias');
var path = require('path');

function _join(dirname) {
    return path.join(__dirname, '..', 'src', dirname);
}
var aliasConfig = {
    common: _join('common')
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
`*.wxss` :
``` css
@import "common/style.wxss";
```
