
export const hyphenate = str => str.replace(/([A-Z])/g, g => '-' + g.toLowerCase())

export const objToArr = (obj) => Object.keys(obj).map(key => ({ key, value: obj[key] }))

export const colorKeyMapper = ({ key, value }) => {
  if (Array.isArray(value)) {
    return value.map((val, i) => ({
      key: key + i,
      value: val
    }))
  }
  return {
    key, value
  }
}

export const flattenArray = (a = [], b) => {
  if (Array.isArray(b)) {
    return [ ...a, ...b ]
  }
  return [ ...a, b ]
}

export const toObj = (a = {}, b) => {
  a[b.key] = b.value
  return a
}

export const flattenColors = (colors) =>
  objToArr(colors)
    .map(colorKeyMapper)
    .reduce(flattenArray, [])
    .reduce(toObj, {})

