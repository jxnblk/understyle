
import assign from 'object-assign'

const parseArrayValue = breaks => values => createStyle => {
  if (!Array.isArray(values)) {
    return createStyle(values)
  }

  const breakpoints = [ null, ...breaks ]
  const styles = values.map((value, i) => {
    const breakpoint = breakpoints[i]
    if (value === null) {
      return null
    }

    if (!breakpoint) {
      return createStyle(value)
    }

    return {
      [breakpoint]: createStyle(value)
    }
  })

  return assign({}, ...styles)
}

export default parseArrayValue

