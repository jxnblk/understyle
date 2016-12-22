
import palx from 'palx'
import { flattenColors } from './util'

export const breakpoints = [
  '(min-width:40em)',
  '(min-width:52em)',
  '(min-width:64em)'
].map(w => `@media screen and ${w}`)

export const scale = [
  0, 8, 16, 32, 64
]

export const typeScale = [
  64, 48, 32, 24, 16, 14, 12
]

const blue = '#07c'

export const colors = flattenColors(palx(blue))

colors.white = '#fff'

export const borderRadius = 2
export const bold = 700

const defaultConfig = {
  breakpoints,
  scale,
  typeScale,
  colors,
  borderRadius,
  bold
}

export default defaultConfig

