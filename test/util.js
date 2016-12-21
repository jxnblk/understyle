
import test from 'ava'
import {
  hyphenate,
  objToArr,
  colorKeyMapper,
  flattenArray,
  toObj,
  flattenColors
} from '../src/util'

test('hyphenates', t => {
  t.is(hyphenate('helloHiThere'), 'hello-hi-there')
  t.is(hyphenate('camelCase'), 'camel-case')
  t.is(hyphenate('CamelCase'), '-camel-case')
})

test('objToArr', t => {
  const obj = { hi: 'hello', bye: 'goodbye' }
  const arr = objToArr(obj)
  t.is(Array.isArray(arr), true)
  t.is(arr.length, 2)
  t.deepEqual(arr[0], {
    key: 'hi',
    value: 'hello'
  })
})

test('flattenArray', t => {
  const nested = [
    'one',
    [
      'two',
      'three',
      [
        'four'
      ]
    ]
  ]
  const flat = nested.reduce(flattenArray, [])
  t.is(Array.isArray(flat), true)
  t.is(flat.length, 4)
  t.is(flat[0], 'one')
  t.is(flat[1], 'two')
  t.is(flat[2], 'three')
  t.is(flat[3], 'four')
})

test('toObj', t => {
  const objArr = [
    { key: 'hi', value: 'hello' },
    { key: 'bye', value: 'goodbye' },
  ]
  const obj = objArr.reduce(toObj, {})
  t.is(Array.isArray(obj), false)
  t.is(obj.hi, 'hello')
  t.is(obj.bye, 'goodbye')
})

test('flattenColors', t => {
  const colors = {
    blue: '#0cf',
    gray: [
      '#000',
      '#333',
      '#666',
      '#999',
      '#ccc',
      '#eee'
    ]
  }
  const flat = flattenColors(colors)
  t.is(Array.isArray(flat), false)
  t.is(typeof flat, 'object')
  t.is(flat.blue, '#0cf')
  t.is(flat.gray0, '#000')
  t.is(flat.gray5, '#eee')
})

test('colorKeyMapper', t => {
  const color = {
    key: 'gray',
    value: [
      '#000',
      '#333',
      '#666',
      '#999',
      '#ccc',
      '#eee'
    ]
  }
  const flattened = colorKeyMapper(color)
  t.is(Array.isArray(flattened), true)
  t.is(flattened.length, 7)
})

