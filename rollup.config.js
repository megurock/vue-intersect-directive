import typescript from 'rollup-plugin-typescript'

export default {
  input: './src/index.ts',
  output: {
    format: 'umd',
    exports: 'named',
    name: 'vue-intersect-directive',
    file: './dist/vue-intersect-directive.js',
    globals: {
      vue: 'Vue'
    },
  },
  external: [ 'vue' ],
  plugins: [
    typescript()
  ]
}