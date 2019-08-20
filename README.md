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

## Importd

```js
import Vue from 'vue'
import VueIntersectDirective from 'vue-intersect-directive'

Vue.use(VueIntersectDirective)
```

## Browser

```html
<script src="vue.js"></script>
<script src="vue-intersect-directive/dist/vue-intersect-directive.js"></script>
```

# Usage

## CSS Binding 

Attach `foo` class to an element only when it is inside the viewport.

```html
<div v-intersect="{ true: ['foo'] }">Hello</div>
```

Attach `bar` and `baz` class to an elment only when it is outside the viewport.

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
  <div v-intersect="{ onChange: handleIntersection }">Hello</div>
</div>
<script>
  new Vue({
    methods: {
      handleIntersection(isIntersecting, el, options) {
        console.log(isIntersecting) // true or false
        console.log(el)             // reference to the elment (header in this case)
        console.log(options)        // value of v-intersect 
      }
    }
  }).$mount('#app')
</script>
```

## Configuration for the Intersection Observer (optional)

You can set the Intersection Observer options with `v-intersect` value. Refer to ["Creating an intersection observer"](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API#Creating_an_intersection_observer) for more details.

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

# License

MIT
