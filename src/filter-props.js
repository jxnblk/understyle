
import propTypes from './prop-types'
import { isColor } from './convert-shorthand-props'

const MPR = /^[mp][trblxy]?-?\d$/
const FSR = /^h\d$/
const TYPER = /^(align|bold|center|left|right|justify|flex)$/
const BDR = /^border(Top|Right|Bottom|Left)?/

export default (config) => (key) => {
  if (propTypes[key] ||
    MPR.test(key) ||
    FSR.test(key) ||
    BDR.test(key) ||
    TYPER.test(key)) {
    return false
  }
  const { colors } = config

  const match =
    isColor(colors)(key)
    || false

  return !match
}

