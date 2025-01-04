// import { setupLayouts } from 'virtual:generated-layouts'
// import { createRouter, createWebHistory } from 'vue-router'
// import routes from '~pages'
// import { canNavigate } from '@layouts/plugins/casl'
//
// const router = createRouter({
//   history: createWebHistory(import.meta.env.BASE_URL),
//   routes: [
//     ...setupLayouts(routes),
//   ],
// })
//
// // Docs: https://router.vuejs.org/guide/advanced/navigation-guards.html#global-before-guards
//
// export default router
//

import { setupLayouts } from 'virtual:generated-layouts'
import { createRouter, createWebHistory } from 'vue-router'
import routes from '~pages'
import { canNavigate } from '@layouts/plugins/casl'
import { isUserLoggedIn } from '@/router/utils'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: to => ({ name: 'dashboard', query: to.query }),
    },
    ...setupLayouts(routes),
  ],
})

router.beforeEach(to => {
  const isLoggedIn = isUserLoggedIn()

  if (canNavigate(to)) {
    if (to.meta.redirectIfLoggedIn && isLoggedIn)
      return { name: 'dashboard' }
  }
  else {
    if (isLoggedIn)
      return { name: 'not-authorized' }
    else if (to.name !== 'login')
      return { name: 'login', query: { to: to.name !== 'index' ? to.fullPath : undefined } }
  }
})

// Docs: https://router.vuejs.org/guide/advanced/navigation-guards.html#global-before-guards

export default router

