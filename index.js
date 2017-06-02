'use strict';
var through = require('through2');
var gutil = require('gulp-util');
var h = require('crypto').createHash('md5');

const PLUGIN_NAME = 'gulp-headnote';

module.exports = function (options,hash) {
    return through.obj(function (file, enc, cb) {
        var content;
        if (file.isNull()) {
            this.push(file);
            return cb();
        }
        if (file.isStream()) {
            this.emit('error', new gutil.PluginError(PLUGIN_NAME, ' Streaming not supported'));
            return cb();
        }
        if(Object.prototype.toString.call(options)!=='[object Object]'){
            gutil.log(gutil.colors.red('options is not a object'));
        }else{
            content = objtonote(options||{},file.contents.toString(),hash||false);
            content = new Buffer(content,'UTF-8')
            file.contents = Buffer.concat([content,file.contents])
        }
        this.push(file);
        cb();
    });
};
function objtonote(obj,content,hash){
    if(hash && hash === true){
        h.update(content)
        obj['hash'] = h.digest('hex');
    }
    var keys = Object.keys(obj),
        len = keys.length||0,
        str='',
        strtop = '/*\r\n',
        strbot=' */\r\n',
        i=0;
    if(len==0){
        return str;
    }
    str += strtop
    for(i;i<len;i++){
        if(keys[i]!=='config'){
            str +=' * '+keys[i]+': '+JSON.stringify(obj[keys[i]])+'\r\n'
        }
    }
    str += strbot

    return str
}
