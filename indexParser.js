var fs = require('fs')

// https://github.com/git/git/blob/master/Documentation/technical/index-format.txt

var readIndex = 0
fs.readFile('/root/gittest/.git/index', function(err, buf) {
  var dirc = read(4)
  check(dirc.toString('ascii'), 'DIRC', 'not a git index file')
  var o = {}
  o.version = read(4)[3]
  o.entries = read(4)[3]

  o.files = []
  for (var i = 0; i < o.entries; i++) {
    var f = {}
    f.entry = i + 1

    // time is all 16
    f.ctime = read(4)
    f.ctimenano = read(4)
    f.mtime = read(4)
    f.nanomtime = read(4)

    f.device = read(4) // 16x/10 stat device
    f.inode = read(4)
    f.mode = read(4) // should be 10064, but i get a481
    // infact it should read as 81a4
    // and 1a4 means 644 in shijinzhi
    // 8 means 100
    f.uid = read(4)
    f.gid = read(4)
    f.size = read(4)
    f.sha1 = read(20) // it is the sha1..

    // include 1 bit flag, 1 bit extended, 2 bits stage, 12 bit name
    f.flag = read(2)
    var namelen = getNameLen(f.flag)

    f.filename = read(5).toString() // don't know y`
    o.files.push(f)
  }
  
  //console.log(o)

  // ------method
  function read(n) {
    readIndex += n
    return buf.slice(readIndex - n, readIndex)
  }
})

function getNameLen(buf) {
  // 12 bit is namelen
  console.log(buf)
}

function check(raw, expect, errinfo) {
  if (raw != expect) {
    errinfo = raw + ' != ' + expect + '\n' + errinfo
    throw new Error(errinfo)
  }
}


