
import assign from 'object-assign'
import margin from './margin'
import padding from './padding'
import display from './display'
import column from './column'
import flex from './flex'

const understyle = (props) => {
  const style = assign({},
    margin(props),
    padding(props),
    display(props),
    column(props),
    flex(props)
  )

  return style
}

export default understyle

