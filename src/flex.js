
import assign from 'object-assign'
import display from './display'

const flex = ({
  flex,
  inlineFlex,
  wrap,
  column,
  align,
  justify,
  flexAuto,
  flexNone,
  order
} = {}) => {
  const style = assign({},
    display({ flex, inlineFlex }),
    wrap ? { flexWrap: 'wrap' } : null,
    column ? { flexDirection: 'column' } : null,
    align ? { alignItems: align } : null,
    justify ? { justifyContent: justify } : null,
    flexAuto ? { flex: '1 1 auto' } : null,
    flexNone ? { flex: 'none' } : null,
    typeof order === 'number' ? { order } : null
  )

  return style
}

export default flex

