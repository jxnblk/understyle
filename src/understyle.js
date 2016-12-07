
import assign from 'object-assign'
import merge from 'deepmerge'
import defaultConfig from './default-config'
import parseArrayValue from './parse-array-value'
import {
  objToArr,
  toObj
} from './util'
import propTypes from './prop-types'

// import display from './display'
// import flex from './flex'
// import { setScale as marginSetScale } from './margin'
// import { setScale as paddingSetScale } from './padding'
// import { setColumns } from './column'

// API
// const css = _style(styles)

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

const getColorProp = key => colors => val => {
  const color = colors[val] || val
  return { [key]: color }
}
const color = getColorProp('color')
const backgroundColor = getColorProp('backgroundColor')
const borderColor = getColorProp('borderColor')

const createStyle = (config) => (key) => (value) => {
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
    case 'rounded':
    default:
      return null
  }
}

export const understyle = (options = {}) => {
  const config = assign({}, defaultConfig, options)

  return (rawProps = {}) => {
    const styles = objToArr(rawProps)
      .filter(prop => propTypes[prop.key])
      .map(({ key, value }) =>
        parseArrayValue(config.breakpoints)(value)(createStyle(config)(key))
      )
      .filter(style => style !== null)

    const style = merge.all([
      {},
      { boxSizing: 'border-box' },
      ...styles
    ])

    return style
  }
}

const _style = (props, options) => understyle(options)(props)

export default _style

