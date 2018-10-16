var test = require('tape')
var peer = require('..')
var transport = require('./helpers/chopped-stream')

test('simple example', function (assert) {
  assert.plan(3)

  var t = transport()

  const a = peer(t.a, true)
  const b = peer(t.b, false)

  a.on('error', function () {
    assert.pass('a errored')
  })
  b.on('close', function () {
    assert.pass('b closed')
  })

  a.write('hi')
  b.on('data', function (data) {
    assert.same(data, Buffer.from('hi'))
    b.destroy()
  })
})
