## gulp-headnote
> A gulp plugin for converting custom objects into head comments
### Install
```
npm install gulp-headnote
```
## Base Usage
use it to compile some file
```
'use strict';

var gulp = require('gulp');
var headnote = require('gulp-headnote');

gulp.task('note', function () {
  return gulp.src('./src/js/*.js')
    .pipe(headnote({"name":"kang"}))
    .pipe(gulp.dest('./dist/js/'));
});
```
##### like this to add some comments in your file header
##### if you use nothing input ,you will get error
> ##### but gulp not stop

### API
#### headnote(option[,hash])
> ###### option : Object 

This Object change to like

{"name":'kang'}==>name : kang
> ###### hash : Boolean
Hash decided whether or not to generate a hash value for the file

### LICENSE
MIT