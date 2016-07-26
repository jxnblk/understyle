
import assign from 'object-assign'
import getProp from './get-prop'

export const initialScale = [
  0,
  8,
  16,
  32,
  48,
  64,
  96
]

export const setScale = (scale = initialScale) => ({
  m,
  mx,
  my,
  mt,
  mr,
  mb,
  ml
} = {}) => {
  const getScaledProp = getProp(scale)

  const result = assign({},
    getScaledProp('margin')(m),
    getScaledProp('marginTop')(mt),
    getScaledProp('marginBottom')(mb),
    getScaledProp('marginTop')(my),
    getScaledProp('marginBottom')(my),
    getScaledProp('marginLeft')(ml),
    getScaledProp('marginRight')(mr),
    getScaledProp('marginLeft')(mx),
    getScaledProp('marginRight')(mx)
  )

  return result
}

const margin = setScale()

export default margin

