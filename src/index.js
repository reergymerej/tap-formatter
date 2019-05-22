import Parser from 'tap-parser'

const onEvent = (p, eventName) => p.on(eventName, (data) => {
  console.log(`event: ${eventName}\n`, data)
})

export default () => {
  // Return a writable stream p that emits parse events.
  const pStream = new Parser()

  const events = [
    'assert',
    'bailout',
    'child',
    'comment',
    'complete',
    'extra',
    'fail',
    'line',
    'pass',
    'plan',
    'result',
    'skip',
    'todo',
    'version',
  ]

  events.forEach(e => onEvent(pStream, e))

  console.log('enjoy your p stream')
  return pStream
}
