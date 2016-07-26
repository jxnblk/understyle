
import assign from 'object-assign'
import getProp from './get-prop'

export const createWidthScale = length =>
  Array.from({ length: length + 1 }).map((n, i) => `${i / length * 100}%`)

export const setColumns = (columns = 12) => ({
  col
} = {}) => {
  const widthScale = createWidthScale(columns)
  const getWidth = getProp(widthScale)('width')
  const widths = assign({},
    getWidth(col)
  )

  return widths
}

const column = setColumns()

export default column

