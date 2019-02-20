let path = require('path');

// js
let es5 = /require\(['"](.*?)['"]\)/g;
let es6 = /from\s+['"](.*?)['"]/g;
// wxml : import|wxs|image|audio|video|live-player|live-pusher|web-view
let wxml = /(?:src|url|poster)=['"](.*?)['"]/g;
// css
let css = /@import\s+['"](.*?)['"]/g;

let keysPattern;
let opt;
let filePath;

function alias(options, content, _filePath) {
    opt = options = options || {};
    filePath = _filePath;
    setKeysPattern(options);
    switch (path.extname(_filePath)) {
    case '.js':
    case '.wxs':
        content = content.replace(es6, replaceCallback);
        content = content.replace(es5, replaceCallback);
        break;
    case '.wxml':
        content = content.replace(wxml, replaceCallback);
        break;
    case '.styl':
    case '.stylus':
    case '.less':
    case '.sass':
    case '.scss':
    case '.css':
    case '.wxss':
        content = content.replace(css, replaceCallback);
        break;
    }
    return content;
};

function setKeysPattern(options) {
    options = options || {};
    keysPattern = keysPattern || new RegExp('^(' + Object.keys(options).join('|') + ')');
}

function replaceCallback(match, subMatch) {
    if (keysPattern.test(subMatch)) {
        let key = subMatch.substr(0, subMatch.indexOf('/'));
        let url = path.join(opt[key], subMatch.slice(subMatch.indexOf('/')));
        return match.replace(
            subMatch,
            /^https?:\/\//.test(opt[key]) ? url : path.relative(filePath, url).replace(/\\/g, '/').replace(/^\.\.\//, '')
        );
    } else {
        return match;
    }
}

module.exports = alias;