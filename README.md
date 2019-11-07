# Vue Intersect Directive

<a href="https://vuejs.org/"><img src="https://img.shields.io/badge/vue-2.6-brightgreen"/></a>

VueJS directive to observe intersection of an element with viewport.

# Installation

:warning: This plugin uses the [Intersection Observer API](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API) that is [not supported](https://caniuse.com/#feat=intersectionobserver) in some legacy browsers. Please include a [polyfill](https://github.com/w3c/IntersectionObserver/tree/master/polyfill) to work them around.


Via npm:

```bash
npm install vue-intersect-directive
```

Via yarn:

```bash
yarn add vue-intersect-directive
```

## Import

```js
import Vue from 'vue'
import VueIntersect from 'vue-intersect-directive'

Vue.use(VueIntersect)
```

Or: 

```js
import Vue from 'vue'
import { IntersectDirective }  from 'vue-intersect-directive'

Vue.directive('intersect', IntersectDirective)
```

## Browser

```html
<script src="vue.js"></script>
<script src="vue-intersect-directive/dist/vue-intersect-directive.min.js"></script>
```

# Usage

## CSS Binding 

Attach `foo` class to an element only when it is inside the viewport.

```html
<div v-intersect="{ true: ['foo'] }">Hello</div>
```

Attach `bar` and `baz` classes to an elment only when it is outside the viewport.

```html
<div v-intersect="{ false: ['bar', 'baz'] }">Hello</div>
```

CSS can be specified as object format.

```html
<div v-intersect="{ true: { backgroundColor: 'green' } }">Hello</div>
```

## Intersection Callback

You can register `onChange` callback funciton that will be called when intersection status changes.
For the details of the `options` argument, refer to ["Directive Hook Arguments"](https://vuejs.org/v2/guide/custom-directive.html#Directive-Hook-Arguments).

```html
<div id="app">
  <p v-intersect="{ onChange: handleIntersection }">Hello</p>
</div>
<script>
  new Vue({
    methods: {
      handleIntersection(isIntersecting, el, options) {
        console.log(isIntersecting) // true or false
        console.log(el)             // reference to the elment (<p> element in this case)
        console.log(options)        // value of v-intersect 
      }
    }
  }).$mount('#app')
</script>
```

## Stop observing

Use `disposeWhen` property to stop observing intersection of the element. For instance, if you set the value of the property to true, the element will no longer be observed once it comes inside the viewport.

```html
<div id="app">
  // when this element comes inside the viewport, `foo` class is attached.
  // The attached class will not be removed even when the element goes outside the viewport.
  <p v-intersect="{ true: [ 'foo' ], disposeWhen: true }">Hello</p>
</div>
```

## Configuration for the Intersection Observer (optional)

You can set the Intersection Observer options with `v-intersect` value. Refer to ["Creating an intersection observer"](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API#Creating_an_intersection_observer) for more details.

For instance, if you set the threshold value of observerOptions to 1, the element will not be recognized as intersected unless its whole area is inside the viewport. Please check the [demo page](https://megurock.github.io/vue-intersect-directive/dist/) to see what it really means.

```html
<div v-intersect="{ 
  observerOptions: {
    root: document.querySelector('#my-viewport'),
    rootMargin: '10px',
    threshold: 1.0,
  },
  true: [ 'foo' ],
  false: [ 'bar' ],
  onChange: (isIntersecting, el, options) => {
    // handle intersection
  },
}">Hello</div>
```

# Example 

[Demo](https://megurock.github.io/vue-intersect-directive/dist/)  
Source: [dist/index.html](https://github.com/megurock/vue-intersect-directive/blob/master/dist/index.html)

# To Do

- Add test.

# License

MIT
