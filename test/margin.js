
import test from 'ava'
import margin, { setScale } from '../src/margin'
import getProp from '../src/get-prop'

test('is a function', t => {
  t.is(typeof margin, 'function')
})

test('setScale is a function', t => {
  t.is(typeof setScale, 'function')
})

test('getProp is a function', t => {
  t.is(typeof getProp, 'function')
})

test('returns an object', t => {
  const sx = margin()
  t.is(typeof sx, 'object')
})

test('adds margin', t => {
  const sx = margin({ m: 2 })
  t.deepEqual(sx, {
    margin: 16
  })
})

