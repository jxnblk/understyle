
import test from 'ava'
import margin, { initialScale, setScale } from '../src/margin'
import getProp from '../src/get-prop'

test('is a function', t => {
  t.is(typeof margin, 'function')
})

test('initialScale is an array', t => {
  t.true(Array.isArray(initialScale))
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

test('adds margin 0', t => {
  const sx = margin({ m: 0 })
  t.deepEqual(sx, {
    margin: 0
  })
})

initialScale.forEach((step, i) => {
  test(`adds margin ${i}`, t => {
    const sx = margin({ m: i })
    t.deepEqual(sx, {
      margin: step
    })
  })
})

