
import test from 'ava'
import _style from '../src/understyle'
import { breakpoints } from '../src/default-config'

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

test('handles responsive array props', t => {
  const sx = _style({
    width: [
      1, 1/2, 1/4
    ]
  })
  t.deepEqual(sx, {
    boxSizing: 'border-box',
    width: '100%',
    [breakpoints[0]]: {
      width: '50%'
    },
    [breakpoints[1]]: {
      width: '25%'
    }
  })
})
