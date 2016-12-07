
import assign from 'object-assign'
import parseArrayValue from './parse-array-value'

const display = val => ({ display: val })

const width = val => {
  if (val === null) return null
  return val > 1
    ? { width: val }
    : { width: (val * 100) + '%' }
}

const getScaleProp = scale => key => val => {
  if (typeof val === 'string') {
    return { [key]: val }
  }
  const multiplier = val < 0 ? -1 : 1
  val = Math.abs(val)

  if (typeof scale[val] === 'undefined') return null

  return {
    [key]: scale[val] * multiplier
  }
}

const fontSize = scale => val => ({
  fontSize: scale[val] || val
})

const getColorProp = (key) => (colors) => (val) => {
  if (!val) return null
  const color = colors[val] || val
  return { [key]: color }
}
const color = getColorProp('color')
const backgroundColor = getColorProp('backgroundColor')
const borderColor = getColorProp('borderColor')

const border = (key, val) => {
  if (val === false) {
    return { [key]: 0 }
  }
  const size = typeof val === 'number' ? size : 1
  return {
    [key]: `${size}px solid`
  }
}

const rx = (...args) => args.map(v => v ? v + 'px' : 0).join(' ')

const radii = (R) => (val) => {
  switch (val) {
    case false:
      return { borderRadius: 0 }
    case true:
      return { borderRadius: R }
    case 'top':
      return { borderRadius: rx(R, R, 0, 0) }
    case 'right':
      return { borderRadius: rx(0, R, R, 0) }
    case 'bottom':
      return { borderRadius: rx(0, 0, R, R) }
    case 'left':
      return { borderRadius: rx(R, 0, 0, R) }
    default:
      return null
  }
}

const parseStyle = (config) => (key) => (value) => {
  if (value === null) return null

  switch (key) {
    case 'display':
      return display(value)
    case 'width':
      return width(value)
    case 'fontSize':
      return fontSize(config.typeScale)(value)

    case 'p':
      return getScaleProp(config.scale)('padding')(value)
    case 'pt':
      return getScaleProp(config.scale)('paddingTop')(value)
    case 'pr':
      return getScaleProp(config.scale)('paddingRight')(value)
    case 'pb':
      return getScaleProp(config.scale)('paddingBottom')(value)
    case 'pl':
      return getScaleProp(config.scale)('paddingLeft')(value)
    case 'px':
      return assign({},
        getScaleProp(config.scale)('paddingLeft')(value),
        getScaleProp(config.scale)('paddingRight')(value)
      )
    case 'py':
      return assign({},
        getScaleProp(config.scale)('paddingTop')(value),
        getScaleProp(config.scale)('paddingBottom')(value)
      )

    case 'm':
      return getScaleProp(config.scale)('margin')(value)
    case 'mt':
      return getScaleProp(config.scale)('marginTop')(value)
    case 'mr':
      return getScaleProp(config.scale)('marginRight')(value)
    case 'mb':
      return getScaleProp(config.scale)('marginBottom')(value)
    case 'ml':
      return getScaleProp(config.scale)('marginLeft')(value)
    case 'mx':
      return assign({},
        getScaleProp(config.scale)('marginLeft')(value),
        getScaleProp(config.scale)('marginRight')(value)
      )
    case 'my':
      return assign({},
        getScaleProp(config.scale)('marginTop')(value),
        getScaleProp(config.scale)('marginBottom')(value)
      )

    case 'color':
      return color(config.colors)(value)
    case 'backgroundColor':
      return backgroundColor(config.colors)(value)
    case 'borderColor':
      return borderColor(config.colors)(value)

    case 'border':
      return border('border', value)
    case 'borderTop':
      return border('borderTop', value)
    case 'borderRight':
      return border('borderRight', value)
    case 'borderBottom':
      return border('borderBottom', value)
    case 'borderLeft':
      return border('borderLeft', value)
    case 'rounded':
      return radii(config.borderRadius)(value)
    default:
      return null
  }
}

const createStyle = (config) => ({ key, value }) => {
  return parseArrayValue(config.breakpoints)(value)(parseStyle(config)(key))
}

export default createStyle

