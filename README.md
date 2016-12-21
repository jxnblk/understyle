
# _understyle

Functional style utilities for authoring JavaScript style objects

[![Build Status](https://travis-ci.org/jxnblk/understyle.svg?branch=master)](https://travis-ci.org/jxnblk/understyle)
[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg)](http://standardjs.com/)


```sh
npm i understyle
```

```js
// Example
import _style from 'understyle'

const style = _style({
  m: 2,
  flex: true
})
// { margin: 16, display: 'flex' }
```

### Usage in React, etc.

Understyle is intended for use in functional component-based UI systems, like React.
It can be used in any framework and for either inline styles or
with any CSS-in-JS library.

```js
// Example component
import React from 'react'
import _style from 'understyle'

const MyComponent = ({ children, ...props }) => {
  const style = {
    ..._style(props),
    color: 'tomato'
  }

  return <div style={style}>{children}</div>
}

export default MyComponent
```

```js
// Example component instance
return (
  <div>
    <MyComponent p={2} mb={4}>
      Hello
    </MyComponent>
  </div>
)
```

## Props

The following keys can be passed in to understyle.

### Display

```js
_style({ display: 'block' })
```

### Width

The `width` prop accepts number values.
Any number larger than 1 is returned as a number, to be handled with React inline styles or other CSS-in-JS solutions.
Any number between 0 and 1 will become a percentage width.

```js
_style({ width: 1 / 2 }) // { width: '50%' }
_style({ width: 1 })     // { width: '100%' }
_style({ width: 64 })    // { width: 64 }
```

### Margin

Margin props are set based on a spacing scale for numbers 1–4.
Any number above 4 will return the raw number value.

```js
_style({
  margin: 0,        // margin: 0
  marginBottom: 3,  // marginBottom: 32
  marginX: 12       // marginLeft: 12, marginRight: 12
})
```

Shorthand props are also available.

```js
_style({
  m: 0,   // margin: 0
  mb: 3, // marginBottom: 32
  mx: 12 // marginLeft: 12, marginRight: 12,
})
```

### Padding

Padding also supports longform and shorthand keys.

```js
_style({
  p: 0,   // padding: 0
  paddingLeft: 2, // paddingLeft: 16
  py: 48  // paddingTop: 48, paddingBottom: 48
})
```

### Typography

```js
_style({
  fontSize: 16,     // fontSize: 16
  align: 'center',  // textAlign: 'center'
  bold: true,       // fontWeight: 'bold'
  caps: true,       // textTransform: 'uppercase', letterSpacing: '.1em'
})
```

Font size also accepts numbers representing steps on the configured type scale, for any number below 7

```js
_style({ fontSize: 1 })
// fontSize: 48
```

### Flexbox

```js
_style({
  flexWrap: 'wrap',     // flexWrap: 'wrap'
  alignItems: 'center', // alignItems: 'center'
  justifyContent: 'space-between', // justifyContent: 'space-between'
  flexDirection: 'column', // flexDirection: 'column'
  flexAuto: true,       // flex: '1 1 auto'
  flexNone: true,       // flex: 'none'
})
```

### Color

Color props accept strings as either keys from the configured
color object or raw color values.

```js
_style({
  color: 'blue', // color: '#07c'
  backgroundColor: 'tomato', // color: 'tomato'
  borderColor: '#eee', // color: '#eee'
})
```

### Border

```js
_style({ border: true })
// border: '1px solid'

_style({ border: false })
// border: 0

_style({ border: 3 })
// border: '3px solid'

_style({ borderTop: true })
// borderTop: '1px solid'

_style({ borderRight: true })
// borderRight: '1px solid'

_style({ borderBottom: true })
// borderBottom: '1px solid'

_style({ borderLeft: true })
// borderLeft: '1px solid'
```

### Border Radius

```js
_style({ rounded: true })
// borderRadius: 2

_style({ rounded: false })
// borderRadius: 0

_style({ rounded: 'top' })
// borderRadius: '2px 2px 0 0'

_style({ rounded: 'right' })
// borderRadius: '0 2px 2px 0'

_style({ rounded: 'bottom' })
// borderRadius: '0 0 2px 2px'

_style({ rounded: 'left' })
// borderRadius: '2px 0 0 2px'
```

### Responsive Styles

All props accept arrays to set styles for multiple breakpoints,
where the first value is no breakpoint,
then the following values are from the small breakpoint up,
for a mobile-first styling approach.

```js
_style({
  width: [
    1,
    1 / 2,
    1 / 3,
    1 / 4,
  ]
})
// {
//   width: '100%',
//   '@media screen and (min-width:40em)': {
//     width: '50%'
//   },
//   '@media screen and (min-width:52em)': {
//     width: '33.333333%'
//   },
//   '@media screen and (min-width:64em)': {
//     width: '25%'
//   }
// }
```

This helps create a succinct syntax for use in React components.

```js
// Example
<Box width={[ 1, 1/2, 1/3, 1/4 ]} />
```

Arrays work for any understyle property,
and null values can be passed to the array to skip breakpoints.

```js
_style({
  margin: [ 0, null, 16, 32 ],
  padding: [ null, null, 16, 32 ],
  border: [ null, null, true ]
})
```


### Shorthand Props

Understyle provides shorthand props for setting common styles.
Each shorthand prop accepts a boolean value.

```js
_style({
  mb4: true
})
```

These are provided as a convenience for use in React.

```jsx
// Example
<Button mb4 />
```

The following boolean keys can be passed to understyle.

- `block` - display block
- `inlineBlock` - display inline-block
- `inline`
- `table`
- `tableRow`
- `tableCell`
- `flex`
- `inlineFlex`
- `m0` - `m4`   - margin
- `mt0` - `mt4` - margin-top
- `mr0` - `mr4` - margin-right
- `mb0` - `mb4` - margin-bottom
- `ml0` - `ml4` - margin-left
- `p0` - `p4`   - padding
- `pt0` - `pt4` - padding-top
- `pr0` - `pr4` - padding-right
- `pb0` - `pb4` - padding-bottom
- `pl0` - `pl4` - padding-left
- `left` - text align left
- `center` - text align center
- `right` - text align right
- `justify` - text align justify
- `bg` - background color
- `<COLOR>` - foreground color - e.g. `red`
- `bg<COLOR>` - background color - e.g. `bgRed`
- `border<COLOR>` - border color - e.g. `borderRed`

[MIT License](LICENSE.md)

