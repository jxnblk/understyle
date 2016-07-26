
import assign from 'object-assign'

const flex = ({
  wrap,
  column,
  align,
  justify,
  flexAuto,
  flexNone,
  order
} = {}) => {
  const style = assign({},
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

