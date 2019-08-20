import base from './rollup.config.base'

const config = Object.assign({}, base, {
  output: {
    format: 'umd',
    exports: 'named',
    name: 'vue-intersect-directive',
    file: './dist/vue-intersect-directive.umd.js',
    globals: {
      vue: 'Vue'
    },
  },
})

export default config