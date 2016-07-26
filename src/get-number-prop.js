
const getNumberProp = scale => key => (x, multiplier = 1) =>
  typeof x === 'number' ? { [key]: scale[x] * multiplier } : null

export default getNumberProp

