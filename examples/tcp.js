var net = require('net')
var pump = require('pump')
var peer = require('..')

var server = net.createServer(function onconnection (rawStream) {
  var sec = peer(rawStream, false)

  pump(sec, sec, function (err) {
    if (err) throw err
  })
})

server.listen(function () {
  var port = server.address().port

  var clientRawStream = net.connect(port)
  var clientSec = peer(clientRawStream, true)

  clientSec.on('data', function (data) {
    console.log(data.toString())
  })

  clientSec.on('end', function () {
    server.close()
  })

  clientSec.write('Hello world')
  clientSec.end()
})
