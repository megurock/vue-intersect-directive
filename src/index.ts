import intersectDirective from './intersect-directive'
import Vue, { PluginObject, PluginFunction } from 'vue'

declare global {
  interface Window {
    Vue: Vue | undefined
  }
}

const install: PluginFunction<never> = () => {
  Vue.directive('intersect', intersectDirective)
}

const VueIntersect: PluginObject<never> = {
  install,
}

if (window.Vue) {
  Vue.use(VueIntersect.install)
}

export { intersectDirective as IntersectDirective }
export default VueIntersect
