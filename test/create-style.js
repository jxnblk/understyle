
import test from 'ava'
import createStyle from '../src/create-style'
import config from '../src/default-config'

const { colors } = config

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

const proptest = (t, input, expected) => {
  const style = parse(input)
  t.deepEqual(style, expected)
}

const keyval = obj => Object.keys(obj)
  .map(key => ({ key, value: obj[key] }))
  .reduce((a, b) => b, {})

const tests = [
  {
    input:    { display: 'block', },
    expected: { display: 'block' }
  },
  {
    input:    { fontSize: 1, },
    expected: { fontSize: 48 }
  },
  {
    input:    { fontSize: 20, },
    expected: { fontSize: 20 }
  },
  {
    input:    { align: 'center', },
    expected: { textAlign: 'center' }
  },
  {
    input:    { bold: true, },
    expected: { fontWeight: 700 }
  },

  {
    input:    { padding: 0, },
    expected: { padding: 0 }
  },
  {
    input:    { p: 0, },
    expected: { padding: 0 }
  },
  {
    input:    { p: 1, },
    expected: { padding: 8 }
  },
  {
    input:    { paddingX: 2, },
    expected: { paddingLeft: 16, paddingRight: 16 }
  },
  {
    input:    { px: 2, },
    expected: { paddingLeft: 16, paddingRight: 16 }
  },
  {
    input:    { py: 3, },
    expected: { paddingTop: 32, paddingBottom: 32 }
  },
  {
    input:    { pt: 4, },
    expected: { paddingTop: 64 }
  },
  {
    input:    { pr: 4, },
    expected: { paddingRight: 64 }
  },
  {
    input:    { pb: 4, },
    expected: { paddingBottom: 64 }
  },
  {
    input:    { pl: 4, },
    expected: { paddingLeft: 64 }
  },

  {
    input:    { margin: 0, },
    expected: { margin: 0 }
  },
  {
    input:    { m: 0, },
    expected: { margin: 0 }
  },
  {
    input:    { m: 1, },
    expected: { margin: 8 }
  },
  {
    input:    { marginLeft: 2, },
    expected: { marginLeft: 16 }
  },
  {
    input:    { mx: 2, },
    expected: { marginLeft: 16, marginRight: 16 }
  },
  {
    input:    { my: 3, },
    expected: { marginTop: 32, marginBottom: 32 }
  },
  {
    input:    { mt: 4, },
    expected: { marginTop: 64 }
  },
  {
    input:    { mr: 4, },
    expected: { marginRight: 64 }
  },
  {
    input:    { mb: 4, },
    expected: { marginBottom: 64 }
  },
  {
    input:    { ml: 4, },
    expected: { marginLeft: 64 }
  },
  {
    input:    { mx: -2 },
    expected: { marginLeft: -16, marginRight: -16 }
  },

  {
    input:    { width: 1, },
    expected: { width: '100%' }
  },
  {
    input:    { width: 1/2, },
    expected: { width: '50%' }
  },
  {
    input:    { color: 'blue' },
    expected: { color: colors.blue }
  },
  {
    input:    { backgroundColor: 'red' },
    expected: { backgroundColor: colors.red }
  },
  {
    input:    { borderColor: 'green' },
    expected: { borderColor: colors.green }
  },

  {
    input:    { border: true },
    expected: { border: '1px solid' }
  },
  {
    input:    { border: 2 },
    expected: { border: '2px solid' }
  },
  {
    input:    { border: false },
    expected: { border: 0 }
  },
  {
    input:    { borderTop: true },
    expected: { borderTop: '1px solid' }
  },
  {
    input:    { borderBottom: true },
    expected: { borderBottom: '1px solid' }
  },
  {
    input:    { borderLeft: true },
    expected: { borderLeft: '1px solid' }
  },
  {
    input:    { borderRight: true },
    expected: { borderRight: '1px solid' }
  },
  {
    input:    { rounded: true },
    expected: { borderRadius: 2 }
  },
  {
    input:    { rounded: 'top' },
    expected: { borderRadius: '2px 2px 0 0' }
  },
  {
    input:    { rounded: 'right' },
    expected: { borderRadius: '0 2px 2px 0' }
  },
  {
    input:    { rounded: 'bottom' },
    expected: { borderRadius: '0 0 2px 2px' }
  },
  {
    input:    { rounded: 'left' },
    expected: { borderRadius: '2px 0 0 2px' }
  },
  {
    input:    { rounded: 'circle' },
    expected: { borderRadius: '50%' }
  },
  // Flexbox
  {
    input:    { flexWrap: 'wrap' },
    expected: { flexWrap: 'wrap' }
  },
  {
    input:    { alignItems: 'center' },
    expected: { alignItems: 'center' }
  },
  {
    input:    { justifyContent: 'space-between' },
    expected: { justifyContent: 'space-between' }
  },
  {
    input:    { flexDirection: 'column' },
    expected: { flexDirection: 'column' }
  },
  {
    input:    { flexAuto: true },
    expected: { flex: '1 1 auto' }
  },
  {
    input:    { flexNone: true },
    expected: { flex: 'none' }
  },

  {
    input:    { width: [ 1, 1/2, 1/4 ] },
    expected: {
      width: '100%',
      [config.breakpoints[0]]: {
        width: '50%'
      },
      [config.breakpoints[1]]: {
        width: '25%'
      }
    }
  },
]

tests.forEach(({ input, expected }) => {
  const obj = keyval(input)
  test(`parses ${JSON.stringify(obj)}`, proptest, obj, expected)
})
