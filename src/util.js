
export const hyphenate = str => str.replace(/([A-Z])/g, g => '-' + g.toLowerCase())

export const objToArr = (obj) => Object.keys(obj).map(key => ({ key, value: obj[key] }))

export const flattenArray = (a = [], b) => {
  if (Array.isArray(b)) {
    return [ ...a, ...b ].reduce(flattenArray, [])
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

export const colorKeyMapper = ({ key, value }) => {
  if (Array.isArray(value)) {
    const scale = value.map((val, i) => ({
      key: '' + key + i,
      value: val
    }))

    return [
      {
        key: key,
        value: scale[5].value
      },
      ...scale
    ]
  }

  return {
    key, value
  }
}

