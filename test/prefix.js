
import test from 'ava'
import prefix from '../src/prefix'

const sx = {
  display: 'flex',
  flexDirection: 'column',
  flexWrap: 'wrap',
  alignItems: 'center',
  justifyContent: 'space-around',
  flex: '1 1 auto',
  order: 2,
}

test('returns prefixed flexbox properties', t => {
  const prefixed = prefix(sx)
  t.deepEqual(prefixed, {
    display: 'flex',
    WebkitFlexDirection: 'column',
    msFlexDirection: 'column',
    flexDirection: 'column',
    WebkitFlexWrap: 'wrap',
    msFlexWrap: 'wrap',
    flexWrap: 'wrap',
    WebkitAlignItems: 'center',
    msAlignItems: 'center',
    alignItems: 'center',
    WebkitJustifyContent: 'space-around',
    msJustifyContent: 'space-around',
    justifyContent: 'space-around',
    WebkitFlex: '1 1 auto',
    msFlex: '1 1 auto',
    flex: '1 1 auto',
    WebkitOrder: 2,
    msFlexOrder: 2,
    order: 2
  })
})

