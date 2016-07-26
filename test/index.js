
import test from 'ava'
import _style, {
  margin,
  padding,
  display,
  column,
  flex
} from '../src'

test('exports a default function', t => {
  t.is(typeof _style, 'function')
})

test('exports a margin function', t => {
  t.is(typeof margin, 'function')
})

test('exports a padding function', t => {
  t.is(typeof padding, 'function')
})

test('exports a display function', t => {
  t.is(typeof display, 'function')
})

test('exports a column function', t => {
  t.is(typeof column, 'function')
})

test('exports a flex function', t => {
  t.is(typeof flex, 'function')
})

test('returns a style object', t => {
  const sx = _style()
  t.is(typeof sx, 'object')
})

test('combines style props', t => {
  const sx = _style({
    m: 0,
    mb: 4,
    p: 2,
    col: 6,
    inlineBlock: true,
    flexNone: true
  })
  t.deepEqual(sx, {
    margin: 0,
    marginBottom: 48,
    padding: 16,
    width: '50%',
    display: 'inline-block',
    flex: 'none'
  })
})

