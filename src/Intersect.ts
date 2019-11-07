import { DirectiveBinding } from 'vue/types/options'
import Vue from 'vue'

type StyleOptions = string[] | { [prop: string]: any }

interface IntersectOptions {
  observerOptions?: IntersectionObserverInit
  true?: StyleOptions
  false?: StyleOptions
  onChange?: IntersectChangeHandler
  disposeWhen?: boolean
}

type IntersectChangeHandler = (isInterSecting: boolean, el: HTMLElement, options: IntersectOptions) => any

// --------------------------------------------------------------------------
// Intersect
// --------------------------------------------------------------------------
export default class Intersect {
  protected interSectionObserver!: IntersectionObserver
  protected el!: HTMLElement
  protected options!: IntersectOptions
  protected callback!: IntersectChangeHandler

  /**
   *
   */
  public constructor(protected vm: Vue) {}

  /**
   *
   */
  public async bind(el: HTMLElement, binding: DirectiveBinding) {
    await this.vm.$nextTick()
    //
    const observerOptions: IntersectionObserverInit = { ...binding.value.observerOptions }
    this.interSectionObserver = new IntersectionObserver(this.onIntersectChange.bind(this), observerOptions)
    this.interSectionObserver.observe(el)
    //
    this.el = el
    this.options = {
      true: binding.value.true,
      false: binding.value.false,
      disposeWhen: binding.value.disposeWhen,
    }
    this.callback = binding.value.onChange
  }

  /**
   *
   */
  public unbind(el: HTMLElement, binding?: DirectiveBinding) {
    if (this.interSectionObserver) {
      this.interSectionObserver.unobserve(el)
    }
  }

  /**
   *
   */
  protected onIntersectChange(entries: IntersectionObserverEntry[], observer: IntersectionObserver): void {
    const entry: IntersectionObserverEntry = entries[0]
    if (!entry) return
    //
    if (entry.isIntersecting) {
      if (this.options.true) this.addStyleOptions(this.options.true)
      if (this.options.false) this.removeStyleOptions(this.options.false)
    } else {
      if (this.options.true) this.removeStyleOptions(this.options.true)
      if (this.options.false) this.addStyleOptions(this.options.false)
    }
    //
    if (this.callback) {
      this.callback(entry.isIntersecting, this.el, this.options)
    }
    //
    if (this.options.disposeWhen !== undefined) {
      const shouldDispose: boolean = entry.isIntersecting === this.options.disposeWhen
      if (shouldDispose) this.unbind(this.el)
    }
  }

  /**
   *
   */
  protected addStyleOptions(options: StyleOptions): void {
    if (Array.isArray(options)) {
      this.el.classList.add(...options)
    } else {
      for (const prop of Object.keys(options)) {
        this.el.style[prop as any] = options[prop]
      }
    }
  }

  /**
   *
   */
  protected removeStyleOptions(options: StyleOptions): void {
    if (Array.isArray(options)) {
      this.el.classList.remove(...options)
    } else {
      for (const prop of Object.keys(options)) {
        this.el.style.removeProperty(prop)
      }
    }
  }

}
