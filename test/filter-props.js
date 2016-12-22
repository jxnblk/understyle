
import test from 'ava'
import filterProps from '../src/filter-props'
import config from '../src/default-config'

test('returns a boolean', t => {
  t.is(typeof filterProps(config)('foo'), 'boolean')
})

const falsey = [
  'm0',
  'm',
  'p',
  'm1',
  'm2',
  'm3',
  'm4',
  'm-1',
  'm-2',
  'm-3',
  'm-4',
  'display',
  'width',
  'fontSize',
  'align',
  'bold',
  'left',
  'center',
  'right',
  'justify',
  'rounded',
  'border',
  'borderTop',
  'borderRight',
  'borderBottom',
  'borderLeft',
  'color',
  'backgroundColor',
  'borderColor',
  'red',
  'blue',
  'blue6',
  'bgRed',
  'borderGreen'
]

const truthy = [
  'name',
  'href'
]

falsey.forEach(input => {
  test(`Returns false for ${input}`, t => {
    t.is(filterProps(config)(input), false)
  })
})

truthy.forEach(input => {
  test(`Returns true for ${input}`, t => {
    t.is(filterProps(config)(input), true)
  })
})

