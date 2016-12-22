
import test from 'ava'
import parseArrayValue from '../src/parse-array-value'
import { breakpoints } from '../src/default-config'

let parse
const createStyle = (val) => ({
  key: val
})

test('does not throw', t => {
  t.notThrows(() => {
    parse = parseArrayValue(breakpoints)
  })
})

test('Parses numbers', t => {
  const style = parse(4)(createStyle)
  t.deepEqual(style, {
    key: 4
  })
})

test('Parses strings', t => {
  const style = parse('hello')(createStyle)
  t.deepEqual(style, {
    key: 'hello'
  })
})

test('Parses arrays', t => {
  const val = [
    'hello',
    'hi',
    null,
    'bye'
  ]
  const style = parse(val)(createStyle)
  t.deepEqual(style, {
    key: 'hello',
    [breakpoints[0]]: {
      key: 'hi'
    },
    [breakpoints[2]]: {
      key: 'bye'
    }
  })
})

