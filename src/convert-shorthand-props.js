
import { objToArr, toObj } from './util'

const convert = (config) => (rawProps) => {
  const props = objToArr(rawProps)
    .map(parseProp(config))
    .reduce(toObj, {})

  return props
}

const MP_REG = /^[mp][trblxy]?-?\d$/
const FS_REG = /^[h]\d$/
const ALIGN_REG = /^(left|center|right|justify)$/

const parseProp = (config) => ({ key, value }) => {
  const { colors } = config

  if (value !== true) {
    return { key, value }
  }

  if (MP_REG.test(key)) {
    return parseNumberValue(key)
  }

  if (FS_REG.test(key)) {
    const value = parseInt(key.replace(/^h/, ''))
    return {
      key: 'fontSize', value
    }
  }

  if (ALIGN_REG.test(key)) {
    return {
      key: 'align',
      value: key
    }
  }

  if (isColor(colors)(key)) {
    const value = key.replace(/^(bg|border)/, '').toLowerCase()

    if (/^bg/.test(key)) {
      return { key: 'backgroundColor', value }
    }

    if (/^border/.test(key)) {
      return { key: 'borderColor', value }
    }

    return { key: 'color', value }
  }

  return { key, value }
}

export const parseNumberValue = key => {
  const [ num ] = key.match(/\d/)
  const isNegative = /-/.test(key)
  const [ prop ] = key.match(/^[a-z]+/)
  const value = isNegative
    ? -parseInt(num)
    : parseInt(num)

  return {
    key: prop,
    value
  }
}

export const isColor = colors => key => {
  const name = key.replace(/^(bg|border)/, '').toLowerCase()
  return !!colors[name]
}

export default convert

