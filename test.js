var assert = require('assert');
var es = require('event-stream');
var File = require('vinyl');
var prefixer = require('./index.js');
var h = require('crypto').createHash('md5');

describe('gulp-headnote', function() {
  describe('in buffer mode', function() {
    it('should add comment in the file header', function(done) {
      var fakeFile = new File({
        contents: new Buffer('test gulp-headnote')
      });
      var myPrefixer = prefixer({"name":"kang"});
      myPrefixer.write(fakeFile);
      myPrefixer.once('data', function(file) {
        assert(file.isBuffer());
        assert.equal(file.contents.toString('utf8'), '/*\r\n * name: "kang"\r\n */\r\ntest gulp-headnote');
        done();
      });
    });

  });
  describe('in buffer mode', function() {
    it('should add comment will have hash value', function(done) {
      var fakeFile = new File({
        contents: new Buffer('test gulp-headnote')
      });
      var myPrefixer = prefixer({"name":"kang"},true);
      h.update(fakeFile.contents.toString('utf8'));
      var hash = h.digest('hex');
      myPrefixer.write(fakeFile);
      myPrefixer.once('data', function(file) {
        assert(file.isBuffer());
        assert.equal(file.contents.toString('utf8'), '/*\r\n * name: "kang"\r\n * hash: "'+hash+'"\r\n */\r\ntest gulp-headnote');
        done();
      });
    });
  });
});
