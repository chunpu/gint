var fs = require('fs')
var zlib = require('zlib')
var crypto = require('crypto')
var fse = require('fs-extra')

//var o = exports = {}

var _git = '.git' // search git dir

exports.getObject = function(hash, cb) {
  if (hash.length != 40) {
    cb && cb('not a sha1 hash')
  }
  var _path = '.git' + '/objects/' + hash.substr(0, 2) + '/' + hash.substr(2)
  // console.log(_path)
  fs.readFile(_path.trim(), function(err, buf) {
    cb(err, buf)
  })
}

exports.saveObject = function(type, str, cb) {
  cb = cb || function(){}
  var head = type + ' ' + str.length + '\0'
  var str2hash = head + str
  var hash = this.sha1(str2hash)
  var path = _git + '/objects/' + hash.substr(0, 2) + '/' + hash.substr(2)
  zlib.deflate(str2hash, function(err, content) {
    fs.writeFileSync('./path', path)
    fs.writeFileSync('./content', content)
    // fse.outputFile(path, content, cb)

  })
}

exports.getHEAD = function(cb) {
  var path = _git + '/refs/heads/master'
  fs.readFile(path, function(err, buf) {
    var hash = (buf + '').trim()
    cb && cb(err, hash)
  })
}

exports.sha1 = function(str) {
  var shasum = crypto.createHash('sha1')
  shasum.update(str)
  return shasum.digest('hex')
}

exports.inflate = function(buf, cb) {
  zlib.inflate(buf, function(err, buf) {
    if (err) {
      cb && cb(err)
    } else {
      cb && cb(undefined, buf+'')
    }
  })
}


