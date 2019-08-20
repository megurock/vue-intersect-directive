import base from './rollup.config.base'

const config = Object.assign({}, base, {
  output: {
    format: 'esm',
    name: 'vue-intersect-directive',
    file: './dist/vue-intersect-directive.esm.js',
    globals: {
      vue: 'Vue'
    },
  },
})

export default config