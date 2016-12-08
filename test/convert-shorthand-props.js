
import test from 'ava'
import convert from '../src/convert-shorthand-props'
import config from '../src/default-config'

const shorthand = {
  m2: true,
  mb3: true,
  p1: true,
  py4: true,
  h2: true,
  center: true,
  blue: true,
  bgGreen: true,
  borderRed: true
}

test('returns a function', t => {
  const fn = convert(config)
  t.is(typeof fn, 'function')
})

test('returns an object when configured', t => {
  const props = convert(config)(shorthand)
  t.is(typeof props, 'object')
})

test('converts shorthand to longform style props', t => {
  const props = convert(config)(shorthand)
  t.deepEqual(props, {
    m: 2,
    mb: 3,
    p: 1,
    py: 4,
    fontSize: 2,
    align: 'center',
    color: 'blue',
    backgroundColor: 'green',
    borderColor: 'red'
  })
})

