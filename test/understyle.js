
import test from 'ava'
import _style from '../src/understyle'

test('returns an object', t => {
  const sx = _style()
  t.is(typeof sx, 'object')
})

test('returns a style object', t => {
  const sx = _style({
    m: 0
  })
  t.deepEqual(sx, {
    boxSizing: 'border-box',
    margin: 0
  })
})

test('combines style props', t => {
  const sx = _style({
    m: 1,
    mb: 2,
    p: 3,
    width: 1/2,
    display: 'flex'
  })
  t.deepEqual(sx, {
    boxSizing: 'border-box',
    margin: 8,
    marginBottom: 16,
    padding: 32,
    width: '50%',
    display: 'flex'
  })
})
