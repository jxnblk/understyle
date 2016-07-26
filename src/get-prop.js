
const getProp = key => s => x => typeof x === 'number' ? { [key]: s[x] } : null

export default getProp
