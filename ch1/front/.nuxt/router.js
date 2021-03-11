import Vue from 'vue'
import Router from 'vue-router'
import { normalizeURL, decode } from 'ufo'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _5abb9f0a = () => interopDefault(import('..\\pages\\post\\index.vue' /* webpackChunkName: "pages/post/index" */))
const _27876672 = () => interopDefault(import('..\\pages\\profile.vue' /* webpackChunkName: "pages/profile" */))
const _7f5496df = () => interopDefault(import('..\\pages\\signup.vue' /* webpackChunkName: "pages/signup" */))
const _1d42516d = () => interopDefault(import('..\\pages\\hashtag\\_id\\index.vue' /* webpackChunkName: "pages/hashtag/_id/index" */))
const _1c6815a3 = () => interopDefault(import('..\\pages\\post\\_id.vue' /* webpackChunkName: "pages/post/_id" */))
const _cd0662ac = () => interopDefault(import('..\\pages\\user\\_id\\index.vue' /* webpackChunkName: "pages/user/_id/index" */))
const _a8cb7d4a = () => interopDefault(import('..\\pages\\index.vue' /* webpackChunkName: "pages/index" */))

const emptyFn = () => {}

Vue.use(Router)

export const routerOptions = {
  mode: 'history',
  base: '/',
  linkActiveClass: 'nuxt-link-active',
  linkExactActiveClass: 'nuxt-link-exact-active',
  scrollBehavior,

  routes: [{
    path: "/post",
    component: _5abb9f0a,
    name: "post"
  }, {
    path: "/profile",
    component: _27876672,
    name: "profile"
  }, {
    path: "/signup",
    component: _7f5496df,
    name: "signup"
  }, {
    path: "/hashtag/:id",
    component: _1d42516d,
    name: "hashtag-id"
  }, {
    path: "/post/:id",
    component: _1c6815a3,
    name: "post-id"
  }, {
    path: "/user/:id",
    component: _cd0662ac,
    name: "user-id"
  }, {
    path: "/",
    component: _a8cb7d4a,
    name: "index"
  }],

  fallback: false
}

export function createRouter (ssrContext, config) {
  const base = (config.app && config.app.basePath) || routerOptions.base
  const router = new Router({ ...routerOptions, base  })

  // TODO: remove in Nuxt 3
  const originalPush = router.push
  router.push = function push (location, onComplete = emptyFn, onAbort) {
    return originalPush.call(this, location, onComplete, onAbort)
  }

  const resolve = router.resolve.bind(router)
  router.resolve = (to, current, append) => {
    if (typeof to === 'string') {
      to = normalizeURL(to)
    }
    return resolve(to, current, append)
  }

  return router
}
