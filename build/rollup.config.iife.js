import base from './rollup.config.base'

const config = Object.assign({}, base, {
  output: {
    format: 'iife',
    exports: 'named',
    name: 'VueIntersectDirective',
    file: './dist/vue-intersect-directive.iife.js',
    globals: {
      vue: 'Vue'
    },
  },
})

export default config