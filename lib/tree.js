module.exports = {
  read: read,
  create: create
}

/**
 * read
 * mode ' ' name '\0' hash
 */
function read(buf) {
  var MODE = 1, NAME = 2, HASH = 3
  var start = (buf + '').indexOf('\0')
  var str = buf + ''
  var state = MODE
  var i = start + 1
  var l = buf.length
  var arr = []
  var current = {}

  var tree = []

  var modeEnd, nameEnd, modeStart
  
  while (i < l) {
    readMode()
    readName()
    readHash()
  }

  console.log(tree)

  function readMode() {
    modeStart = i
    modeEnd = i
    while (buf[i] !== 32) {
      i++
      if (i >= l) {
        i = l
        return
      }
    }
    modeEnd = i    
  }

  function readName() {
    if (i === l) {
      return
    }
    nameEnd = i
    while (buf[i] !== 0) {
      i++
    }
    nameEnd = i
  }

  function readHash() {
    if (i === l || nameEnd + 21 > l) {
      i = buf.length
      return
    }
    i += 21
    // collect obj
    var o = {}
    o.mode = buf.slice(modeStart, modeEnd) + ''
    o.name = buf.slice(modeEnd + 1, nameEnd) + ''
    o.hash = buf.slice(nameEnd + 1, nameEnd + 21)
    tree.push(o)
  }

}


function create() {
}
