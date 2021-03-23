import IntersectDirective from './intersect-directive'
import Vue, { PluginObject, PluginFunction } from 'vue'

declare global {
  interface Window {
    Vue: Vue | undefined
  }
}

const install: PluginFunction<never> = () => {
  Vue.directive('intersect', IntersectDirective)
}

const VueIntersect: PluginObject<never> = {
  install,
}

if (Vue) {
  Vue.use(VueIntersect.install)
}

export { IntersectDirective }
export default VueIntersect
