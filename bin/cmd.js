#!/usr/bin/env node

var pStream = require('../lib').default
var pStream = pStream()

process.stdin
  .pipe(pStream)
  .pipe(process.stdout)

process.on('exit', function (status) {

  if (status === 1) {
    process.exit(1)
  }

  if (pStream.failed) {
    process.exit(1)
  }
})
