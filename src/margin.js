
import assign from 'object-assign'
import getProp from './get-prop'

export const setScale = (scale = [
  0,
  8,
  16,
  32,
  48,
  64,
  96
]) => ({
  m,
  mx,
  my,
  mt,
  mr,
  mb,
  ml
} = {}) => {
  const result = assign({},
    getProp('margin')(scale)(m),
    getProp('marginTop')(scale)(mt),
    getProp('marginBottom')(scale)(mb),
    getProp('marginTop')(scale)(my),
    getProp('marginBottom')(scale)(my),
    getProp('marginLeft')(scale)(ml),
    getProp('marginRight')(scale)(mr),
    getProp('marginLeft')(scale)(mx),
    getProp('marginRight')(scale)(mx)
  )

  return result
}

const margin = setScale()

export default margin

