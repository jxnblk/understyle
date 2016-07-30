
// Small library-specific style prefixer for flexbox properties

const vals = {
  flex: [
    '-webkit-box',
    '-webkit-flex',
    '-ms-flexbox',
    'flex'
  ].join(';display:'),
  inlineFlex: [
    '-webkit-inline-box',
    '-webkit-inline-flex',
    '-ms-inline-flexbox',
    'inline-flex'
  ].join(';display:')
}

const prefixProp = prop => prefix => prefix + prop.charAt(0).toUpperCase() + prop.slice(1)

const prefixer = (style = {}) => {
  const prefixed = {}

  for (let key in style) {
    const val = style[key]
    let webkitKey
    let msKey

    switch (key) {
      case 'flexDirection':
      case 'flexWrap':
      case 'alignItems':
      case 'justifyContent':
      case 'flex':
        webkitKey = prefixProp(key)('Webkit')
        msKey = prefixProp(key)('ms')
        prefixed[webkitKey] = val
        prefixed[msKey] = val
        prefixed[key] = val
        break
      case 'order':
        webkitKey = prefixProp(key)('Webkit')
        msKey = prefixProp(key)('msFlex')
        prefixed[webkitKey] = val
        prefixed[msKey] = val
        prefixed[key] = val
        break
    }

    switch (val) {
      case 'flex':
        prefixed[key] = vals.flex
        break
      case 'inline-flex':
        prefixed[key] = vals.inlineFlex
        break
      default:
        prefixed[key] = val
    }
  }

  return prefixed
}

export default prefixer

