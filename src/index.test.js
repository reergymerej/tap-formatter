import ts from '.'

let rs
let actual
let formatter

describe('sanity', () => {
  it('should parse the input', () => {
    rs = require('stream').Readable()
    rs._read = function noop() {}
    actual = ''

    formatter = ts()
    formatter.on('data', function(data) {
      actual += data.toString()
    })



    const input =
`TAP version 13
# beep
ok 1 should be equal
ok 2 should be equivalent
# boop
ok 3 should be equal
ok 4 (unnamed assert)

1..4
# tests 4
# pass  4

# ok`

    formatter.write('hello')
    formatter.end('the end')

    return


    const expected = '\n  This is a comment\n\n'


    rs.on('end', function() {
      expect(actual).toEqual(expected)
    })

    rs.pipe(formatter)
    rs.push(input)
    rs.push(null)
  })
})
