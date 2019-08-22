import { DirectiveOptions, DirectiveFunction, VNode } from 'vue'
import { DirectiveBinding } from 'vue/types/options'
import Intersect from './Intersect'

const intersectMap: Map<HTMLElement, Intersect> = new Map<HTMLElement, Intersect>()

/**
 *
 */
const bind: DirectiveFunction = (el: HTMLElement, binding: DirectiveBinding, vnode: VNode, oldVnode: VNode) => {
  const intersect: Intersect = new Intersect(vnode.context!)
  intersectMap.set(el, intersect)
  intersect.onBind(el, binding)
}

/**
 *
 */
const unbind: DirectiveFunction = (el: HTMLElement, binding: DirectiveBinding, vnode: VNode, oldVnode: VNode) => {
  const intersect: Intersect | undefined = intersectMap.get(el)
  if (intersect) {
    intersect.onUnbind(el, binding)
  }
}

/**
 *
 */
const IntersectDirective: DirectiveOptions = {
  bind,
  unbind,
}

export default IntersectDirective
