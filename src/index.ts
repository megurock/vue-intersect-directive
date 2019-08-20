import intersectDirective from './intersect-directive'
import Vue, { VueConstructor, PluginObject, PluginFunction } from 'vue'

declare global {
  interface Window {
    Vue: Vue | undefined
  }
}

const install: PluginFunction<any> = (_Vue: VueConstructor) => {
  Vue.directive('intersect', intersectDirective)
}

const VueIntersectDirective: PluginObject<any> = {
  install,
}

if (window.Vue) {
  Vue.use(VueIntersectDirective.install)
}

export default VueIntersectDirective
