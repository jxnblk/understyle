
import test from 'ava'
import flex from '../src/flex'

test('is a function', t => {
  t.is(typeof flex, 'function')
})

test('returns an object', t => {
  const sx = flex()
  t.is(typeof sx, 'object')
})

test('set flex-wrap wrap', t => {
  const sx = flex({
    wrap: true
  })
  t.deepEqual(sx, {
    flexWrap: 'wrap'
  })
})

test('set flex-direction column', t => {
  const sx = flex({
    column: true
  })
  t.deepEqual(sx, {
    flexDirection: 'column'
  })
})

test('set align-items center', t => {
  const sx = flex({
    align: 'center'
  })
  t.deepEqual(sx, {
    alignItems: 'center'
  })
})

test('set justify-content space-between', t => {
  const sx = flex({
    justify: 'space-between'
  })
  t.deepEqual(sx, {
    justifyContent: 'space-between'
  })
})

test('set flex auto', t => {
  const sx = flex({
    flexAuto: true
  })
  t.deepEqual(sx, {
    flex: '1 1 auto'
  })
})

test('set flex none', t => {
  const sx = flex({
    flexNone: true
  })
  t.deepEqual(sx, {
    flex: 'none'
  })
})

test('set order 2', t => {
  const sx = flex({
    order: 2
  })
  t.deepEqual(sx, {
    order: 2
  })
})

