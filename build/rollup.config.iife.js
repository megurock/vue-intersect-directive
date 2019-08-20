import base from './rollup.config.base'
import { terser } from 'rollup-plugin-terser'

const config = Object.assign({}, base, {
  output: {
    format: 'iife',
    exports: 'named',
    name: 'VueIntersectDirective',
    file: './dist/vue-intersect-directive.min.js',
    globals: {
      vue: 'Vue'
    },
  },
})
config.plugins.push(terser())

export default config