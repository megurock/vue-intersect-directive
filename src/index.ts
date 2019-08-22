import intersectDirective from './intersect-directive'
import Vue, { VueConstructor, PluginObject, PluginFunction } from 'vue'

declare global {
  interface Window {
    Vue: Vue | undefined
  }
}

const install: PluginFunction<never> = () => {
  Vue.directive('intersect', intersectDirective)
}

const VueIntersectDirective: PluginObject<never> = {
  install,
}

if (window.Vue) {
  Vue.use(VueIntersectDirective.install)
}

export default VueIntersectDirective
