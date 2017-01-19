
import palx from 'palx'
import assign from 'object-assign'
import merge from 'deepmerge'
import defaultConfig from './default-config'
import createStyle from './create-style'
import convertShorthandProps from './convert-shorthand-props'
import { objToArr, flattenColors } from './util'
import propTypes from './prop-types'

export const createUnderstyle = (options = {}) => {
  const colors = options.color
    ? { colors: flattenColors(palx(options.color)) }
    : null
  const config = assign({}, defaultConfig, options, colors)

  return (rawProps = {}) => {
    const parsedProps = convertShorthandProps(config)(rawProps)
    const styles = objToArr(parsedProps)
      .filter(prop => propTypes[prop.key])
      .map(createStyle(config))
      .filter(style => style !== null)

    const style = merge.all([
      {},
      { boxSizing: 'border-box' },
      ...styles
    ])

    return style
  }
}

const _style = (props, options) => createUnderstyle(options)(props)

export default _style
