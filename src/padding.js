
import assign from 'object-assign'
import getProp from './get-prop'
import initialScale from './initial-scale'

export const setScale = (scale = initialScale) => ({
  p,
  px,
  py,
  pt,
  pr,
  pb,
  pl
} = {}) => {
  const getScaledProp = getProp(scale)

  const result = assign({},
    getScaledProp('padding')(p),
    getScaledProp('paddingTop')(pt),
    getScaledProp('paddingBottom')(pb),
    getScaledProp('paddingTop')(py),
    getScaledProp('paddingBottom')(py),
    getScaledProp('paddingLeft')(pl),
    getScaledProp('paddingRight')(pr),
    getScaledProp('paddingLeft')(px),
    getScaledProp('paddingRight')(px)
  )

  return result
}

const padding = setScale()

export default padding

