import Parser from 'tap-parser'

const onEvent = (p, eventName) => p.on(eventName, (data) => {
  console.log(`event: ${eventName}\n`, data)
})

const onFail = (result) => {
  const { diag, name } = result
  if (name === 'test exited without ending') {
    console.log('🤔 when does this test end?')
    // console.log(result)
  } else {
    console.log(diag.at)
    console.log(`\texpected: ${diag.expected}`)
    console.log(`\tactual: ${diag.actual}`)
  }
}

let start

const onComplete = (result) => {
  const { ok, pass, fail } = result
  const time = `${Date.now() - start} ms`
  let out
  if (!fail) {
    out = `👍 x ${pass}`
  } else {
    out = `🤔 ${fail}`
  }

  console.log(`${out} (${time})`)
}

export default () => {
  // Return a writable stream p that emits parse events.
  const pStream = new Parser()

  const events = [
    // 'assert',
    // 'bailout',
    // 'child',
    // 'comment',
    // 'complete',
    // 'extra',
    // 'fail',
    // 'line',
    // 'pass',
    // 'plan',
    // 'result',
    // 'skip',
    // 'todo',
    // 'version',
  ]

  events.forEach(e => onEvent(pStream, e))
  pStream.on('fail', onFail)
  pStream.on('complete', onComplete)

  start = Date.now()
  return pStream
}
