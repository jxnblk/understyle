
import assign from 'object-assign'

const kebab = str => str.replace(/([A-Z])/g, g => '-' + g.toLowerCase())

const display = ({
  block,
  inlineBlock,
  inline,
  table,
  tableRow,
  tableCell,
  flex,
  inlineFlex
} = {}) => {
  const props = {
    block,
    inlineBlock,
    inline,
    table,
    tableRow,
    tableCell,
    flex,
    inlineFlex
  }
  const key = Object.keys(props).reduce((a, b) => {
    return a || (props[b] === true ? b : null)
  }, null)

  if (!key) {
    return null
  }

  const val = kebab(key)
  const style = assign({}, {
    display: val
  })

  return style
}

export default display

