var fs = require('fs')
var zlib = require('zlib')

var content = fs.readFileSync('./content')
var content1 = fs.readFileSync('./content2')

zlib.inflate(content, function(err, buf) {
  var buf1 = buf
  var buf2
  zlib.inflate(content1, function(err, buf) {
    buf2 = buf
    console.log(buf1.length, buf2.length)
    for (var i = 0; i < buf1.length; i++) {
      if (buf1[i] != buf2[i]) {
        console.log(i)
      }
    }
  })

})


