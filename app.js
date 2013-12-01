var util = require('./util.js')
var fs = require('fs')

util.getHEAD(function(err, str) {
  
  util.getObject(str, function(err, buf) {
    util.inflate(buf, function(err, str) {
      //console.log(str)
    })
      
  })
})

util.getObject('01241a150e892c5ea165a1ba1a555d07ec1d843b', function(err, buf) {
  console.log(buf + '')
})

fs.readFile('./gin', function(err, buf) {
  //util.saveObject('blob', buf)
  //var body = buf + ''
  //var head = 'blob ' + body.length + '\0'
  //body = head + body
  //console.log(util.sha1(body))
})



