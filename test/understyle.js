
import test from 'ava'
import _style, { createUnderstyle } from '../src/understyle'
import { breakpoints, colors } from '../src/default-config'

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

test('handles shorthand props', t => {
  const sx = _style({
    m0: true,
    mb2: true,
    blue: true
  })
  t.deepEqual(sx, {
    boxSizing: 'border-box',
    margin: 0,
    marginBottom: 16,
    color: colors.blue
  })
})

test('createUnderstyle returns a function', t => {
  const s = createUnderstyle({})
  t.is(typeof s, 'function')
})

test('createUnderstyle sets custom config', t => {
  const s = createUnderstyle({
    scale: [
      0, 12, 24, 48, 96
    ]
  })
  const sx = s({
    m: 1,
    p: 2
  })
  t.deepEqual(sx, {
    boxSizing: 'border-box',
    margin: 12,
    padding: 24
  })
})

test('createUnderstyle generates a palette', t => {
  const s = createUnderstyle({
    color: '#000'
  })
  t.is(typeof s, 'function')
})
