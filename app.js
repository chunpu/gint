var util = require('./util.js')
var fs = require('fs')
var tree = require('./lib/tree.js')

util.getHEAD(function(err, str) {
  
  util.getObject(str, function(err, buf) {
    util.inflate(buf, function(err, str) {
      //console.log(str)
    })
      
  })
})

util.getObject('4f407b8ad5b70bab92c11a65926593f52f1942d0', function(err, buf) {
  util.inflate(buf, function(err, buf2) {
    tree.read(buf2)
    //console.log(buf2+'')
    //var arr = (buf2 + '').split('\0')
    //console.log(arr)
  })
  //console.log(buf + '', '\n')
})

fs.readFile('./gin', function(err, buf) {
  //util.saveObject('blob', buf)
  //var body = buf + ''
  //var head = 'blob ' + body.length + '\0'
  //body = head + body
  //console.log(util.sha1(body))
})



