
import test from 'ava'
import createStyle from '../src/create-style'
import config from '../src/default-config'

const parse = createStyle(config)

test('returns an object', t => {
  const style = parse({
    key: 'm',
    value: 1
  })
  t.is(typeof style, 'object')
})

test('converts object to declaration object', t => {
  const style = parse({
    key: 'm',
    value: 1
  })
  t.deepEqual(style, { margin: 8 })
})

test('ignores unknown props', t => {
  const style = parse({ key: 'foo', value: true })
  t.is(style, null)
})

test('removes null values', t => {
  const style = parse({ key: 'm', value: null })
  t.is(style, null)
})

