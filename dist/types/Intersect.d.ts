import { DirectiveBinding } from 'vue/types/options';
import Vue from 'vue';
declare type StyleOptions = string[] | {
    [prop: string]: any;
};
interface IntersectOptions {
    observerOptions?: IntersectionObserverInit;
    true?: StyleOptions;
    false?: StyleOptions;
    onChange?: IntersectChangeHandler;
    disposeWhen?: boolean;
}
declare type IntersectChangeHandler = (isInterSecting: boolean, el: HTMLElement, options: IntersectOptions) => any;
export default class Intersect {
    protected vm: Vue;
    protected interSectionObserver: IntersectionObserver;
    protected el: HTMLElement;
    protected options: IntersectOptions;
    protected callback: IntersectChangeHandler;
    /**
     *
     */
    constructor(vm: Vue);
    /**
     *
     */
    bind(el: HTMLElement, binding: DirectiveBinding): Promise<void>;
    /**
     *
     */
    unbind(el: HTMLElement, binding?: DirectiveBinding): void;
    /**
     *
     */
    protected onIntersectChange(entries: IntersectionObserverEntry[], observer: IntersectionObserver): void;
    /**
     *
     */
    protected addStyleOptions(options: StyleOptions): void;
    /**
     *
     */
    protected removeStyleOptions(options: StyleOptions): void;
}
export {};
